import axios from "axios";
import { Col } from "reactstrap";
import { liveDetail } from "utils/api/api";
import React, { useState, useEffect } from "react";

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
  Setlist
} from "components";

export default function Multi({
  layout,
  hideMultiMenu,
  setHideMultiMenu,
  theme
}) {
  const [url, setUrl] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [menu, setMenu] = useState("room");
  const [loading, setLoading] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);

  useEffect(() => {
    axios.get(liveDetail(roomId)).then((res) => {
      const streamUrl = res.data;
      setUrl(streamUrl);
    });
    !url && setMenu("room");
  }, [roomId, url]);

  useEffect(() => {
    window.document.title = "JKT48 SHOWROOM";
    menu === "room" && window.scrollTo(0, 0);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [menu, roomId]);

  const isMultiRoom = window.location.pathname !== "/multi-room";

  return (
    <Col lg={layout}>
      {url ? (
        url.slice(0, 1).map((item, idx) => (
          <>
            <Stream key={idx} url={item.url} />
            <Title
              roomId={roomId}
              hideMenu={hideMenu}
              setHideMenu={setHideMenu}
              hideMultiMenu={hideMultiMenu}
              setHideMultiMenu={setHideMultiMenu}
              theme={theme}
            />
          </>
        ))
      ) : !url ? (
        <Profile
          roomId={roomId}
          setRoomId={setRoomId}
          isLoad={loading}
          menu={menu}
        />
      ) : (
        <Stream url="" />
      )}
      {url.length === 0 && (
        <p className="h6 text-center py-2">Please Choose Member Room</p>
      )}
      {roomId ? (
        <Menu
          menu={menu}
          setMenu={setMenu}
          isLive={url}
          roomId={roomId}
          hideMenu={hideMenu}
          isMultiRoom={isMultiRoom}
        />
      ) : (
        ""
      )}
      {menu === "room" ? (
        <RoomList
          roomId={roomId}
          setRoomId={setRoomId}
          isMultiRoom={isMultiRoom}
        />
      ) : menu === "chat" ? (
        <LiveChat roomId={roomId} isMultiRoom />
      ) : menu === "rank" ? (
        <StageUser roomId={roomId} />
      ) : menu === "gift" ? (
        <Gift roomId={roomId} />
      ) : menu === "total" ? (
        <TotalRank roomId={roomId} />
      ) : (
        <Setlist />
      )}
    </Col>
  );
}
