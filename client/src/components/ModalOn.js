import React from "react";
import { Modal, Button } from "react-bootstrap";
import styled from '@emotion/styled';

const ModalImage = styled.img`
  position: relative;
  margin-left: 0px;
  margin-top: 10px;
  width: 200px;
  height: 200px;
  background-color: gray;
  z-index: 2;
  border-radius: 10%;
`;

const CustomModal = styled(Modal)`
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 50px;
  background-color: #FFFFFF;
  border-radius: 20px;
  border: 5px solid #64A6DF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-weight: bold;
  background-color: transparent;
  border: none;
  color: #333;
  font-size: 24px;
  cursor: pointer;
`;

const NFTName = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #333;
`;

const ModalOn = ({ show, onHide, modalData }) => {
  return (
    <CustomModal show={show} onHide={onHide} centered>
      <ModalContent>
        <CloseButton variant="link" onClick={onHide}>
          &times;
        </CloseButton>
        <ModalImage alt="modal_image" src={modalData?.image_url} />
        <Modal.Body>
          <NFTName>NFT Name: {modalData?.name}</NFTName>
          <Description>Description: {modalData?.description}</Description>
          {/* Add more details or customize the content based on your requirements */}
        </Modal.Body>
      </ModalContent>
    </CustomModal>
  );
};

export default ModalOn;