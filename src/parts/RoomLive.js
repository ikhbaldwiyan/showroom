import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { API } from 'utils/api/api';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import Button from 'elements/Button';
import Fade from 'react-reveal';
import SkeletonLive from './skeleton/SkeletonLive';

export default function RoomLive({theme}) {
  const [onLive, setOnLive] = useState([])
  
  useEffect(() => {
    async function getOnLives() {
      const room = await axios.get(`${API}/rooms/onlives`)
      const onLive = room.data;
      onLive && onLive.length && setOnLive(onLive)
    }
    getOnLives();
  }, [onLive]);

  return (
    onLive && (
      <div className="mb-4">
        <h3 className="mb-3">Room Live</h3>
        {onLive && onLive.length !== 0 ? (
          <div className="container-grid">
            {onLive.map((item, idx) => (
              <div key={idx} className={`item ${isMobile ? "column-12 row-1" : `column-3 row-1`}`}>
                <Link to={`live-stream/${item.room_id}`}>
                  <div className="card card-featured">
                    <Fade right>
                      <div className="tag" style={{backgroundColor: '#22a2b7'}}>
                        {item.label ? item.label : 'Live Now'}
                      </div>
                      <figure className="img-wrapper">
                        <img
                          src={item.image_square}
                          alt={item.room_name}
                          className="img-cover"
                        />
                      </figure>
                      <div className="meta-wrapper">
                        <Button
                          type="link"
                          style={{textDecoration: 'none'}}
                          className="strecthed-link d-block text-white"
                          href={`live-stream/${item.room_id}`}
                        >
                          <h5> {item.room_url_key.replace('_', ' ').replace('JKT48', '') + ' JKT48'} </h5>
                        </Button>
                      </div>
                    </Fade>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <SkeletonLive theme={theme} />
        )}
      </div>
    )
  );
}
