import { expect } from "chai";
import { ethers } from "hardhat";

describe("AcademicCredential", function () {
  let academicCredential;
  let owner;
  let institution;
  let student;
  let admin;
  let INSTITUTION_ROLE;
  let ADMIN_ROLE;

  beforeEach(async function () {
    [owner, institution, student, admin] = await ethers.getSigners();
    
    const AcademicCredential = await ethers.getContractFactory("AcademicCredential");
    academicCredential = await AcademicCredential.deploy();
    
    INSTITUTION_ROLE = ethers.keccak256(ethers.toUtf8Bytes("INSTITUTION_ROLE"));
    ADMIN_ROLE = ethers.keccak256(ethers.toUtf8Bytes("ADMIN_ROLE"));
    
    // Add institution and admin roles
    await academicCredential.grantRole(INSTITUTION_ROLE, institution.address);
    await academicCredential.grantRole(ADMIN_ROLE, admin.address);
  });

  describe("Role Management", function () {
    it("Should allow admin to add an institution", async function () {
      const newInstitution = ethers.Wallet.createRandom().address;
      await academicCredential.connect(admin).addInstitution(newInstitution);
      
      expect(await academicCredential.hasRole(INSTITUTION_ROLE, newInstitution)).to.equal(true);
    });
    
    it("Should allow admin to remove an institution", async function () {
      await academicCredential.connect(admin).removeInstitution(institution.address);
      
      expect(await academicCredential.hasRole(INSTITUTION_ROLE, institution.address)).to.equal(false);
    });
    
    it("Should not allow non-admin to add an institution", async function () {
      const newInstitution = ethers.Wallet.createRandom().address;
      
      await expect(
        academicCredential.connect(institution).addInstitution(newInstitution)
      ).to.be.reverted;
    });
  });

  describe("Credential Management", function () {
    it("Should allow institution to issue a credential", async function () {
      const tokenURI = "ipfs://QmXyZ.../1";
      
      await expect(
        academicCredential.connect(institution).issueCredential(student.address, tokenURI)
      ).to.emit(academicCredential, "CredentialIssued");
      
      // Check that the student owns the token
      expect(await academicCredential.ownerOf(0)).to.equal(student.address);
      
      // Check that the token URI is set correctly
      expect(await academicCredential.tokenURI(0)).to.equal(tokenURI);
      
      // Check that the issuer is recorded correctly
      expect(await academicCredential.getCredentialIssuer(0)).to.equal(institution.address);
    });
    
    it("Should not allow non-institution to issue a credential", async function () {
      const tokenURI = "ipfs://QmXyZ.../1";
      
      await expect(
        academicCredential.connect(student).issueCredential(student.address, tokenURI)
      ).to.be.reverted;
    });
    
    it("Should allow institution to revoke a credential", async function () {
      const tokenURI = "ipfs://QmXyZ.../1";
      
      await academicCredential.connect(institution).issueCredential(student.address, tokenURI);
      
      await expect(
        academicCredential.connect(institution).revokeCredential(0)
      ).to.emit(academicCredential, "CredentialRevoked");
      
      // Check that the credential is revoked
      expect(await academicCredential.isCredentialValid(0)).to.equal(false);
    });
    
    it("Should allow admin to revoke a credential", async function () {
      const tokenURI = "ipfs://QmXyZ.../1";
      
      await academicCredential.connect(institution).issueCredential(student.address, tokenURI);
      
      await expect(
        academicCredential.connect(admin).revokeCredential(0)
      ).to.emit(academicCredential, "CredentialRevoked");
      
      // Check that the credential is revoked
      expect(await academicCredential.isCredentialValid(0)).to.equal(false);
    });
    
    it("Should not allow non-issuer to revoke a credential", async function () {
      const tokenURI = "ipfs://QmXyZ.../1";
      
      await academicCredential.connect(institution).issueCredential(student.address, tokenURI);
      
      await expect(
        academicCredential.connect(student).revokeCredential(0)
      ).to.be.reverted;
    });
  });

  describe("Credential Verification", function () {
    it("Should correctly report valid credentials", async function () {
      const tokenURI = "ipfs://QmXyZ.../1";
      
      await academicCredential.connect(institution).issueCredential(student.address, tokenURI);
      
      expect(await academicCredential.isCredentialValid(0)).to.equal(true);
    });
    
    it("Should correctly report revoked credentials", async function () {
      const tokenURI = "ipfs://QmXyZ.../1";
      
      await academicCredential.connect(institution).issueCredential(student.address, tokenURI);
      await academicCredential.connect(institution).revokeCredential(0);
      
      expect(await academicCredential.isCredentialValid(0)).to.equal(false);
    });
  });
});