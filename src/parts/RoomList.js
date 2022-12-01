import React, { useState } from "react";
import Room from "components/Room";
import SkeletonList from "./skeleton/SkeletonList";
import { isMobile } from "react-device-detect";
import { MdCancel, MdOutlineSearchOff } from "react-icons/md";
import { Button } from "reactstrap";
import { FaTrash } from "react-icons/fa";

function RoomList({ room, theme, isSearch, isSearchAcademy, isFavoriteRoom }) {
  const [isRemove, setIsRemove] = useState(false);

  return (
    <>
      {isFavoriteRoom ? (
        <div
          className="py-4"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h3>Favorite Room</h3>
          <Button
            onClick={() => setIsRemove(!isRemove)}
            color={!isRemove ? "danger" : "info"}
          >
            {!isRemove ? (
              <FaTrash className="mb-1 mr-1" />
            ) : (
              <MdCancel className="mb-1 mr-1" />
            )}{" "}
            {!isRemove ? "Remove Room" : "Cancel Remove"}
          </Button>
        </div>
      ) : !isSearch ? (
        <h3 className="py-4">Room List</h3>
      ) : (
        ""
      )}
      {room && room.length !== 0 ? (
        <div className="container-grid">
          {room.map((item, idx) => (
            <Room
              theme={theme}
              isFavoriteRoom={isFavoriteRoom}
              isRemove={isRemove}
              idx={idx}
              item={item}
              style="column-4"
            >
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
        <div className="container-grid">
          {!isMobile && <SkeletonList theme={theme} />}
        </div>
      )}
    </>
  );
}

export default RoomList;
