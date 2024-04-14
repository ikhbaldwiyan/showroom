import axios from "axios";
import Button from "elements/Button";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { FaUser } from "react-icons/fa";
import { Fade } from "react-reveal";
import { Link } from "react-router-dom";
import { ROOM_LIVES_IDN } from "utils/api/api";
import formatLongDate from "utils/formatLongDate";
import formatViews from "utils/formatViews";

const IDNLiveList = () => {
  const [roomLives, setRoomLives] = useState([]);

  useEffect(() => {
    try {
      axios.get(ROOM_LIVES_IDN).then((res) => {
        const filterLive = res.data.filter((item) => item.user.name.includes("JKT48"));
        setRoomLives(filterLive);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    roomLives.length > 0 && (
      <div className="mb-4">
        <h3 className="mb-3">IDN Live</h3>
        <div className="container-grid">
          {roomLives?.map((item, idx) => (
            <div
              key={idx}
              className={`item ${
                isMobile ? "column-12 row-1" : `column-3 row-1`
              }`}
            >
              {/* <Link
                to={{
                  pathname: `idn/${item.user.username}`,
                  state: {
                   liveData: item,
                  },
                }}
              > */}
                <a href={`https://www.idn.app/${item.user.username}/live/${item.slug}`} target="_blank">
                  <div className="card card-featured">
                    <Fade right>
                      <div className="tag">
                        <FaUser size={15} /> {formatViews(item.view_count)}
                      </div>
                      <figure className="img-wrapper">
                        <img
                          src={item.user.avatar}
                          alt={item.user.name}
                          className="img-cover"
                        />
                      </figure>
                      <div className="meta-wrapper">
                        <Button
                          type="link"
                          style={{ textDecoration: "none" }}
                          className="d-block text-white"
                        >
                          <h5 className="d-inline mr-2">{item.user.name}</h5>
                          <h6 className="d-inline" style={{ color: "#ced4da" }}>
                            {formatLongDate(item.live_at, true)}
                          </h6>
                        </Button>
                      </div>
                    </Fade>
                  </div>
                </a>
              {/* </Link> */}
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default IDNLiveList;
