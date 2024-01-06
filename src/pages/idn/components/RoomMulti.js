import React from "react";
import { Table, Button, Col, Row } from "reactstrap";
import LiveButton from "elements/Button";
import { useState, useEffect } from "react";
import { ROOM_LIVES_IDN } from "utils/api/api";
import axios from "axios";
import { RiBroadcastFill, RiLiveFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaUsers, FaUsersCog } from "react-icons/fa";

const RoomMulti = ({
  currentRoom,
  setRoomOne,
  setRoomTwo,
  setRoomThree,
  setRoomFour,
  layout,
  settingsLayout,
}) => {
  const [room, setRoom] = useState([]);
  const [menu, setMenu] = useState("roomOne");

  useEffect(() => {
    try {
      axios.get(ROOM_LIVES_IDN).then((res) => {
        setRoom(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [currentRoom]);

  const RoomList = ({ setRoom }) => (
    <div className="scroll-room rounded">
      <Table dark>
        <thead className="room-list">
          <tr>
            <th colSpan={3}>Room List</th>
          </tr>
        </thead>
        {room?.map((data, idx) => (
          <tbody key={idx}>
            <tr>
              <td>
                <img
                  src={data.user.avatar}
                  style={{ borderRadius: "10px" }}
                  alt={data.name}
                  width="80"
                />
              </td>
              <td className="d-flex flex-column align-items-center">
                <span className="mt-1">
                  {data?.user?.name.replace("JKT48", "")}
                </span>
                <LiveButton
                  style={{ borderRadius: "6px" }}
                  className="btn-sm btn-danger mt-1"
                >
                  <RiBroadcastFill className="mb-1" /> Live
                </LiveButton>
              </td>
              <td>
                <div className="mt-4">
                  <Link>
                    <Button
                      onClick={() => setRoom(data)}
                      color={
                        currentRoom === data.user.username ? "success" : "info"
                      }
                    >
                      <RiLiveFill className="mb-1" />
                    </Button>
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );

  const buttonActive = (isActive) => {
    return isActive === menu ? "danger mr-1" : "info mr-1";
  };

  return (
    <div>
      <Row>
        <Col md="12" className="mb-3">
          <Button
            className="mr-2"
            color="secondary"
            onClick={() => settingsLayout("twoRoom")}
          >
            Reset
          </Button>
          <Button
            className="mr-2"
            color="info"
            onClick={() => settingsLayout("threeRoom")}
          >
            <FaUsers /> Set 3
          </Button>
          <Button
            className="mr-1"
            color="info"
            onClick={() => settingsLayout("fourRoom")}
          >
            <FaUsersCog /> Set 4
          </Button>
        </Col>
      </Row>
      <div className="d-flex mb-2">
        <Button
          onClick={() => setMenu("roomOne")}
          color={buttonActive("roomOne")}
        >
          Room 1
        </Button>
        <Button
          onClick={() => setMenu("roomTwo")}
          color={buttonActive("roomTwo")}
        >
          Room 2
        </Button>

        {(layout === "threeRoom" || layout === "fourRoom") && (
          <Button
            onClick={() => setMenu("roomThree")}
            color={buttonActive("roomThree")}
          >
            Room 3
          </Button>
        )}

        {layout === "fourRoom" && (
          <Button
            onClick={() => setMenu("roomFour")}
            color={buttonActive("roomFour")}
          >
            Room 4
          </Button>
        )}
      </div>

      {menu === "roomOne" ? (
        <RoomList setRoom={setRoomOne} />
      ) : menu === "roomTwo" ? (
        <RoomList setRoom={setRoomTwo} />
      ) : menu === "roomThree" ? (
        <RoomList setRoom={setRoomThree} />
      ) : (
        <RoomList setRoom={setRoomFour} />
      )}
    </div>
  );
};

export default RoomMulti;
