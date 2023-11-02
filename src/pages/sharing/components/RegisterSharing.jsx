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
import {
  DISCORD_USERS_SEARCH,
  DISCORD_NOTIFICATION,
  SHARING_LIVE,
} from "utils/api/api";
import AsyncSelect from "react-select/async";
import { getSession } from "utils/getSession";
import { sendNotif } from "utils/sendNotif";
import { showToast } from "utils/showToast";
import { motion } from "framer-motion";

const RegisterSharing = ({ theater, setIsRegister, sharingUsers }) => {
  const [modal, setModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggle = () => setModal(!modal);

  const handleRegisterSharingLive = () => {
    axios
      .post(SHARING_LIVE, {
        user_id: getSession()?.userProfile?._id,
        schedule_id: theater._id,
        discord_name: selectedOption?.label,
        discord_image: selectedOption?.avatar,
        phone_number: phoneNumber,
        status: "registered",
        image: getSession()?.profile?.avatar_url,
      })
      .then((res) => {
        toggle();
        setIsRegister(true);
        showToast("success", "Success registered premium live");

        // SEND NOTIF DISCORD
        axios
          .post(DISCORD_NOTIFICATION, {
            name: selectedOption?.label,
            setlist: theater?.setlist?.name,
            orderId: res.data.order_id,
          })
          .then((res) => {
            console.log(res.data);
          });

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
      })
      .catch((err) => {
        showToast("error", err?.response?.data?.error);
      });
  };

  useEffect(() => {
    sharingUsers.map((item) => {
      if (item.user_id._id === getSession()?.userProfile?._id) {
        return setIsRegistered(true);
      }
    });
  }, [sharingUsers]);

  const loadOptions = async (inputValue) => {
    try {
      const response = await axios.get(DISCORD_USERS_SEARCH(inputValue));
      const users = response.data;

      const options = users.map((user) => ({
        label: user.user.global_name ?? user.user.username,
        value: user.user.id,
        avatar: user.user.avatar
          ? `https://cdn.discordapp.com/avatars/${user.user.id}/${user.user.avatar}.png`
          : "https://static.vecteezy.com/system/resources/previews/006/892/625/original/discord-logo-icon-editorial-free-vector.jpg",
      }));

      return options;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return [];
    }
  };

  const formatOptionLabel = ({ label, avatar }) => (
    <div style={{ display: "flex", alignItems: "center", padding: "4px" }}>
      <img
        src={avatar}
        alt="Avatar"
        style={{
          marginRight: "8px",
          borderRadius: "50%",
          width: "24px",
          height: "24px",
        }}
      />
      <div>{label}</div>
    </div>
  );

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
        <motion.div whileTap={{ scale: 0.9 }}>
          <button
            onClick={toggle}
            className="buy d-flex text-align-center justify-content-center align-items-center text-info"
          >
            {isRegistered ? "Pay Ticket " : "Buy Ticket"}
          </button>
        </motion.div>
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
              <AsyncSelect
                id="discord_name"
                placeholder="Search your discord account"
                loadOptions={loadOptions}
                onChange={(selectedOption) => {
                  setSelectedOption(selectedOption);
                }}
                value={selectedOption}
                isClearable={true}
                formatOptionLabel={formatOptionLabel}
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
