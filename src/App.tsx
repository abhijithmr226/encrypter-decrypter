import React from 'react';
import { Shield } from 'lucide-react';
import EncryptionForm from './components/EncryptionForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-indigo-600 rounded-xl">
                <Shield size={40} />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Secure Encryptor</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A modern encryption tool that helps you secure your messages using advanced AES encryption. 
              Perfect for sending sensitive information safely.
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-gray-800 rounded-2xl p-8 shadow-xl">
            <EncryptionForm />
          </div>

          {/* Footer */}
          <footer className="mt-12 text-center text-gray-500 text-sm">
            <p>Your data never leaves your browser. All encryption is performed locally.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;