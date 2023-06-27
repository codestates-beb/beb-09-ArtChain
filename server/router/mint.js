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
  
      const mintResult = contract.methods.mintNFT(toAddress,tokenURI).call()   /*.send({from: "0x3111d80ac22263D7637397a11Df5C99d0e78573D", gas: 3000000})*/
            .then((result)=> {
              console.log(result);
              res.status(200).send(mintResult);
            })
    } catch (error) {
      console.error('Error adding to IPFS:', error);
      res.status(400).send(error);
    }
  });

  module.exports = router;