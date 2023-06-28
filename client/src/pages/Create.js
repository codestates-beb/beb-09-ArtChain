import React, { useState } from 'react';
import { Header } from '../components/Header';
import styled from '@emotion/styled';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';

const Create = () => {
  const [photoUrl, setPhotoUrl] = useState('');
  const [nftName, setNftName] = useState('');
  const [description, setDescription] = useState('');

  const toAddress = localStorage.getItem('isLoggedIn');

  function handleCreate() {
    // 입력받은 값을 서버로 보냅니다.
    axios
      .post(
        'http://localhost:8080/mint',
        {
          photoUrl,
          nftName,
          description,
          toAddress,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <Header />
      <CreatePageWrapper>
        <CreateView>
          <Title>Create New Item</Title>

          <Box>
            <FieldTitle>External URL</FieldTitle>
            <TextField
              required
              fullWidth
              margin="dense"
              id="image-url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            ></TextField>

            <FieldTitle>Name</FieldTitle>
            <TextField
              required
              fullWidth
              margin="dense"
              id="item-name"
              value={nftName}
              onChange={(e) => setNftName(e.target.value)}
            ></TextField>

            <FieldTitle>Description</FieldTitle>
            <TextField
              required
              multiline
              rows={4}
              fullWidth
              margin="dense"
              id="image-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></TextField>
            <CreateButtonView>
              <Button variant="contained" fullWidth size="large" onClick={handleCreate}>
                Create
              </Button>
            </CreateButtonView>
          </Box>
        </CreateView>
      </CreatePageWrapper>
    </div>
  );
};

export default Create;

const CreatePageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const CreateView = styled.div`
  width: 100%;
  max-width: 640px;
  padding: 24px;
  text-align: left;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 800;
  margin-top: 32px;
`;

const FieldTitle = styled.div`
  font-size: 18px;
  font-weight: 800;
  margin-top: 20px;
  margin-bottom: 4px;
`;

const CreateButtonView = styled.div`
  margin-top: 16px;
`;
