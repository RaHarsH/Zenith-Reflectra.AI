'use client';
import { useSearchParams } from "next/navigation"; 

const SelectedModel = () => {
    const searchParams = useSearchParams(); 
    const modelName = searchParams.get('name'); 
    const modelId = searchParams.get('id'); 

    const downloadHandler = () => {

    }

    return (
        <div className='flex gap-5 mt-8 px-8'>
            <div className='flex-1 bg-[#f6f3f0] border h-screen border-gray-300 px-4 py-2 rounded-lg'>
                <h1>Selected Model: {modelName || 'Unknown'}</h1>
                <p>Model ID: {modelId || 'N/A'}</p>
                <p>Details about the {modelName || 'model'} go here...</p>
            </div>
            <div className='flex-1 bg-[#f6f3f0] border border-gray-300 px-4 py-2 rounded-lg'>
                <h1>Use {modelName || 'Unknown'}</h1>
                <button
                onClick={downloadHandler} 
                className='bg-black text-white text-sm px-4 py-2 rounded-md top-5 relative'
                >
                    Download
                </button>
            </div>
        </div>
    );
};

export default SelectedModel;
