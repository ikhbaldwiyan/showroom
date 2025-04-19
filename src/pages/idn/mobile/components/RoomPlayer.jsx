import React, { useRef, useState, useMemo, useCallback } from "react";
import { IoCloseCircle, IoReload } from "react-icons/io5";
import { Badge } from "reactstrap";
import PlayerMulti from "./PlayerMulti";

const RoomPlayer = React.memo(({
  data,
  number,
  setRoomOne,
  setRoomTwo,
  setRoomThree,
  setRoomFour
}) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefresh, setIsRefresh] = useState(false);
  const playerRef = useRef(null);

  const handleRefresh = useCallback(() => {
    setRefreshKey(prev => prev + 1);
    setIsRefresh(true);
    if (playerRef?.current) {
      playerRef?.current.seekTo(0);
    }

    setTimeout(() => {
      setIsRefresh(false);
    }, 2000);
  }, []);

  const removeRoom = useCallback(() => {
    const actions = {
      "1": () => {
        setRoomOne("");
        localStorage.removeItem("roomOne");
      },
      "2": () => {
        setRoomTwo("");
        localStorage.removeItem("roomTwo");
      },
      "3": () => {
        setRoomThree("");
        localStorage.removeItem("roomThree");
      },
      "4": () => {
        setRoomFour("");
        localStorage.removeItem("roomFour");
      }
    };

    actions[number]?.();
  }, [number, setRoomOne, setRoomTwo, setRoomThree, setRoomFour]);

  const streamUrl = useMemo(() => {
    if (!data?.stream_url) return "";
    return `${process.env.REACT_APP_SERVICE_WORKER}?url=${data.stream_url}`;
  }, [data?.stream_url]);

  const memberName = useMemo(() => (
    data?.user?.name?.replace("JKT48", "") || ""
  ), [data?.user?.name]);

  if (!data?.stream_url) {
    return (
      <div className="p-1">
        <h6 className="font-semibold">Pilih Room {number}</h6>
      </div>
    );
  }

  return (
    <div>
      <PlayerMulti
        key={`player-${number}-${refreshKey}`}
        refreshKey={refreshKey}
        number={number}
        url={streamUrl}
      />
      <div className="d-flex mb-2 align-items-center">
        <h6 className="mr-1 ml-1 mt-1">
          <b>{memberName}</b>
        </h6>
        <div className="d-flex align-items-center">
          <Badge 
            onClick={removeRoom} 
            className="ml-2" 
            color="danger"
            role="button"
          >
            <IoCloseCircle />
          </Badge>
          <IoReload
            onClick={handleRefresh}
            className={`${isRefresh ? "spin-animation" : ""} ml-2`}
            size={17}
            role="button"
          />
        </div>
      </div>
    </div>
  );
});

RoomPlayer.displayName = 'RoomPlayer';

export default RoomPlayer;
