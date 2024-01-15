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
import { IoReload } from "react-icons/io5";

const RoomMulti = ({
  roomOne,
  roomTwo,
  roomThree,
  roomFour,
  roomFive,
  roomSix,
  setRoomOne,
  setRoomTwo,
  setRoomThree,
  setRoomFour,
  setRoomFive,
  setRoomSix,
  layout,
  settingsLayout,
}) => {
  const [roomList, setRoomList] = useState([]);
  const [activeTab, setActiveTab] = useState("roomOne");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    try {
      axios.get(ROOM_LIVES_IDN).then((res) => {
        setRoomList(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [refresh, layout]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const changeRoom = (setRoom, data, number) => {
    setRoom(data);
    number === "1" && localStorage.setItem("roomOne", JSON.stringify(data));
    number === "2" && localStorage.setItem("roomTwo", JSON.stringify(data));
    number === "3" && localStorage.setItem("roomThree", JSON.stringify(data));
    number === "4" && localStorage.setItem("roomFour", JSON.stringify(data));
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    layout === "twoRoom" && setActiveTab("roomOne");
    layout === "threeRoom" && setActiveTab("roomThree");
    layout === "fourRoom" && setActiveTab("roomFour");
    layout === "fiveRoom" && setActiveTab("roomFive");
    layout === "sixRoom" && setActiveTab("roomSix");
  }, [layout]);

  const RoomList = ({ setRoom, number, currentRoom }) => (
    <div className="scroll-room rounded">
      <Table dark>
        {roomList?.length === 0 && (
          <tbody>
            <tr className="text-center">
              <td colSpan={3}>No member Live IDN</td>
            </tr>
          </tbody>
        )}
        {roomList?.map((data, idx) => (
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
                      onClick={() => changeRoom(setRoom, data, number)}
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
          {layout !== "twoRoom" && (
            <Badge
              className="mr-2"
              color="secondary"
              onClick={() => settingsLayout("twoRoom")}
            >
              Reset
            </Badge>
          )}
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
          {(layout === "fourRoom" || layout === "sixRoom") && (
            <Badge
              className="mr-1"
              color="light"
              onClick={() => settingsLayout("fiveRoom")}
            >
              <FaUsersCog /> Set 5 Room
            </Badge>
          )}

          {(layout === "fourRoom" || layout === "fiveRoom") && (
            <Badge
              className="mr-1"
              color="light"
              onClick={() => settingsLayout("sixRoom")}
            >
              <FaUsersCog /> Set 6 Room
            </Badge>
          )}
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

        {(layout === "threeRoom" ||
          layout === "fourRoom" ||
          layout === "fiveRoom" ||
          layout === "sixRoom") && (
          <NavItem>
            <NavLink
              className={buttonActive("roomThree")}
              onClick={() => toggleTab("roomThree")}
            >
              Room 3
            </NavLink>
          </NavItem>
        )}

        {(layout === "fourRoom" ||
          layout === "fiveRoom" ||
          layout === "sixRoom") && (
          <NavItem>
            <NavLink
              className={buttonActive("roomFour")}
              onClick={() => toggleTab("roomFour")}
            >
              Room 4
            </NavLink>
          </NavItem>
        )}

        {(layout === "fourRoom" ||
          layout === "fiveRoom" ||
          layout === "sixRoom") && (
          <NavItem>
            <NavLink
              className={buttonActive("roomFive")}
              onClick={() => toggleTab("roomFive")}
            >
              Room 5
            </NavLink>
          </NavItem>
        )}

        {(layout === "fourRoom" || layout === "sixRoom") && (
          <NavItem>
            <NavLink
              className={buttonActive("roomSix")}
              onClick={() => toggleTab("roomSix")}
            >
              Room 6
            </NavLink>
          </NavItem>
        )}

        <NavItem>
          <NavLink onClick={() => setRefresh(!refresh)}>
            <IoReload />
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="roomOne">
          <RoomList
            number="1"
            currentRoom={roomOne?.user?.username}
            setRoom={setRoomOne}
          />
        </TabPane>
        <TabPane tabId="roomTwo">
          <RoomList
            number="2"
            currentRoom={roomTwo?.user?.username}
            setRoom={setRoomTwo}
          />
        </TabPane>
        <TabPane tabId="roomThree">
          <RoomList
            number="3"
            currentRoom={roomThree?.user?.username}
            setRoom={setRoomThree}
          />
        </TabPane>
        <TabPane tabId="roomFour">
          <RoomList
            number="4"
            currentRoom={roomFour?.user?.username}
            setRoom={setRoomFour}
          />
        </TabPane>
        <TabPane tabId="roomFive">
          <RoomList
            number="5"
            currentRoom={roomFive?.user?.username}
            setRoom={setRoomFive}
          />
        </TabPane>
        <TabPane tabId="roomSix">
          <RoomList
            number="6"
            currentRoom={roomSix?.user?.username}
            setRoom={setRoomSix}
          />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default RoomMulti;
