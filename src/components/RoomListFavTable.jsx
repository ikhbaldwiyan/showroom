import React, { useEffect } from "react";
import { Button } from "reactstrap";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import RemoveRoomModal from "./RemoveRoomModal";
import { addFavoriteRoom } from "utils/addFavoriteRoom";
import { useDispatch, useSelector } from "react-redux";

function RoomListFavTable({
  data,
  children,
  idx,
  roomId,
  isFavoriteRoom,
  theme,
  isAcademy
}) {
  const isMultiRoom = window.location.pathname === "/multi-room";
  const buttonStyle = {
    backgroundColor:
      roomId == data.id || roomId === data.room_id ? "#008b9b" : "#008b9b",
    color: "white",
    border: "none",
  };

  const dispatch = useDispatch()

  const roomFavorite = useSelector((state) => state.roomFavorite.data);

  useEffect(() => {
    roomFavorite &&
      localStorage.setItem("favorites", JSON.stringify(roomFavorite));
  }, [roomFavorite, dispatch, addFavoriteRoom]);

  return (
    <tbody key={idx}>
      <tr>
        <td>
          {isFavoriteRoom ? (
            <div style={{ position: "sticky" }}>
              <RemoveRoomModal theme={theme} roomId={data.room_id ?? data.id}>
                <div
                  className="ml-1"
                  style={{
                    position: "absolute",
                    color: "#21252b",
                    cursor: "pointer",
                  }}
                >
                  <AiFillCloseCircle />
                </div>
              </RemoveRoomModal>
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
            <p className={isAcademy ? "mt-4" : isFavoriteRoom ? "mt-4" : "mb-1"}>
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
              onClick={() => console.log(data)}
              style={buttonStyle}
            >
              <BsFillPersonPlusFill className="mb-1" />
            </Button>
          ) : (
            <Button
              className="mt-4"
              color="info"
              onClick={() => addFavoriteRoom(dispatch, data)}
              style={buttonStyle}
            >
              <BsFillPersonPlusFill className="mb-1" />
            </Button>
          )}
        </td>
      </tr>
    </tbody>
  );
}

export default RoomListFavTable;
