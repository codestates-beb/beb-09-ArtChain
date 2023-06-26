import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import WalletIcon from '@mui/icons-material/Wallet';

export const Header = () => {
  return (
    <HeaderView>
      <Logo>
        <Link to="/">
          <img src="/opensea.svg" width={40} height={40} />
        </Link>
        <Title>opensea</Title>
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
        <Link to={`/users/:username`}>
          <Menu>My Page</Menu>
        </Link>
      </MenuView>

      <IconView>
        <WalletIcon />
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
`;
