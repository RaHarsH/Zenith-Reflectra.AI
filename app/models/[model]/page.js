'use client';
import { useSearchParams } from "next/navigation"; 
import { useState } from "react";
import { loadModel, uploadDataset } from '@/services/api'; // Adjust the import path as needed

const SelectedModel = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [loading, setLoading] = useState(false); // Optional: to show loading state for model loading
    const [uploading, setUploading] = useState(false); // Optional: to show uploading state for datasets

    const searchParams = useSearchParams(); 
    const modelName = searchParams.get('name'); 
    const modelId = searchParams.get('id'); 

    // Handle selecting files or folders
    const handleSelect = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
    };

    // Load model function
    const handleLoadModel = async () => {
        try {
            setLoading(true); // Set loading state while model is loading
            await loadModel(modelName); // Call API function to load the model
            setIsClicked(true); // Once model is loaded, enable file upload section
            setLoading(false); // Stop loading state
            console.log('Model loaded successfully');
        } catch (error) {
            console.error('Error loading model:', error);
            setLoading(false); // Stop loading state in case of an error
        }
    };

    // Upload dataset files
    const handleUploadDataset = async () => {
        if (selectedFiles.length === 0) {
            alert('Please select at least one file or folder to upload.');
            return;
        }

        try {
            setUploading(true); // Set uploading state while files are being uploaded
            const formData = new FormData();
            selectedFiles.forEach((file) => {
                formData.append('files', file); // Append each file to formData
            });

            const response = await uploadDataset(formData); // Call API to upload files
            console.log('Dataset uploaded successfully:', response);
            setUploading(false); // Stop uploading state
        } catch (error) {
            console.error('Error uploading dataset:', error);
            setUploading(false); // Stop uploading state in case of error
        }
    };

    // Close modal handler
    const closeHandler = () => {
        setIsClicked(false);
    };

    return (
        <div className='gap-5 mt-8 px-8 text-white'>
            <div className='full flex items-center gap-8 px-5 mb-5'>
                <h1 className='text-2xl'>{modelName || 'Unknown'}</h1>
                <p>{modelId || 'N/A'}</p>
            </div>
            <div className='w-full flex gap-5'>
                <div className='flex-1 border border-gray-800 px-4 py-2 rounded-lg'>
                    <h1>Details about the {modelName || 'model'} go here...</h1>
                </div>
                <div className='flex-1'>
                    <div className='flex justify-between items-center border border-gray-800 px-4 py-2 rounded-lg max-h-[700px]'>
                        <h1>Use {modelName || 'Unknown'}</h1>
                        <button
                            onClick={handleLoadModel}
                            disabled={loading} // Disable button while loading
                            className={`bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md ${loading ? 'opacity-50' : ''}`}
                        >
                            {loading ? 'Loading...' : 'Use this model'}
                        </button>
                    </div>

                    {isClicked && 
                    <div className='mt-4 form-container border border-gray-800 w-full flex rounded-xl justify-center items-center mr-10 py-2'>
                        <div className='h-[40vh] w-2/3 px-4 py-2'>
                            <div className='button-container w-full flex justify-end'>
                                <button className='bg-white hover:bg-gray-300 text-black text-sm px-4 py-2 rounded-md'
                                    onClick={closeHandler}
                                >
                                    Close
                                </button>
                            </div>
                            {/* File/Folder input for datasets */}
                            <label htmlFor="dataset" className='bg-slate-700 px-2 py-2 rounded-md'>
                                Choose dataset
                            </label>
                            {selectedFiles.length > 0 && (
                                <p className='text-gray-300 mt-5'>
                                    Files: {selectedFiles.length}
                                </p>
                            )}
                            <input
                                id='dataset'
                                type="file"
                                webkitdirectory="true"  
                                directory="true"         
                                multiple                  
                                onChange={handleSelect}
                                className="hidden"
                            />
                            <button 
                                onClick={handleUploadDataset}
                                disabled={uploading} // Disable button while uploading
                                className={`mt-10 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md ${uploading ? 'opacity-50' : ''}`}
                            >
                                {uploading ? 'Uploading...' : 'Generate'}
                            </button>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default SelectedModel;
