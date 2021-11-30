import React from 'react';
import Fade from 'react-reveal/Fade';
import Button from "elements/Button";
import { Link } from 'react-router-dom';
import { isMobile } from "react-device-detect";

export default function Room({ idx, item, children, style }) {
  return (
    <div key={idx} className={`item ${isMobile ? "column-12 row-1" : `${style} row-1`}`}>
      <Fade bottom>
        <div className="card card-featured">
          <Link to={`live-stream/${item.id}`}>
            {children}
            <figure className="img-wrapper">
              <img
                src={item.image_url}
                alt={item.name}
                className="img-cover"
              />
            </figure>
            <div className="meta-wrapper">
              <Button
                type="link"
                style={{ textDecoration: 'none' }}
                className="strecthed-link d-block text-white"
                href={`live-stream/${item.id}`}
              >
                <h5>{item.url_key.includes('JKT48') ? item.url_key.substr(6) + ' JKT48' : item.name}</h5>
              </Button>
            </div>
          </Link>
        </div>
      </Fade>
    </div>
  )
}
