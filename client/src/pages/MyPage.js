import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import styled from '@emotion/styled';
import LogoutIcon from '@mui/icons-material/Logout';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import axios from 'axios';

const MyPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [nftList, setNftList] = useState([]);

  const toAddress = localStorage.getItem('isLoggedIn');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') !== '';
    setIsLoggedIn(isLoggedIn);
  }, []);

  useEffect(() => {
    axios
      .get(`https://testnets-api.opensea.io/api/v1/assets?owner=${toAddress}`)
      .then((res) => {
        setNftList(res.data.assets);
        console.log(res.data.assets);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get('https://testnets-api.opensea.io/api/v1/assets?limit=100')
  //     .then((res) => {
  //       setNftList(res.data.assets);
  //       console.log(res.data.assets);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  const logOut = () => {
    if (typeof window.ethereum !== 'undefined') {
      const confirmed = window.confirm('로그아웃 하시겠습니까?');
      if (confirmed) {
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', '');
        //console.log(isLoggedIn);
        window.location.reload();
      }
    }
  };

  return (
    <div>
      <Header />
      <ProfileWrapper>
        <ProfileView>
          <ProfileTitle>
            My Page
            <IconView>
              <LogoutIcon onClick={logOut} />
            </IconView>
          </ProfileTitle>

          <Profile>
            {localStorage.getItem('isLoggedIn') == ''
              ? ''
              : localStorage.getItem('isLoggedIn')}
          </Profile>
        </ProfileView>
      </ProfileWrapper>

      <RowWrapper>
        <RowTitle>My NFTs</RowTitle>
        <Row>
          {nftList.map((nft, index) => (
            <NftCard key={index}>
              <NftImage component="img" image={nft.image_url} />
              <CardContent>
                <Typography variant="h8" fontWeight="500" component="div">
                  {nft.name}
                </Typography>
              </CardContent>
            </NftCard>
          ))}
        </Row>
      </RowWrapper>
    </div>
  );
};

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 100px;
  margin-left: 100px;
`;

const ProfileView = styled.div`
  max-width: 600px;
`;

const ProfileTitle = styled.div`
  font-size: 38px;
  font-weight: 700;
  display: flex;
  justify-content: flex-start;
`;

const IconView = styled.div`
  margin-left: 40px;
  cursor: pointer;
  transform: scale(1.5);
`;

const RowWrapper = styled.div`
  margin-top: 100px;
`;

const RowTitle = styled.div`
  font-size: 38px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const NftCard = styled(Card)`
  width: 180px;
  height: 180px;
  margin: 10px;
  overflow-y: auto;
  cursor: pointer;
`;

const Profile = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
`;

const NftImage = styled(CardMedia)`
  width: 180px;
  height: 110px;
`;

export default MyPage;
