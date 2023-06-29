import React, { useEffect, useState } from "react";
import { Header } from '../components/Header';
import styled from '@emotion/styled';
import Pagination from "react-js-pagination";
import { BeatLoader } from "react-spinners";
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import './Paging.css';
import axios from 'axios';
import ModalOn from "../components/ModalOn";

const Container = styled.div`
    display: flex;
    flex-direction:column;
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
    border-radius: 10px;
`;

const ListTitle = styled.div`
  font-size: 40px;
  text-align: left;
  margin: 10px;
  font-weight:bold;

`;

const RowList = styled.div`
   display: grid;
    grid-template-columns: repeat(6, 1fr);
    flex-direction: column;
    flex-wrap: wrap;
    gap: 10px;
    height: 500px;
`;

const Span = styled.span`
   display : block;
`;

const NftCard = styled(Card)`
   width: 250px;
    height: 250px;
    margin: 10px;
    cursor: pointer;
    display: flex;
    flex:2px;
    flex-direction: column;
    box-shadow: 2px 2px 15px -5px;
    border-radius: 5%;
    :hover {
      transform: scale(1.1);
      cursor: pointer;
      }
`;

//추가 한 부분 . 
const NftImage = styled(CardMedia)`
    height: 80%;
`;

const NftContent = styled(CardContent)`
    display: flex;
    flex-direction: column;
    height:20%;
`;
const NftName = styled(Typography)`
    font-size: 16px;
    font-weight: bold;
`;

const NftDescription = styled(Typography)`
    font-size: 14px;
`;

const NftPlaceholder = styled.div`
    height: 80%; // 이미지가 없는 경우도 같은 높이를 유지하기 위해 이미지 영역의 높이를 70%로 설정
    background-color: #f0f0f0; // 이미지가 없는 경우를 대비하여 임시로 사용할 배경색
`;

const NftCardContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`;


const PagenationBox = styled.div`
  margin-top: 60px;
    margin-bottom: 50px;
    right: 0px; bottom: 0px;
`  ;

const MainPage = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [modalOn, setModalOn] = useState(false);
  const [modalData, setModalData] = useState("");

  const handleNftClicked = (nft) => {
    setModalOn(true);
    setModalData(nft);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        'https://testnets-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=100&order_by=sale_count'
      )
      .then((res) => {
        setLoading(false);
        setItems(res.data.assets);
        console.log(res.data.assets);
      })
      .catch((error) => {
        console.error(error);
        
      });
  }, []);
  useEffect(() => {
    const startIndex = (currentPage - 1) * 12;
    const endIndex = startIndex + 12;
    const displayed = items.slice(startIndex, endIndex);
    setDisplayedItems(displayed);
  }, [currentPage, items]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  return (
    <Container>
      <ModalOn show={modalOn} onHide={() => setModalOn(false)} />
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
      
      {loading ? (
        <span><BeatLoader color="#0000CD" size={100} /></span>
        ) : (
        <RowList >
          {displayedItems?.map((nft, index) => (
             <NftCard key={index} onClick={handleNftClicked(()=>handleNftClicked(nft))}>
               {/* <NftCard key={index} onClick={()=>setModalOn(true)}>  */}
              {nft.image_url ? ( // 이미지 URL이 있는 경우
                <NftImage component="img" image={nft.image_url}  />
              ) : ( // 이미지 URL이 없는 경우
                <NftPlaceholder />
              )}
              <NftContent>
                <NftName variant="h5" component="div">
                  {nft.names}
                </NftName>
                <NftDescription variant="body2" color="text.secondary">
                  {nft.description}
                </NftDescription>
              </NftContent>
            </NftCard>
            
          ))}
        </RowList>
      )}
      <PagenationBox>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={12}
          totalItemsCount={items.length}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}
        />
      </PagenationBox>

        {modalOn && (
          <ModalOn
              modalData={modalData}
              modalOn={setModalOn}
          />
        )}
    </Container>

  );
};


export default MainPage;