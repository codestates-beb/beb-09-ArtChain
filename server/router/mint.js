const express = require('express');
const router = express.Router();
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET);
const { ethers } = require('ethers');
const abi = require('../out/Solidity.sol/Opensea.json').abi;

router.post('/', async (req, res) => {
  try {
    
    const url = "https://sepolia.infura.io/v3/" + process.env.INFURA_API_KEY;
    const provider = new ethers.providers.JsonRpcProvider(url);
    let contract = new ethers.Contract(process.env.SMARTCONTRACT_ADDRESS, abi, provider);
    const privateKey = process.env.PRIVATE_KEY;
    const wallet = new ethers.Wallet(privateKey, provider);
    contract = contract.connect(wallet);
    const { photoUrl, nftName, description, toAddress } = req.body;
  
    const photoResult = await pinata.pinJSONToIPFS({ url: photoUrl });
    console.log('Photo uploaded successfully. IPFS Hash:', photoResult.IpfsHash); 
  
    const nftMetadata = {
      name: nftName,
      description: description,
      image: `ipfs://${photoResult.IpfsHash}`
    };
  
    const metadataResult = await pinata.pinJSONToIPFS(nftMetadata);
    console.log('Metadata uploaded successfully. IPFS Hash:', metadataResult.IpfsHash);
    const CID = metadataResult.IpfsHash;
    const tokenURI = `ipfs://${metadataResult.IpfsHash}`;
  
    const mintResult = contract.mintNFT(toAddress, tokenURI)
      .then((result) => {
        console.log(result);
        res.status(200).json({ tokenId: result, CID: CID, photoCID: photoResult.IpfsHash });
      });
  } catch (error) {
    console.error('Error adding to IPFS:', error);
    res.status(400).send(error);
  }
});

module.exports = router;