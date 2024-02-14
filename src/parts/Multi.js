import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Col } from "reactstrap";
import { LIVE_STREAM_URL } from "utils/api/api";
import { getSession } from "utils/getSession";

import Stream from "pages/streaming/Stream";
import {
  Profile,
  Title,
  Menu,
  RoomList,
  LiveChat,
  StageUser,
  TotalRank,
  Gift,
  Setlist,
  StarMulti,
} from "components";
import { gaTag } from "utils/gaTag";
import { gaEvent } from "utils/gaEvent";
import HistoryLive from "./HistoryLive";

export default function Multi({
  layout,
  hideMultiMenu,
  setHideMultiMenu,
  theme,
  number,
  updateMultiRoom,
  selectedRoom,
  removeSelectedRoom,
}) {
  const [cookiesLoginId, setCookiesLoginId] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [url, setUrl] = useState([]);
  const [roomId, setRoomId] = useState(selectedRoom?.id);
  const [menu, setMenu] = useState("room");
  const [loading, setLoading] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);
  const [liveId, setLiveId] = useState("")

  useEffect(() => {
    setRoomId(selectedRoom?.id);
  }, [selectedRoom]);

  useEffect(() => {
    const userSession = localStorage.getItem("session");
    if (userSession) {
      const foundSession = JSON.parse(userSession);
      setCookiesLoginId(foundSession.cookie_login_id);
      setCsrfToken(foundSession.csrf_token);
    }
  }, []);

  useEffect(() => {
    axios.get(LIVE_STREAM_URL(roomId)).then((res) => {
      const streamUrl = res.data;
      setUrl(streamUrl);
    });
    !url && setMenu("room");
  }, [roomId]);

  useEffect(() => {
    menu === "room" && window.scrollTo(0, 0);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [menu, roomId]);

  const isMultiRoom = window.location.pathname !== "/multi-room";

  const [refreshKey, setRefreshKey] = useState(0);
  const playerRef = useRef(null);

  const handleRefresh = () => {
    // Increment the key to trigger ReactPlayer reload
    setRefreshKey((prevKey) => prevKey + 1);

    // Pause the player (optional)
    if (playerRef?.current) {
      playerRef?.current.seekTo(0);
    }

    gaEvent("Multi Room", "Refresh Button - Multi Room", "Multi Room");
    gaTag({
      action: "refresh_button_multi",
      category: "Refresh - Multi Room",
      label: "Multi Room",
      value: null,
      username: getSession()?.profile?.name,
    });
  };

  return (
    <Col lg={layout}>
      {url && roomId ? (
        url.slice(0, 1).map((item, idx) => (
          <>
            <Stream refreshKey={refreshKey} key={idx} url={item.url} />
            <Title
              roomId={roomId}
              hideMenu={hideMenu}
              setHideMenu={setHideMenu}
              hideMultiMenu={hideMultiMenu}
              setHideMultiMenu={setHideMultiMenu}
              theme={theme}
              isMultiRoom
              number={number}
              removeSelectedRoom={removeSelectedRoom}
              updateMenu={setMenu}
              setUrl={setUrl}
              handleRefresh={handleRefresh}
              setLiveId={setLiveId}
            />
          </>
        ))
      ) : !url && roomId ? (
        <Profile
          roomId={roomId}
          setRoomId={setRoomId}
          isLoad={loading}
          menu={menu}
          session={getSession().session}
          number={number}
          removeSelectedRoom={removeSelectedRoom}
        />
      ) : (
        ""
      )}
      {!roomId && (
        <p className="h6 text-center py-2">Please Choose Member Room</p>
      )}
      {roomId ? (
        <Menu
          menu={menu}
          setMenu={setMenu}
          isLive={url}
          roomId={roomId}
          hideMenu={hideMenu}
          isMultiRoom
        />
      ) : (
        ""
      )}
      {menu === "room" ? (
        <RoomList
          roomId={roomId}
          setRoomId={setRoomId}
          isMultiRoom={isMultiRoom}
          updateMultiRoom={updateMultiRoom}
          number={number}
        />
      ) : menu === "chat" ? (
        <LiveChat roomId={roomId} setRoomId={setRoomId} isMultiRoom />
      ) : menu === "rank" ? (
        <StageUser roomId={roomId} />
      ) : menu === "history" ? (
        <HistoryLive id={roomId} />
      ) : menu === "gift" ? (
        <Gift roomId={roomId} />
      ) : menu === "total" ? (
        <TotalRank roomId={roomId} />
      ) : menu === "star" ? (
        <StarMulti
          roomId={roomId}
          theme={theme}
          cookiesLoginId={cookiesLoginId}
          csrfToken={csrfToken}
        />
      ) : (
        <Setlist />
      )}
    </Col>
  );
}
