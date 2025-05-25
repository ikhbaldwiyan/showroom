import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Badge,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { ROOM_LIVES_IDN } from "utils/api/api";
import axios from "axios";
import { RiLiveFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaUserCheck, FaUsers, FaUsersCog } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import { gaTag } from "utils/gaTag";
import { getSession } from "utils/getSession";

const RoomMulti = ({
  roomOne,
  roomTwo,
  roomThree,
  roomFour,
  setRoomOne,
  setRoomTwo,
  setRoomThree,
  setRoomFour,
  layout,
  settingsLayout,
  isAndroid
}) => {
  const [roomList, setRoomList] = useState([]);
  const [activeTab, setActiveTab] = useState("roomOne");
  const [refresh, setRefresh] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const isThreeRoom = isAndroid ? params.get("threeRoom") === "true" : true;
  const isFourRoom = isAndroid ? params.get("fourRoom") === "true" : true;

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
  }, [layout]);

  const RoomList = ({ setRoom, number, currentRoom }) => (
    <div className="scroll-room rounded">
      <Table dark>
        {roomList?.length === 0 && (
          <tbody>
            <tr className="text-center">
              <td colSpan={3}>
                <p className="mt-2">Tidak ada member yang Live IDN</p>
              </td>
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
                <span className="mt-4">
                  {data?.user?.name.replace("JKT48", "")}
                </span>
              </td>
              <td>
                <div className="mt-4">
                  <Button
                    onClick={() => changeRoom(setRoom, data, number)}
                    style={{
                      backgroundColor:
                        currentRoom === data.user.username
                          ? "#24A2B7"
                          : "#4A5568",
                      border: "none",
                      width: "50px",
                      height: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    {currentRoom === data.user.username ? (
                      <FaUserCheck size={18} />
                    ) : (
                      <RiLiveFill />
                    )}
                  </Button>
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

  const handleRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 2000);

    gaTag({
      action: "refresh_multi_room_idn",
      category: "Refresh - Multi IDN",
      label: "Live Stream",
      username: getSession()?.profile?.name
    });
  };

  return (
    <div>
      {(isThreeRoom || isFourRoom) && (
        <div className="d-flex py-2 mb-2">
          {layout !== "twoRoom" && (
            <Badge
              className="mr-2"
              color="secondary"
              onClick={() => settingsLayout("twoRoom")}
            >
              Reset
            </Badge>
          )}
          {isThreeRoom && (
            <Badge
              className="mr-2"
              color="light"
              onClick={() => settingsLayout("threeRoom")}
            >
              <FaUsers /> Set 3 Room
            </Badge>
          )}
          {isThreeRoom && isFourRoom && (
            <Badge
              className="mr-1"
              color="light"
              onClick={() => settingsLayout("fourRoom")}
            >
              <FaUsersCog /> Set 4 Room
            </Badge>
          )}
        </div>
      )}

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

        <NavItem>
          <NavLink onClick={handleRefresh}>
            <IoReload size={18} className={`${refresh && "spin-animation"}`} />
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
      </TabContent>
    </div>
  );
};

export default RoomMulti;
