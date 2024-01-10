import { Col, Row } from "reactstrap";
import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";

import MainLayout from "pages/layout/MainLayout";
import RoomMulti from "./components/RoomMulti";
import RoomPlayer from "./components/RoomPlayer";
import useWindowDimensions from "utils/useWindowDimension";
import { getLocalStorage } from "utils/helpers";
import { ROOM_LIVE_IDN_DETAIL } from "utils/api/api";

const MultiRoomIDN = () => {
  const [roomOne, setRoomOne] = useState({});
  const [roomTwo, setRoomTwo] = useState({});
  const [roomThree, setRoomThree] = useState({});
  const [roomFour, setRoomFour] = useState({});
  const [layout, setLayout] = useState(
    localStorage.getItem("multi_room_idn") ?? "twoRoom"
  );
  const [column, setColumn] = useState("4");

  const settingsLayout = (type) => {
    setLayout(type);
    localStorage.setItem("multi_room_idn", type);
  };

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (layout === "twoRoom") {
      setColumn("4");
    } else if (layout === "threeRoom") {
      setColumn(width > 1500 ? "3" : "12");
    } else if (layout === "fourRoom") {
      setColumn("12");
    }
  }, [column, layout, width]);

  useEffect(() => {
    const roomOne = getLocalStorage("roomOne");
    const roomTwo = getLocalStorage("roomTwo");
    const roomThree = getLocalStorage("roomThree");
    const roomFour = getLocalStorage("roomFour");

    axios.get(ROOM_LIVE_IDN_DETAIL(roomOne?.user?.username)).then((res) => {
      res?.data && setRoomOne(roomOne);
    });

    axios.get(ROOM_LIVE_IDN_DETAIL(roomTwo?.user?.username)).then((res) => {
       res?.data && setRoomTwo(roomTwo);
    });

    axios.get(ROOM_LIVE_IDN_DETAIL(roomThree?.user?.username)).then((res) => {
       res?.data && setRoomThree(roomThree);
    });

    axios.get(ROOM_LIVE_IDN_DETAIL(roomFour?.user?.username)).then((res) => {
       res?.data && setRoomFour(roomFour);
    });
  }, []);

  const layoutColumns = useMemo(() => {
    if (layout === "twoRoom") {
      return (
        <>
          <Col md="4">
            <RoomPlayer
              number="1"
              data={roomOne}
              layout={layout}
              setRoomOne={setRoomOne}
            />
          </Col>
          <Col md="4">
            <RoomPlayer
              number="2"
              data={roomTwo}
              layout={layout}
              setRoomTwo={setRoomTwo}
            />
          </Col>
        </>
      );
    } else if (layout === "threeRoom") {
      return (
        <>
          <Col md="3">
            <RoomPlayer
              number="1"
              data={roomOne}
              layout={layout}
              setRoomOne={setRoomOne}
            />
          </Col>
          <Col md="3">
            <RoomPlayer
              number="2"
              data={roomTwo}
              layout={layout}
              setRoomTwo={setRoomTwo}
            />
          </Col>
          <Col md="3">
            <RoomPlayer
              number="3"
              data={roomThree}
              layout={layout}
              setRoomThree={setRoomThree}
            />
          </Col>
        </>
      );
    } else if (layout === "fourRoom") {
      return (
        <>
          <Col md="3">
            <RoomPlayer
              number="1"
              data={roomOne}
              layout={layout}
              setRoomOne={setRoomOne}
            />
          </Col>
          <Col md="3">
            <RoomPlayer
              number="2"
              data={roomTwo}
              layout={layout}
              setRoomTwo={setRoomTwo}
            />
          </Col>
          <Col md="3">
            <RoomPlayer
              number="3"
              data={roomThree}
              layout={layout}
              setRoomThree={setRoomThree}
            />
          </Col>
          <Col md="3">
            <RoomPlayer
              number="4"
              data={roomFour}
              layout={layout}
              setRoomFour={setRoomFour}
            />
          </Col>
        </>
      );
    }
    // Default layout if layout value is not recognized
    return null;
  }, [layout, roomOne, roomTwo, roomThree, roomFour]);

  return (
    <MainLayout title="Multi Room - IDN Live">
      <div className="layout">
        <Row>
          {layoutColumns}
          <Col md={column}>
            <RoomMulti
              layout={layout}
              roomOne={roomOne}
              roomTwo={roomTwo}
              roomThree={roomThree}
              roomFour={roomFour}
              setRoomOne={setRoomOne}
              setRoomTwo={setRoomTwo}
              setRoomThree={setRoomThree}
              setRoomFour={setRoomFour}
              settingsLayout={settingsLayout}
            />
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default MultiRoomIDN;
