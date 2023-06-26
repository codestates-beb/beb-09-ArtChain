import React, { useState } from 'react';
import { Header } from '../components/Header';
import styled from '@emotion/styled';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';

const Create = () => {
  return (
    <div>
      <Header />
      <CreatePageWrapper>
        <CreateView>
          <Title>Create New Item</Title>

          <Box>
            <FieldTitle>External URI</FieldTitle>
            <TextField required fullWidth margin="dense" id="image-url"></TextField>

            <FieldTitle>Name</FieldTitle>
            <TextField required fullWidth margin="dense" id="item-name"></TextField>

            <FieldTitle>Description</FieldTitle>
            <TextField
              required
              multiline
              rows={4}
              fullWidth
              margin="dense"
              id="image-description"
            ></TextField>
            <CreateButtonView>
              <Button variant="contained" fullWidth size="large">
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
