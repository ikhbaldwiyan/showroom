import axios from "axios";
import MenuSetlist from "pages/theater/components/MenuSetlist";
import SetlistInfo from "pages/theater/components/SetlistInfo";
import React, { useEffect, useState } from "react";
import {
  FaBirthdayCake,
  FaCalendarAlt,
  FaMoneyCheckAlt,
  FaRegClock,
  FaTheaterMasks,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { TODAY_SCHEDULE_API } from "utils/api/api";
import Songs from "pages/theater/components/Setlist";
import Loading from "./Loading";
import moment from "moment";
import { getSession } from "utils/getSession";

const NoTicket = ({
  isCustomLive,
  setIsCustomLive,
  customUrl,
  setCustomUrl,
}) => {
  const [theater, setTheater] = useState({});
  const [menu, setMenu] = useState("theater");

  useEffect(() => {
    const getTodayTheater = () => {
      axios.get(TODAY_SCHEDULE_API).then((res) => {
        setTheater(res.data);
      });
    };
    getTodayTheater();
  }, []);

  return (
    <Row>
      <Col md="6">
        <MenuSetlist
          menu={menu}
          setMenu={setMenu}
          isCustomLive={isCustomLive}
          customUrl={customUrl}
          setCustomUrl={setCustomUrl}
        />
        {menu === "theater" ? (
          <SetlistInfo theater={theater} />
        ) : menu === "setlist" ? (
          <Songs songs={theater?.setlist?.songs} />
        ) : "encore" ? (
          <Songs songs={theater?.setlist?.songs} isEncore />
        ) : null}
      </Col>
      <Col md="6 mb-2">
        <div className="d-flex justify-content-between">
          <div className="setlist-container">
            <div className="menu-setlist mt-1">
              <FaTheaterMasks className="mb-2" color="#ECFAFC" size={65} />
              <div className="mt-1">
                <span className="setlist-name">
                  {theater?.setlist?.name ?? (
                    <Loading size={20} color="#ECFAFC" />
                  )}
                </span>
                <p className="setlist-subname mt-2">
                  {theater?.setlist?.originalName}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="theater-info mt-2">
          <div className="info-container">
            <div className="menu-setlist mt-1">
              <FaCalendarAlt className="mb-2" color="#ECFAFC" size={35} />
              <div className="mt-1">
                <span className="info-theater">Theater Date</span>
                <p className="theater-time mt-1">
                  {moment(theater?.showDate).format("DD MMM YYYY")}
                </p>
              </div>
            </div>
          </div>
          <div
            className="info-container"
            style={{ backgroundColor: "#865CD6" }}
          >
            <div className="menu-setlist mt-1">
              <FaRegClock className="mb-2" color="#ECFAFC" size={35} />
              <div className="mt-1">
                <span className="info-theater">Show Time</span>
                <p className="theater-time mt-1">
                  {theater?.showTime + " WIB"}
                </p>
              </div>
            </div>
          </div>
        </div>
        {theater?.isBirthdayShow && (
          <div className="birthday-btn mt-2">
            <div className="menu-ticket">
              <FaBirthdayCake className="mb-2" color="#ECFAFC" size={70} />
              <div
                className="d-flex flex-column justify-content-center text-center"
                style={{
                  backgroundColor: "#ECFAFC",
                  borderRadius: "6px",
                  color: "#24A2B7",
                  width: "140px",
                  height: "60px",
                }}
              >
                <span
                  className="setlist-subname mt-3"
                  style={{ color: "#24A2B7", fontSize: "20px" }}
                >
                  <b>BIRTHDAY</b>
                </span>
                <p
                  className="setlist-subname mt-1"
                  style={{
                    color: "#24A2B7",
                    borderRadius: "6px",
                    fontSize: "20px",
                    textTransform: "uppercase",
                  }}
                >
                  <b>{theater?.birthdayMember?.stage_name}</b>
                </p>
              </div>
              <img
                className="member-image"
                src={theater?.birthdayMember?.image}
                alt=""
              />
            </div>
          </div>
        )}
        <h3
          className="py-2 text-danger text-center"
          onClick={() => setIsCustomLive(!isCustomLive)}
        >
          Maaf anda belum punya tiket untuk show ini
        </h3>
        <p className="text-center">
          {getSession().session ? (
            <>Silahkan klik button dibawah untuk beli tiket</>
          ) : (
            <>
              Silahkan <Link to="/login">Login</Link> jika sudah punya tiket
              atau klik button dibawah untuk beli tiket
            </>
          )}
        </p>
        <div className="ticket-info">
          <div className="menu-ticket">
            <FaMoneyCheckAlt className="mb-2" color="#ECFAFC" size={80} />
            <div className="d-flex flex-column justify-content-center text-center">
              <div className="ticket-name">SHOWROOM</div>
              <p className="setlist-subname mt-2">
                <b>385 JPY</b>
              </p>
            </div>
            <a href={theater?.ticketShowroom} target="_blank" rel="noreferrer">
              <button className="buy d-flex text-align-center justify-content-center align-items-center">
                Buy Ticket
              </button>
            </a>
          </div>
        </div>
      </Col>
      <Col md="4 mb-2"></Col>
    </Row>
  );
};

export default NoTicket;
