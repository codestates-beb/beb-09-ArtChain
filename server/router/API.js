
const pinataSDK = require('@pinata/sdk');
const { response } = require('express');
const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET);

const getDataFromCID = (cid,photoCID) => {

const ipfsGateway = "https://ipfs.io/ipfs/"; // 사용할 IPFS Gateway URL

const dataUrl = `${ipfsGateway}${cid}`;
const photoUrl = `${ipfsGateway}${photoCID}`;

function fetchData(url) {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      throw new Error('Failed to fetch data from URL');
    });
}

function getData() {
  let data1, photoData;

  return fetchData(dataUrl)
    .then((data) => {
      console.log(data);
      data1 = data;
      return fetchData(photoUrl);
    })
    .then((data) => {
      console.log(data);
      photoData = data;

      const dataObject = {
        name: data1.name,
        description: data1.description,
        image: photoData.url
      };

      console.log(dataObject);
      return dataObject;
    })
    .catch((error) => {
      console.error(error);
      throw new Error('Failed to get data');
    });
}

const data = getData()
  .then((dataObject) => {
    console.log('Data Object:', dataObject);
  })
  .catch((error) => {
    console.error(error);
  });

return data; 
}

module.exports = getDataFromCID;


