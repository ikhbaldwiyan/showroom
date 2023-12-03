import axios from "axios";
import React, { useState, useEffect } from "react";
import { ROOM_LIST_API, ROOM_GEN_10, ROOM_TRAINEE_API } from "utils/api/api";
import Fade from "react-reveal/Fade";

import MainLayout from "pages/layout/MainLayout";
import { AlertInfo, Schedule } from "components";
import { useDispatch, useSelector } from "react-redux";
import {
  getRoomListRegular,
  getRoomListAcademy,
  getRoomListTrainee
} from "redux/actions/rooms";
import {
  RoomList,
  RoomLive,
  RoomAcademy,
  RoomUpcoming,
  PremiumLive,
  SearchAndFilter
} from "parts";
import ServerErrorModal from "components/ServerErrorModal";
import ModalInfo from "parts/ModalInfo";
import RecentLive from "parts/RecentLive";
import WrappedAlert from "components/WrappedAlert";
import { isMobile } from "react-device-detect";

function Home(props) {
  const [search, setSearch] = useState("");
  const [allMember, setAllMember] = useState(true);
  const [isAcademy, setIsAcademy] = useState(false);
  const [isRegular, setIsRegular] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [isServerError, setIsServerError] = useState(false);

  const memberRegular = useSelector((state) => state.roomRegular.data);
  const memberGen10 = useSelector((state) => state.roomAcademy.data);
  const roomTrainee = useSelector((state) => state.roomTrainee.data);
  const dispatch = useDispatch();

  const roomRegular = [...memberRegular, ...memberGen10];

  useEffect(() => {
    async function getRoomList() {
      try {
        const room = await axios.get(ROOM_LIST_API);
        dispatch(getRoomListRegular(room.data));
      } catch (error) {
        setIsServerError(true);
      }
    }
    getRoomList();
    window.document.title = "JKT48 SHOWROOM";
  }, []);

  useEffect(() => {
    async function getRoomAcademy() {
      const room = await axios.get(ROOM_GEN_10);
      dispatch(getRoomListAcademy(room.data));
    }
    getRoomAcademy();
  }, []);

  useEffect(() => {
    async function getRoomTrainee() {
      const room = await axios.get(ROOM_TRAINEE_API);
      dispatch(getRoomListTrainee(room.data));
    }
    getRoomTrainee();
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filtered = !search
    ? roomRegular
    : roomRegular.filter((room) =>
        room.name
          ? room.name.toLowerCase().includes(search.toLowerCase())
          : room.room_name.toLowerCase().includes(search.toLowerCase())
      );

  const filteredGen10 = !search
    ? memberGen10
    : memberGen10.filter((room) =>
        room.room_url_key.toLowerCase().includes(search.toLowerCase())
      );

  const filteredTrainee = !search
    ? roomTrainee
    : roomTrainee.filter((room) =>
        room.room_url_key.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <MainLayout {...props}>
      <div className="layout my-0 mb-4">
        <ModalInfo />
        <WrappedAlert />
        {!isMobile && (
          <AlertInfo />
        )}
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
              <RoomUpcoming search={search} room={memberRegular} />
              <PremiumLive theme={props.theme} />
              <RecentLive isSearch={search} />
              <Schedule isShowing={true} isSearch={search} isHome />
              <RoomList
                isSearchRegular={filtered}
                isSearch={search}
                room={filtered}
                theme={props.theme}
              />
              <RoomAcademy
                title="Room Trainee"
                isSearchRegular={filtered}
                isSearch={search}
                room={filteredTrainee}
                theme={props.theme}
              />
            </>
          ) : isAcademy ? (
            <RoomAcademy
              title="Room Gen 10"
              isSearch={search}
              room={filteredGen10}
              theme={props.theme}
            />
          ) : isRegular ? (
            <RoomAcademy
              title="Room Trainee"
              isSearchRegular={filtered}
              isSearch={search}
              room={filteredTrainee}
              theme={props.theme}
            />
          ) : isLive ? (
            <Schedule isShowing={true} theme={props.theme} isHome />
          ) : (
            ""
          )}
        </Fade>
        <ServerErrorModal
          isOpen={isServerError}
          toggle={() => setIsServerError(!isServerError)}
        />
      </div>
    </MainLayout>
  );
}

export default Home;
