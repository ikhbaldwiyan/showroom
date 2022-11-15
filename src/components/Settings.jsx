import axios from "axios";
import { API } from "utils/api/api";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { IoMdSettings } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalFooter,
  ModalBody,
  Button,
} from "reactstrap";
import { addFavoriteRoom } from "utils/addFavoriteRoom";
import { removeFavoriteRoom } from "redux/actions/roomFavorite";
import { toast } from "react-toastify";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import formatDescription from "utils/formatDescription";

function Settings(props) {
  const roomFavorite = useSelector((state) => state.roomFavorite.data);
  const [isOpen, setDropdownOpen] = useState(false);
  const [direction, setDirection] = useState("right");
  const [menu, setMenu] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const css = {
    backgroundColor: "teal",
    border: "none",
    borderRadius: "10px",
    marginBottom: 4,
  };
  const inline = { display: "inline" };

  const {
    hideTime,
    setHideTime,
    hideName,
    setHideName,
    hideViews,
    setHideViews,
    profile,
    hideMenu,
    setHideMenu,
    hideMultiMenu,
    setHideMultiMenu,
    roomId,
    theme,
  } = props;

  useEffect(() => {
    setIsFavorite(false);
    if (roomFavorite) {
      for (let i = 0; i < roomFavorite.length; i++) {
        const data = roomFavorite[i];
        if (data.room_id === parseInt(roomId)) {
          setIsFavorite(true);
        }
      }
    }
  }, [roomId, isFavorite, profiles, roomFavorite]);

  const handleRemoveFavRoom = (roomId) => {
    dispatch(removeFavoriteRoom(roomId));
    setModal(!modal);
    toast.error(`${profiles.room_name} removed from favorite room`);
  };

  useEffect(() => {
    roomFavorite &&
      localStorage.setItem("favorites", JSON.stringify(roomFavorite));
  }, [handleRemoveFavRoom]);

  useEffect(() => {
    isMobile && setDirection("left");
  }, [direction]);

  function hideOrShow(menu) {
    return menu ? "Show" : "Hide";
  }

  useEffect(() => {
    axios.get(`${API}/rooms/profile/${roomId}`).then((res) => {
      const data = res.data;
      setProfiles(data);
    });
  }, [profiles, roomId]);

  useEffect(() => {
    const settingsMenu = [
      {
        name: hideOrShow(hideName) + " Name",
        update: function () {
          return setHideName(!hideName);
        },
      },
      {
        name: hideOrShow(hideViews) + " Views",
        update: function () {
          return setHideViews(!hideViews);
        },
      },
      {
        name: hideOrShow(hideMenu) + " Menu",
        update: function () {
          return setHideMenu(!hideMenu);
        },
      },
      {
        name: hideOrShow(hideTime) + " Time / Title",
        update: function () {
          return setHideTime(!hideTime);
        },
      },
    ];
    setMenu(settingsMenu);
  }, [hideName, hideTime, hideViews, hideMenu, profiles, roomId]);

  const header = {
    backgroundColor: "#dc3545",
    color: "white",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  };

  return (
    <div style={inline} className="ml-1 mt-1">
      <Dropdown
        style={inline}
        isOpen={isOpen}
        toggle={toggle}
        direction={direction}
      >
        <DropdownToggle style={css}>
          <IoMdSettings style={{ fontSize: 20, marginBottom: 2 }} />
        </DropdownToggle>
        <DropdownMenu>
          {menu.map((item, idx) => (
            <DropdownItem key={idx} onClick={item.update}>
              {item.name}
            </DropdownItem>
          ))}
          {!isFavorite ? (
            <DropdownItem
              style={{ color: "teal", fontWeight: "700" }}
              onClick={() => addFavoriteRoom(dispatch, profiles)}
            >
              Add to favorite
            </DropdownItem>
          ) : (
            <DropdownItem
              style={{ color: "#dc3545", fontWeight: "700" }}
              onClick={toggleModal}
            >
              Remove from favorite
            </DropdownItem>
          )}
          <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader style={header} toggle={toggleModal}>
              Remove from favorite room ?
            </ModalHeader>
            <ModalBody
              className="justify-content-center text-center"
              style={{ backgroundColor: theme === "dark" ? "#282C34" : "" }}
            >
              <img
                width="240px"
                src={profiles.image_square}
                alt={profiles.room_name}
                style={{
                  boxShadow: "3px 3px 3px 3px",
                  borderRadius: 8,
                  marginBottom: 6,
                }}
              />
              <div
                className="py-3"
                dangerouslySetInnerHTML={{
                  __html: formatDescription(profiles),
                }}
              />
            </ModalBody>
            <ModalFooter style={{ backgroundColor: "#21252b" }}>
              <Button color="info" onClick={() => handleRemoveFavRoom(roomId)}>
                Yes
              </Button>{" "}
              <Button color="secondary" onClick={toggleModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <DropdownItem href={profile.share_url_live} target="_blank">
            Open Showroom
          </DropdownItem>
          {window.location.pathname === "/multi-room" && (
            <DropdownItem
              onClick={() => {
                setHideMultiMenu(!hideMultiMenu);
              }}
            >
              {hideOrShow(hideMultiMenu)} Multi Options
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default Settings;
