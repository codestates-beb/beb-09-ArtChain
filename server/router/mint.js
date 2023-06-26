const express = require('express');
const router = express.Router();

const Contract = require('web3-eth-contract');
const abi = require('../out/Solidity.sol/Opensea.json').abi;

router.post('/mint', async (req, res) => {
    try {
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
  
      const mintNft = await CreatureFactoryInstance.methods.mint(0, toAddress).send({from: "0x3111d80ac22263D7637397a11Df5C99d0e78573D"});
      console.log(mintNft);
  
      res.status(200).send('Successful!');
      // 이렇게 하나씩 보내주면 해당 계좌 지갑 NFT 목록에 하나씩 추가됩니다.
  
    } catch (error) {
      console.error('Error adding to IPFS:', error);
      res.status(400).send(error);
    }
  });