import React from "react";
import Room from "components/Room";
import SkeletonList from "./skeleton/SkeletonList";
import { isMobile } from "react-device-detect";
import { MdOutlineSearchOff } from "react-icons/md";
import useWindowDimensions from "utils/useWindowDimension";

function RoomList({ room, theme, isSearch, isSearchAcademy, isRoomFollowed }) {
  const { width } = useWindowDimensions();
  const style = width > 1500 ? "column-3" : "column-4";

  return (
    <>
      {isRoomFollowed ? (
        <div
          className="d-flex"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <h3 className="mb-4">Follow List</h3>
          <h5 className="mb-4">Total Followed Room: {room.length} </h5>
        </div>
      ) : (
        <h3 className="py-3">{!isSearch && "Room List"}</h3>
      )}
      {room && room.length !== 0 ? (
        <div className="container-grid">
          {room.map((item, idx) => (
            <Room idx={idx} item={item} style={style}>
              {item.is_live && (
                <div className="tag" style={{ backgroundColor: "#CC2636" }}>
                  On Live
                </div>
              )}
            </Room>
          ))}
        </div>
      ) : isSearch ? (
        !isSearchAcademy && (
          <div className="mt-4">
            <p style={{ fontSize: 20 }}>
              <MdOutlineSearchOff className="mr-2" size={40} />
              Room Not Found
            </p>
          </div>
        )
      ) : (
        !isMobile && (
          <div className="container-grid">
            <SkeletonList theme={theme} />
          </div>
        )
      )}
    </>
  );
}

export default RoomList;
