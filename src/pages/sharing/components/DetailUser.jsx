import moment from "moment";
import React from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { FaCalendar, FaDiscord } from "react-icons/fa";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";

const DetailUser = ({ isOpen, user, toggleModal }) => {
  return (
    <Modal size="md" isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader
        toggle={toggleModal}
        style={{
          backgroundColor: "#24a2b7",
          color: "white",
        }}
      >
        Detail User
      </ModalHeader>
      <ModalBody style={{ color: "black" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
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
                <FaCalendar className="mr-1" />
                <b>Register Date:</b>
              </p>
              <p>{moment(user?.created_at).format("dddd, DD MMMM HH:mm ")}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <p className="d-flex align-items-center">
                <FaDiscord size={20} className="mr-1" /> <b>Discord:</b>
              </p>
              <p>{user?.discord_name}</p>
            </div>
            <div className="col-md-6">
              <p className="d-flex align-items-center">
                <AiFillInfoCircle size={20} className="mr-1" /> <b>Status:</b>
              </p>
              <Button
                style={{
                  border: "none",
                  backgroundColor:
                    user.status === "paid"
                      ? "#2dce89"
                      : user.status === "cancelled"
                      ? "#DC3545"
                      : user.status === "registered"
                      ? "#ECFAFC"
                      : "gray",
                  color: user.status === "registered" && "#24a2b7",
                  fontWeight: "600"
                }}
              >
                {user?.status?.charAt(0)?.toUpperCase() + user?.status?.slice(1)}
              </Button>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DetailUser;
