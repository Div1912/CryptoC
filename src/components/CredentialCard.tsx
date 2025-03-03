import React, { useState } from 'react';
import { Credential } from '../types';
import { CheckCircle, XCircle, ExternalLink, Award, Calendar, User, Building, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CredentialCardProps {
  credential: Credential;
  detailed?: boolean;
}

const CredentialCard: React.FC<CredentialCardProps> = ({ credential, detailed = false }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <img 
          src={credential.imageUrl} 
          alt={credential.credentialType} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-white">{credential.credentialType}</h3>
            <div className="bg-white p-1 rounded-full">
              {credential.verified ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <XCircle className="h-6 w-6 text-red-500" />
              )}
            </div>
          </div>
        </div>
        
        {credential.grade && (
          <div className="absolute bottom-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Grade: {credential.grade}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center text-gray-600 mb-2">
          <Building className="h-4 w-4 mr-1" />
          <p className="text-sm">{credential.institution}</p>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <User className="h-4 w-4 mr-1" />
          <p className="text-sm">Issued to: {credential.studentName}</p>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Calendar className="h-4 w-4 mr-1" />
          <p className="text-sm">Issue Date: {credential.issueDate}</p>
        </div>
        
        {(detailed || expanded) && (
          <AnimatePresence>
            <motion.div 
              className="mt-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-700">{credential.description}</p>
              
              {credential.skills && credential.skills.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-semibold text-gray-700">Skills:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {credential.skills.map((skill, index) => (
                      <span key={index} className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {credential.achievements && credential.achievements.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-semibold text-gray-700">Achievements:</p>
                  <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                    {credential.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {credential.tokenId && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500 flex items-center">
                    <span className="font-semibold mr-1">Token ID:</span> 
                    {credential.tokenId}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                    <span className="font-semibold mr-1">TX Hash:</span>
                    <span className="truncate">{credential.transactionHash}</span>
                    <a 
                      href={`https://etherscan.io/tx/${credential.transactionHash}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ml-1 text-indigo-600 hover:text-indigo-800"
                    >
                      <ExternalLink className="h-3 w-3 inline" />
                    </a>
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
        
        <div className="mt-4 flex justify-between items-center">
          <button 
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
            onClick={() => setExpanded(!expanded)}
          >
            {!detailed && (expanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Show More
              </>
            ))}
          </button>
          
          <button className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            <Award className="h-4 w-4 mr-1" />
            View Certificate
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CredentialCard;