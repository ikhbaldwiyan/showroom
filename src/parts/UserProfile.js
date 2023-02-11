import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function UserProfile({ profile, user }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleLogOut = () => {
    toggle();
    var theme = localStorage.getItem("theme");
    localStorage.clear();
    localStorage.setItem("theme", theme);
    toast.success("Logout success", {
      theme: "colored"
    });
    setTimeout(() => {
      window.location.reload(false);
    }, 2000);
  };

  return (
    <>
      <a type="button" onClick={toggle}>
        <li className="row mx-2 button-dropdown mt-1">
          <img
            src={profile.avatar_url}
            alt="profile"
            style={{ width: "2.2rem", height: "2.2rem" }}
            className="rounded-circle"
          />{" "}
          <div className="col ml-2 profile-link">
            <span
              className="row d-inline-block text-truncate"
              style={{ maxWidth: "5rem", fontSize: ".9rem" }}
            >
              <b>{profile.name}</b>
            </span>
            <span
              className="row"
              style={{ lineHeight: "0px", fontSize: ".8rem" }}
            >
              Level {profile.fan_level}
            </span>
          </div>
        </li>
      </a>

      <Modal isOpen={modal}>
        <ModalHeader
          style={{ backgroundColor: "#24a2b7", color: "white" }}
          toggle={toggle}
        >
          Log Out
        </ModalHeader>
        <ModalBody className="text-dark my-2">
          Apakah Anda yakin ingin logout ?
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            No
          </Button>
          <Button color="info" onClick={handleLogOut}>
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
