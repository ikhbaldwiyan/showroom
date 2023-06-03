import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ServerErrorModal = ({ isOpen, toggle }) => {
  return (
    <Modal style={{ backgroundColor: "red" }} isOpen={isOpen} toggle={toggle}>
      <ModalHeader style={{ backgroundColor: "#dc3545" }} toggle={toggle}>
        Server Error
      </ModalHeader>
      <ModalBody style={{ backgroundColor: "#282c34", textAlign: "center" }}>
        <h5>
          Oops! Something went wrong on the server. if you see this message
          please contact web owner or admin on discord
        </h5>
      </ModalBody>
      <ModalFooter style={{ backgroundColor: "#282c34" }}>
        <Button color="primary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ServerErrorModal;
