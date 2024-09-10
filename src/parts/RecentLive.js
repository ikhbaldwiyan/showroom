import axios from "axios";
import moment from "moment";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { AiFillGift } from "react-icons/ai";
import { BiChevronLeft, BiChevronRight, BiLogInCircle } from "react-icons/bi";
import { FaCalendarAlt, FaClock, FaUserFriends } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  RiBroadcastFill,
  RiChatHistoryFill,
  RiHistoryFill
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { RECENT_LIVE_LOG_API } from "utils/api/api";
import formatNumber from "utils/formatNumber";
import formatViews from "utils/formatViews";
import { getLiveDurationMinutes } from "utils/getLiveDuration";
import ReactTimeago from "react-timeago";
import { isDesktop } from "react-device-detect";

const RecentLive = ({ isSearch }) => {
  const [logs, setLogs] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [perPage, setPerpage] = useState(6);
  const containerRef = useRef(null);

  const handleScroll = (scrollOffset) => {
    if (containerRef.current) {
      const newScrollPosition = scrollPosition + scrollOffset;
      const maxScrollLeft =
        containerRef.current.scrollWidth - containerRef.current.clientWidth;
      if (newScrollPosition >= 0 && newScrollPosition <= maxScrollLeft) {
        containerRef.current.scrollLeft = newScrollPosition;
        setScrollPosition(newScrollPosition);
      }
    }
  };

  useEffect(() => {
    async function getRoomList() {
      try {
        const history = await axios.get(
          RECENT_LIVE_LOG_API("date", 1, "active", -1, perPage, "")
        );
        const { recents, perpage } = history.data;
        setLogs(recents);
        setPerpage(perpage);
      } catch (error) {
        console.log(error);
      }
    }
    getRoomList();
    window.document.title = "Member Live History";
  }, []);

  return (
    logs.length > 0 &&
    !isSearch && (
      <div className="mb-4">
        <div className="d-flex align-items-center justify-content-between py-3">
          <h3>Live Terakhir</h3>
          <Link to="/live-history">
            <div
              className="d-flex align-items-center"
              style={{ color: "#ECFAFC" }}
            >
              <RiChatHistoryFill className="mb-2 mr-2" size={25} />
              <h5>See More</h5>
            </div>
          </Link>
        </div>

        <div className="scroll-menu-container">
          {isDesktop && (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => handleScroll(-100)}
              className={`arrow-button left ${
                scrollPosition === 0 ? "d-none" : ""
              }`}
            >
              <BiChevronLeft
                size={70}
                color="white"
                className={`arrow-button left ${
                  scrollPosition === 0 ? "d-none" : ""
                }`}
              />
            </motion.div>
          )}
          <div className="recent-live-container" ref={containerRef}>
            <Row className="flex-nowrap">
              {logs.map((log, idx) => {
                const { member, live_info } = log;
                return (
                  <Col
                    key={idx}
                    md="4"
                    sm="12"
                    className={`${idx !== 2 && "mb-3"}`}
                  >
                    <div className="card-recent-live">
                      <img
                        width="110"
                        height="auto"
                        className="recent-image"
                        src={member?.img_alt}
                        alt={member?.name}
                      />
                      <div className="recent-info-wrapper">
                        <div className="recent-icon">
                          <FaCalendarAlt size={18} />
                          <span className="font-weight-bold">
                            {moment(live_info?.date?.start).format(
                              "dddd, D MMMM"
                            )}
                          </span>
                        </div>
                        <div className="recent-icon">
                          <FaUserFriends size={18} />
                          {formatNumber(live_info?.viewers?.num)} Views
                        </div>
                        <div className="recent-icon">
                          <FaClock size={18} />
                          <span>
                            {getLiveDurationMinutes(live_info?.duration)}
                          </span>
                        </div>
                        <div className="recent-icon">
                          <RiBroadcastFill size={20} />
                          <b>
                            {log.type === "showroom" ? "Showroom" : "IDN Live"}
                          </b>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-1">
                      <div className="col-6">
                        <Link to={`/history/${member.url}/${log.data_id}`}>
                          <div className="recent-card-name">
                            {member?.url === "jkt48" ? (
                              <span className="recent-name">
                                JKT48 Official
                                <BiLogInCircle size={20} />
                              </span>
                            ) : (
                              <span className="recent-name">
                                {member?.nickname}
                                <BiLogInCircle className="ml-1" size={20} />
                              </span>
                            )}
                          </div>
                        </Link>
                      </div>
                      <div className="col-6">
                        <div className="last-live">
                          <RiHistoryFill
                            color="#ECFAFC"
                            size={20}
                            className="mr-1"
                          />
                          <ReactTimeago
                            style={{
                              color: "#ECFAFC",
                              fontWeight: "600",
                              marginBottom: "1px"
                            }}
                            date={live_info.date.end}
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            className={`arrow-button right ${
              scrollPosition >=
              containerRef.current?.scrollWidth -
                containerRef.current?.clientWidth
                ? "d-none"
                : ""
            }`}
            onClick={() => handleScroll(300)}
          >
            <BiChevronRight
              size={70}
              color="white"
              className={`arrow-button right ${
                scrollPosition >=
                containerRef.current?.scrollWidth -
                  containerRef.current?.clientWidth
                  ? "d-none"
                  : ""
              }`}
              onClick={() => handleScroll(200)}
            />
          </motion.div>
        </div>
        <hr style={{ borderColor: "white" }} />
      </div>
    )
  );
};

export default RecentLive;
