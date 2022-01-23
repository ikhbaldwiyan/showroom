import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { FaUser } from 'react-icons/fa';
import Fade from 'react-reveal';

import { API } from "utils/api/api";
import getTimes from 'utils/getTimes';
import Button from 'elements/Button';
import SkeletonLive from './skeleton/SkeletonLive';

export default function RoomLive({theme}) {
  const [loading, setLoading] = useState(false);
  const [onLive, setOnLive] = useState([]);
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    async function getRoomLive() {
      const room = await axios.get(`${API}/rooms/onlives`)
      const onLive = room.data;
      onLive && onLive.length && setOnLive(onLive)

      if (onLive.length !== undefined) {
        setIsLive(true)
      } else {
        setIsLive(false)
      }
    }
    getRoomLive();
  }, [onLive]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  return (
    isLive && (
      <div className="mb-4">
        <h3 className="mb-3"> {loading && 'Loading'} Room Live </h3>
        {loading && !isMobile || onLive.length === 0 ? <SkeletonLive theme={theme} liveLength={onLive.length} /> : (
          <div className="container-grid">
            {onLive.map((item, idx) => (
              <div key={idx} className={`item ${isMobile ? "column-12 row-1" : `column-3 row-1`}`}>
                <Link to={`live-stream/${item.room_id}`}>
                  <div className="card card-featured">
                    <Fade right>
                      <div className="tag">
                        <FaUser style={{ width: '10' }} className="mb-1" />{' '}
                        {item.view_num}
                      </div>
                      <figure className="img-wrapper">
                        <img
                          src={item.image_square ?? item.image}
                          alt={item.room_name}
                          className="img-cover"
                        />
                      </figure>
                      <div className="meta-wrapper">
                        <Button
                          type="link"
                          style={{ textDecoration: 'none' }}
                          className="d-block text-white"
                          href={`live-stream/${item.room_id}`}
                        >
                          <h5 className="d-inline">
                            {item.room_url_key.replace('_', ' ').replace('JKT48', '') + ' JKT48'}{' '}
                          </h5>
                          <h6 className="d-inline" style={{color: '#ced4da'}}>{getTimes(item.started_at)}</h6>
                        </Button>
                      </div>
                    </Fade>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  );
}
