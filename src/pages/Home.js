import axios from "axios";
import React, { useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';

import MainLayout from 'pages/layout/MainLayout';
import Room from 'components/Room';
import RoomLive from 'parts/RoomLive';
import RoomUpcoming from 'parts/RoomUpcoming';

function Home(props) {
  const [room, setRoom] = useState([]);

  useEffect(() => {
    axios.get('/room_status_list.json').then((res) => {
      const listRoom = res.data;
      setRoom(listRoom);
    })

    window.document.title = 'JKT48 Showroom'
  });

  return (
    <MainLayout {...props}>
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
          <RoomLive room={room} />
          <RoomUpcoming room={room} />
          <h3 className="mb-3">Room List</h3>
          <div className="container-grid">
            {room.map((item, idx) => (
              item.name.includes("JKT48") && !item.next_live_schedule && !item.is_live && (
                <Room idx={idx} item={item}  style="column-4" />
              )
            ))}
          </div>
        </Fade>
      </section>
    </MainLayout>
  );
}

export default Home;
