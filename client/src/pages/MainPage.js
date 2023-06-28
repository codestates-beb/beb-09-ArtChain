import React, { useEffect, useState } from "react";
import { Header } from '../components/Header';
import styled from '@emotion/styled';
import Pagination from "react-js-pagination";
import { BeatLoader } from "react-spinners";
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import itemList from '../MOCK_DATA.json';
import './Paging.css';

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const WelcomeWords = styled.div`
    margin-top: 20px;
    padding: 20px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    color: black;
    font-size: 40px;
`;

const Centerscreen = styled.div`
    width: 100%;
    height: 900px;
    padding: 1px;
    margin: 0px;
    font-color: white;
`;

const ImageContainer = styled.div`
    width: 100%;
    height: 80%;
    background-image: url("https://www.creativosonline.org/wp-content/uploads/2017/08/gifs-antiguos.gif");
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 20px;
`;

const ListTitle = styled.div`
  font-size: 40px;
  text-align: left;
  margin: 10px;
  font-weight:bold;
  
`;

const RowList = styled.div`
    display: flex;
    justify-content: center;
    margin: 3px;
    width: 100%;
`;

const Span = styled.span`
    display : block;
`;

const NftCard = styled(Card)`
    width: 300px;
    margin: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    box-shadow: 2px 2px 15px -5px;
    border-radius: 5%;
    :hover {
      transform: scale(1.1);
      cursor: pointer;
      }
`;

const PagenationBox = styled.div`
    margin-top: 60px;
    margin-bottom: 50px;
`;


const MainPage = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [nftPage, setPage] = useState(20); // 페이지당 NFT 수

  
  const [items, setItems] = useState([
    {
    index:8,
    nftName:"Meevee",
    photoUrl:"http://dummyimage.com/116x100.png/5fa2dd/ffffff",
    description:"091D0J0"
    },
    {
      index:8,
      nftName:"Leenti",
      photoUrl:"http://dummyimage.com/116x100.png/5fa2dd/ffffff",
      description:"091D0J0"
    },
    {
      index:8,
      nftName:"Cogidoo",
      photoUrl:"http://dummyimage.com/116x100.png/5fa2dd/ffffff",
      description:"091D0J0"
    },
    
    {
      index:13,
      nftName:"Photobug",
      photoUrl:"http://dummyimage.com/116x100.png/5fa2dd/ffffff",
      description:"091D0J0"
    },  
    {
      index:11,
      nftName:"Devpoint",
      photoUrl:"http://dummyimage.com/116x100.png/5fa2dd/ffffff",
      description:"091D0J0"
    },  
    {
      index:9,
      nftName:"Divanoodle",
      photoUrl:"http://dummyimage.com/116x100.png/5fa2dd/ffffff",
      description:"03BA0ZZ"
    },
    {
      index:10,
      nftName:"Quatz",
      photoUrl:"http://dummyimage.com/116x100.png/5fa2dd/ffffff",
      description:"041E4ZQ"
    },
    {
      index:1,
      nftName:"Thoughtsphere",
      photoUrl:"http://dummyimage.com/116x100.png/5fa2dd/ffffff",
      description:"041E4ZQ"
    },
    {
    index:2,
    nftName:"Flipbug",
    photoUrl:"http://dummyimage.com/116x100.png/5fa2dd/ffffff",
    description:"041E4ZQ"
    }
  ]);

  const LastNft = currentPage * nftPage;
  const indexOfFirstNft = LastNft - nftPage;
  const currentNfts = items.slice(indexOfFirstNft, LastNft);

  const [nftList,setList] = useState(itemList);
  console.log(nftList);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  	useEffect(() => {
      setLoading(true);

    	fetch('http://localhost:3000/MainPage', {
     		method: 'GET',
    	})
      	.then(res => res.json())
      	.then(data => {
          setList(data);
          console.log(data);
      	});
        setLoading(false);
	}, []);

  return (
    <Container>
      <div>
          <Header />
      </div>
      <Centerscreen>
        <WelcomeWords>
          <span>Welcome to NFT Market</span>
        </WelcomeWords>
        <ImageContainer />
        <ListTitle>NFT LIST</ListTitle>
      </Centerscreen>
      
      { loading ? (
          <span><BeatLoader color="	#0000CD	" size={100} /></span>
      ) : ( 
      <RowList>
          {currentNfts.map((nft, index) => (
            <NftCard key={index}>
              <CardMedia component="img" image={nft.photoUrl} />
              <CardContent>
                <Typography variant="h5" component="div">
                  {nft.nftName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {nft.description}
                </Typography>
              </CardContent>
            </NftCard>
          ))}
 
      </RowList>
      )}

     <PagenationBox>
        <Pagination
            activePage={nftPage}
            itemsCountPerPage={10}
            totalItemsCount={currentPage}
            pageRangeDisplayed={10}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={handlePageChange}
          />
      </PagenationBox>
    </Container>
    
    
  );
};


export default MainPage;
