import React from "react";
import { Modal, Button } from "react-bootstrap";
import styled from '@emotion/styled';

const ModalImage = styled.img`
    position: relative;
    margin-left:10px;
    margin-top:10px;
    width: 400px;
    height 400px;
    background-color: gray;
    z-index: 2;
    border-radius: 10%;
`;

const ModalOn = ( { show, onHide} ) =>{
    return (
        <Modal show={show} onHide={onHide}>
          <Modal.Header closeButton>
            {/* <ModalImage alt="modal_image" src={show.image_url} /> */}
          </Modal.Header>
          <Modal.Body>
            <p>Modal body text goes here.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
            <Button variant="primary" onClick={onHide}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
    );
  };
    

  export default ModalOn