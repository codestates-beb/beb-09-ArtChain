const express = require('express');
const router = express.Router();
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET);
const Contract = require('web3-eth-contract');
const abi = require('../out/Solidity.sol/Opensea.json').abi;

router.post('/', async (req, res) => {
    try {
      const url = "https://sepolia.infura.io/v3/" + process.env.INFURA_API_KEY;
      Contract.setProvider(url);
      const contract = new Contract(abi, process.env.SMARTCONTRACT_ADDRESS); 
      const { photoUrl, nftName, description, toAddress } = req.body;

      /////// 이 부분ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
  
      const photoResult = await pinata.pinJSONToIPFS({url: photoUrl});
      console.log('Photo uploaded successfully. IPFS Hash:', photoResult.IpfsHash); 
  
      const nftMetadata = {
        name: nftName,
        description: description,
        image: `ipfs://${photoResult.IpfsHash}`
      };
  
      const metadataResult = await pinata.pinJSONToIPFS(nftMetadata);
      console.log('Metadata uploaded successfully. IPFS Hash:', metadataResult.IpfsHash);
      const tokenURI = `ipfs://${metadataResult.IpfsHash}`;
  
      const mintNft = await contract.methods.mintNFT(toAddress,tokenURI).send({from: "0xD6eCbF0A39b6Cd91b1e095cF52c058624646B875"});
      console.log(mintNft);
  
      res.status(200).send('Successful!! txHash : ',mintNft);
      
  
    } catch (error) {
      console.error('Error adding to IPFS:', error);
      res.status(400).send(error);
    }
  });

  module.exports = router;