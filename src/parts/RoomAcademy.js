import React from 'react';
import Room from 'components/Room';
import SkeletonList from './skeleton/SkeletonList';
import { isMobile } from 'react-device-detect';
import { MdOutlineSearchOff } from 'react-icons/md';

function RoomAcademy({ room, theme, isSearch, isSearchRegular }) {
  return (
    <>
      <h3 className="py-4">{!isSearch && 'Room Academy'}</h3>
      {room && room.length !== 0 ? (
        <div className="container-grid">
          {room.map(
            (item, idx) =>
              <Room idx={idx} item={item} style="column-4">
                {item.is_onlive && (
                  <div className="tag" style={{backgroundColor: '#CC2636'}}>
                    On Live
                  </div>
                )}
              </Room>
          )}
        </div>
      ) : isSearch ? (
        !isSearchRegular && <div className="mt-4">
          <p style={{ fontSize: 20 }}>
            <MdOutlineSearchOff className="mr-2" size={40} />
            Room Academy Not Found
          </p>
        </div>
      ) : (
        <div className="container-grid">
          {!isMobile && <SkeletonList theme={theme} />}
        </div>
      )}
    </>
  );
}

export default RoomAcademy;
