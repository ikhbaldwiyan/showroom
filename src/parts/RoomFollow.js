import axios from "axios";
import React, { useEffect, useState } from "react";
import { ROOM_FOLLOW } from "utils/api/api";
import RoomList from "./RoomList";

const RoomFollow = ({ session }) => {
  const [room, setRoom] = useState([]);

  useEffect(() => {
    async function getRoomFollow() {
      try {
        const response = await axios.post(ROOM_FOLLOW, {
          cookies_id: session.cookie_login_id
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

  return <RoomList room={room} />;
};

export default RoomFollow;
