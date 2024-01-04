import axios from "axios";
import MainLayout from "pages/layout/MainLayout";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Col, Row } from "reactstrap";
import { ROOM_LIVE_IDN_DETAIL } from "utils/api/api";

import { gaTag } from "utils/gaTag";
import { getSession } from "utils/getSession";
import { activityLog } from "utils/activityLog";
import RoomMulti from "./components/RoomMulti";
import { RoomPlayer } from "./components/RoomPlayer";

const MultiRoomIDN = () => {
  let { id } = useParams();
  const [live, setLive] = useState("");
  const { profile, userProfile } = getSession();
  const [roomOne, setRoomOne] = useState("");
  const [roomTwo, setRoomTwo] = useState("");

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

  useEffect(() => {
    if (userProfile && live?.stream_url) {
      activityLog({
        logName: "Watch",
        userId: userProfile?._id,
        description: `Watch Multi Room IDN Live`,
        liveId: live.slug,
      });
    }

    gaTag({
      action: "watch_idn_live",
      category: "IDN Live",
      label: "Watch IDN - Live Stream",
      username: profile?.name,
      room: live?.user?.username,
    });
  }, [id, live]);

  return (
    <MainLayout title={`Multi Room - IDN Live`}>
      <div className="layout">
        <Row>
          <Col md="4">
            <RoomPlayer number="1" data={roomOne} />
          </Col>
          <Col md="4">
            <RoomPlayer number="2" data={roomTwo} />
          </Col>
          <Col md="4">
            <RoomMulti setRoomOne={setRoomOne} setRoomTwo={setRoomTwo} />
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default MultiRoomIDN;
