'use client'
import Model from '@/components/Model';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { useState } from 'react';

const Models = () => {
  const { isSignedIn } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const modelsList = [
    { name: 'meta-llama/Llama-3.2-1B', id: 'model-1' },
    { name: 'Luciferio/MiniLLM-finetuned', id: 'model-2' },
    { name: 'AI Model 3', id: 'model-3' },
    { name: 'AI Model 4', id: 'model-4' },
    { name: 'AI Model 5', id: 'model-5' },
    { name: 'AI Model 6', id: 'model-6' },
    { name: 'AI Model 7', id: 'model-7' },
    { name: 'AI Model 8', id: 'model-8' },
    { name: 'AI Model 9', id: 'model-9' },
    { name: 'AI Model 10', id: 'model-10' },
  ];

  const filteredModels = modelsList.filter(model =>
    model.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if(!isSignedIn) {
    return (<div className='w-[100vw] px-20 py-8 h-[100vh] text-white'>
            <p>Sign in to view this page</p>
            <Link className='text-white' href='/sign-in' >Sign in here</Link>
           </div>
    )
  }

  return (
    <div className='p-6 text-white flex px-20 min-h-[58vh]'>
      <div className='flex-1'>
        <h1>Select a Model</h1>
        <p className='text-gray-400'>Currently available Models: {modelsList.length}</p>

        {/* To Filter the Ai models based on the search */}
        <input
          type='text'
          placeholder='Search models...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='mt-4 w-3/4 p-2 border border-gray-300 rounded bg-slate-800'
        />
      </div>

      {/* Display the Filtered Models */}
      <div className='mt-6 flex-1 mb-28'>
        {filteredModels.map((model) => (
          <div className='bg-slate-900 border border-gray-500 00 text-xl text-center w-3/4 rounded-lg py-2 mb-4'>
            <Model key={model.id} 
                   className={`mb-2`}
                   href={`/models/selectedModels?name=${model.name}&id=${model.id}`}
                   model={model}
            />
          </div>
        //   <li key={model.id} className='mb-2'>
        //     <Link href={`/models/selectedModels?model=${model.id}`}>
        //       {model.name}
        //     </Link>
        //   </li>
        ))}
      </div>
    </div>
  );
};

export default Models;
