import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { RiBroadcastFill } from "react-icons/ri";
import { Link } from "react-router-dom";
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
import { MESSAGES_BOT, SHARING_LIVE } from "utils/api/api";
import { getSession } from "utils/getSession";
import { sendNotif } from "utils/sendNotif";
import { showToast } from "utils/showToast";

const RegisterSharing = ({ theater, setIsRegister, sharingUsers }) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

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

        // SEND NOTIF ADMIN WEB
        sendNotif({
          userId: getSession()?.userProfile?._id,
          message: `Register sharing live ${
            theater?.setlist?.name
          } tanggal ${moment(theater?.showDate).format(
            "DD MMM YYYY"
          )} dengan order id ${res.data.order_id}`,
          type: "Sharing Live",
        });

        /// SEND NOTIF TO DISCORD SERVER
        const notif = `**@${name}** berhasil register sharing live **${theater?.setlist?.name}** dengan order id **#${res.data.order_id}** silahkan kontak <@&1104077539040825365> untuk info lebih lanjut`;

        axios
          .post(MESSAGES_BOT, {
            type: "sharing",
            messageType: "chat",
            message: notif,
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            showToast("error", "Failed to send discord bot");
          });
      })
      .catch((err) => {
        showToast("error", err?.response?.data?.message);
      });
  };

  useEffect(() => {
    sharingUsers.map((item) => {
      if (item.user_id._id === getSession()?.userProfile?._id) {
        return setIsRegistered(true);
      }
    });
  }, [sharingUsers]);

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
          {isRegistered ? "Pay Ticket " : "Buy Ticket"}
        </button>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="modal-title" toggle={toggle}>
          Buy Ticket Sharing Live
        </ModalHeader>
        <ModalBody className="text-dark">
          {isRegistered ? (
            <p>Please pay sharing live ticket</p>
          ) : getSession()?.session ? (
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
          ) : (
            <p>Login dulu ya untuk daftar sharing live</p>
          )}
        </ModalBody>
        <ModalFooter>
          {!isRegistered && getSession().session && (
            <Button color="primary" onClick={handleRegisterSharingLive}>
              Register Sharing Live
            </Button>
          )}
          {!getSession().session && (
            <Link to="/login">
              <Button color="info">Login Disini</Button>
            </Link>
          )}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RegisterSharing;
