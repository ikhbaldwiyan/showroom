import axios from "axios";
import { roomListApi, roomAcademyApi } from "utils/api/api";
import React, { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";
import { Container } from "reactstrap";

import MainLayout from "pages/layout/MainLayout";
import RoomLive from "parts/RoomLive";
import RoomList from "parts/RoomList";
import RoomUpcoming from "parts/RoomUpcoming";
import RoomAcademy from "parts/RoomAcademy";
import SearchAndFilter from "parts/SearchAndFilter";
import { useDispatch, useSelector } from "react-redux";
import { getRoomListRegular, getRoomListAcademy } from "redux/actions/rooms";
import AlertInfo from "components/AlertInfo";

function Home(props) {
  const [search, setSearch] = useState("");
  const [allMember, setAllMember] = useState(true);
  const [isAcademy, setIsAcademy] = useState(false);
  const [isRegular, setIsRegular] = useState(false);
  const [isLive, setIsLive] = useState(false);

  const roomRegular = useSelector((state) => state.roomRegular.data);
  const roomAcademy = useSelector((state) => state.roomAcademy.data);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getRoomList() {
      const room = await axios.get(roomListApi);
      dispatch(getRoomListRegular(room.data));
    }
    getRoomList();
    window.document.title = "JKT48 SHOWROOM";
  }, []);

  useEffect(() => {
    async function getRoomAcademy() {
      const room = await axios.get(roomAcademyApi);
      dispatch(getRoomListAcademy(room.data));
    }
    getRoomAcademy();
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filtered = !search
    ? roomRegular
    : roomRegular.filter((room) =>
        room.name.toLowerCase().includes(search.toLowerCase())
      );

  const filteredAcademy = !search
    ? roomAcademy
    : roomAcademy.filter((room) =>
        room.room_url_key.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <MainLayout {...props}>
      <Container>
        <AlertInfo />
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
        <Fade bottom>
          {allMember ? (
            <>
              <RoomLive isOnLive={isLive} search={search} theme={props.theme} />
              <RoomUpcoming search={search} room={roomRegular} />
              <RoomList
                isSearchRegular={filtered}
                isSearchAcademy={filteredAcademy}
                isSearch={search}
                room={filtered}
                theme={props.theme}
              />
              <RoomAcademy
                isSearchRegular={filtered}
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
          ) : isLive ? (
            <RoomLive isOnLive={isLive} search={search} theme={props.theme} />
          ) : (
            ""
          )}
        </Fade>
      </Container>
    </MainLayout>
  );
}

export default Home;
