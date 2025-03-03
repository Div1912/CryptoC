import { ethers } from 'ethers';

// ABI for the AcademicCredential contract
const contractABI = [
  // Only including essential functions for brevity
  "function issueCredential(address recipient, string memory tokenURI) external returns (uint256)",
  "function isCredentialValid(uint256 tokenId) external view returns (bool)",
  "function getCredentialIssuer(uint256 tokenId) external view returns (address)",
  "function ownerOf(uint256 tokenId) external view returns (address)",
  "function tokenURI(uint256 tokenId) external view returns (string memory)"
];

// This would be the address of your deployed contract
const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Replace with actual address when deployed

// Get provider and signer
const getProviderAndSigner = async () => {
  if (window.ethereum) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return { provider, signer };
  } else {
    throw new Error("Ethereum wallet not detected. Please install MetaMask or another wallet.");
  }
};

// Connect to wallet
export const connectWallet = async () => {
  try {
    const { signer } = await getProviderAndSigner();
    const address = await signer.getAddress();
    const network = await signer.provider.getNetwork();
    
    return {
      address,
      chainId: network.chainId,
    };
  } catch (error) {
    console.error("Error connecting wallet:", error);
    throw error;
  }
};

// Create metadata for the credential
export const createCredentialMetadata = async (credential) => {
  // In a production environment, you would upload this to IPFS
  // For now, we'll just return a JSON object
  const metadata = {
    name: credential.credentialType,
    description: credential.description,
    image: credential.imageUrl,
    attributes: [
      {
        trait_type: "Institution",
        value: credential.institution
      },
      {
        trait_type: "Student Name",
        value: credential.studentName
      },
      {
        trait_type: "Issue Date",
        value: credential.issueDate
      }
    ]
  };
  
  // In a real implementation, you would upload this to IPFS and return the URI
  // For now, we'll just return a mock URI
  return `ipfs://QmXyZ.../${credential.id}`; // This would be a real IPFS URI in production
};

// Issue a new credential
export const issueCredential = async (
  recipientAddress: string,
  credential: any
) => {
  try {
    const { signer } = await getProviderAndSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
    
    // Create metadata and get URI
    const metadataURI = await createCredentialMetadata(credential);
    
    // Issue the credential
    const tx = await contract.issueCredential(recipientAddress, metadataURI);
    const receipt = await tx.wait();
    
    // Get the token ID from the event logs
    // This is a simplified approach - in a real implementation you would parse the event logs
    const tokenId = "12345"; // This would come from the event in a real implementation
    
    return {
      success: true,
      transactionHash: receipt.hash,
      tokenId,
    };
  } catch (error) {
    console.error("Error issuing credential:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Verify a credential
export const verifyCredential = async (tokenId: string) => {
  try {
    const { provider } = await getProviderAndSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);
    
    // Check if the credential is valid
    const isValid = await contract.isCredentialValid(tokenId);
    
    if (!isValid) {
      return {
        isValid: false,
        error: "Credential has been revoked",
      };
    }
    
    // Get the issuer
    const issuer = await contract.getCredentialIssuer(tokenId);
    
    // Get the owner
    const owner = await contract.ownerOf(tokenId);
    
    // Get the metadata URI
    const uri = await contract.tokenURI(tokenId);
    
    // In a real implementation, you would fetch the metadata from IPFS
    // For now, we'll just return mock data
    return {
      isValid: true,
      issuer,
      owner,
      uri,
      metadata: {
        name: "Bachelor of Computer Science",
        description: "Bachelor of Computer Science with honors",
        image: "https://example.com/image.jpg",
      },
    };
  } catch (error) {
    console.error("Error verifying credential:", error);
    return {
      isValid: false,
      error: error.message,
    };
  }
};

// Check if the connected wallet is an institution
export const isInstitution = async () => {
  try {
    const { signer } = await getProviderAndSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
    
    // This would call a function on your contract to check if the address has the INSTITUTION_ROLE
    // For now, we'll just return a mock value
    return true; // This would be determined by the contract in a real implementation
  } catch (error) {
    console.error("Error checking institution status:", error);
    return false;
  }
};

// Get credentials owned by the connected wallet
export const getOwnedCredentials = async () => {
  // In a real implementation, you would query the contract for tokens owned by the address
  // For now, we'll just return mock data
  return [
    {
      id: '1',
      studentName: 'John Doe',
      institution: 'Harvard University',
      credentialType: 'Bachelor of Computer Science',
      issueDate: '2023-05-15',
      description: 'Bachelor of Computer Science with honors',
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      verified: true,
      tokenId: '12345',
      transactionHash: '0x123456789abcdef...'
    }
  ];
};