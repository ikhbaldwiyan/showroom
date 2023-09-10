import axios from "axios";
import MenuSetlist from "pages/theater/components/MenuSetlist";
import SetlistInfo from "pages/theater/components/SetlistInfo";
import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaRegClock, FaTheaterMasks } from "react-icons/fa";
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
}) => {
  const [theater, setTheater] = useState({})
  const [menu, setMenu] = useState("theater");

  useEffect(() => {
    const getTodayTheater = () => {
      axios.get(TODAY_SCHEDULE_API).then((res) => {
        setTheater(res.data)
      })
    }
    getTodayTheater()
  }, [])

  return (
    <Row>
      <Col md="6">

        <MenuSetlist menu={menu} setMenu={setMenu} />
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
                  {theater?.setlist?.name ?? <Loading size={20} color="#ECFAFC" />}
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
          <div className="info-container" style={{ backgroundColor: "#865CD6" }}>
            <div className="menu-setlist mt-1">
              <FaRegClock className="mb-2" color="#ECFAFC" size={35} />
              <div className="mt-1">
                <span className="info-theater">Show Time</span>
                <p className="theater-time mt-1">{theater?.showTime + " WIB"}</p>
              </div>
            </div>
          </div>
        </div>
        <h3
          className="py-3 text-danger text-center"
          onClick={() => setIsCustomLive(!isCustomLive)}
        >
          Maaf anda belum punya tiket untuk show ini
        </h3>
        <p className="text-center">
          {getSession().session ? (
            <>
              Silahkan  cek <Link to="/theater-schedule">jadwal theater</Link> untuk
              beli tiket
            </>
          ) : (
            <>
              Silahkan <Link to="/login">Login</Link> jika sudah punya tiket atau cek <Link to="/theater-schedule">jadwal theater</Link> untuk
              beli tiket
            </>
          )}
        </p>
      </Col>
      <Col md="4 mb-2">
      </Col>
    </Row>
  );
};

export default NoTicket;
