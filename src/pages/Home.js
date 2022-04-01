import axios from 'axios';
import { API } from 'utils/api/api';
import React, { useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';

import MainLayout from 'pages/layout/MainLayout';
import RoomLive from 'parts/RoomLive';
import RoomList from 'parts/RoomList';
import RoomUpcoming from 'parts/RoomUpcoming';
import RoomAcademy from 'parts/RoomAcademy';
import SearchAndFilter from 'parts/SearchAndFilter';

function Home(props) {
  const [room, setRoom] = useState([]);
  const [search, setSearch] = useState('');
  const [allMember, setAllMember] = useState(true);
  const [academy, setAcademy] = useState([]);
  const [isAcademy, setIsAcademy] = useState(false);
  const [isRegular, setIsRegular] = useState(false);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    async function getRoomList() {
      const room = await axios.get(`${API}/rooms`);
      const listRoom = room.data;
      listRoom && setRoom(listRoom);
    }
    getRoomList();

    window.document.title = 'JKT48 SHOWROOM';
  }, [room]);

  useEffect(() => {
    async function getRoomAcademy() {
      const room = await axios.get(`${API}/rooms/academy`);
      const listRoomAcademy = room.data;
      listRoomAcademy && setAcademy(listRoomAcademy);
    }
    getRoomAcademy();
  }, [academy]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filtered = !search
    ? room : room.filter((room) =>
      room.name.toLowerCase().includes(search.toLowerCase())
    );

  const filteredAcademy = !search
    ? academy : academy.filter((room) =>
      room.room_url_key.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <MainLayout {...props}>
      <section className="container">
        <Fade bottom>
          <SearchAndFilter
            isLive={isLive}
            isAcademy={isAcademy}
            allMember={allMember}
            isRegular={isRegular}
            setIsLive={setIsLive}
            setIsAcademy={setIsAcademy}
            setAllMember={setAllMember}
            handleSearch={handleSearch}
            setIsRegular={setIsRegular}
          />

          {allMember ? (
            <>
              <RoomLive theme={props.theme} />
              <RoomUpcoming room={room} />
              <RoomList isSearch={search} room={filtered} theme={props.theme} />
              <RoomAcademy
                isSearch={search}
                room={filteredAcademy}
                theme={props.theme}
              />
            </>
          ) : isAcademy ? (
            <RoomAcademy
              isSearch={search}
              room={filteredAcademy}
              theme={props.theme}
            />
          ) : isRegular ? (
            <RoomList isSearch={search} room={filtered} theme={props.theme} />
          ) : isLive  ? (
            <RoomLive theme={props.theme} />
          ) : (
            ''
          )}
        </Fade>
      </section>
    </MainLayout>
  );
}

export default Home;
