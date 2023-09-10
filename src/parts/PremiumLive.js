import axios from "axios";
import Button from "elements/Button";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { isMobile } from "react-device-detect";
import { FaUser } from "react-icons/fa";
import { IoVideocamOff } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Fade } from "react-reveal";
import { Link } from "react-router-dom";
import {
  getRoomPremiumLiveFailed,
  getRoomPremiumLiveLoad,
  getRoomPremiumLiveSuccess
} from "redux/actions/roomLives";
import { ROOM_LIVES_API, TODAY_SCHEDULE_API } from "utils/api/api";
import formatViews from "utils/formatViews";
import getTimes from "utils/getTimes";
import SkeletonLive from "./skeleton/SkeletonLive";

const PremiumLive = ({ theme }) => {
  const { premium_live, isLoading, isPremiumLive } = useSelector(
    (state) => state.roomLives
  );
  const dispatch = useDispatch();
  const [theater, setTheater] = useState({});

  useEffect(() => {
    dispatch(getRoomPremiumLiveLoad());
    async function getPremiumLive() {
      const room = await axios.get(ROOM_LIVES_API);
      const premiumLiveFilter = room?.data?.data?.filter(
        (room) => room.premium_room_type === 1
      );

      if (premiumLiveFilter.length > 0) {
        dispatch(getRoomPremiumLiveSuccess(premiumLiveFilter));
      } else {
        dispatch(getRoomPremiumLiveFailed());
      }
    }
    getPremiumLive();
  }, []);

  useEffect(() => {
    const getTodayTheater = () => {
      axios.get(TODAY_SCHEDULE_API).then((res) => {
        setTheater(res.data);
      });
    };
    getTodayTheater();
  }, []);

  return isPremiumLive ? (
    <Fade bottom>
      <div className="mb-2">
        <h3 className="my-3"> {isLoading && "Loading"} Premium Live </h3>
        {isLoading && !isMobile ? (
          <SkeletonLive theme={theme} liveLength={premium_live.length} />
        ) : premium_live.length !== 0 ? (
          <div className="container-grid">
            {premium_live.map((item, idx) => (
              <div
                key={idx}
                className={`item ${
                  isMobile ? "column-12 row-1" : `column-4 row-1`
                }`}
              >
                <Link
                  to={`room/${item.url_key ?? item.room_url_key}/${
                    item.id ?? item.room_id
                  }`}
                >
                  <div className="card card-featured">
                    <div className="tag">
                      <FaUser style={{ width: "10" }} className="mb-1" />{" "}
                      {formatViews(item.view_num)}
                    </div>
                    <figure className="img-wrapper">
                      <img
                        src={
                          theater?.setlist?.image ??
                          item.image.replace("s.png", "l.png")
                        }
                        alt={item.room_name}
                        className="img-cover"
                      />
                    </figure>
                    <div className="meta-wrapper">
                      <Button
                        type="link"
                        style={{ textDecoration: "none" }}
                        className="d-block text-white"
                        href={`room/${item.url_key ?? item.room_url_key}/${
                          item.id ?? item.room_id
                        }`}
                      >
                        <h5 className="d-inline">
                          {theater
                            ? theater?.setlist?.originalName
                            : item?.main_name}
                        </h5>
                        <h6 className="d-inline" style={{ color: "#ced4da" }}>
                          {" "}{getTimes(item.started_at)}
                        </h6>
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-12 mt-5 text-center">
                <IoVideocamOff size={100} />
                <h3 className="mt-3">Room Live Not Found</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fade>
  ) : (
    ""
  );
};

export default PremiumLive;
