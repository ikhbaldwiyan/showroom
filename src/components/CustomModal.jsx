import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CustomModal = ({
  buttonText,
  modalTitle,
  children,
  isShowButton = true,
  autoShowModal = false,
}) => {
  const [isOpen, setIsOpen] = useState(autoShowModal);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {isShowButton && (
        <Button color="primary" onClick={toggleModal}>
          {buttonText}
        </Button>
      )}
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader
          style={{
            backgroundColor: "#24a2b7",
            color: "white",
          }}
          toggle={toggleModal}
        >
          {modalTitle}
        </ModalHeader>
        <ModalBody style={{ color: "black" }}>{children}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CustomModal;
