'use client'
import Model from '@/components/model';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { useState } from 'react';

const Models = () => {
  const isSignedIn = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const modelsList = [
    { name: 'Llama', id: 'model-1' },
    { name: 'AI Model 2', id: 'model-2' },
    { name: 'AI Model 3', id: 'model-3' },
    { name: 'AI Model 4', id: 'model-4' },
  ];

  const filteredModels = modelsList.filter(model =>
    model.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if(!isSignedIn) {
    return <div>
            <p>Sign in to view this page</p>
            {
              alert('Sign in to view this page!')
            }
            <Link href='/sign-in' >Sign in here</Link>
           </div>
  }
  return (
    <div className='p-6'>
      <h1>Select a Model</h1>
      <p className='text-gray-400'>Currently available Models: {modelsList.length}</p>

      {/* To Filter the Ai models based on the search */}
      <input
        type='text'
        placeholder='Search models...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='mt-4 p-2 border border-gray-300 rounded'
      />

      {/* Display the Filtered Models */}
      <ul className='mt-6'>
        {filteredModels.map((model) => (
            <Model key={model.id} 
                   className={`mb-2`}
                   href={`/models/selectedModels?name=${model.name}&id=${model.id}`}
                   model={model}
            />
        //   <li key={model.id} className='mb-2'>
        //     <Link href={`/models/selectedModels?model=${model.id}`}>
        //       {model.name}
        //     </Link>
        //   </li>
        ))}
      </ul>
    </div>
  );
};

export default Models;
