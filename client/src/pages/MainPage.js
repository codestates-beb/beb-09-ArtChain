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
display: block;
`;


const NftCard = styled(Card)`
width: 210px;
height: 210px;
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


const NftImage = styled(CardMedia)`
height: 100%;
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
height: 80%;
background-color: #f0f0f0;
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
right: 0px;
bottom: 0px;
`;


const CategoryButtons = styled.div`
display: flex;
justify-content: flex-start;
margin-top: 20px;
margin-left: 10px;
`;


const CategoryButton = styled.button`
background-color: ${(props) => (props.active ? "#555" : "#eee")};
color: ${(props) => (props.active ? "#fff" : "#000")};
border: none;
border-radius: 5px;
padding: 10px 20px;
margin-right: 10px;
cursor: pointer;
font-size: 16px;
font-weight: bold;
outline: none;
`;


const MainPage = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState(1);
  const [modalData, setModalData] = useState(null);
  // 팝업 모달을 위한 스타일 추가
  const [modalWidth, setModalWidth] = useState("70%"); // 팝업 모달의 너비 설정
  const [modalHeight, setModalHeight] = useState("70%"); // 팝업 모달의 높이 설정






  // 팝업 모달 스타일을 동적으로 계산하는 함수
  const calculateModalStyle = () => {
    // 현재 창의 너비와 높이 가져오기
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;


    // 팝업 모달의 너비와 높이 계산
    const calculatedWidth = (windowWidth * parseInt(modalWidth)) / 100;
    const calculatedHeight = (windowHeight * parseInt(modalHeight)) / 100;


    // 스타일 객체 반환
    return {
      width: `${calculatedWidth}px`,
      height: `${calculatedHeight}px`,
    };
  };




  useEffect(() => {
    // 창 크기 변경 시 팝업 모달 스타일 업데이트
    const handleResize = () => {
      const updatedStyle = calculateModalStyle();
      setModalWidth(updatedStyle.width);
      setModalHeight(updatedStyle.height);
    };


    window.addEventListener("resize", handleResize);


    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  useEffect(() => { //axios로 변경하자.
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://testnets-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=100&order_by=sale_count'
          // `https://testnets-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=100&order_by=sale_count&category=art`


        );
        setItems(response.data.assets);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    const filteredItems = items.filter((nft) => {
      if (activeCategory === 1) {
        return true;
      }


      console.log(nft.id);
      if (nft.id % activeCategory === 0) {
        return true;
      }
    });
    const startIndex = (currentPage - 1) * 12;
    const endIndex = startIndex + 12;
    const displayed = filteredItems.slice(startIndex, endIndex);
    setDisplayedItems(displayed);
  }, [currentPage, items, activeCategory]);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };


  const handleNftClicked = (nft) => {
    setModalData(nft);
  };


  return (
    <Container>
      <ModalOn
        show={Boolean(modalData)}
        onHide={() => setModalData(null)}
        modalData={modalData}
        modalStyle={calculateModalStyle()} // 팝업 모달 스타일 전달
      />


      <Header />
      <Centerscreen>
        <WelcomeWords>
          <span>Welcome to NFT Market</span>
        </WelcomeWords>
        <ImageContainer />
        <div style={{ display: "flex", alignItems: "center" }}>
          <ListTitle>NFT LIST</ListTitle>
          <CategoryButtons>
            <CategoryButton
              active={activeCategory === "All"}
              onClick={() => handleCategoryChange(1)}
            >
              All
            </CategoryButton>
            <CategoryButton
              active={activeCategory === "ART"}
              onClick={() => handleCategoryChange(2)}
            >
              ART
            </CategoryButton>
            <CategoryButton
              active={activeCategory === "Gaming"}
              onClick={() => handleCategoryChange(3)}
            >
              Gaming
            </CategoryButton>
            <CategoryButton
              active={activeCategory === "Membership"}
              onClick={() => handleCategoryChange(5)}
            >
              Membership
            </CategoryButton>
            <CategoryButton
              active={activeCategory === "PFPS"}
              onClick={() => handleCategoryChange(7)}
            >
              PFPS
            </CategoryButton>
            <CategoryButton
              active={activeCategory === "Photography"}
              onClick={() => handleCategoryChange(11)}
            >
              Photography
            </CategoryButton>
            <CategoryButton
              active={activeCategory === "Music"}
              onClick={() => handleCategoryChange(13)}
            >
              Music
            </CategoryButton>
          </CategoryButtons>
        </div>
      </Centerscreen>
      {loading ? (
        <NftCardContainer>
          <BeatLoader color="#0000CD" size={100} />
        </NftCardContainer>
      ) : (
        <RowList>
          {displayedItems.map((nft, index) => (
            <NftCard key={index} onClick={() => handleNftClicked(nft)}>


              {nft.image_url ? (
                <NftImage component="img" image={nft.image_url} />
              ) : (
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
    </Container>
  );
};


export default MainPage;