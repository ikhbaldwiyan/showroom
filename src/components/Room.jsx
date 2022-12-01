import React from 'react';
import Fade from 'react-reveal/Fade';
import Button from "elements/Button";
import { Link } from 'react-router-dom';
import { isMobile } from "react-device-detect";
import RemoveRoomModal from "./RemoveRoomModal";

export default function Room({ idx, item, children, style, isRemove, isFavoriteRoom, theme }) {
  const roomURL = isRemove ? "#" : `room/${item.url_key ?? item.room_url_key}/${item.id ?? item.room_id}`;

  return (
    <div key={idx} className={`item ${isMobile ? "column-12 row-1" : `${style} row-1`}`}>
      <Fade bottom>
        <div className="card card-featured">
          <Link to={roomURL}>
            {children}
            {isFavoriteRoom && isRemove && (
              <div style={{ zIndex: 99 }}>
                <RemoveRoomModal roomId={item.room_id} theme={theme}>
                  <div className="tag" style={{ backgroundColor: "#CC2636" }}>
                    X
                  </div>
                </RemoveRoomModal>
              </div>
            )}
            <figure className="img-wrapper">
              <img
                src={item.image_url ?? item.image}
                alt={item.name}
                className="img-cover"
              />
            </figure>
            <div className="meta-wrapper" style={{ zIndex: isRemove && -9 }}>
              <Button
                type="link"
                style={{ textDecoration: 'none' }}
                className="strecthed-link d-block text-white"
                href={roomURL}
              >
                <h5>{item.url_key ? item.url_key.substr(6) + ' JKT48' : item.room_url_key.substr(6) + ' JKT48'}</h5>
              </Button>
            </div>
          </Link>
        </div>
      </Fade>
    </div>
  )
}
