import MainLayout from "pages/layout/MainLayout";
import React, { useState } from "react";
import { FaCalendarAlt, FaRegClock, FaTheaterMasks } from "react-icons/fa";
import { Col, Container, Row } from "reactstrap";
import MemberLineUp from "./components/MemberLineUp";
import MenuSetlist from "./components/MenuSetlist";
import SetlistInfo from "./components/SetlistInfo";

const TheaterScheduleDetail = (props) => {
  const [menu, setMenu] = useState("theater");

  return (
    <MainLayout {...props}>
      <Container>
        <Row>
          <Col md="4">
            <MenuSetlist menu={menu} setMenu={setMenu} />
            {menu === "theater" && (
              <SetlistInfo />
            )}
          </Col>
          <Col md="4 mb-2">
            <div className="theater-container">
              <div className="setlist-container">
                <div className="menu-setlist mt-1">
                  <FaTheaterMasks className="mb-2" color="#ECFAFC" size={65} />
                  <div className="mt-1">
                    <span className="setlist-name">Cara Meminum Ramune</span>
                    <p className="setlist-subname mt-2">Ramune No Nomikata</p>
                  </div>
                </div>
              </div>
              <div className="theater-info">
                <div className="info-container">
                  <div className="menu-setlist mt-1">
                    <FaCalendarAlt className="mb-2" color="#ECFAFC" size={35} />
                    <div className="mt-1">
                      <span className="info-theater">Theater Date</span>
                      <p className="theater-time mt-1">16 July 2023</p>
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
                      <p className="theater-time mt-1">19:00 WIB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md="4 mb-2">
            <MemberLineUp />
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default TheaterScheduleDetail;
