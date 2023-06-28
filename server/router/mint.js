const express = require('express');
const router = express.Router();
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET);
const { ethers } = require('ethers');
const abi = require('../out/Solidity.sol/Opensea.json').abi;

router.post('/', async (req, res) => {
  try {
    
    // Infura와 연결하기 위한 URL 설정.
    const url = "https://sepolia.infura.io/v3/" + process.env.INFURA_API_KEY; //Infura API URL을 설정한다.
    const provider = new ethers.providers.JsonRpcProvider(url); // Ethereum 노드에 연결하기 위한 Provider를 생성한다.

    // Smart Contract와의 연결을 위한 설정.
    let contract = new ethers.Contract(process.env.SMARTCONTRACT_ADDRESS, abi, provider); // Smart Contract와 상호작용 하기 위한 인스턴스를 생성한다.
    const privateKey = process.env.PRIVATE_KEY;  //   {     프라이빗 키를 사용하여 
    const wallet = new ethers.Wallet(privateKey, provider);//    지갑을 생성한다.          } 
    contract = contract.connect(wallet);  // 지갑을 사용해 Smart Contract와 연결한다.

    // 요청 Body에서 필요한 데이터들 추출하기.
    const { photoUrl, nftName, description, toAddress } = req.body;
    
    console.log(contract);

    // 이미지 파일을 Pinata에 업로드 하는 코드.
    const photoResult = await pinata.pinJSONToIPFS({ url: photoUrl });
    console.log('Photo uploaded successfully. IPFS Hash:', photoResult.IpfsHash); 
  

    // NFT 메타 데이터 생성 및 Pinata에 업로드 하기
    const nftMetadata = {
      name: nftName,
      description: description,
      image: `ipfs://${photoResult.IpfsHash}`
    };
  
    const metadataResult = await pinata.pinJSONToIPFS(nftMetadata); //pinata에 업로드. -> 완료시 아래 코드에서 반환된 IpfsHash 출력. 
    console.log('Metadata uploaded successfully. IPFS Hash:', metadataResult.IpfsHash);


    // 생성된 NFT의 CID와 token URI 설정 .
    const CID = metadataResult.IpfsHash;
    const tokenURI = `ipfs://${metadataResult.IpfsHash}`;
  
    console.log(contract.tokenURI(4));
    // Smart Contract를 사용하여 NFT를 발행. (Mint)
    const mintResult = contract.mintNFT(toAddress, tokenURI) //toAddress-> NFT를 수령할 주소.  tokenURI-> 새로 생성된 NFT에 대한 메타데이터 URI
      .then((result) => {
        res.status(200).json({ tokenId: mintResult, CID: CID, photoCID: photoResult.IpfsHash });
      });
      console.log(mintResult);
  } catch (error) {
    console.error('Error adding to IPFS:', error);
    res.status(400).send(error);
  }
});

module.exports = router;