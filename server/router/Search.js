const express = require('express');
const router = express.Router();
const axios = require('axios');

const Contract = require('web3-eth-contract');
const abi = require('../contract/ABI');

require('dotenv').config();

 router.get('/Search', async (req, res, next) => {

  const url = "https://sepolia.infura.io/v3/" + process.env.INFURA_API_KEY;
  Contract.setProvider(url);
  const constract = new Contract(abi, process.env.SMARTCONTRACT_ADDRESS); 

  const address = req.body.address; //특정 지갑 주소(토큰 소유자)
  const tokenId = req.body.tokenId;
  
  if (address) { //address를 받았을때
    try{
      const balance = await constract.methods.balanceOf(address).call();
      if(balance === 0) return res.status(200).send({ data: [] }); // 보유하지않았으면 빈배열을 리턴
      
      let outputs = [];
      let count = 1;
      let myNft = balance; //nft보유수

      //tokenId search
      while ( myNft > 0 ) {
        try {
          // tokenId를 1부터 순서대로 검색
          const isowner = await constract.methods.ownerOf(count).call();
          if(isowner === address){
            outputs.push({tokenId: count});
            myNft--;
          }
          count++;
        } catch (err) { //발행되지 않은 tokenId입력시 카운트만 증가
          count++;
        }
      }
      
      //찾은 tokenId로 이번엔 tokenURI를 받아온다
      for (const obj of outputs) {  
        const tokenURI = await constract.methods.tokenURI(obj.tokenId).call();
          try {
            const ipfs = await axios({ 
              method: 'GET',
              url: tokenURI,
              headers: {accept: 'applycation/json'},
              withCredential: true,
            });
            obj.tokenURI = ipfs.data;
          } catch (err) { //ipfs URI이 부정확할때 tokenURI를 그대로 send
            console.log("URI가 정확하지않습니다.");  
            obj.tokenURI = tokenURI;
          }       
      } 

      return res.status(200).send({ data: outputs });
    } catch (err) { 
      console.log("잘못된 address입니다.");
      return res.status(400).send({ message: "invalid address" });
    }
  } else if (tokenId) { //tokenId를 받았을 때
    console.log(tokenId);
      try{
        const tokenURI = await constract.methods.tokenURI(tokenId).call();  
        //ipfs로부터 tokenURI를 가지고 json data를 가져온다.
        const ipfs = await axios({ 
          method: 'GET',
          url: tokenURI,
          headers: {accept: 'applycation/json'},
          withCredential: true,
        });
        return res.status(200).json({ data: { tokenURI: ipfs.data }});
      } catch (err) { //ipfs URI이 부정확할때 tokenURI를 그대로 send
        console.log("URI가 정확하지않습니다.");  
        try {
          const tokenURI = await constract.methods.tokenURI(tokenId).call(); 
          return res.status(200).send({ data: { tokenURI: tokenURI }});
        } catch (err) { 
          console.log("잘못된 tokenId입니다.");
          return res.status(400).send({ message: "invalid tokenId"});
        }
    }
  } else {
    console.log("Error! address 또는 tokenId가 없습니다.");
    next(); //에러처리
  } 
});

module.exports = router;