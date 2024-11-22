import React, { useState } from 'react';
import { Lock, Unlock, Copy, Check, RefreshCw } from 'lucide-react';
import { encrypt, decrypt } from '../utils/crypto';

export default function EncryptionForm() {
  const [input, setInput] = useState('');
  const [key, setKey] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = mode === 'encrypt' 
        ? encrypt(input, key)
        : decrypt(input, key);
      setOutput(result);
    } catch (error) {
      setOutput('Error: Invalid input or key');
    }
    
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleModeToggle = () => {
    setMode(mode === 'encrypt' ? 'decrypt' : 'encrypt');
    setInput('');
    setOutput('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">
          {mode === 'encrypt' ? 'Encrypt' : 'Decrypt'} Message
        </h2>
        <button
          type="button"
          onClick={handleModeToggle}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors flex items-center gap-2"
        >
          {mode === 'encrypt' ? <Lock size={18} /> : <Unlock size={18} />}
          Switch to {mode === 'encrypt' ? 'Decrypt' : 'Encrypt'}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {mode === 'encrypt' ? 'Message to Encrypt' : 'Text to Decrypt'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder={mode === 'encrypt' ? 'Enter your message...' : 'Enter encrypted text...'}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Encryption Key
          </label>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Enter your secret key..."
          />
        </div>

        <button
          type="submit"
          disabled={loading || !input || !key}
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <RefreshCw className="animate-spin" size={20} />
          ) : mode === 'encrypt' ? (
            <Lock size={20} />
          ) : (
            <Unlock size={20} />
          )}
          {mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
        </button>

        {output && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {mode === 'encrypt' ? 'Encrypted Result' : 'Decrypted Result'}
            </label>
            <div className="relative">
              <textarea
                readOnly
                value={output}
                className="w-full h-32 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
              >
                {copied ? <Check size={20} className="text-green-400" /> : <Copy size={20} className="text-gray-300" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}