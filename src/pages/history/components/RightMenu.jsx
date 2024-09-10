import axios from "axios";
import Search from "components/Search";
import { useState, useEffect } from "react";
import { AiFillGift } from "react-icons/ai";
import { BiLogInCircle } from "react-icons/bi";
import { FaClock, FaUserFriends } from "react-icons/fa";
import { GiPodiumWinner } from "react-icons/gi";
import { RiBroadcastFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import ReactTimeago from "react-timeago";
import { Button, Col, Row, Table } from "reactstrap";
import { RECENT_LIVE_LOG_API } from "utils/api/api";
import formatNumber from "utils/formatNumber";
import formatViews from "utils/formatViews";
import { gaTag } from "utils/gaTag";

const RightMenu = ({ gift, setSearch, filterName, id }) => {
  const [menu, setMenu] = useState("podium");
  const [recentLive, setRecentLive] = useState("");

  useEffect(() => {
    async function getRecentLive() {
      try {
        const history = await axios.get(
          RECENT_LIVE_LOG_API("date", 1, "active", -1, 6, "")
        );
        const { recents } = history.data;
        setRecentLive(recents);
      } catch (error) {
        console.log(error);
      }
    }
    getRecentLive();
  }, []);

  const handleChangeHistory = (name) => {
    gaTag(`Change History ${name}`, "History Page", "Change Room");
  };

  return (
    <>
      <Row>
        <Col className="d-flex">
          <Button
            className="menu"
            style={menu === "podium" ? buttonActive : buttonStyle}
            onClick={() => setMenu("podium")}
          >
            <GiPodiumWinner /> Podium
          </Button>
          <Button
            className="menu"
            style={menu === "gift" ? buttonActive : buttonStyle}
            onClick={() => setMenu("gift")}
          >
            <AiFillGift /> Gift
          </Button>
          <Button
            className="menu"
            style={menu === "recent" ? buttonActive : buttonStyle}
            onClick={() => setMenu("recent")}
          >
            <RiBroadcastFill /> Recent Live
          </Button>
        </Col>
      </Row>

      {menu === "podium" ? (
        <>
          <Table dark>
            <Search setSearch={setSearch} placeholder="Search podium name" />
            <div className="scroll-room">
              <thead
                style={{
                  backgroundColor: "#24a2b7",
                  color: "white",
                  borderTop: "none"
                }}
              >
                <tr>
                  <th>Rank</th>
                  <th>Ava</th>
                  <th>Username</th>
                </tr>
              </thead>
              {filterName &&
                filterName.map((item, idx) => (
                  <tbody key={idx}>
                    <tr>
                      <th className="text-center">{idx + 1}</th>
                      <td>
                        {recentLive?.type === "showroom" ? (
                          <img
                            width="40"
                            alt="avatar"
                            src={`https://static.showroom-live.com/image/avatar/${item.avatar_id}.png`}
                          />
                        ) : (
                          <img
                            width="50"
                            className="rounded"
                            alt="avatar"
                            src={item?.avatar_url}
                          />
                        )}
                      </td>
                      <td style={{ wordBreak: "break-word" }}>{item.name}</td>
                    </tr>
                  </tbody>
                ))}
            </div>
          </Table>
        </>
      ) : menu === "gift" ? (
        <Table dark>
          <div className="scroll-room">
            <thead
              style={{
                backgroundColor: "#24a2b7",
                color: "white",
                borderTop: "none"
              }}
            >
              <tr>
                <th>Img</th>
                <th>Name</th>
                <th>Num</th>
                <th>User</th>
              </tr>
            </thead>
            {gift &&
              gift.map((item, idx) => (
                <tbody key={idx}>
                  <tr>
                    <td>
                      <img width="40" alt="gift" src={item.img} />
                    </td>
                    <td style={{ wordBreak: "break-word" }}>{item.name}</td>
                    <td style={{ wordBreak: "break-word" }}>{item.num}x</td>
                    <td style={{ wordBreak: "break-word" }}>
                      <div className="d-flex align-items-center">
                        {item.user_count}
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
          </div>
        </Table>
      ) : (
        <div className="recent-live scroll-room">
          {recentLive.map((item, idx) => {
            const { member, live_info } = item;
            const memberName = member?.url?.replace("JKT48_", "") + " JKT48";
            return (
              id !== item.data_id && (
                <>
                  <div key={idx} className={`d-flex ${idx !== 0 && ""}`}>
                    <img
                      className="rounded"
                      width={120}
                      src={member?.img_alt}
                      alt=""
                    />
                    <div className="recent-info-wrapper">
                      <div className="recent-icon">
                        <h5 className="font-weight-bold text-lg">
                          {memberName}
                        </h5>
                      </div>
                      <div className="recent-icon">
                        <FaClock size={18} />
                        <ReactTimeago
                          style={{
                            color: "#ECFAFC",
                            fontWeight: "600",
                            marginBottom: "1px"
                          }}
                          date={live_info.date.end}
                        />
                      </div>
                      <div className="recent-icon">
                        <FaUserFriends size={18} />
                        {formatNumber(live_info?.viewers?.num)} Views
                      </div>
                      <div className="recent-icon">
                        <Link
                          onClick={() => handleChangeHistory(memberName)}
                          to={`/history/${member.url}/${item.data_id}`}
                        >
                          <Button size="sm" color="dark">
                            <span className="recent-name">
                              Detail History
                              <BiLogInCircle size={20} />
                            </span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <hr style={{ borderColor: "white" }} />
                </>
              )
            );
          })}
        </div>
      )}
    </>
  );
};

export default RightMenu;

const buttonStyle = {
  backgroundColor: "teal",
  border: "none"
};

const buttonActive = {
  backgroundColor: "#008b9b",
  border: "none"
};
