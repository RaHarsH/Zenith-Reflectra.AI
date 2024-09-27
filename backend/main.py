from fastapi import FastAPI, Response, UploadFile, File, HTTPException
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM,AutoModelForQuestionAnswering
from datasets import Dataset
import json
from motor.motor_asyncio import AsyncIOMotorClient
from bson.objectid import ObjectId
from advanced_reasoning_framework1 import AdvancedReasoningFramework
import os
from fastapi.middleware.cors import CORSMiddleware 
import torch

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
        # model_path = os.path.join(os.getcwd(), os.path.join(os.getcwd(),model_info.model_name))
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
        data = json.loads(content)
        dataset = Dataset.from_dict(data)
        framework.load_dataset(dataset)
        return {"message": "Dataset uploaded and loaded successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading dataset: {str(e)}")

@app.post("/process_input")
async def process_input(question_context: QuestionContext):
    global framework
    if framework is None:
        raise HTTPException(status_code=400, detail="Please load a model and dataset first")
    try:
        answer, thoughts = framework.process_input(question_context.question, question_context.context)
        print(answer, thoughts)
        return {"answer": answer, "thoughts": thoughts}
    except Exception as e:
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