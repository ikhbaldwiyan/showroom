import axios from "axios";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BiLogInCircle } from "react-icons/bi";
import { FaCalendarAlt, FaClock, FaUserFriends } from "react-icons/fa";
import { RiHistoryFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import ReactTimeago from "react-timeago";
import { Table } from "reactstrap";
import { RECENT_LIVE_LOG_API } from "utils/api/api";
import formatNumber from "utils/formatNumber";
import { getLiveDurationMinutes } from "utils/getLiveDuration";

const HistoryLive = ({ id }) => {
  const [recentLive, setRecentLive] = useState("");

  useEffect(() => {
    async function getRecentLive() {
      try {
        const history = await axios.get(
          RECENT_LIVE_LOG_API("date", 1, "all", -1, 6, "", id)
        );
        const { recents } = history.data;
        setRecentLive(recents);
      } catch (error) {
        console.log(error);
      }
    }
    getRecentLive();
  }, []);

  return (
    <Table dark>
      <div className="scroll p-2">
        {recentLive &&
          recentLive?.map((item, idx) => {
            const { member, live_info } = item;
            return (
              <>
                <div className="card-recent-live">
                  <img
                    className="recent-image"
                    src={
                      member?.url === "officialJKT48"
                        ? "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/JKT48.svg/1200px-JKT48.svg.png"
                        : member?.img_alt
                    }
                    alt={member?.name}
                  />
                  <div className="recent-info-wrapper">
                    <div className="recent-icon">
                      <FaCalendarAlt size={18} />
                      <span className="font-weight-bold">
                        {moment(live_info?.date?.start).format("dddd, D MMMM")}
                      </span>
                    </div>
                    <div className="recent-icon">
                      <FaUserFriends size={18} />
                      {formatNumber(live_info?.viewers?.num)} Views
                    </div>
                    <div className="recent-icon">
                      <FaClock size={18} />
                      <span>{getLiveDurationMinutes(live_info?.duration)}</span>
                    </div>
                  </div>
                </div>
                <div className="row mt-1">
                  <div className="col-6">
                    <Link to={`/history/${member.url}/${item.data_id}`}>
                      <div className="recent-card-name">
                        {member?.url === "officialJKT48" ? (
                          <span className="recent-name">
                            JKT48 Official
                            <BiLogInCircle size={20} />
                          </span>
                        ) : (
                          <span className="recent-name">
                            Detail Live
                            <BiLogInCircle size={20} />
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
                          marginBottom: "1px",
                        }}
                        date={live_info.date.end}
                      />
                    </div>
                  </div>
                </div>
                <hr style={{ borderColor: "white" }} />
              </>
            );
          })}
      </div>
    </Table>
  );
};

export default HistoryLive;
