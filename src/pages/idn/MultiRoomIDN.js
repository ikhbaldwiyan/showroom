import MainLayout from "pages/layout/MainLayout";
import { useState } from "react";
import { Button, Col, Row } from "reactstrap";

import RoomMulti from "./components/RoomMulti";
import RoomPlayer from "./components/RoomPlayer";

const MultiRoomIDN = () => {
  const [roomOne, setRoomOne] = useState("");
  const [roomTwo, setRoomTwo] = useState("");
  const [roomThree, setRoomThree] = useState("");
  const [roomFour, setRoomFour] = useState("");
  const [layout, setLayout] = useState(
    localStorage.getItem("multi_room_idn") ?? "twoRoom"
  );

  const ChooseRoom = () => (
    <RoomMulti
      setRoomOne={setRoomOne}
      setRoomTwo={setRoomTwo}
      setRoomThree={setRoomThree}
      setRoomFour={setRoomFour}
      layout={layout}
    />
  );

  const settingsLayout = (type) => {
    setLayout(type);
    localStorage.setItem("multi_room_idn", type);
  };

  return (
    <MainLayout title="Multi Room - IDN Live">
      <div className="layout">
        <Row>
          <Col md="12" className="mb-3">
            <Button
              className="mr-2"
              color="info"
              onClick={() => settingsLayout("twoRoom")}
            >
              2 Room
            </Button>
            <Button
              className="mr-2"
              color="info"
              onClick={() => settingsLayout("threeRoom")}
            >
              3 Room
            </Button>
            <Button
              className="mr-1"
              color="info"
              onClick={() => settingsLayout("fourRoom")}
            >
              4 Room
            </Button>
          </Col>

          {layout === "twoRoom" && (
            <>
              <Col md="4">
                <RoomPlayer number="1" data={roomOne} layout={layout} />
              </Col>
              <Col md="4">
                <RoomPlayer number="2" data={roomTwo} layout={layout} />
              </Col>
              <Col md="4">
                <ChooseRoom />
              </Col>
            </>
          )}

          {layout === "threeRoom" && (
            <>
              <Col md="3">
                <RoomPlayer number="1" data={roomOne} layout={layout} />
              </Col>
              <Col md="3">
                <RoomPlayer number="2" data={roomTwo} layout={layout} />
              </Col>
              <Col md="3">
                <RoomPlayer number="3" data={roomThree} layout={layout} />
              </Col>
              <Col md="3">
                <ChooseRoom />
              </Col>
            </>
          )}

          {layout === "fourRoom" && (
            <>
              <Col md="3">
                <RoomPlayer number="1" data={roomOne} layout={layout} />
              </Col>
              <Col md="3">
                <RoomPlayer number="2" data={roomTwo} layout={layout} />
              </Col>
              <Col md="3">
                <RoomPlayer number="3" data={roomThree} layout={layout} />
              </Col>
              <Col md="3">
                <RoomPlayer number="4" data={roomFour} layout={layout} />
              </Col>
              <Col md="12" className="mt-3">
                <ChooseRoom />
              </Col>
            </>
          )}
        </Row>
      </div>
    </MainLayout>
  );
};

export default MultiRoomIDN;
