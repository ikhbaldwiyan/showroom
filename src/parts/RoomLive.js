import React, { useState, useEffect } from 'react';
import Room from 'components/Room';
import { RiBroadcastFill } from "react-icons/ri";

export default function RoomLive({room}) {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    for (let i = 0; i < room.length; i++) {
      const roomLive = room[i];
      const memberLive = roomLive.name.includes("JKT48") && roomLive.is_live
      memberLive && setIsLive(true);
    }
  });

  return (
    isLive && (
      <div className="mb-4">
        {isLive && <h3 className="mb-3">Live Now</h3>}
        <div className="container-grid">
          {room.map((item, idx) => (
            item.name.includes("JKT48") && item.is_live && (
              <Room key={idx} item={item} style="column-6">
                <div className="tag" style={{backgroundColor: '#dc3545'}}>
                  <RiBroadcastFill className="mb-1" /> Live <span className="font-weight-light">Now</span>
                </div>
              </Room>
            )
          ))}
        </div>
      </div>
    )
  );
}
