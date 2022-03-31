import React from 'react';
import Room from 'components/Room';
import SkeletonList from './skeleton/SkeletonList';
import { isMobile } from 'react-device-detect';
import { MdOutlineSearchOff } from "react-icons/md";

function RoomList({room, theme, isSearch}) {
  return (
    <>
      <h3 className="mb-3">Room List</h3>
        {room && room.length !== 0 ? (
          <div className="container-grid">
              {room.map((item, idx) => item.name.includes('JKT48') && !item.next_live_schedule && !item.is_live && (
                <Room idx={idx} item={item} style="column-4" />
              ))}
          </div>
        ) : isSearch ? (
          <div className="mt-4">
            <p style={{fontSize: 20}} ><MdOutlineSearchOff className="mr-2" size={40} />Room Not Found</p>
          </div>
        ) : (
          <div className="container-grid">
            {!isMobile && (
              <SkeletonList theme={theme} />
            )}
          </div>
        )}
    </>
  );
}

export default RoomList;
