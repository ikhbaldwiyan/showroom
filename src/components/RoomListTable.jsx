import React from "react";
import { Button } from "reactstrap";
import { RiLiveFill } from "react-icons/ri";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import RemoveRoomModal from "./RemoveRoomModal";

function RoomListTable({
  data,
  children,
  setRoomId,
  idx,
  roomId,
  isFavoriteRoom,
  theme,
  isAcademy
}) {
  const isMultiRoom = window.location.pathname === "/multi-room";
  const buttonStyle = {
    backgroundColor:
      roomId == data.id || roomId === data.room_id ? "#DC3545" : "#008b9b",
    color: "white",
    border: "none",
  };

  return (
    <tbody key={idx}>
      <tr>
        <td>
          {isFavoriteRoom ? (
            <div style={{ position: "sticky" }}>
              <RemoveRoomModal theme={theme} roomId={data.room_id} />
              <img
                src={data.image_url ?? data.image}
                style={{ borderRadius: "10px" }}
                alt={data.name}
                width="120"
              />
            </div>
          ) : (
            <img
              src={data.image_url ?? data.image}
              style={{ borderRadius: "10px" }}
              alt={data.name}
              width="120"
            />
          )}
        </td>
        <td>
          {data.is_onlive || data.is_live || data.next_live_schedule !== 0 ? (
            <p className={isAcademy ? "mt-4" : isFavoriteRoom && !data.is_onlive ? "mt-4" : "mb-1"}>
              {data.url_key
                ? data.url_key.substr(6)
                : data.room_url_key !== "officialJKT48"
                ? data.room_url_key.substr(6)
                : "JKT48"}
            </p>
          ) : (
            <p className="mt-4">
              {data.url_key
                ? data.url_key.substr(6)
                : data.room_url_key.substr(6)}
            </p>
          )}
          {children}
        </td>
        <td>
          {isMultiRoom ? (
            <Button
              className="mt-4"
              color="info"
              onClick={() => setRoomId([data.id ? data.id : data.room_id])}
              style={buttonStyle}
            >
              <RiLiveFill className="mb-1" />
            </Button>
          ) : (
            <Link
              to={(location) => ({
                ...location,
                pathname: `/room/${data.url_key ?? data.room_url_key}/${
                  data.id ? data.id : data.room_id
                }`,
              })}
            >
              <Button
                className="mt-4"
                color="info"
                onClick={() => setRoomId([data.id ? data.id : data.room_id])}
                style={buttonStyle}
              >
                <RiLiveFill className="mb-1" />
              </Button>
            </Link>
          )}
        </td>
      </tr>
    </tbody>
  );
}

export default RoomListTable;
