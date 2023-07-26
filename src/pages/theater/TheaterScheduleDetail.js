import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Col, Container, Row } from "reactstrap";
import { DETAIL_SCHEDULE } from "utils/api/api";

import MainLayout from "pages/layout/MainLayout";
import MemberLineUp from "./components/MemberLineUp";
import MenuSetlist from "./components/MenuSetlist";
import SetlistInfo from "./components/SetlistInfo";
import Songs from "./components/Setlist";
import MainInfo from "./components/MainInfo";

const TheaterScheduleDetail = (props) => {
  const [menu, setMenu] = useState("theater");
  const [members, setMembers] = useState([]);
  const [theater, setTheater] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function getTheaterDetail() {
      try {
        const response = await axios.get(DETAIL_SCHEDULE(id));
        setTheater(response.data);
        setMembers(response.data.memberList);
      } catch (error) {
        console.log(error);
      }
    }
    getTheaterDetail();
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout {...props}>
      <Container>
        <Row>
          <Col md="4">
            <MenuSetlist menu={menu} setMenu={setMenu} />
            {menu === "theater" ? (
              <SetlistInfo theater={theater} />
            ) : menu === "setlist" ? (
              <Songs songs={theater?.setlist?.songs} />
            ) : "encore" ? (
              <Songs songs={theater?.setlist?.songs} isEncore />
            ) : null}
          </Col>
          <Col md="4 mb-2">
            <MainInfo theater={theater} />
          </Col>
          <Col md="4 mb-2">
            <MemberLineUp members={members} />
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default TheaterScheduleDetail;