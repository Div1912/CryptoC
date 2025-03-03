import { Credential, User } from '../types';

export const mockCredentials: Credential[] = [
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
  },
  {
    id: '2',
    studentName: 'Jane Smith',
    institution: 'MIT',
    credentialType: 'Master of Artificial Intelligence',
    issueDate: '2023-06-20',
    description: 'Master of Artificial Intelligence with distinction',
    imageUrl: 'https://images.unsplash.com/photo-1592303637753-ce1e6b8a0ffb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    verified: true,
    tokenId: '23456',
    transactionHash: '0x234567890abcdef...'
  },
  {
    id: '3',
    studentName: 'Robert Johnson',
    institution: 'Stanford University',
    credentialType: 'PhD in Data Science',
    issueDate: '2023-07-10',
    description: 'PhD in Data Science with focus on machine learning',
    imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    verified: false,
    tokenId: '34567',
    transactionHash: '0x3456789abcdef...'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'student',
    credentials: [mockCredentials[0]],
    walletAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'student',
    credentials: [mockCredentials[1]]
  },
  {
    id: '3',
    name: 'Harvard University',
    email: 'admin@harvard.edu',
    role: 'institution',
    credentials: []
  },
  {
    id: '4',
    name: 'Credential Verifier Inc.',
    email: 'verifier@example.com',
    role: 'verifier',
    credentials: []
  }
];