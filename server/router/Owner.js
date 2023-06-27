const express = require('express');
const router = express.Router();

const Contract = require('web3-eth-contract');
const abi = require('../out/Solidity.sol/Opensea.json').abi;

require('dotenv').config();

router.get('/', async (req, res, next) => {
  const url = "https://sepolia.infura.io/v3/" + process.env.INFURA_API_KEY;
  Contract.setProvider(url);
  const constract = new Contract(abi, process.env.SMARTCONTRACT_ADDRESS); 
  const tokenId = req.body.tokenId;
  if(tokenId){
    try{
      const owner = await constract.methods.ownerOf(tokenId).call();  
      console.log(`token: ${tokenId}, owner ${owner}`)
      return res.status(200).send({ ownerAddress: owner});
    } catch (err) { 
        console.log("Wrong TokenID.");
        return res.status(400).send({ message: "Wrong tokenId"});
      }
  } else {
    console.log("Error! tokenId가 없습니다.");
    next(); //에러처리
  } 
})
module.exports = router;