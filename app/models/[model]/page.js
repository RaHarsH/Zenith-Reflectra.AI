'use client';
import CodeSnippet from "@/components/CodeSnippet";
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

    const codeString = `import torch
    from transformers import AutoTokenizer
    from prev.improper_cot import AdvancedChainOfThoughtModel  
    
    def generate_with_cot(model, prompt, max_length=300):
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        input_ids = model.tokenizer.encode(prompt, return_tensors="pt").to(device)
        attention_mask = torch.ones_like(input_ids)
    
        with torch.no_grad():
            output_ids = model.generate(
                input_ids,
                attention_mask=attention_mask,
                max_length=max_length,
                num_beams=3,
                no_repeat_ngram_size=2,
                top_k=50,
                top_p=0.95,
                temperature=0.7,
                do_sample=True,
            )
    
        return model.tokenizer.decode(output_ids[0], skip_special_tokens=True)
    
    def main():
        # Load the saved model
        model_path = "advanced_cot_multi_news_model"  # Path to the saved model
        cot_model = AdvancedChainOfThoughtModel.from_pretrained(model_path)
        cot_model.eval()  # Set the model to evaluation mode
    
        # Move the model to GPU if available
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        cot_model.to(device)
    
        # Test document
        test_document = """
        The United Nations Climate Change Conference, COP26, is set to take place in Glasgow, Scotland. 
        World leaders, experts, and activists will gather to discuss and negotiate global climate action. 
        The conference aims to accelerate progress towards the goals of the Paris Agreement and the UN Framework Convention on Climate Change.
        Key topics will include reducing greenhouse gas emissions, adapting to climate impacts, and financing climate action in developing countries.
        """
    
        prompt = f"Summarize the following text step by step:\\n\\n{test_document}\\n\\nStep-by-step summary:"
        
        # Generate a response using the loaded model
        response = generate_with_cot(cot_model, prompt)
        print("Generated summary:")
        print(response)
    
    if __name__ == "__main__":
        main()`;
    

    return (
        <div className='gap-5 mt-8 px-8 text-white'>
            <div className='full flex items-center gap-8 px-5 mb-5'>
                <h1 className='text-2xl'>{modelName || 'Unknown'}</h1>
                <p>{modelId || 'N/A'}</p>
            </div>
            <div className='w-full flex gap-5'>
                <div className='flex-1 border h-96 border-gray-800 px-4 py-2 rounded-lg'>
                <h1>{modelName || 'model'} COMMUNITY LICENSE AGREEMENT</h1>
                    <div className="flex items-center">
                        <span className='line block w-full' style={{ height: '0.5px', backgroundColor: '#6b7280' }} />
                    </div>

                    <p className='text-gray-300'>{modelName}</p>
                    <p className='text-gray-400'>
                        “Agreement” means the terms and conditions for use, reproduction, distribution and modification of the Llama Materials set forth herein. 
                    </p>
                    <p className='text-gray-400'>
                    “Documentation” means the specifications, manuals and documentation accompanying Llama 3.2 distributed by Meta at https://llama.meta.com/doc/overview.
                    </p>
                    <div className='flex justify-end mt-10'>
                        <button className='bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md'>
                            Agree
                        </button>

                    </div>
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
                        <div className='h-[35vh] w-2/3 py-2'>
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
            <div className='model-info-container mt-10 w-1/2'>
                <h1 className='text-gray-300'>Model Information</h1>
                <p className='text-justify p-4 text-gray-400'>
                    The Llama 3.2-Vision collection of multimodal large language models (LLMs) is a collection of pretrained and instruction-tuned image reasoning generative models in 11B and 90B sizes (text + images in / text out). The Llama 3.2-Vision instruction-tuned models are optimized for visual recognition, image reasoning, captioning, and answering general questions about an image. The models outperform many of the available open source and closed multimodal models on common industry benchmarks.
                </p>
            </div>
            <div className=' mt-10 w-1/2'>
                <h1 className='text-gray-300'>Model Developer: Meta</h1>
            </div>
            <div className='model-architecture-container mt-10 w-1/2'>
                <h1 className='text-gray-300'>Model Architecture</h1>
                <p className='text-justify p-4 text-gray-400'>
                    Llama 3.2-Vision is built on top of Llama 3.1 text-only model, which is an auto-regressive language model that uses an optimized transformer architecture. The tuned versions use supervised fine-tuning (SFT) and reinforcement learning with human feedback (RLHF) to align with human preferences for helpfulness and safety. To support image recognition tasks, the Llama 3.2-Vision model uses a separately trained vision adapter that integrates with the pre-trained Llama 3.1 language model. The adapter consists of a series of cross-attention layers that feed image encoder representations into the core LLM.
                </p>
            </div>
            <p className='text-gray-200 mb-5 mt-7'>test.py</p>
            <CodeSnippet codeString={codeString} language="python" />
        </div>
    );
};

export default SelectedModel;