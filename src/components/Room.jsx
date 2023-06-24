import React from "react";
import Fade from "react-reveal/Fade";
import Button from "elements/Button";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

export default function Room({ idx, item, children, style }) {
  return (
    <div
      key={idx}
      className={`item ${isMobile ? "column-12 row-1" : `${style} row-1`}`}
    >
      <Fade bottom>
        <div className="card card-featured">
          <Link
            to={`room/${item.url_key ?? item.room_url_key}/${
              item.id ?? item.room_id
            }`}
          >
            {children}
            <figure className="img-wrapper">
              <img
                src={
                  item?.image_url ??
                  item?.image ??
                  item.image_l
                }
                alt={item?.name ?? item?.room_name}
                className="img-cover"
              />
            </figure>
            <div className="meta-wrapper">
              <Button
                type="link"
                style={{ textDecoration: "none" }}
                className="strecthed-link d-block text-white"
                href={`room/${item.url_key ?? item.room_url_key}/${
                  item.id ?? item.room_id
                }`}
              >
                <h5>
                  {item.url_key
                    ? item.url_key.substr(6) + " JKT48"
                    : item.room_url_key
                        .replace("JKT48_", "")
                        .replace("JKT48", "") + " JKT48"}
                </h5>
              </Button>
            </div>
          </Link>
        </div>
      </Fade>
    </div>
  );
}
