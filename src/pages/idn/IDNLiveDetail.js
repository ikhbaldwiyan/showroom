import axios from "axios";
import MainLayout from "pages/layout/MainLayout";
import Streaming from "pages/streaming/Stream";
import { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Col, Row } from "reactstrap";
import { ROOM_LIVE_IDN_DETAIL } from "utils/api/api";
import formatNumber from "utils/formatNumber";
import LiveButton from "elements/Button";
import RoomListIDN from "./components/RoomListIDN";

const IDNLiveDetail = () => {
  const [live, setLive] = useState("");
  let { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id])

  useEffect(() => {
    try {
      axios.get(ROOM_LIVE_IDN_DETAIL(id)).then((res) => {
        setLive(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  return (
    <MainLayout>
      <div className="layout">
        <Row>
          <Col md="8">
            <Streaming url={live?.stream_url} />
            <div className="d-flex mb-3">
              <h4 className="mr-2">
                <b>{live?.user?.name}</b> | {live?.title}
              </h4>
              <LiveButton  className="btn-sm btn-danger">
                <div className="d-flex align-items-center">
                  <FaUsers size={20} className="mr-1" />
                  {formatNumber(live?.view_count ?? 0)}
                </div>
              </LiveButton>
            </div>
          </Col>
          <Col>
            <RoomListIDN />
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default IDNLiveDetail;
