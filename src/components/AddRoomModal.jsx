import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { removeFavoriteRoom } from "redux/actions/roomFavorite";
import { API } from "utils/api/api";
import RoomFavoriteList from "./RoomFavoriteList";

const AddRoomModal = ({ theme, children }) => {
  const roomFavorite = useSelector((state) => state.roomFavorite.data);
  const [profile, setProfile] = useState("");
  const [modal, setModal] = useState(false);
  const [roomId, setRoomId] = useState()
  const toggle = () => setModal(!modal);

  const dispatch = useDispatch();

  const handleRemoveFavRoom = (roomId) => {
    dispatch(removeFavoriteRoom(roomId));
    setModal(!modal);
    toast.error(`${profile.room_name}removed from favorite room`)
  };

  useEffect(() => {
    roomFavorite && localStorage.setItem('favorites', JSON.stringify(roomFavorite))
  }, [handleRemoveFavRoom])

  const header = {
    backgroundColor: "#24a2b7",
    color: "white",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  };

  useEffect(() => {
    axios.get(`${API}/rooms/profile/${roomId}`).then((res) => {
      const profile = res.data;
      setProfile(profile);
    });
  }, [profile, roomId, dispatch]);

  return (
    <>
      <div style={{ display: "inline" }} onClick={toggle}>
        {children}
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader style={header} toggle={toggle}>
          Add Room Favorite
        </ModalHeader>
        <ModalBody
          className="justify-content-center text-center"
          style={{ backgroundColor: theme === "dark" ? "#282C34" : "" }}
        >
          <RoomFavoriteList roomId={roomId} setRoomId={setRoomId} theme={theme} />
        </ModalBody>
        <ModalFooter style={{ backgroundColor: '#21252b' }}>
          <Button color="info" onClick={() => handleRemoveFavRoom(roomId)}>
            Yes
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddRoomModal;
