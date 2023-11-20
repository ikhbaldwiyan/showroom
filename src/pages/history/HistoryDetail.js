import React from "react";
import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";
import { AiFillGift } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { RiBookmark3Fill } from "react-icons/ri";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Col, Container, Row } from "reactstrap";
import { DETAIL_LIVE_HISTORY } from "utils/api/api";
import formatLongDate from "utils/formatLongDate";
import formatNumber from "utils/formatNumber";
import MainLayout from "../layout/MainLayout";
import RightMenu from "./components/RightMenu";
import LiveInfo from "./components/LiveInfo";

const DetailLiveHistory = (props) => {
  let { id } = useParams();
  const [history, setHistory] = useState();
  const [rank, setRank] = useState([]);
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
  }, [search, id]);

  const filterName = !search
    ? rank
    : rank.filter((data) =>
        data.name.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <MainLayout {...props}>
      <div className="layout">
        <Row className="mb-4">
          <Col md="4">
            <LiveInfo history={history} />
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
                        {formatNumber(history?.live_info.viewers?.num)}
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
            <RightMenu
              id={id}
              gift={gift}
              setSearch={setSearch}
              filterName={filterName}
            />
          </Col>
        </Row>
        <Row></Row>
      </div>
    </MainLayout>
  );
};

export default DetailLiveHistory;
