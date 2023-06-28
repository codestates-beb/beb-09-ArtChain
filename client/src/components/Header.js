import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import WalletIcon from '@mui/icons-material/Wallet';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Web3 from 'web3';

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [web3, setWeb3] = useState();

  const [account, setAccount] = useState('');

  useEffect(() => {
    const loggedInAccount = localStorage.getItem('isLoggedIn');

    if (loggedInAccount) {
      setIsLoggedIn(true);
      setAccount(loggedInAccount);
    }

    if (typeof window.ethereum !== 'undefined') {
      try {
        const web = new Web3(window.ethereum);
        setWeb3(web);
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const connectWallet = async () => {
    await window.ethereum
      .request({
        method: 'eth_requestAccounts',
      })
      .then((res) => {
        setAccount(res[0]);
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', res[0]);

        console.log(isLoggedIn);
      })

      .catch((e) => console.log(e));
  };

  return (
    <HeaderView>
      <Logo>
        <Link to="/">
          <img src="/opensea.svg" width={40} height={40} />
        </Link>
        <Title>ArtChain</Title>
      </Logo>

      <SearchView>
        <Autocomplete
          renderInput={(params) => (
            <TextField {...params} label={'Search items, collections, and accounts'} />
          )}
          options={[]}
        />
      </SearchView>

      <MenuView>
        <Link to="/market">
          <Menu>Market</Menu>
        </Link>
        <Link to="/create">
          <Menu>Create</Menu>
        </Link>
      </MenuView>

      <IconView>
        <Link to={`/users/:username`}>
          <AccountCircleIcon />
        </Link>
      </IconView>
      <IconView>
        <WalletIcon
          onClick={() => {
            connectWallet();
          }}
        />
      </IconView>
    </HeaderView>
  );
};

const HeaderView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-left: 10px;
`;

const SearchView = styled.div`
  flex: 1;
  margin-left: 20px;
`;

const MenuView = styled.div`
  display: flex;
  flex-direction: row;
`;

const Menu = styled.div`
  margin-left: 20px;
  font-size: 16px;
  font-weight: 700;
`;

const IconView = styled.div`
  margin-left: 20px;
  cursor: pointer;
`;
