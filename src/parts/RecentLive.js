import axios from "axios";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AiFillGift } from "react-icons/ai";
import { BiLogInCircle } from "react-icons/bi";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaClock,
  FaUserFriends,
} from "react-icons/fa";
import { RiHistoryFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import ReactTimeago from "react-timeago";
import { Col, Row } from "reactstrap";
import { RECENT_LIVE_LOG_API } from "utils/api/api";
import formatNumber from "utils/formatNumber";
import formatViews from "utils/formatViews";

const RecentLive = () => {
  const [logs, setLogs] = useState([]);
  const [perPage, setPerpage] = useState(3);

  const getLiveDuration = (duration) => {
    const minutes = Math.floor(duration / 60000);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${remainingMinutes} minutes`;
    } else {
      return `${hours} hours ${remainingMinutes} minutes`;
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
    <div className="mb-4">
      <div className="d-flex align-items-center justify-content-between py-3">
        <h3>Recent Live</h3>
        <Link to="/live-history">
          <div
            className="d-flex align-items-center"
            style={{ color: "#ECFAFC" }}
          >
            <FaArrowRight className="mb-1 mr-2" size={25} />
            <h5>See More</h5>
          </div>
        </Link>
      </div>

      <Row>
        {logs.map((log, idx) => {
          const { member, live_info } = log;
          return (
            <Col key={idx} md="4" sm="12" className="mb-3">
              <div className="card-recent-live">
                <img className="recent-image" src={member?.img_alt} alt="" />
                <div className="recent-info-wrapper">
                  <div className="recent-icon">
                    <FaCalendarAlt size={18} />
                    <span className="font-weight-bold">
                      {moment(live_info?.date?.start).format("dddd, D MMMM")}
                    </span>
                  </div>
                  <div className="recent-icon">
                    <FaUserFriends size={18} />
                    {formatNumber(live_info?.viewers)} Views
                  </div>
                  <div className="recent-icon">
                    <FaClock size={18} />
                    <span>{getLiveDuration(live_info?.duration)}</span>
                  </div>
                  <div className="recent-icon">
                    <AiFillGift size={18} />
                    {formatViews(log.points)} Gold
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <Link to={`/history/${member.url}/${log.data_id}`}>
                    <div className="recent-card-name">
                      <span className="recent-name">
                        {member?.url?.replace("JKT48_", "") + " JKT48"}
                        <BiLogInCircle size={20} />
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="col-6">
                  <div className="last-live">
                    <RiHistoryFill color="#ECFAFC" size={20} className="mr-1" />
                    <ReactTimeago
                      style={{
                        color: "#ECFAFC",
                        fontWeight: "600",
                        marginBottom: "1px",
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
  );
};

export default RecentLive;
