import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Col } from "reactstrap";
import { LIVE_STREAM_URL } from "utils/api/api";
import { getSession } from "utils/getSession";

import { Profile, Title } from "components";
import Stream from "pages/streaming/Stream";
import { gaEvent } from "utils/gaEvent";
import { gaTag } from "utils/gaTag";

export default function RoomsPlayer({
  layout,
  hideMultiMenu,
  setHideMultiMenu,
  theme,
  number,
  updateMultiRoom,
  selectedRoom,
  removeSelectedRoom
}) {
  const [url, setUrl] = useState([]);
  const [roomId, setRoomId] = useState(selectedRoom?.id);
  const [menu, setMenu] = useState("room");
  const [loading, setLoading] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);
  const [liveId, setLiveId] = useState("");

  useEffect(() => {
    setRoomId(selectedRoom?.id);
  }, [selectedRoom]);

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
      username: getSession()?.profile?.name
    });
  };

  return (
    <Col sm="6" lg={layout}>
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
      {!roomId && <p className="h6 text-center py-2">Pilih Room {number} </p>}
    </Col>
  );
}
