import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import WalletIcon from '@mui/icons-material/Wallet';
import CreateIcon from '@mui/icons-material/Create';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';

import Web3 from 'web3';

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [web3, setWeb3] = useState();

  const [account, setAccount] = useState('');

  const [searchTerm, setSearchTerm] = useState('');

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
        window.location.reload();
        console.log(isLoggedIn);
      })

      .catch((e) => console.log(e));
  };

  const handleSearch = () => {
    console.log(`Searching for ${searchTerm}`);

    axios
      .post('/Search', { searchTerm })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
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
          onInputChange={(e, value) => setSearchTerm(value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
      </SearchView>

      <IconView>
        <Link to={'/create'}>
          <CreateIcon />
        </Link>
      </IconView>
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

const IconView = styled.div`
  margin-left: 20px;
  cursor: pointer;
`;
