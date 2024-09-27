'use client'
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, coyWithoutShadows, dracula, nightOwl, okaidia, twilight, vscDarkPlus, xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Import dark theme

const CodeSnippet = ({ codeString, language }) => {
    const [copySuccess, setCopySuccess] = useState('');

    const handleCopy = () => {
        navigator.clipboard.writeText(codeString)
            .then(() => {
                setCopySuccess('Copied!');
                setTimeout(() => setCopySuccess(''), 2000); // Reset message after 2 seconds
            })
            .catch(() => {
                setCopySuccess('Failed to copy');
            });
    };

    return (
        <div className="relative bg-gray-900 p-4 rounded-lg">
            {/* style = dracula or atomDark */}
            <SyntaxHighlighter language={language} style={nightOwl} className='bg-gray-900'>
                {codeString}
            </SyntaxHighlighter>
            <button 
                onClick={handleCopy} 
                className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded">
                Copy
            </button>
            {copySuccess && <span className="text-green-400 mt-2">{copySuccess}</span>}
        </div>
    );
};

export default CodeSnippet;
