import React from 'react';
import Room from 'components/Room';
import SkeletonList from './skeleton/SkeletonList';

function RoomList({room, theme}) {
  return (
    <>
      <h3 className="mb-3">Room List</h3>
      <div className="container-grid">
        {room && room.length !== 0 ? (
          room.map((item, idx) => item.name.includes('JKT48') && !item.next_live_schedule && !item.is_live && (
            <Room idx={idx} item={item} style="column-4" />
          ))
        ) : (
          <SkeletonList theme={theme} />
        )}
      </div>
    </>
  );
}

export default RoomList;
