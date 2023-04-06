import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPersonBooth } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { ROOM_FOLLOW } from "utils/api/api";
import RoomList from "./RoomList";

const RoomFollow = ({ session, isLogin }) => {
  const [room, setRoom] = useState([]);

  useEffect(() => {
    async function getRoomFollow() {
      try {
        const response = await axios.post(ROOM_FOLLOW, {
          cookies_id: session.cookie_login_id,
        });
        const jktRoom = response.data.rooms.filter((room) =>
          room.room_url_key.includes("JKT48")
        );
        setRoom(jktRoom);
      } catch (error) {
        console.log(error);
      }
    }
    getRoomFollow();
  }, []);

  return !isLogin ? (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-5 text-center align-items-center">
          <IoLogIn size={100} />
          <h3 className="py-3">Please Login To see</h3>
          <Link to="/login">
            <Button color="info">Login</Button>
          </Link>
        </div>
      </div>
    </div>
  ) : room.length > 0 ? (
    <RoomList room={room} isRoomFollowed/>
  ) : (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-5 text-center align-items-center">
          <FaPersonBooth size={100} />
          <h3 className="py-3">No Room Followed</h3>
        </div>
      </div>
    </div>
  );
};

export default RoomFollow;
