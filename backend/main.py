from fastapi import FastAPI, Response, UploadFile, File, HTTPException
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM, AutoModelForQuestionAnswering
from datasets import Dataset
import json
from motor.motor_asyncio import AsyncIOMotorClient
from bson.objectid import ObjectId
from advanced_reasoning_framework1 import AdvancedReasoningFramework
import os
from fastapi.middleware.cors import CORSMiddleware 
import torch
import csv
import io
from PyPDF2 import PdfReader
import pandas as pd
import logging
import re

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = AsyncIOMotorClient("mongodb+srv://aksh9881:aksh9881@cluster0.pmlcp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client.model_database

framework = None

# Set up logging
logger = logging.getLogger("uvicorn")

class ModelInfo(BaseModel):
    model_name: str

class QuestionContext(BaseModel):
    question: str
    context: str

@app.post("/load_model")
async def load_model(model_info: ModelInfo):
    global framework
    try:
        model_name = model_info.model_name
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        model = AutoModelForQuestionAnswering.from_pretrained(model_name)
        framework = AdvancedReasoningFramework(model_name=model_name, local_model_path=None, model=model, tokenizer=tokenizer)
        return {"message": "Model loaded successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading model: {str(e)}")

@app.post("/upload_dataset")
async def upload_dataset(file: UploadFile = File(...)):
    global framework
    if framework is None:
        raise HTTPException(status_code=400, detail="Please load a model first")
    
    try:
        content = await file.read()
        file_extension = file.filename.split('.')[-1].lower()
        
        if file_extension == 'csv':
            data = process_csv(content)
        elif file_extension == 'pdf':
            data = process_pdf(content)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format. Please upload a CSV or PDF file.")
        
        # Validate dataset structure
        required_keys = ["questions", "contexts", "answers"]
        if not all(key in data for key in required_keys):
            raise ValueError(f"Dataset must contain keys: {', '.join(required_keys)}")
        
        if not (len(data["questions"]) == len(data["contexts"]) == len(data["answers"])):
            raise ValueError("Questions, contexts, and answers must have the same length")
        
        # Convert to Dataset object
        dataset = Dataset.from_dict(data)
        
        # Log dataset info
        logger.info(f"Dataset loaded. Size: {len(dataset)}")
        
        # Load dataset into framework
        framework.load_dataset(dataset)
        
        return {"message": "Dataset uploaded and loaded successfully", "dataset_size": len(dataset)}
    except Exception as e:
        logger.error(f"Error uploading dataset: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error uploading dataset: {str(e)}")

def process_csv(content):
    df = pd.read_csv(io.StringIO(content.decode('utf-8')))
    return {
        "questions": df["questions"].tolist(),
        "contexts": df["contexts"].tolist(),
        "answers": df["answers"].tolist()
    }

def process_pdf(content):
    pdf_reader = PdfReader(io.BytesIO(content))
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()
    
    questions, contexts, answers = parse_pdf_text(text)
    
    return {
        "questions": questions,
        "contexts": contexts,
        "answers": answers
    }

def parse_pdf_text(text):
    # Implement logic to parse the PDF text into questions, contexts, and answers
    questions = []
    contexts = []
    answers = []

    # Split the text into sections (assuming each question-context-answer set is separated by newlines)
    sections = text.split('\n\n')

    for section in sections:
        # Use regex to find questions, contexts, and answers
        question_match = re.search(r'Question:\s*(.*)', section)
        context_match = re.search(r'Context:\s*(.*)', section)
        answer_match = re.search(r'Answer:\s*(.*)', section)

        if question_match and context_match and answer_match:
            questions.append(question_match.group(1).strip())
            contexts.append(context_match.group(1).strip())
            answers.append(answer_match.group(1).strip())

    return questions, contexts, answers

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("api_logger")

# Verify logging is working as expected
logger.info("Logger is set up correctly.")

@app.post("/process_input")
async def process_input(question_context: QuestionContext):
    global framework
    logger.info("Received input request.")
    if framework is None:
        logger.error("Framework not loaded.")
        raise HTTPException(status_code=400, detail="Please load a model and dataset first")
    try:
        answer, thoughts = framework.process_input(question_context.question, question_context.context)
        logger.info(f"Processed input. Answer: {answer}, Thoughts: {thoughts}")
        return {"answer": answer, "thoughts": thoughts}
    except Exception as e:
        logger.error(f"Error in try block: {str(e)}")  # Detailed logging to pinpoint error location
        raise HTTPException(status_code=500, detail=f"Error processing input: {str(e)}")
    

@app.get("/random_questions")
async def get_random_questions(n: int = 5):
    global framework
    if framework is None or framework.dataset is None:
        raise HTTPException(status_code=400, detail="Please load a model and dataset first")
    
    try:
        questions = framework.get_random_questions(n)
        return {"random_questions": questions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting random questions: {str(e)}")
    

@app.post("/save_model")
async def save_model():
    global framework
    if framework is None:
        raise HTTPException(status_code=400, detail="Please load a model and dataset first")
    
    try:
        temp_path = "temp_model"
        framework.save_model(temp_path)
        compressed_model = framework.compress_model(temp_path)
        
        result = await db.models.insert_one({"model": compressed_model})
        model_id = str(result.inserted_id)
        
        # Clean up temporary files
        for root, dirs, files in os.walk(temp_path, topdown=False):
            for name in files:
                os.remove(os.path.join(root, name))
            for name in dirs:
                os.rmdir(os.path.join(root, name))
        os.rmdir(temp_path)
        return {"message": "Model saved successfully", "model_id": model_id}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving model: {str(e)}")

@app.get("/download_model/{model_id}")
async def download_model(model_id: str):
    try:
        model_data = await db.models.find_one({"_id": ObjectId(model_id)})
        if model_data is None:
            raise HTTPException(status_code=404, detail="Model not found")
        
        return Response(content=model_data["model"], media_type="application/zip", headers={
            "Content-Disposition": f"attachment; filename=model_{model_id}.zip"
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error downloading model: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)