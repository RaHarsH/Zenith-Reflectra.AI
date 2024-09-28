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
  try {
    // Check if the file is CSV or PDF
    const allowedTypes = ['text/csv', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Please upload a CSV or PDF file.');
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:8000/upload_dataset', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    // Log success message with file type
    console.log(`Successfully uploaded ${file.type === 'text/csv' ? 'CSV' : 'PDF'} file.`);
    
    return result;
  } catch (error) {
    console.error('Error uploading dataset:', error.message);
    throw error;
  }
};

export const processInput = async (question, context) => {
  try {
    const response = await fetch('http://localhost:8000/process_input', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, context }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    console.log('Processed input:', result);
    
    return result;
  } catch (error) {
    console.error('Error processing input:', error.message);
    console.log('Error processing input:', error.message);
    return {
      answer: "An error occurred while processing the input.",
      thoughts: error.message
    };
  }
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