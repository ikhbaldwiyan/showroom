import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { USER_PROFILE } from "utils/api/api";

export default function UserProfile({ data }) {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState([]);
  const toggle = () => setModal(!modal);

  const handleLogOut = () => {
    toggle();
    var theme = localStorage.getItem("theme");
    localStorage.clear();
    localStorage.setItem("theme", theme);
    toast.success("Logout success", {
      theme: "colored",
      autoClose: 1200,
    });
    setTimeout(() => {
      window.location.reload(false);
    }, 2000);
  };

  useEffect(() => {
    async function getUser() {
      await axios.get(USER_PROFILE(data.user_id)).then((res) => {
        setUser(res.data);
      });
    }
    getUser();
  }, [data.user_id]);

  return (
    <>
      <a type="button" onClick={toggle}>
        <li className="row mx-2 button-dropdown mt-1">
          <img
            src={
              user.avatar_url ??
              "https://static.showroom-live.com/assets/img/no_profile.jpg"
            }
            alt="profile"
            style={{ width: "2.2rem", height: "2.2rem" }}
            className="rounded-circle"
          />{" "}
          <div className="col ml-2 profile-link">
            <span
              className="row d-inline-block text-truncate"
              style={{ maxWidth: "5rem", fontSize: ".9rem" }}
            >
              <b>{user?.name ?? "User"}</b>
            </span>
            <span
              className="row"
              style={{ lineHeight: "0px", fontSize: ".8rem" }}
            >
              Level {user?.fan_level ?? "0"}
            </span>
          </div>
        </li>
      </a>

      <Modal isOpen={modal}>
        <ModalHeader
          style={{ backgroundColor: "#24a2b7", color: "white" }}
          toggle={toggle}
        >
          Apakah anda ingin Logout ?
        </ModalHeader>
        <ModalBody className="text-dark my-2 justify-content-center">
          <img
            src={
              user.image ??
              "https://static.showroom-live.com/assets/img/no_profile.jpg"
            }
            width="100px"
            alt="profile"
            className="rounded-circle"
          />{" "}
          <img
            width="100px"
            src={
              user.avatar_url ??
              "https://static.showroom-live.com/image/avatar/1.png?v=92"
            }
            alt="avatar"
            className="rounded-circle"
          />{" "}
          <div className="py-3">
            {console.log(user)}
            <p><b>Account ID</b>: {data.account_id}</p>
            <p><b>Nickname</b>: {user.name}</p>
            <p><b>About me:</b> {user.description}</p>
            <p><b>Level:</b> {user.fan_level}</p>
          </div>
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
