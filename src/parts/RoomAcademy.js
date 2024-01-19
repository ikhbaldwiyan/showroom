import React from 'react';
import Room from 'components/Room';
import SkeletonList from './skeleton/SkeletonList';
import { isMobile } from 'react-device-detect';
import { MdOutlineSearchOff } from 'react-icons/md';
import useWindowDimensions from "utils/useWindowDimension";

function RoomAcademy({ room, theme, isSearch, isSearchRegular, title }) {
  const { width } = useWindowDimensions();
  const style = width > 1500 ? "column-3" : "column-4";

  return (
    <>
      <h3 className="py-4">{!isSearch && title}</h3>
      {room && room.length !== 0 ? (
        <div className="container-grid">
          {room.map(
            (item, idx) =>
              <Room idx={idx} item={item} style={style}>
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
