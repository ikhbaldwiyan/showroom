import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ModalSorry = ({ isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader style={{ backgroundColor: "#dc3545" }} toggle={toggle}>
        Alert
      </ModalHeader>
      <ModalBody style={{ backgroundColor: "#282c34" }}>
        Maaf untuk menghemat bandwidth server, hanya member yang terdaftar di grup discord yang
        bisa akses fitur ini
      </ModalBody>
      <ModalFooter style={{ backgroundColor: "#282c34" }}>
        <Button color="primary" onClick={toggle}>
          OK
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalSorry;
