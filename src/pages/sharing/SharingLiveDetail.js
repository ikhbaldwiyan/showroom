import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Col, Container, Row } from "reactstrap";
import { DETAIL_SCHEDULE } from "utils/api/api";

import MainLayout from "pages/layout/MainLayout";
import SharingUsers from "./components/SharingUsers";
import SharingInfo from "./components/SharingInfo";
import ShowInfo from "./components/ShowInfo";

const SharingLiveDetail = (props) => {
  const [theater, setTheater] = useState();
  const [sharingUsers, setSharingUsers] = useState([]);
  const [isRegister, setIsRegister] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function getSharingDetail() {
      try {
        const response = await axios.get(DETAIL_SCHEDULE(id));
        setTheater(response.data);
        setSharingUsers(response.data.sharingUsers);
      } catch (error) {
        console.log(error);
      }
    }
    getSharingDetail();
    window.scrollTo(0, 0);
  }, [isRegister]);

  return (
    <MainLayout
      title={`${theater?.setlist?.name} - Sharing Live Theater JKT48`}
      keywords={`sharing showroom ${theater?.setlist?.name}, jadwal theater JKT48, jadwal theater ${theater?.setlist?.name}`}
      {...props}
    >
      <Container>
        <Row>
          <Col md="4">
            <ShowInfo
              theater={theater}
              sharingUsers={sharingUsers}
              setIsRegister={setIsRegister}
            />
          </Col>
          <Col md="4 mb-2">
            <SharingInfo
              theater={theater}
              sharingUsers={sharingUsers}
              setIsRegister={setIsRegister}
            />
          </Col>
          <Col md="4 mb-2">
            <SharingUsers sharingUsers={sharingUsers} />
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default SharingLiveDetail;
