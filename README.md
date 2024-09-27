##previous selectedModel page
```javascript
'use client';
import { useSearchParams } from "next/navigation"; 
import { useState } from "react";

const SelectedModel = () => {
    const [ isClicked, setIsClicked ] = useState(false)

    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleSelect = (e) => {
      const files = Array.from(e.target.files);
    //   console.log(files);
      
      setSelectedFiles(files);
    //   console.log(selectedFiles)
    };

    const searchParams = useSearchParams(); 
    const modelName = searchParams.get('name'); 
    const modelId = searchParams.get('id'); 

    const buttonHandler = () => {
        setIsClicked(true)
    }

    const closeHandler = () => {
        setIsClicked(false)
    }

    const generateHandler = () => {
        
    }

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
                    <div className=' flex justify-between items-center border border-gray-800 px-4 py-2 rounded-lg max-h-[700px]'>
                        <h1>Use {modelName || 'Unknown'}</h1>
                        <button
                        onClick={buttonHandler} 
                        className='bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md'
                        >
                            Use this model
                        </button>
                    </div>

                    {isClicked && 
                    <div className='mt-4 form-container border border-gray-800 w-full flex rounded-xl justify-center items-center mr-10 py-2'>
                        <div className='h-[40vh] w-2/3  px-4 py-2'>
                            <div className='button-container w-full flex justify-end'>
                                <button className='bg-white hover:bg-gray-300 text-black text-sm px-4 py-2 rounded-md'
                                onClick={closeHandler}
                                >
                                    close
                                </button>
                            </div>
                            {/* to upload folders / files (datasets) */}
                            <label htmlFor="dataset"
                            className='bg-slate-700 px-2 py-2 rounded-md'
                            >
                                Choose dataset
                            </label>
                            {
                                selectedFiles && 
                                <p className='text-gray-300 mt-5'>files: {selectedFiles.length}</p>
                            }
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
                            className='mt-10 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md'
                            onClick={generateHandler}
                            >
                                Generate
                            </button>
                        </div>

                    </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default SelectedModel;
```