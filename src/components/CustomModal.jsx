import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CustomModal = ({
  buttonText,
  modalTitle,
  children,
  isShowButton = true,
  autoShowModal = false,
  color = "primary",
  size = "md",
  action,
  isInfo
}) => {
  const [isOpen, setIsOpen] = useState(autoShowModal);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    isInfo && localStorage.setItem("releaseInfo", "true");
  };

  return (
    <div>
      {isShowButton && (
        <Button color={color} onClick={toggleModal}>
          {buttonText}
        </Button>
      )}
      <Modal size={size} isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader
          style={{
            backgroundColor: "#24a2b7",
            color: "white"
          }}
          toggle={toggleModal}
        >
          {modalTitle}
        </ModalHeader>
        <ModalBody style={{ color: "black" }}>{children}</ModalBody>
        <ModalFooter>
          {action && action()}
          <Button color="secondary" onClick={toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CustomModal;
