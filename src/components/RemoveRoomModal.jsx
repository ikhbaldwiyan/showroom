import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
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
import formatDescription from "utils/formatDescription";

const RemoveRoomModal = ({ roomId, theme }) => {
  const roomFavorite = useSelector((state) => state.roomFavorite.data);
  const [profile, setProfile] = useState("");
  const [modal, setModal] = useState(false);
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
    backgroundColor: "#dc3545",
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
    <div>
      <div
        className="ml-1"
        style={{
          position: "absolute",
          color: "#21252b",
          cursor: "pointer",
        }}
        onClick={toggle}
      >
        <AiFillCloseCircle />
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader style={header} toggle={toggle}>
          Remove from favorite room ?
        </ModalHeader>
        <ModalBody
          className="justify-content-center text-center"
          style={{ backgroundColor: theme === "dark" ? "#282C34" : "" }}
        >
          <img
            width="240px"
            src={profile.image_square}
            alt={profile.room_name}
            style={{boxShadow: '3px 3px 3px 3px', borderRadius: 8, marginBottom: 6}}
          />
          <div
            className="py-3"
            dangerouslySetInnerHTML={{ __html: formatDescription(profile) }}
          />
        </ModalBody>
        <ModalFooter style={{backgroundColor: '#21252b'}}>
          <Button color="info" onClick={() => handleRemoveFavRoom(roomId)}>
            Yes
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RemoveRoomModal;
