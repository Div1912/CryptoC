import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { mockCredentials } from '../data/mockData';
import CredentialCard from '../components/CredentialCard';

const VerifyPage: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [credential, setCredential] = useState<typeof mockCredentials[0] | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchInput.trim()) return;
    
    setSearchResult('loading');
    
    // Simulate blockchain verification
    setTimeout(() => {
      const found = mockCredentials.find(cred => 
        cred.tokenId === searchInput || 
        cred.transactionHash?.includes(searchInput)
      );
      
      if (found) {
        setCredential(found);
        setSearchResult('success');
      } else {
        setCredential(null);
        setSearchResult('error');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Verify Academic Credentials</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <form onSubmit={handleSearch}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Token ID or Transaction Hash
            </label>
            <div className="flex">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Token ID or Transaction Hash..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={searchResult === 'loading'}
                className={`px-6 py-2 bg-indigo-600 text-white rounded-r-md ${
                  searchResult === 'loading' ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'
                } transition-colors`}
              >
                {searchResult === 'loading' ? 'Verifying...' : 'Verify'}
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Example: Enter "12345" or "23456" to see a verified credential
            </p>
          </form>
        </div>
        
        {searchResult === 'loading' && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Verifying credential on the blockchain...</p>
          </div>
        )}
        
        {searchResult === 'success' && credential && (
          <div>
            <div className="bg-green-50 p-4 rounded-md mb-6 flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <div>
                <p className="text-green-700 font-medium">Credential Verified Successfully</p>
                <p className="text-green-600 text-sm mt-1">
                  This credential has been verified on the blockchain and is authentic.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <CredentialCard credential={credential} detailed={true} />
            </div>
          </div>
        )}
        
        {searchResult === 'error' && (
          <div className="bg-red-50 p-4 rounded-md flex items-start">
            <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
            <div>
              <p className="text-red-700 font-medium">Credential Not Found</p>
              <p className="text-red-600 text-sm mt-1">
                No credential with the provided Token ID or Transaction Hash was found on the blockchain.
              </p>
            </div>
          </div>
        )}
        
        <div className="mt-12 bg-indigo-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-indigo-800 mb-4 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            How Verification Works
          </h2>
          <p className="text-indigo-700 mb-4">
            Our verification system checks the authenticity of academic credentials by:
          </p>
          <ol className="list-decimal list-inside text-indigo-700 space-y-2 pl-4">
            <li>Confirming the credential exists on the blockchain</li>
            <li>Verifying the issuing institution's digital signature</li>
            <li>Checking that the credential has not been revoked</li>
            <li>Validating the metadata matches the original issuance</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;