export interface Credential {
  id: string;
  studentName: string;
  institution: string;
  credentialType: string;
  issueDate: string;
  expiryDate?: string;
  description: string;
  imageUrl: string;
  verified: boolean;
  tokenId?: string;
  transactionHash?: string;
  skills?: string[];
  grade?: string;
  achievements?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'institution' | 'verifier';
  credentials?: Credential[];
  walletAddress?: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface CredentialStats {
  totalIssued: number;
  verified: number;
  unverified: number;
  byInstitution: Record<string, number>;
  byType: Record<string, number>;
  recentActivity: Array<{
    date: string;
    count: number;
    type: string;
  }>;
}