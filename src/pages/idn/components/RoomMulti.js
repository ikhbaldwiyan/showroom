import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Col,
  Row,
  Badge,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import LiveButton from "elements/Button";
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
  const [activeTab, setActiveTab] = useState("roomOne");

  useEffect(() => {
    try {
      axios.get(ROOM_LIVES_IDN).then((res) => {
        setRoom(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [currentRoom]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const RoomList = ({ setRoom }) => (
    <div className="scroll-room rounded">
      <Table dark>
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
    return isActive === activeTab ? "active-nav-idn mr-1" : "inactive-nav mr-1";
  };

  return (
    <div>
      <Row>
        <Col md="12" className="mb-3">
          <Badge
            className="mr-2"
            color="secondary"
            onClick={() => settingsLayout("twoRoom")}
          >
            Reset
          </Badge>
          <Badge
            className="mr-2"
            color="light"
            onClick={() => settingsLayout("threeRoom")}
          >
            <FaUsers /> Set 3 Room
          </Badge>
          <Badge
            className="mr-1"
            color="light"
            onClick={() => settingsLayout("fourRoom")}
          >
            <FaUsersCog /> Set 4 Room
          </Badge>
        </Col>
      </Row>

      <Nav className="select-room" tabs>
        <NavItem>
          <NavLink
            className={buttonActive("roomOne")}
            onClick={() => toggleTab("roomOne")}
          >
            Room 1
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={buttonActive("roomTwo")}
            onClick={() => toggleTab("roomTwo")}
          >
            Room 2
          </NavLink>
        </NavItem>

        {(layout === "threeRoom" || layout === "fourRoom") && (
          <NavItem>
            <NavLink
              className={buttonActive("roomThree")}
              onClick={() => toggleTab("roomThree")}
            >
              Room 3
            </NavLink>
          </NavItem>
        )}

        {layout === "fourRoom" && (
          <NavItem>
            <NavLink
              className={buttonActive("roomFour")}
              onClick={() => toggleTab("roomFour")}
            >
              Room 4
            </NavLink>
          </NavItem>
        )}
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="roomOne">
          <RoomList setRoom={setRoomOne} />
        </TabPane>
        <TabPane tabId="roomTwo">
          <RoomList setRoom={setRoomTwo} />
        </TabPane>
        <TabPane tabId="roomThree">
          <RoomList setRoom={setRoomThree} />
        </TabPane>
        <TabPane tabId="roomFour">
          <RoomList setRoom={setRoomFour} />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default RoomMulti;
