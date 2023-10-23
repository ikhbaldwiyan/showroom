import axios from "axios";
import React, { useState } from "react";
import { RiBroadcastFill } from "react-icons/ri";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { SHARING_LIVE } from "utils/api/api";
import { getSession } from "utils/getSession";
import { showToast } from "utils/showToast";

const RegisterSharing = ({ theater, setIsRegister }) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const toggle = () => setModal(!modal);

  const handleRegisterSharingLive = () => {
    axios
      .post(SHARING_LIVE, {
        user_id: getSession()?.userProfile?._id,
        schedule_id: theater._id,
        discord_name: name,
        phone_number: phoneNumber,
        status: "registered",
        image: getSession()?.profile?.avatar_url,
      })
      .then((res) => {
        toggle();
        setIsRegister(true);
        showToast("success", "Success registered premium live");
      })
      .catch((err) => {
        showToast("error", err?.response?.data?.message);
      });
  };

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
        <button
          onClick={toggle}
          className="buy d-flex text-align-center justify-content-center align-items-center text-info"
        >
          Buy Ticket
        </button>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="modal-title" toggle={toggle}>
          Buy Ticket Sharing Live
        </ModalHeader>
        <ModalBody className="text-dark">
          <FormGroup>
            <Label className="mt-2" for="discord_name">
              <b>Name</b>
            </Label>
            <Input
              type="text"
              name="discord_name"
              id="discord_name"
              placeholder="username"
              value={getSession()?.profile?.name}
              disabled
            />
            <Label className="mt-2" for="discord_name">
              <b>Discord Name</b>
            </Label>
            <Input
              type="text"
              name="discord_name"
              id="discord_name"
              placeholder="Input your discord name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Label className="mt-2" for="discord_name">
              <b>No Telepon</b>
            </Label>
            <Input
              type="number"
              name="phone_number"
              id="phone_number"
              placeholder="Input no telp"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleRegisterSharingLive}>
            Register Sharing Live
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RegisterSharing;
