import axios from "axios";
import MainLayout from "pages/layout/MainLayout";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Col, Row } from "reactstrap";
import { ROOM_LIVE_IDN_DETAIL } from "utils/api/api";
import formatNumber from "utils/formatNumber";
import RoomListIDN from "./components/RoomListIDN";
import Player from "./components/Player";

const IDNLiveDetail = () => {
  const [live, setLive] = useState("");
  let { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);

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
            <Player
              url={live?.stream_url}
              views={formatNumber(live?.view_count ?? 0)}
              idnUrl={`https://www.idn.app/${id}/live/${live.slug}`}
            />
            <div className="d-flex mb-3">
              <h4 className="mr-2">
                <b>{live?.user?.name}</b> | {live?.title}
              </h4>
            </div>
          </Col>
          <Col>
            <RoomListIDN currentRoom={live?.user?.username} />
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default IDNLiveDetail;
