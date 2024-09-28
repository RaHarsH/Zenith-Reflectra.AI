from fastapi import logger
import torch
from transformers import AutoModelForQuestionAnswering, AutoTokenizer
from datasets import Dataset
import random
import os
import zipfile
import io

class AdvancedReasoningFramework:
    def __init__(self, model_name=None, local_model_path=None, model=None, tokenizer=None):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        if model and tokenizer:
            self.model = model.to(self.device)
            self.tokenizer = tokenizer
        elif local_model_path:
            self.model = AutoModelForQuestionAnswering.from_pretrained(local_model_path).to(self.device)
            self.tokenizer = AutoTokenizer.from_pretrained(local_model_path)
        elif model_name:
            self.model = AutoModelForQuestionAnswering.from_pretrained(model_name).to(self.device)
            self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        else:
            raise ValueError("Either model_name, local_model_path, or both model and tokenizer must be provided")

        self.dataset = None

    def load_dataset(self, dataset):
        self.dataset = dataset

    def save_model(self, path):
        self.model.save_pretrained(path)
        self.tokenizer.save_pretrained(path)
        print(f"Model saved to {path}")

    def compress_model(self, path):
        buffer = io.BytesIO()
        with zipfile.ZipFile(buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
            for root, _, files in os.walk(path):
                for file in files:
                    zip_file.write(os.path.join(root, file), file)
        return buffer.getvalue()
    
    def process_input(self, question, context):
        try:
            inputs = self.tokenizer.encode_plus(question, context, return_tensors="pt", max_length=512, truncation=True)
            outputs = self.model(**inputs)
            
            answer_start = torch.argmax(outputs.start_logits)
            answer_end = torch.argmax(outputs.end_logits) + 1
            answer = self.tokenizer.decode(inputs["input_ids"][0][answer_start:answer_end])
            
            # Generate thoughts (this is a placeholder, implement your own logic)
            thoughts = f"Considered context from index {answer_start} to {answer_end}"
            
            return answer, thoughts
        except Exception as e:
            logger.error(f"Error in process_input: {str(e)}")
            return str(e), "An error occurred during processing"


    def chain_of_thought(self, question, context, initial_answer):
        thoughts = [
            f"1. Question: '{question}'",
            f"2. Context: '{context[:100]}...'",
            f"3. Initial answer: '{initial_answer}'",
            "4. Analyzing the answer:",
            f"   a. Is the answer present in the context? {'Yes' if initial_answer.lower() in context.lower() else 'No'}",
            f"   b. Does the answer directly address the question? {self.check_answer_relevance(question, initial_answer)}",
            "5. Refining the answer:"
        ]
        refined_answer = self.refine_answer(question, context, initial_answer)
        thoughts.append(f"Refined answer: '{refined_answer}'")
        return refined_answer, thoughts

    def check_answer_relevance(self, question, answer):
        question_words = set(question.lower().split())
        answer_words = set(answer.lower().split())
        common_words = question_words.intersection(answer_words)
        return "Yes" if len(common_words) > 1 else "Partially" if len(common_words) == 1 else "No"

    def refine_answer(self, question, context, initial_answer):
        prompt = f"Question: {question}\nContext: {context}\nInitial answer: {initial_answer}"
        inputs = self.tokenizer(prompt, return_tensors="pt", max_length=512, truncation=True).to(self.device)
        with torch.no_grad():
            outputs = self.model(**inputs)
        
        # Get the start and end logits
        start_logits = outputs.start_logits
        end_logits = outputs.end_logits
        answer_start = torch.argmax(start_logits)
        answer_end = torch.argmax(end_logits) + 1  
        answer_ids = inputs['input_ids'][0][answer_start:answer_end]
        refined_answer = self.tokenizer.decode(answer_ids, skip_special_tokens=True)
        return refined_answer.strip()


    def get_random_questions(self, n=5):
        if self.dataset is None:
            raise ValueError("Dataset not loaded. Please load a dataset first.")
        
        samples = random.sample(range(len(self.dataset)), n)
        return [(self.dataset[i]['question'], self.dataset[i]['context']) for i in samples]