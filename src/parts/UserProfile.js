import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { USER_PROFILE } from "utils/api/api";

export default function UserProfile({ data, profile }) {
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
      <div type="button" onClick={toggle}>
        <li className="row mx-2 button-dropdown mt-1">
          <img
            src={
              profile.avatar_url ??
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
              <b>{profile?.name ?? "User"}</b>
            </span>
            <span
              className="row"
              style={{ lineHeight: "0px", fontSize: ".8rem" }}
            >
              Level {profile?.fan_level ?? "0"}
            </span>
          </div>
        </li>
      </div>

      <Modal isOpen={modal}>
        <ModalHeader
          style={{ backgroundColor: "#24a2b7", color: "white" }}
          toggle={toggle}
        >
          Apakah anda ingin Logout ?
        </ModalHeader>
        <ModalBody classNameName="text-dark my-2 justify-content-center">
          <div className="container py-2">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col mb-4 mb-lg-0" style={{ color: "#282c34" }}>
                <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                  <div className="row">
                    <div
                      className="col-md-4 gradient-custom text-center text-white"
                      style={{
                        borderTopLeftRadius: ".5rem",
                        borderBottomLeftRadius: ".5rem",
                        color: "#282c34",
                        backgroundColor: "#24a2b7",
                      }}
                    >
                      <h5 className="mt-3">Profile</h5>
                      <p>ID : {data.account_id}</p>
                      <img
                        src={
                          user.image ??
                          "https://static.showroom-live.com/assets/img/no_profile.jpg"
                        }
                        alt="Profile"
                        className="img-fluid mb-3 rounded-circle"
                        style={{ width: "80px" }}
                      />
                      <h5 className="py-3">Avatar</h5>
                      <img
                        src={
                          user.avatar_url ??
                          "https://static.showroom-live.com/image/avatar/1.png?v=92"
                        }
                        alt="Avatar"
                        className="img-fluid mb-3 rounded-circle"
                        style={{ width: "80px" }}
                      />
                      <i className="far fa-edit mb-5"></i>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body p-4">
                        <h6>Information</h6>
                        <hr className="mt-0 mb-4" />
                        <div className="row pt-1">
                          <div className="col-6 mb-3">
                            <h6>Name</h6>
                            <p className="text-muted">{user.name}</p>
                          </div>
                          <div className="col-6 mb-3">
                            <h6>Level</h6>
                            <p className="text-muted">{user.fan_level}</p>
                          </div>
                        </div>
                        <h6>About Me</h6>
                        <hr className="mt-0 mb-4" />
                        <div className="row pt-1">
                          <div className="col-12 mb-3">
                            <p className="text-muted">{user.description}</p>
                          </div>
                          
                        </div>
                        <div className="d-flex justify-content-start">
                          <a href="#!">
                            <i className="fab fa-facebook-f fa-lg me-3"></i>
                          </a>
                          <a href="#!">
                            <i className="fab fa-twitter fa-lg me-3"></i>
                          </a>
                          <a href="#!">
                            <i className="fab fa-instagram fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
