import axios from "axios";
import React, { useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import Room from 'pages/jeketi/Room'

export default function MostPicked() {
  const [room, setRoom] = useState([]);

  useEffect(() => {
    axios.get('/room_status_list.json').then((res) => {
      const listRoom = res.data;
      setRoom(listRoom);
    })
  });

  return (
    <section className="container">
      <Fade bottom>
        <div className="item column-12 mb-3">
          <center>
            <img
              width="600"
              src="https://image.showroom-cdn.com/showroom-prod/image/top_slider/0f2072404986edd4f5883e76c7a45a84.png"
              className="img-fluid"
              alt="showroom"
            />
          </center>
        </div>
        
        <div className="container-grid">
          {/* Is live */}
          {room.map((item, idx) => (
            item.name.includes("JKT48") && item.is_live && (
              <Room idx={idx} item={item} style="column-6">
                <div className="tag" style={{backgroundColor: '#dc3545'}}>
                  Live <span className="font-weight-light">Now</span>
                </div>
              </Room>
            )
          ))}

          {/* Upcoming live */}
          {room.map((item, idx) => (
            item.name.includes("JKT48") && item.next_live_schedule !== 0 && (
              <Room idx={idx} item={item} style="column-6">
                <div className="tag" style={{backgroundColor: 'teal'}}>
                  Upcoming <span className="font-weight-light">Live</span>
                </div>
              </Room>
            )
          ))}

          {/* Not Live */}
          {room.map((item, idx) => (
            item.name.includes("JKT48") && !item.next_live_schedule && !item.is_live && (
              <Room idx={idx} item={item}  style="column-4" />
            )
          ))}
        </div>
      </Fade>
    </section>
  );
}
