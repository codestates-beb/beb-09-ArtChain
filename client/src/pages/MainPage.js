import React, { useState } from "react";
import { Header } from '../components/Header';
import styled from '@emotion/styled';
import dummy from "../data.json";
import Pagination from "react-js-pagination";
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

const List_day = styled.div`
display: flex;
justify-content: center;
margin: 3px;
width: 100%;
`;


const MainPage = () => {
  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
  };

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
     
      <List_day>
        {dummy.infoDummyList.map(el => (
          <div key={el.id}> {el.name} </div> 
            
        ))};
        <Pagination
            activePage={page}
            itemsCountPerPage={10}
            totalItemsCount={450}
            pageRangeDisplayed={10}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={handlePageChange}
          />
      </List_day>
      
    </Container>
    
    
  );
};


export default MainPage;
