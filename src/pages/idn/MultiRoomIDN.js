import { Col, Row } from "reactstrap";
import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import moment from "moment";

import MainLayout from "pages/layout/MainLayout";
import RoomMulti from "./components/RoomMulti";
import RoomPlayer from "./components/RoomPlayer";
import useWindowDimensions from "utils/useWindowDimension";
import { getLocalStorage } from "utils/helpers";
import { ROOM_LIVE_IDN_DETAIL } from "utils/api/api";
import { activityLog } from "utils/activityLog";
import { getSession } from "utils/getSession";
import { gaTag } from "utils/gaTag";

const MultiRoomIDN = () => {
  const [roomOne, setRoomOne] = useState({});
  const [roomTwo, setRoomTwo] = useState({});
  const [roomThree, setRoomThree] = useState({});
  const [roomFour, setRoomFour] = useState({});
  const [roomFive, setRoomFive] = useState({});
  const [roomSix, setRoomSix] = useState({});
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
    } else if (layout === "fourRoom" || layout === "fiveRoom" || layout === "sixRoom") {
      setColumn("12");
    }
  }, [column, layout, width]);

  useEffect(() => {
    const roomOne = getLocalStorage("roomOne");
    const roomTwo = getLocalStorage("roomTwo");
    const roomThree = getLocalStorage("roomThree");
    const roomFour = getLocalStorage("roomFour");

    axios.get(ROOM_LIVE_IDN_DETAIL(roomOne?.user?.username)).then((res) => {
      res?.data?.is_live && setRoomOne(res.data);
    });

    axios.get(ROOM_LIVE_IDN_DETAIL(roomTwo?.user?.username)).then((res) => {
      res?.data?.is_live && setRoomTwo(res.data);
    });

    axios.get(ROOM_LIVE_IDN_DETAIL(roomThree?.user?.username)).then((res) => {
      res?.data?.is_live && setRoomThree(res.data);
    });

    axios.get(ROOM_LIVE_IDN_DETAIL(roomFour?.user?.username)).then((res) => {
      res?.data?.is_live && setRoomFour(res.data);
    });
  }, []);

  useEffect(() => {
    const { userProfile, profile } = getSession();

    if (
      roomOne?.user?.username ||
      roomTwo?.user?.username ||
      roomThree?.user?.username ||
      roomFour?.user?.username
    ) {
      activityLog({
        logName: "Watch",
        description: "Watch Multi Room IDN",
        liveId: moment().format("YYYY-MM-DD"),
        userId: userProfile?._id,
      });

      gaTag({
        action: "watch_multi_room_idn",
        category: "Multi Room - IDN",
        label: "IDN",
        username: userProfile?.name ?? profile?.name,
      });
    }
  }, [roomOne, roomTwo, roomThree, roomFour]);

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
    } else if (layout === "fiveRoom") {
      return (
        <>
          <Col md="2">
            <RoomPlayer
              number="1"
              data={roomOne}
              layout={layout}
              setRoomOne={setRoomOne}
            />
          </Col>
          <Col md="2">
            <RoomPlayer
              number="2"
              data={roomTwo}
              layout={layout}
              setRoomTwo={setRoomTwo}
            />
          </Col>
          <Col md="2">
            <RoomPlayer
              number="3"
              data={roomThree}
              layout={layout}
              setRoomThree={setRoomThree}
            />
          </Col>
          <Col md="2">
            <RoomPlayer
              number="4"
              data={roomFour}
              layout={layout}
              setRoomFour={setRoomFour}
            />
          </Col>
          <Col md="2">
            <RoomPlayer
              number="5"
              data={roomFive}
              layout={layout}
              setRoomFour={setRoomFive}
            />
          </Col>
        </>
      );
    } else if (layout === "sixRoom") {
      return (
        <>
          <Col md="2">
            <RoomPlayer
              number="1"
              data={roomOne}
              layout={layout}
              setRoomOne={setRoomOne}
            />
          </Col>
          <Col md="2">
            <RoomPlayer
              number="2"
              data={roomTwo}
              layout={layout}
              setRoomTwo={setRoomTwo}
            />
          </Col>
          <Col md="2">
            <RoomPlayer
              number="3"
              data={roomThree}
              layout={layout}
              setRoomThree={setRoomThree}
            />
          </Col>
          <Col md="2">
            <RoomPlayer
              number="4"
              data={roomFour}
              layout={layout}
              setRoomFour={setRoomFour}
            />
          </Col>
          <Col md="2">
            <RoomPlayer
              number="5"
              data={roomFive}
              layout={layout}
              setRoomFive={setRoomFive}
            />
          </Col>
          <Col md="2">
            <RoomPlayer
              number="6"
              data={roomSix}
              layout={layout}
              setRoomSix={setRoomSix}
            />
          </Col>
        </>
      );
    }
    // Default layout if layout value is not recognized
    return null;
  }, [layout, roomOne, roomTwo, roomThree, roomFour, roomFive, roomSix]);

  const isHeaderLayout = layout === "fiveRoom" || layout === "sixRoom"

  return (
    <MainLayout title="Multi Room - IDN Live" isMultiRoom={isHeaderLayout}>
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
              roomFive={roomFive}
              roomSix={roomSix}
              setRoomOne={setRoomOne}
              setRoomTwo={setRoomTwo}
              setRoomThree={setRoomThree}
              setRoomFour={setRoomFour}
              setRoomFive={setRoomFive}
              setRoomSix={setRoomSix}
              settingsLayout={settingsLayout}
            />
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default MultiRoomIDN;
