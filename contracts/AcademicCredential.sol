// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title AcademicCredential
 * @dev ERC721 token representing academic credentials with role-based access control
 */
contract AcademicCredential is ERC721URIStorage, AccessControl {
    using Counters for Counters.Counter;
    
    bytes32 public constant INSTITUTION_ROLE = keccak256("INSTITUTION_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    
    Counters.Counter private _tokenIdCounter;
    
    // Mapping from token ID to institution address
    mapping(uint256 => address) public credentialIssuers;
    
    // Mapping from token ID to revocation status
    mapping(uint256 => bool) public revokedCredentials;
    
    // Events
    event CredentialIssued(uint256 indexed tokenId, address indexed institution, address indexed recipient);
    event CredentialRevoked(uint256 indexed tokenId, address indexed institution);
    event InstitutionAdded(address indexed institution);
    event InstitutionRemoved(address indexed institution);
    
    constructor() ERC721("Academic Credential", "ACAD") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }
    
    /**
     * @dev Add a new institution that can issue credentials
     * @param institution Address of the institution to add
     */
    function addInstitution(address institution) external onlyRole(ADMIN_ROLE) {
        grantRole(INSTITUTION_ROLE, institution);
        emit InstitutionAdded(institution);
    }
    
    /**
     * @dev Remove an institution
     * @param institution Address of the institution to remove
     */
    function removeInstitution(address institution) external onlyRole(ADMIN_ROLE) {
        revokeRole(INSTITUTION_ROLE, institution);
        emit InstitutionRemoved(institution);
    }
    
    /**
     * @dev Issue a new academic credential to a recipient
     * @param recipient Address of the credential recipient
     * @param tokenURI URI pointing to the credential metadata
     * @return tokenId The ID of the newly minted token
     */
    function issueCredential(address recipient, string memory tokenURI) 
        external 
        onlyRole(INSTITUTION_ROLE) 
        returns (uint256) 
    {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        credentialIssuers[tokenId] = msg.sender;
        
        emit CredentialIssued(tokenId, msg.sender, recipient);
        
        return tokenId;
    }
    
    /**
     * @dev Revoke a credential that was previously issued
     * @param tokenId ID of the token to revoke
     */
    function revokeCredential(uint256 tokenId) external {
        require(
            credentialIssuers[tokenId] == msg.sender || hasRole(ADMIN_ROLE, msg.sender),
            "Only the issuing institution or an admin can revoke credentials"
        );
        require(!revokedCredentials[tokenId], "Credential already revoked");
        
        revokedCredentials[tokenId] = true;
        
        emit CredentialRevoked(tokenId, msg.sender);
    }
    
    /**
     * @dev Check if a credential is valid (not revoked)
     * @param tokenId ID of the token to check
     * @return bool True if the credential is valid, false otherwise
     */
    function isCredentialValid(uint256 tokenId) external view returns (bool) {
        require(_exists(tokenId), "Credential does not exist");
        return !revokedCredentials[tokenId];
    }
    
    /**
     * @dev Get the issuer of a credential
     * @param tokenId ID of the token
     * @return address The address of the institution that issued the credential
     */
    function getCredentialIssuer(uint256 tokenId) external view returns (address) {
        require(_exists(tokenId), "Credential does not exist");
        return credentialIssuers[tokenId];
    }
    
    /**
     * @dev Override supportsInterface to support both ERC721 and AccessControl
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
    
    /**
     * @dev Check if a token exists
     * @param tokenId ID of the token to check
     * @return bool True if the token exists, false otherwise
     */
    function _exists(uint256 tokenId) internal view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }
}