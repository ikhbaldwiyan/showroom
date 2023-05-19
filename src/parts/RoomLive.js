import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { FaUser } from "react-icons/fa";
import { IoVideocamOff } from "react-icons/io5";
import Fade from "react-reveal";

import { ROOM_LIVES_API } from "utils/api/api";
import getTimes from "utils/getTimes";
import Button from "elements/Button";
import SkeletonLive from "./skeleton/SkeletonLive";
import formatViews from "utils/formatViews";
import { useDispatch, useSelector } from "react-redux";
import {
  getRoomLiveFailed,
  getRoomLiveLoad,
  getRoomLiveSuccess,
} from "redux/actions/roomLives";

export default function RoomLive({ theme, search, isOnLive }) {
  const { data, isLoading, isLive } = useSelector((state) => state.roomLives);
  const roomLive = data;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoomLiveLoad());
  }, []);

  useEffect(() => {
    async function getRoomLive() {
      const room = await axios.get(ROOM_LIVES_API);
      const roomLiveFilter = room?.data?.filter(
        (room) => room.premium_room_type !== 1
      );

      if (roomLiveFilter.length >= 1) {
        dispatch(getRoomLiveSuccess(roomLiveFilter));
      } else {
        dispatch(getRoomLiveFailed());
      }
    }
    getRoomLive();
  }, []);

  const filteredLive = !search
    ? roomLive
    : roomLive.filter((room) =>
        room.main_name.toLowerCase().includes(search.toLowerCase())
      );

  return isLive ? (
    <div className="mb-4">
      <h3 className="mb-3"> {isLoading && "Loading"} Room Live </h3>
      {isLoading && !isMobile ? (
        <SkeletonLive theme={theme} liveLength={roomLive.length} />
      ) : filteredLive.length !== 0 ? (
        <div className="container-grid">
          {filteredLive.map(
            (item, idx) =>
              item.premium_room_type !== 1 && (
                <div
                  key={idx}
                  className={`item ${
                    isMobile ? "column-12 row-1" : `column-3 row-1`
                  }`}
                >
                  <Link
                    to={`room/${item.url_key ?? item.room_url_key}/${
                      item.id ?? item.room_id
                    }`}
                  >
                    <div className="card card-featured">
                      <Fade right>
                        <div className="tag">
                          <FaUser style={{ width: "10" }} className="mb-1" />{" "}
                          {formatViews(item.view_num)}
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
                            style={{ textDecoration: "none" }}
                            className="d-block text-white"
                            href={`room/${item.url_key ?? item.room_url_key}/${
                              item.id ?? item.room_id
                            }`}
                          >
                            <h5 className="d-inline">
                              {item.room_url_key
                                .replace("_", " ")
                                .replace("JKT48", "") + " JKT48"}{" "}
                            </h5>
                            <h6
                              className="d-inline"
                              style={{ color: "#ced4da" }}
                            >
                              {getTimes(item.started_at)}
                            </h6>
                          </Button>
                        </div>
                      </Fade>
                    </div>
                  </Link>
                </div>
              )
          )}
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
  ) : isOnLive ? (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-5 text-center">
          <IoVideocamOff size={100} />
          <h3 className="mt-3">Room Live Not Found</h3>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
