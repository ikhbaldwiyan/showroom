import React, { useState } from 'react';
import { RiBroadcastFill } from "react-icons/ri";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const SharingLive = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className="ticket-sharing">
      <div className="menu-ticket">
        <RiBroadcastFill className="mb-2" color="#ECFAFC" size={70} />
        <div className="d-flex flex-column justify-content-center text-center">
          <div className="ticket-name">SHARING</div>
          <p className="setlist-subname mt-2">
            <b>RP. 20.000</b>
          </p>
        </div>
        <button className="buy d-flex text-align-center justify-content-center align-items-center text-info" onClick={toggle}>
          Buy Ticket
        </button>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="modal-title" toggle={toggle}>Buy Ticket Sharing Live</ModalHeader>
        <ModalBody className="text-dark">
          <p>Modal Content Goes Here</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Buy</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default SharingLive;
