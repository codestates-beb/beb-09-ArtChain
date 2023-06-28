import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import styled from '@emotion/styled';
import LogoutIcon from '@mui/icons-material/Logout';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import axios from 'axios';

const MyPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [nftList, setNftList] = useState([
    {
      id: 1,
      nftName: 'NFT 1',
      description: 'This is NFT 1',
      photoUrl: 'https://picsum.photos/200/300',
    },
    {
      id: 2,
      nftName: 'NFT 2',
      description: 'This is NFT 2',
      photoUrl: 'https://picsum.photos/200/300',
    },
    {
      id: 3,
      nftName: 'NFT 3',
      description: 'This is NFT 3',
      photoUrl: 'https://picsum.photos/200/300',
    },
  ]);

  // const [nftList, setNftList] = useState([]);
  // useEffect(() => {
  //   // 서버에서 NFT 목록을 가져옵니다.
  //   axios.get('http://localhost:8080/Owner').then((res) => {
  //     setNftList(res.data);
  //   });
  // }, []);

  const signOut = () => {
    if (typeof window.ethereum !== 'undefined') {
      setIsLoggedIn(false);
      localStorage.setItem('isLoggedIn', '');

      console.log(isLoggedIn);
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
              <LogoutIcon
                onClick={() => {
                  signOut();
                }}
              />
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
  font-size: 48px;
  font-weight: 700;
  display: flex;
  justify-content: flex-start;
`;

const IconView = styled.div`
  margin-left: 20px;
  cursor: pointer;
`;

const RowWrapper = styled.div`
  margin-top: 100px;
`;

const RowTitle = styled.div`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
`;

const NftCard = styled(Card)`
  width: 150px;
  margin: 10px;
`;

const Profile = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
`;

export default MyPage;
