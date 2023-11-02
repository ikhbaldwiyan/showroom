import moment from "moment";
import React from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { FaCalendar, FaDiscord, FaUser } from "react-icons/fa";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";

const DetailUser = ({ isOpen, user, toggleModal }) => {
  return (
    <Modal size="md" isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader
        toggle={toggleModal}
        style={{
          background: "#24a2b7",
          color: "white",
        }}
      >
        Detail User
      </ModalHeader>
      <ModalBody style={{ color: "black" }}>
        <div className="row">
          <div className="col-md-6">
            <p className="d-flex align-items-center">
              <FaCalendar className="mr-1" />
              <b>Register Date:</b>
            </p>
            <p style={{ fontWeight: "600", color: "#6B747B" }}>{moment(user?.created_at).format("dddd, DD MMMM HH:mm ")}</p>
          </div>
          <div className="col-md-6">
            <p className="d-flex align-items-center">
              <AiFillInfoCircle size={20} className="mr-1" /> <b>Status:</b>
            </p>
            <Button
              color={
                user.status === "paid"
                  ? "success"
                  : user.status === "cancelled"
                    ? "danger"
                    : user.status === "registered"
                      ? "secondary"
                      : "gray"
              }
            >
              {user?.status?.charAt(0)?.toUpperCase() + user?.status?.slice(1)}
            </Button>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <p className="d-flex align-items-center">
              <FaUser size={18} className="mr-1" /> <b>Showroom Account:</b>
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
                <img width={60} className="mr-2" src={user.image} alt="" />
                <h4 style={{ color: "#ecfafc" }}>{user?.user_id?.name}</h4>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <p className="d-flex align-items-center">
              <FaDiscord size={20} className="mr-1" /> <b>Discord Account:</b>
            </p>
            <div
              className="discord-account"
              style={{
                flexDirection: "none",
                height: "auto",
                marginBottom: "4px",
              }}
            >
              <div className="d-flex align-items-center">
                <img width={60} className="rounded mr-2" src={user.discord_image ?? "https://static.vecteezy.com/system/resources/previews/006/892/625/original/discord-logo-icon-editorial-free-vector.jpg"} alt="" />
                <h4 style={{ color: "#ecfafc" }}>{user?.discord_name}</h4>
              </div>

            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DetailUser;
