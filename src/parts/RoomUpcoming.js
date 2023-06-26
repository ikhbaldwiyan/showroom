import React, { useState, useEffect } from 'react';
import Room from 'components/Room';
import getSchedule from 'utils/getSchedule';

export default function RoomUpcoming({room, search}) {
  const [isUpcoming, setIsUpcoming] = useState(false);

  useEffect(() => {
    for (let i = 0; i < room.length; i++) {
      const upcoming = room[i];
      const upcomingLive = upcoming.next_live_schedule
      upcomingLive && setIsUpcoming(true)
    }
  }, [])
                                
  return (
    isUpcoming && !search && (
      <div className="py-2">
        <h3 className="mb-3">Upcoming Live</h3>
        <div className="container-grid">
          {room.map((item, idx) => (
           item.next_live_schedule !== 0 && (
              <Room key={idx} item={item} style="column-6">
                <div className="tag" style={{backgroundColor: '#18A2B8'}}>
                  <b>{getSchedule(item.next_live_schedule)}</b> 
                </div>
              </Room>
            )
          ))}
        </div>
      </div>
    )
  )
}
