import React from "react";
import { Button } from "reactstrap";
import { RiLiveFill } from "react-icons/ri";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { gaEvent } from "utils/gaEvent";

function RoomListTable({
  data,
  children,
  setRoomId,
  idx,
  roomId,
  updateMultiRoom,
  number
}) {
  const isMultiRoom = window.location.pathname === "/multi-room";
  const buttonStyle = {
    backgroundColor:
      roomId == data.id || roomId == data.room_id ? "#DC3545" : "#008b9b",
    color: "white",
    border: "none",
  };

  const eventName = data.url_key
    ? "Change Room " + data.url_key.substr(6)
    : data.room_url_key !== "officialJKT48"
    ? "Change Room " + data.room_url_key.substr(6)
    : "Change Room JKT48";

  const handleSwitchRoom = () => {
    setRoomId([data.id ? data.id : data.room_id]);
    gaEvent(eventName, "Room List Regular", "Detail");
  };

  const handleSwitchRoomMulti = () => {
    setRoomId([data.id ? data.id : data.room_id]);
    const id = data.id ?? data.room_id;
    const name = data.room_url_key
      ? data.room_url_key.substr(6)
      : data.url_key.substr(6);
    updateMultiRoom(number, id, name);

    gaEvent(eventName, "Room List Multi", "Multi Room");
  };

  return (
    <tbody key={idx}>
      <tr>
        <td>
          <img
            src={data.image_url ?? data.image ?? data.image_m}
            style={{ borderRadius: "10px" }}
            alt={data.name}
            width="120"
          />
        </td>
        <td>
          {data.is_live || data.next_live_schedule !== 0 ? (
            <p className="mb-1">
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
              onClick={() => handleSwitchRoomMulti()}
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
                onClick={handleSwitchRoom}
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
