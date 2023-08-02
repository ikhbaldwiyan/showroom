import React from "react";
import axios from "axios";
import Search from "components/Search";
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";
import { AiFillGift } from "react-icons/ai";
import {
  FaCommentDots,
  FaComments,
  FaRegCalendarAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { GiPodiumWinner } from "react-icons/gi";
import {
  RiBookmark3Fill,
  RiPlayCircleLine,
  RiStopCircleLine,
  RiTimerFlashFill,
} from "react-icons/ri";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Col, Container, Row, Button, Table } from "reactstrap";
import { DETAIL_LIVE_HISTORY } from "utils/api/api";
import formatLongDate from "utils/formatLongDate";
import formatNumber from "utils/formatNumber";
import formatViews from "utils/formatViews";
import { getLiveDuration } from "utils/getLiveDuration";
import MainLayout from "./layout/MainLayout";

const DetailLiveHistory = (props) => {
  let { id } = useParams();
  const [history, setHistory] = useState();
  const [rank, setRank] = useState([]);
  const [menu, setMenu] = useState("podium");
  const [gift, setGift] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getDetailHistory() {
      try {
        const response = await axios.get(DETAIL_LIVE_HISTORY(id));
        const data = response.data;
        setHistory(data);
        setRank(data.fans);
        setGift(data.live_info.gift.list);
        window.document.title = `${response.data?.room_info?.name}Live History`;
      } catch (error) {
        console.log(error);
      }
    }
    getDetailHistory();
    window.scrollTo(0, 0);
  }, [search]);

  const filterName = !search
    ? rank
    : rank.filter((data) =>
        data.name.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <MainLayout {...props}>
      <Container>
        <Row className="mb-4">
          <Col md="4">
            <img
              className="rounded-lg"
              width="100%"
              alt={history?.room_info?.name}
              src={history?.room_info?.img.replace("m.jpeg", "l.jpeg")}
            />
            <div className="row mt-3">
              <div className="col-6">
                <div className="live-start">
                  <div className="live-info-wrapper mt-1">
                    <RiPlayCircleLine
                      className="mb-2"
                      color="#ECFAFC"
                      size={50}
                    />
                    <div className="mt-1">
                      <span className="live-text">Live Start</span>
                      <p className="theater-time mt-1">
                        {formatLongDate(history?.live_info.date.start, true)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="live-end">
                  <div className="live-info-wrapper mt-1">
                    <RiStopCircleLine
                      className="mb-2"
                      color="#ECFAFC"
                      size={50}
                    />
                    <div className="mt-1">
                      <span className="live-text">Live End</span>
                      <p className="theater-time mt-1">
                        {formatLongDate(history?.live_info.date.end, true)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12">
                <div className="live-duration">
                  <div className="duration-wrapper mt-1">
                    <RiTimerFlashFill
                      className="mb-2 ml-1"
                      color="#ECFAFC"
                      size={50}
                    />
                    <div className="mt-1">
                      <span className="live-text">Duration</span>
                      <p className="theater-time mt-1">
                        {getLiveDuration(
                          history?.live_info.date.start,
                          history?.live_info.date.end
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12">
                <div className="live-date">
                  <div className="duration-wrapper mt-1">
                    <FaRegCalendarAlt
                      className="mb-2 ml-1"
                      color="#ECFAFC"
                      size={50}
                    />
                    <div className="mt-1">
                      <span className="live-text">Live Date</span>
                      <p className="theater-time mt-1">
                        {moment(history?.live_info.date.start).format(
                          "dddd DD MMMM YYYY"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row py-3">
              <div className="col-12">
                <div className="live-start">
                  <div className="duration-wrapper mt-1">
                    <FaComments
                      className="mb-2 ml-1"
                      color="#ECFAFC"
                      size={50}
                    />
                    <div className="mt-1">
                      <span className="live-text">Comments</span>
                      {history?.live_info?.comments ? (
                        <p className="theater-time mt-1">
                          <FaCommentDots className="mb-1 mr-1" />
                          {formatNumber(history?.live_info?.comments?.num)} of
                          <FaUser className="mb-1 ml-2" />{" "}
                          {formatNumber(history?.live_info?.comments?.users)}{" "}
                          Users
                        </p>
                      ) : (
                        <p>Data comments not found</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md="4">
            <div className="main-title-log">
              <div className="duration-wrapper mt-1">
                <RiBookmark3Fill
                  className="mb-2 ml-1"
                  color="#ECFAFC"
                  size={55}
                />
                <div className="mt-1">
                  <span className="main-title-text">
                    {history?.room_info?.url.replace("JKT48_", " ")} History Log
                  </span>
                  <p className="text-lg mt-1">
                    {moment(history?.live_info.date.start).format(
                      "DD MMMM YYYY"
                    )}{" "}
                    {formatLongDate(history?.live_info.date.start, true)} -{" "}
                    {formatLongDate(history?.live_info.date.end, true)}
                  </p>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-6">
                <div className="viewers">
                  <div className="viewers-wrapper mt-1">
                    <FaUsers className="mb-2 ml-2" color="#ECFAFC" size={45} />
                    <div className="mt-1">
                      <span className="live-text">Viewers</span>
                      <p className="theater-time mt-1">
                        {formatNumber(history?.live_info.viewer)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="gift">
                  <div className="viewers-wrapper mt-1">
                    <AiFillGift
                      className="mb-2 ml-2"
                      color="#ECFAFC"
                      size={45}
                    />
                    <div className="mt-1">
                      <span className="live-text">Gift</span>
                      <p className="theater-time mt-1">
                        {formatNumber(history?.total_point)} G
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="top-gift-card my-3">
              <div className="row">
                <div className="col-12">
                  <div className="top-gift-title">
                    <AiFillGift size={24} />
                    <span className="text-lg font-weight-bold">
                      TOP GIFT LIST
                    </span>
                  </div>
                  <hr style={{ borderColor: "white" }} />
                  {Array.from(
                    { length: Math.ceil(Math.min(gift.length, 10) / 2) },
                    (_, rowIndex) => (
                      <div key={rowIndex} className="row">
                        {gift
                          .slice(rowIndex * 2, rowIndex * 2 + 2)
                          .map((item, idx) => (
                            <div
                              key={idx}
                              className={`col-6 ${
                                rowIndex !== 0 ? "mt-3" : ""
                              }`}
                            >
                              <div className="gift-wrapper">
                                <img
                                  width="35"
                                  className="mr-1"
                                  alt="gift"
                                  src={item.img}
                                />
                                <div className="d-flex flex-start flex-column">
                                  <span
                                    style={{
                                      fontSize: "14px",
                                      color: "#ECFAFC",
                                    }}
                                  >
                                    {item.name}
                                  </span>
                                  <span
                                    style={{
                                      fontSize: "14px",
                                    }}
                                  >
                                    {item.num} x
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </Col>

          <Col md="4">
            <Button
              className="menu"
              style={menu === "podium" ? buttonActive : buttonStyle}
              onClick={() => setMenu("podium")}
            >
              <GiPodiumWinner className="mb-1" /> Podium
            </Button>
            <Button
              className="menu"
              style={menu === "gift" ? buttonActive : buttonStyle}
              onClick={() => setMenu("gift")}
            >
              <AiFillGift className="mb-1" /> Gift
            </Button>

            {menu === "podium" ? (
              <>
                <Table dark>
                  <Search
                    setSearch={setSearch}
                    placeholder="Search podium name"
                  />
                  <div className="scroll-room">
                    <thead
                      style={{
                        backgroundColor: "#24a2b7",
                        color: "white",
                        borderTop: "none",
                      }}
                    >
                      <tr>
                        <th>Rank</th>
                        <th>Ava</th>
                        <th>Username</th>
                        <th>Points</th>
                      </tr>
                    </thead>
                    {filterName &&
                      filterName.map((item, idx) => (
                        <tbody key={idx}>
                          <tr>
                            <th className="text-center">{idx + 1}</th>
                            <td>
                              <img
                                width="40"
                                alt="avatar"
                                src={`https://static.showroom-live.com/image/avatar/${item.avatar_id}.png`}
                              />
                            </td>
                            <td style={{ wordBreak: "break-word" }}>
                              {item.name}
                            </td>
                            <td>{formatViews(item.fans_point)}</td>
                          </tr>
                        </tbody>
                      ))}
                  </div>
                </Table>
              </>
            ) : (
              <Table dark>
                <div className="scroll-room">
                  <thead
                    style={{
                      backgroundColor: "#24a2b7",
                      color: "white",
                      borderTop: "none",
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
                          <td style={{ wordBreak: "break-word" }}>
                            {item.name}
                          </td>
                          <td style={{ wordBreak: "break-word" }}>
                            {item.num}x
                          </td>
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
            )}
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </MainLayout>
  );
};

export default DetailLiveHistory;

const buttonStyle = {
  backgroundColor: "teal",
  border: "none",
};

const buttonActive = {
  backgroundColor: "#008b9b",
  border: "none",
};
