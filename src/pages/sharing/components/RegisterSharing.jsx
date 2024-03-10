import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { RiBroadcastFill, RiSlideshow3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  UncontrolledAlert,
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
import PayTicket from "./PayTicket";
import {
  FaCalendarAlt,
  FaDiscord,
  FaRegClock,
  FaTheaterMasks,
  FaUser,
} from "react-icons/fa";

const RegisterSharing = ({ theater, setIsRegister, sharingUsers }) => {
  const [modal, setModal] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [orderStatus, setOrderStatus] = useState("");
  const profile = getSession()?.profile;

  const toggle = () => setModal(!modal);

  useEffect(() => {
    if ((orderStatus === "registered") || (orderStatus === "paid")) {
      setModal(true)
    } 
  }, [orderStatus])

  const handleRegisterSharingLive = () => {
    axios
      .post(SHARING_LIVE, {
        user_id: getSession()?.userProfile?._id,
        schedule_id: theater._id,
        discord_name: selectedOption?.label,
        discord_image: selectedOption?.avatar,
        status: "registered",
        image: getSession()?.profile?.avatar_url,
        setlist_name: theater?.setlist?.name,
        user_name: profile?.name,
        date_schedule: theater?.showDate,
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
            type: "register",
            sharingId: res?.data?._id
          })
          .then((res) => {
            // show payment instruction
            setModal(true);
          });
      })
      .catch((err) => {
        showToast("error", err?.response?.data?.error);
      });
  };

  useEffect(() => {
    sharingUsers.map((item) => {
      if (item.user_id._id === getSession()?.userProfile?._id) {
        setIsRegistered(true);
        setOrderStatus(item?.status);
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
            {isRegistered && orderStatus === "registered"
              ? "Pay Ticket"
              : orderStatus === "paid"
              ? "Purchased"
              : "Buy Ticket"}
          </button>
        </motion.div>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="modal-title" toggle={toggle}>
          {isRegistered && orderStatus === "registered"
            ? "Bayar"
            : orderStatus === "paid"
            ? "Info"
            : "Buy"}{" "}
          Ticket
        </ModalHeader>
        <ModalBody className="text-dark">
          {isRegistered ? (
            <PayTicket theater={theater} orderStatus={orderStatus} sharingUsers={sharingUsers} />
          ) : getSession()?.session ? (
            <FormGroup>
              <div className="row">
                <div className="col-md-6">
                  <p className="d-flex align-items-center">
                    <FaUser size={16} className="mr-1" />{" "}
                    <b>Showroom Account</b>
                  </p>
                  <div
                    className="ticket-sharing"
                    style={{
                      flexDirection: "none",
                      height: "auto",
                      marginBottom: "6px",
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <img
                        width={60}
                        className="mr-2"
                        src={profile.avatar_url}
                        alt=""
                      />
                      <h4 style={{ color: "#ecfafc" }}>{profile?.name}</h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <p className="d-flex align-items-center">
                    <RiSlideshow3Fill size={20} className="mr-1" />{" "}
                    <b>Show Theater</b>
                  </p>
                  <div
                    style={{
                      flexDirection: "none",
                      height: "auto",
                      marginBottom: "6px",
                    }}
                  >
                    <div className="d-flex flex-column">
                      <div className="d-flex">
                        <FaTheaterMasks
                          color="#18a2b8"
                          className="mb-2 mr-1"
                          size={18}
                        />
                        <h6 className="text-info">{theater?.setlist?.name}</h6>
                      </div>
                      <div className="d-flex mt-1">
                        <FaCalendarAlt className="mb-2 mr-1" size={18} />
                        {moment(theater?.showDate).format("DD MMM YYYY")}
                      </div>
                      <div className="d-flex mt-1 align-items-center">
                        <FaRegClock className="mr-1" size={18} />
                        {theater?.showTime} WIB
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <Label className="mt-2" for="discord_name">
                <b>Discord Account</b>
              </Label>
              <AsyncSelect
                id="discord_name"
                placeholder="Search your discord account"
                defaultOptions
                loadOptions={loadOptions}
                onChange={(selectedOption) => {
                  setSelectedOption(selectedOption);
                }}
                value={selectedOption}
                isClearable={true}
                formatOptionLabel={formatOptionLabel}
              />
            </FormGroup>
          ) : (
            <p>Login dulu ya untuk daftar sharing live</p>
          )}
          {orderStatus === "" && (
            <UncontrolledAlert color="primary">
              <FaDiscord size="23px" className="mb-1 mr-2" />
              <span className="discord-text">
                Pastikan sudah join server discord ya
              </span>
              <a
                href={process.env.REACT_APP_DISCORD_LINK}
                target="_blank"
                rel="noreferrer"
              >
                <b className="mx-1 discord-text">JOIN</b>
              </a>
            </UncontrolledAlert>
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
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RegisterSharing;
