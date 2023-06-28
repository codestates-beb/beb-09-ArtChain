

const options = {method: 'GET'};

const testNetNFTs = fetch('https://testnets-api.opensea.io/api/v1/collections?offset=0&limit=50', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

