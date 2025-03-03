import React, { useState } from 'react';
import { Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { connectWallet } from '../utils/web3Utils';

const ConnectWalletPage: React.FC = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { updateUserWallet } = useAuth();

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    setError(null);
    setSuccess(false);
    
    try {
      const result = await connectWallet();
      updateUserWallet(result.address);
      setSuccess(true);
      setIsConnecting(false);
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet. Please try again.');
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Connect Your Wallet</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-6">
            <div className="bg-indigo-100 p-3 rounded-full">
              <Shield className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-800">Blockchain Wallet Connection</h2>
              <p className="text-gray-600 mt-1">
                Connect your Ethereum wallet to interact with academic credentials on the blockchain.
              </p>
            </div>
          </div>
          
          {error && (
            <div className="mb-6 bg-red-50 p-4 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="mb-6 bg-green-50 p-4 rounded-md">
              <p className="text-green-700 font-medium">Wallet connected successfully!</p>
              <p className="text-green-600 text-sm mt-1">
                You can now issue, receive, and verify academic credentials on the blockchain.
              </p>
            </div>
          )}
          
          <div className="bg-gray-50 p-6 rounded-md mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Why connect a wallet?</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-indigo-500 font-bold mr-2">•</span>
                <span>Students can receive and store their academic credentials as NFTs</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 font-bold mr-2">•</span>
                <span>Institutions can issue tamper-proof credentials on the blockchain</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 font-bold mr-2">•</span>
                <span>Employers can verify the authenticity of credentials instantly</span>
              </li>
            </ul>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={handleConnectWallet}
              disabled={isConnecting}
              className={`flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 ${
                isConnecting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'
              } transition-colors`}
            >
              <Shield className="h-5 w-5 mr-2" />
              {isConnecting ? 'Connecting...' : 'Connect Ethereum Wallet'}
            </button>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            Supported wallets: MetaMask, WalletConnect, Coinbase Wallet
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletPage;