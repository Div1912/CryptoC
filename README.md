# NFT Academic Credential System

This project is a blockchain-based academic credential system that allows educational institutions to issue verifiable credentials as NFTs on the Ethereum blockchain. Students can receive and share their credentials, while employers and other institutions can instantly verify their authenticity.

## Features

- Issue academic credentials as NFTs
- View and manage credentials
- Verify credential authenticity
- Connect with Ethereum wallets
- Role-based access control for institutions
- Credential revocation capability

## Technology Stack

- **Frontend**: React with TypeScript, Tailwind CSS, React Router
- **Blockchain**: Solidity smart contract (ERC-721)
- **Development**: Hardhat for smart contract development and testing
- **Web3 Integration**: ethers.js for blockchain interaction

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Compile the smart contract:
   ```
   npm run compile
   ```
4. Deploy the smart contract to a local network:
   ```
   npm run deploy
   ```
5. Start the development server:
   ```
   npm run dev
   ```

## Smart Contract

The `AcademicCredential` smart contract is an ERC-721 token with the following features:

- Role-based access control for institutions and admins
- Functions for issuing and revoking credentials
- Verification of credential authenticity
- Tracking of credential issuers

### Contract Functions

- `addInstitution(address)`: Add a new institution that can issue credentials
- `removeInstitution(address)`: Remove an institution
- `issueCredential(address, string)`: Issue a new credential to a recipient
- `revokeCredential(uint256)`: Revoke a previously issued credential
- `isCredentialValid(uint256)`: Check if a credential is valid
- `getCredentialIssuer(uint256)`: Get the issuer of a credential

## Future Enhancements

- IPFS integration for storing credential metadata
- Multi-signature requirements for credential issuance
- Integration with decentralized identity solutions
- Mobile app version
- Support for more complex credential types and achievements
- Integration with educational platforms and learning management systems