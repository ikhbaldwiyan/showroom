import React, { useState, useEffect } from 'react';
import Room from 'pages/jeketi/Room';

export default function RoomUpcoming({room}) {
  const [isUpcoming, setIsUpcoming] = useState(false);

  useEffect(() => {
    for (let i = 0; i < room.length; i++) {
      const upcoming = room[i];
      const upcomingLive = upcoming.name.includes("JKT48") && upcoming.next_live_schedule
      upcomingLive && setIsUpcoming(true)
    }
  })
                                
  return (
    isUpcoming && (
      <div className="mb-4">
        <h3 className="mb-3">Upcoming Live</h3>
        <div className="container-grid">
          {room.map((item, idx) => (
            item.name.includes("JKT48") && item.next_live_schedule !== 0 && (
              <Room idx={idx} item={item} style="column-6">
                <div className="tag" style={{backgroundColor: 'teal'}}>
                  Upcoming <span className="font-weight-light">Live</span>
                </div>
              </Room>
            )
          ))}
        </div>
      </div>
    )
  )
}
