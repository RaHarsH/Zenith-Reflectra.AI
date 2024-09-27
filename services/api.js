const API_BASE_URL = 'http://localhost:8000'; 

export const loadModel = async (modelName) => {
  const response = await fetch(`${API_BASE_URL}/load_model`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model_name: modelName }),
    
  });
  return response.json();
};

export const uploadDataset = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${API_BASE_URL}/upload_dataset`, {
    method: 'POST',
    body: formData,
  });
  return response.json();
};

export const processInput = async (question, context) => {
  const response = await fetch(`${API_BASE_URL}/process_input`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question, context }),
  });
  return response.json();
};

export const getRandomQuestions = async (n = 5) => {
  const response = await fetch(`${API_BASE_URL}/random_questions?n=${n}`);
  return response.json();
};

export const saveModel = async () => {
  const response = await fetch(`${API_BASE_URL}/save_model`, {
    method: 'POST',
  });
  return response.json();
};

export const downloadModel = async (modelId) => {
  const response = await fetch(`${API_BASE_URL}/download_model/${modelId}`);
  if (!response.ok) {
    throw new Error('Failed to download model');
  }
  return response.blob();
};