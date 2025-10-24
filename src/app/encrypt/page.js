"use client";

import React, { useState } from 'react';
import axios from 'axios';
import Countdown from '../../components/Countdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldHalved, faCopy, faTrash } from '@fortawesome/free-solid-svg-icons';

function EncryptPage() {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copyButtonText, setCopyButtonText] = useState('Copy');

    const handleEncrypt = async () => {
        if (!inputText) return;
        setIsLoading(true);
        setOutputText('');
        setCopyButtonText('Copy');
        try {
            const response = await axios.post('/api/encrypt', { text: inputText });
            setOutputText(response.data.result);
        } catch (error) {
            setOutputText("Encryption failed.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = () => {
        if (outputText) {
            navigator.clipboard.writeText(outputText);
            setCopyButtonText('Copied!');
            setTimeout(() => setCopyButtonText('Copy'), 2000);
        }
    };

    const handleClear = () => {
        setInputText('');
        setOutputText('');
        setCopyButtonText('Copy');
    };
    
    return (
        <div>
            <h1 className="text-4xl font-bold text-center text-white mb-4">Encrypt Message</h1>
            <Countdown />
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-6">
                <div className="relative">
                    <textarea
                        className="w-full min-h-[200px] p-3 bg-slate-900 border border-slate-600 rounded-md text-slate-200 font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter plain text..."
                    />
                    {inputText && (
                         <button 
                            onClick={handleClear} 
                            className="absolute top-3 right-3 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold py-1 px-2 rounded-md transition-colors"
                         >
                            <FontAwesomeIcon icon={faTrash} />
                         </button>
                    )}
                </div>

                <button 
                    onClick={handleEncrypt} 
                    disabled={isLoading || !inputText}
                    className="w-full flex items-center justify-center py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
                >
                    <FontAwesomeIcon icon={faShieldHalved} className="mr-2" />
                    {isLoading ? 'Encrypting...' : 'Encrypt'}
                </button>

                <div className="relative">
                    <textarea
                        className="w-full min-h-[200px] p-3 bg-slate-900 border border-slate-600 rounded-md text-slate-200 font-mono"
                        value={outputText}
                        readOnly
                        placeholder="Encrypted result..."
                    />
                    {outputText && (
                        <button 
                            onClick={handleCopy}
                            className={`absolute top-3 right-3 text-xs font-semibold py-1 px-2 rounded-md transition-colors ${
                                copyButtonText === 'Copied!' 
                                ? 'bg-green-600 text-white' 
                                : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                            }`}
                        >
                           <FontAwesomeIcon icon={faCopy} className="mr-1" />
                           {copyButtonText}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EncryptPage;