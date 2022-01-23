import axios from "axios";
import { API } from "utils/api/api";
import React, { useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';

import MainLayout from 'pages/layout/MainLayout';
import Banner from "parts/Banner";
import RoomLive from 'parts/RoomLive';
import RoomUpcoming from 'parts/RoomUpcoming';
import RoomList from "parts/RoomList";

function Home(props) {
  const [room, setRoom] = useState([]);

  useEffect(() => {
    async function getRoomList() {
      const room = await axios.get(`${API}/rooms`)
      const listRoom = room.data;
      listRoom && setRoom(listRoom);
    }
    getRoomList();

    window.document.title = 'JKT48 SHOWROOM';
  }, [room]);

  return (
    <MainLayout {...props}>
      <section className="container">
        <Fade bottom>
          <Banner />
          <RoomLive theme={props.theme} />
          <RoomUpcoming room={room} />
          <RoomList room={room} theme={props.theme} />
        </Fade>
      </section>
    </MainLayout>
  );
}

export default Home;
