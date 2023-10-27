import axios from "axios";
import { Loading } from "components";
import EditAvatar from "components/EditAvatar";
import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaUserCheck,
  FaUserEdit,
  FaUsers,
  FaUsersCog,
  FaWindowClose,
} from "react-icons/fa";
import { isMobile } from "react-device-detect";
import { RiBroadcastFill, RiLogoutBoxFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { clearFollowedRoom } from "redux/actions/roomFollowed";
import {
  DETAIL_USER,
  PREMIUM_LIVE_TODAY,
  UPDATE_PROFILE,
  USER_PROFILE,
} from "utils/api/api";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import {
  clearProfile,
  getUserLoad,
  getUserSuccess,
} from "redux/actions/userActions";
import { Link } from "react-router-dom";
import { activityLog } from "utils/activityLog";
import { showToast } from "utils/showToast";

export default function UserProfile({ data, session, theme }) {
  const [modal, setModal] = useState(false);
  const [modalLogout, setModalLogout] = useState(false);
  const [user, setUser] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditAvatar, setIsEditAvatar] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [userPermisions, setUserPermisions] = useState();

  const toggle = () => setModal(!modal);
  const toggleLogout = () => setModalLogout(!modalLogout);

  const navigate = useHistory();
  const dispatch = useDispatch();

  const [profile, setProfile] = useState({
    csrf_token: "",
    cookies_id: "",
    residence: "",
    user_id: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    const userProfile = localStorage.getItem("profile");
    const foundProfile = JSON.parse(userProfile);
    userProfile && setProfile(foundProfile);
  }, [isEditAvatar]);

  const handleChange = (event) => {
    setProfile({
      ...profile,
      csrf_token: session.csrf_token,
      cookies_id: session.cookie_login_id,
      residence: 48,
      [event.target.name]: event.target.value,
    });
  };

  const updateProfile = async (event) => {
    setIsLoading(!loading);
    event.preventDefault();
    try {
      const response = await axios.post(UPDATE_PROFILE, profile);
      if (response) {
        localStorage.setItem("profile", JSON.stringify(profile));
        setIsEdit(!isEdit);
        setModal(!modal);
        toast.info(response.data.message, {
          theme: "colored",
          autoClose: 1200,
          icon: <FaUserCheck size={30} />,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        theme: "colored",
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    async function getUser() {
      await axios
        .post(USER_PROFILE, {
          user_id: data.user_id,
        })
        .then((res) => {
          setUser(res.data);
        });
    }
    getUser();
  }, [data.user_id, modal, isEditAvatar]);

  useEffect(() => {
    dispatch(getUserLoad());
    async function getUserDetail() {
      const detailUser = await axios.get(DETAIL_USER(data.account_id));
      setUserPermisions(detailUser.data);
      dispatch(getUserSuccess(detailUser.data));
    }
    getUserDetail();
  }, [data.account_id]);

  const InfoAccess = ({ menu }) => {
    return menu ? (
      <AiFillCheckCircle size={32} color="green" />
    ) : (
      <AiFillCloseCircle size={32} color="#dc3545" />
    );
  };

  const handleLogOut = () => {
    toggle();
    var theme = localStorage.getItem("theme");
    localStorage.clear();
    localStorage.setItem("theme", theme);
    toast.success("Logout success", {
      theme: "colored",
      autoClose: 1200,
      icon: <RiLogoutBoxFill size={30} />,
    });
    setTimeout(() => {
      navigate.push("/login");
    }, 2000);

    activityLog({
      userId: userPermisions?._id,
      logName: "Logout",
      description: `Logout user from website`,
    });

    dispatch(clearFollowedRoom());
    dispatch(clearProfile());
  };

  const handleSharingLive = async () => {
    const officialRoom = "/room/officialJKT48/332503";
    try {
      const response = await axios.get(PREMIUM_LIVE_TODAY);
      if (userPermisions?.can_farming_detail) {
        localStorage.setItem("secretKey", response?.data?.webSocketId);
        if (window.location.pathname === officialRoom) {
          window.location.pathname = officialRoom;
        } else {
          navigate.push(officialRoom);
        }
      } else {
        showToast("error", "Don't have permissions");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              style={{ maxWidth: "4rem", fontSize: ".9rem" }}
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
          style={{
            backgroundColor: "#24a2b7",
            color: "white",
          }}
          toggle={toggle}
        >
          User Profile {profile.name}
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
                        background:
                          "linear-gradient(to bottom, #24a2b7, #20242A)",
                        borderTopLeftRadius: ".5rem",
                        borderBottomLeftRadius: !isMobile && ".5rem",
                        color: "#282c34",
                        backgroundColor:
                          theme === "light" ? "#24a2b7" : "#282C34",
                        width: "289px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        borderTopRightRadius: isMobile && ".5rem",
                      }}
                    >
                      <h5 className="my-3">Profile</h5>
                      <img
                        src={
                          user.image ??
                          "https://static.showroom-live.com/assets/img/no_profile.jpg"
                        }
                        alt="Profile"
                        className="img-fluid mb-2 rounded-circle"
                        style={{ height: "80px", width: "80px" }}
                      />
                      <p>ID : {data.account_id}</p>

                      <div className="d-flex mt-5 mb-2 justify-content-center">
                        <h5 className="ml-3">Avatar</h5>
                        <FaUserEdit
                          cursor="pointer"
                          onClick={() => setIsEditAvatar(!isEditAvatar)}
                          className="mx-2 mt-1"
                          color="silver"
                          size={18}
                        />
                      </div>
                      <img
                        src={
                          user.avatar_url ??
                          "https://static.showroom-live.com/image/avatar/1.png?v=92"
                        }
                        alt="Avatar"
                        className="img-fluid mb-3 "
                        width={70}
                      />
                      <h6>Level {user.fan_level}</h6>
                    </div>
                    <div className="col-md-8">
                      {!isEditAvatar ? (
                        <div className="card-body p-4">
                          <div
                            className="d-flex justify-content-between"
                            style={{ cursor: "pointer" }}
                          >
                            <h6>Information</h6>
                            {!isEdit ? (
                              <div
                                className="ml-3"
                                onClick={() => setIsEdit(!isEdit)}
                              >
                                <FaEdit
                                  className="mx-2 mb-1"
                                  color="teal"
                                  size={18}
                                />
                              </div>
                            ) : (
                              <FaWindowClose
                                className="mx-2 mt-1"
                                color="red"
                                size={18}
                                onClick={() => {
                                  setIsEdit(!isEdit);
                                }}
                              />
                            )}
                          </div>
                          <hr className="mt-0 mb-4" />
                          <div className="row pt-1">
                            {isEdit ? (
                              <div className="col-12 mb-3">
                                <h6>Name</h6>
                                <input
                                  type="text"
                                  name="name"
                                  value={profile.name}
                                  className="form-control my-2 mt-3"
                                  onChange={handleChange}
                                />
                              </div>
                            ) : (
                              <div className="col-12 mb-3">
                                <h6>Name</h6>
                                <p className="text-muted mt-3">{user.name}</p>
                              </div>
                            )}
                          </div>
                          <h6>About Me</h6>
                          <hr className="mt-0 mb-4" />
                          <div className="row pt-1">
                            <div className="col-12 mb-3">
                              {isEdit ? (
                                <textarea
                                  name="description"
                                  cols="30"
                                  rows="5"
                                  className="form-control"
                                  onChange={handleChange}
                                >
                                  {user.description}
                                </textarea>
                              ) : (
                                <p className="text-muted">{user.description}</p>
                              )}
                            </div>
                          </div>
                          <h6>Fitur Achieved</h6>
                          <hr className="mt-0 mb-4" />
                          <div className="row ">
                            <div className="col-12 mb-3">
                              <div className="row d-flex justify-content-center align-items-center">
                                <div className="col-6">
                                  <Link to="/multi-room">
                                    <Button size="sm" color="info">
                                      <FaUsers
                                        size={16}
                                        className="mb-1 mx-1"
                                      />
                                      3 Room
                                    </Button>
                                  </Link>
                                </div>
                                <div className="col-6">
                                  <InfoAccess
                                    menu={userPermisions?.can_3_room}
                                  />
                                </div>
                              </div>
                              <div className="row d-flex justify-content-center align-items-center py-2">
                                <div className="col-6">
                                  <Link to="/multi-room">
                                    <Button size="sm" color="info">
                                      <FaUsersCog
                                        size={16}
                                        className="mb-1 mx-1"
                                      />
                                      4 Room
                                    </Button>
                                  </Link>
                                </div>
                                <div className="col-6">
                                  <InfoAccess
                                    menu={userPermisions?.can_4_room}
                                  />
                                </div>
                              </div>
                              {userPermisions?.can_farming_detail && (
                                <div className="row d-flex justify-content-center align-items-center py-1">
                                  <div className="col-6">
                                    <Button
                                      onClick={handleSharingLive}
                                      color="success"
                                      size="sm"
                                    >
                                      <RiBroadcastFill
                                        size={16}
                                        className="mb-1 mr-1"
                                      />
                                      Sharing
                                    </Button>
                                  </div>
                                  <div className="col-6">
                                    <InfoAccess
                                      menu={userPermisions?.can_farming_detail}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          {isEdit ? (
                            <Button
                              block
                              disabled={loading}
                              style={{
                                backgroundColor: "#008080",
                                border: "none",
                              }}
                              onClick={updateProfile}
                            >
                              {loading ? (
                                <Loading color="white" />
                              ) : (
                                "Update Profile"
                              )}
                            </Button>
                          ) : (
                            <div>
                              <hr className="mt-0 my-3" />
                              <Button color="danger" onClick={toggleLogout}>
                                <RiLogoutBoxFill
                                  size={20}
                                  style={{ marginBottom: "3" }}
                                />{" "}
                                Logout
                              </Button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <EditAvatar
                          session={session}
                          isEditAvatar={isEditAvatar}
                          setIsEditAvatar={setIsEditAvatar}
                          theme={theme}
                          profile={profile}
                          setProfile={setProfile}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
        <Modal isOpen={modalLogout}>
          <ModalHeader
            toggle={toggleLogout}
            className="text-light"
            style={{ backgroundColor: "#DC3545" }}
          >
            Log Out
          </ModalHeader>
          <ModalBody className="text-dark my-2">
            Apakah Anda yakin ingin logout ?
          </ModalBody>
          <ModalFooter>
            <Button color="info" onClick={handleLogOut}>
              Yes
            </Button>
            <Button color="secondary" onClick={toggleLogout}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </Modal>
    </>
  );
}
