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
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getRoomList() {
      const room = await axios.get(`${API}/rooms`)
      const listRoom = room.data;
      listRoom && setRoom(listRoom);
    }
    getRoomList();

    window.document.title = 'JKT48 SHOWROOM';
  }, [room]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    console.log(search)
  };

  const filtered = !search ? room
    : room.filter((room) =>
      room.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <MainLayout {...props}>
      <section className="container">
        <Fade bottom>
          <Banner />
          <div className="row py-4">
            <div className="col">
              <input
                type="text"
                placeholder="Search Room"
                onChange={handleSearch}
                className="form-control"
              />
            </div>
          </div>
          <RoomLive theme={props.theme} />
          <RoomUpcoming room={room} />
          <RoomList isSearch={search} room={filtered} theme={props.theme} />
        </Fade>
      </section>
    </MainLayout>
  );
}

export default Home;
