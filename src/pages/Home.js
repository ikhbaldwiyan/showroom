import axios from "axios";
import { useEffect, useState } from "react";
import Fade from "react-reveal/Fade";
import { ROOM_LIST_API } from "utils/api/api";

import { Schedule } from "components";
import ServerErrorModal from "components/ServerErrorModal";
import IDNLiveList from "pages/idn/IDNLiveList";
import MainLayout from "pages/layout/MainLayout";
import {
  RoomAcademy,
  RoomList,
  RoomLive,
  SearchAndFilter,
} from "parts";
import RecentLive from "parts/RecentLive";
import { useDispatch, useSelector } from "react-redux";
import {
  getRoomListRegular,
  getRoomListTrainee
} from "redux/actions/rooms";

function Home(props) {
  const [search, setSearch] = useState("");
  const [allMember, setAllMember] = useState(true);
  const [isAcademy, setIsAcademy] = useState(false);
  const [isRegular, setIsRegular] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [isServerError, setIsServerError] = useState(false);

  const memberRegular = useSelector((state) => state.roomRegular.data);
  const roomTrainee = useSelector((state) => state.roomTrainee.data);
  const dispatch = useDispatch();

  const roomRegular = [...memberRegular];

  useEffect(() => {
    async function getRoomList() {
      try {
        const room = await axios.get(ROOM_LIST_API("regular"));
        dispatch(getRoomListRegular(room.data.data));
      } catch (error) {
        console.log(error)
      }
    }
    getRoomList();
  }, []);


  useEffect(() => {
    async function getRoomTrainee() {
      const room = await axios.get(ROOM_LIST_API("trainee"));
      dispatch(getRoomListTrainee(room.data.data));
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

  const filteredTrainee = !search
    ? roomTrainee
    : roomTrainee.filter((room) =>
      room.room_url_key.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <MainLayout {...props}>
      <div className="layout my-0 mb-4">
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
              <IDNLiveList />
              <RecentLive isSearch={search} />
              <Schedule isShowing={true} isSearch={search} isHome />
              {filtered.length > 0 && (
                <div>
                  <RoomList
                    isSearchRegular={filtered}
                    isSearch={search}
                    room={filtered}
                    theme={props.theme}
                  />
                </div>
              )}
            </>
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
