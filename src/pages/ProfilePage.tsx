import React, { useState } from 'react';
import { User, Shield, LogOut, Edit, Mail, MapPin, Globe, Twitter, Linkedin, Github, Award, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { connectWallet } from '../utils/web3Utils';
import CredentialCard from '../components/CredentialCard';
import { motion } from 'framer-motion';

const ProfilePage: React.FC = () => {
  const { user, logout, updateUserWallet } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    location: user?.location || '',
    website: user?.website || '',
    twitter: user?.socialLinks?.twitter || '',
    linkedin: user?.socialLinks?.linkedin || '',
    github: user?.socialLinks?.github || '',
  });

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      const result = await connectWallet();
      updateUserWallet(result.address);
      setIsConnecting(false);
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet. Please try again.');
      setIsConnecting(false);
    }
  };

  const handleSaveProfile = () => {
    // In a real app, this would update the user profile in the database
    setIsEditing(false);
  };

  if (!user) {
    return null;
  }

  // Mock credentials for the profile
  const userCredentials = user.credentials || [
    {
      id: '1',
      studentName: user.name,
      institution: 'Harvard University',
      credentialType: 'Bachelor of Computer Science',
      issueDate: '2023-05-15',
      description: 'Bachelor of Computer Science with honors',
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      verified: true,
      tokenId: '12345',
      transactionHash: '0x123456789abcdef...',
      grade: 'A',
      skills: ['JavaScript', 'React', 'Node.js', 'Blockchain'],
      achievements: ['Dean\'s List', 'Hackathon Winner']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-indigo-600 to-indigo-900">
            <motion.div 
              className="absolute -bottom-16 left-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden bg-white">
                {user.avatarUrl ? (
                  <img 
                    src={user.avatarUrl} 
                    alt={user.name} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-indigo-100 flex items-center justify-center">
                    <User className="h-16 w-16 text-indigo-600" />
                  </div>
                )}
              </div>
            </motion.div>
            
            <div className="absolute top-4 right-4 flex space-x-2">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center px-3 py-1.5 bg-white text-indigo-700 rounded-md text-sm font-medium shadow-sm hover:bg-gray-50"
              >
                <Edit className="h-4 w-4 mr-1" />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
              
              <button 
                onClick={logout}
                className="flex items-center px-3 py-1.5 bg-white text-gray-700 rounded-md text-sm font-medium shadow-sm hover:bg-gray-50"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Sign Out
              </button>
            </div>
          </div>
          
          {/* Profile Info */}
          <div className="pt-16 pb-6 px-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                      <input
                        type="url"
                        value={profileData.website}
                        onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                      <input
                        type="text"
                        value={profileData.twitter}
                        onChange={(e) => setProfileData({...profileData, twitter: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                      <input
                        type="text"
                        value={profileData.linkedin}
                        onChange={(e) => setProfileData({...profileData, linkedin: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                      <input
                        type="text"
                        value={profileData.github}
                        onChange={(e) => setProfileData({...profileData, github: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Save Profile
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                      <div className="flex items-center mt-1 space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 capitalize">
                          {user.role}
                        </span>
                        {user.walletAddress && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Wallet Connected
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {!user.walletAddress && (
                      <button
                        onClick={handleConnectWallet}
                        disabled={isConnecting}
                        className={`mt-4 md:mt-0 flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 ${
                          isConnecting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'
                        } transition-colors`}
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                      </button>
                    )}
                  </div>
                  
                  {error && (
                    <div className="mt-4 bg-red-50 p-4 rounded-md flex items-start">
                      <Shield className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                      <p className="text-red-700">{error}</p>
                    </div>
                  )}
                  
                  {user.bio && (
                    <p className="mt-4 text-gray-600">{user.bio}</p>
                  )}
                  
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-gray-600">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      <span>{user.email}</span>
                    </div>
                    
                    {user.location && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{user.location}</span>
                      </div>
                    )}
                    
                    {user.website && (
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-1" />
                        <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
                          {user.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    )}
                  </div>
                  
                  {user.socialLinks && (
                    <div className="mt-4 flex space-x-4">
                      {user.socialLinks.twitter && (
                        <a href={`https://twitter.com/${user.socialLinks.twitter}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600">
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                      
                      {user.socialLinks.linkedin && (
                        <a href={`https://linkedin.com/in/${user.socialLinks.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600">
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      
                      {user.socialLinks.github && (
                        <a href={`https://github.com/${user.socialLinks.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600">
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </div>
          
          {/* Wallet Section */}
          {user.walletAddress && (
            <div className="px-8 py-6 border-t border-gray-200">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-lg font-medium text-gray-800 mb-4">Blockchain Wallet</h2>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center mb-2">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-green-700 font-medium">Wallet Connected</span>
                  </div>
                  <p className="text-sm text-gray-500">Your Wallet Address:</p>
                  <p className="text-sm font-mono break-all">{user.walletAddress}</p>
                </div>
              </motion.div>
            </div>
          )}
          
          {/* Credentials Section */}
          <div className="px-8 py-6 border-t border-gray-200">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2  className="text-lg font-medium text-gray-800">Your Credentials</h2>
                <Link to="/credentials" className="text-sm text-indigo-600 hover:text-indigo-800">View All</Link>
              </div>
              
              {userCredentials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userCredentials.map(credential => (
                    <CredentialCard key={credential.id} credential={credential} detailed />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Credentials Yet</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    You don't have any academic credentials yet. Connect your wallet to receive credentials from institutions.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;