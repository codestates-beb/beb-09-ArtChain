import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import Web3 from 'web3';
import styled from '@emotion/styled';
import LogoutIcon from '@mui/icons-material/Logout';
import { NftImg, NftName } from './Market';

const MyPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [nftList, setNftList] = useState([]);

  let contractAddr = '0x0DcF7226741313910935048A5ddAF110c6146526';

  const userAddr = localStorage.getItem('isLoggedIn');

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
          <RowItems>
            {nftList?.map((i, idx) => (
              <RowPic key={idx} style={{ backgroundColor: 'beige' }}>
                {/*<NftImg src={i.tokenURI} />
                <NftName>{i.title}</NftName> */}
              </RowPic>
            ))}
          </RowItems>
        </Row>
      </RowWrapper>
    </div>
  );
};

export default MyPage;

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

const Profile = styled.div`
  margin-top: 24px;
  font-size: 20px;
  font-weight: 500;
  max-width: 350px;
`;

const IconView = styled.div`
  margin-left: 20px;
  cursor: pointer;
`;

const RowWrapper = styled.div`
  margin-top: 100px;
  margin-left: 100px;
`;

const RowTitle = styled.div`
  font-size: 48px;
  font-weight: 700;
  display: flex;
  justify-content: flex-start;
`;

const Row = styled.div`
  margin-top: 24px;
  font-size: 20px;
  font-weight: 500;
  max-width: 350px;
`;

const RowItems = styled.div`
  margin-top: 24px;
  font-size: 20px;
  font-weight: 500;
  max-width: 350px;
`;

const RowPic = styled.div`
  margin-top: 24px;
  font-size: 20px;
  font-weight: 500;
  max-width: 350px;
  width: 300px;
  height: 300px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
