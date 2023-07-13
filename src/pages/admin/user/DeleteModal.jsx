import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button} from "reactstrap";

const DeleteModal = ({ modalDelete, toggleDelete, handleDelete }) => {
  return (
    <Modal isOpen={modalDelete}>
      <ModalHeader
        toggle={toggleDelete}
        className="text-light"
        style={{ backgroundColor: "#DC3545" }}
      >
        Delete User
      </ModalHeader>
      <ModalBody className="text-dark my-2">
        Apakah Anda yakin ingin menghapus user ini ?
      </ModalBody>
      <ModalFooter>
        
        <Button color="info" onClick={() => handleDelete()}>
          Yes
        </Button>
        <Button color="secondary" onClick={() => toggleDelete()}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteModal;
