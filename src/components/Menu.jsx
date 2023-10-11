import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "reactstrap";
import { AiFillGift, AiFillStar, AiFillTrophy } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { FaInfoCircle, FaKey, FaListAlt, FaMusic } from "react-icons/fa";
import { isMobile } from "react-device-detect";
import { PROFILE_API } from "utils/api/api";
import { gaEvent } from "utils/gaEvent";
import { GiFarmer } from "react-icons/gi";
import { RiBroadcastFill } from "react-icons/ri";

function Menu({
  menu,
  setMenu,
  isLive,
  roomId,
  hideMenu,
  isMultiRoom,
  isFarming,
  isPremiumLive,
}) {
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    axios.post(PROFILE_API, { room_id: roomId.toString() }).then((res) => {
      const profiles = res.data;
      const roomName =
        profiles.room_url_key !== "officialJKT48" &&
        profiles.room_url_key.includes("JKT48")
          ? profiles.room_url_key.slice(6) + " JKT48"
          : profiles.room_name;
      setRoomName(roomName);
    });
  }, [roomId]);

  useEffect(() => {
    isLive.length && setMenu("chat");
  }, [isLive.length]);

  const listMenu = [
    {
      name: "Chat",
      menu: "chat",
      icon: <BsFillChatDotsFill style={icon} />,
    },
    {
      name: !isMultiRoom && !isMobile && !isFarming ? "Rank" : "",
      menu: "rank",
      icon: <AiFillTrophy style={icon} />,
    },
    ...(isPremiumLive
      ? [
          {
            name: "Song",
            menu: "setlist",
            icon: <FaMusic style={icon} />,
          },
        ]
      : [
          {
            name: !isMultiRoom && !isMobile && !isFarming ? "Gift" : "",
            menu: "gift",
            icon: <AiFillGift style={icon} />,
          },
        ]),
    ...(isMultiRoom || isMobile
      ? [
          {
            name: !isMobile && !isMultiRoom && "Star",
            menu: "star",
            icon: <AiFillStar style={icon} />,
          },
        ]
      : []),
    ...(isFarming && !isMultiRoom
      ? [
          {
            name: !isMobile && !isMultiRoom && "",
            menu: "farming",
            icon: <GiFarmer style={icon} />,
          },
        ]
      : []),
  ];

  const buttonStyle = {
    backgroundColor: "teal",
    border: "none",
  };

  const buttonActive = {
    backgroundColor: "#008b9b",
    border: "none",
  };

  const handleChangeMenu = (menu) => {
    setMenu(menu);
    gaEvent("Menu", `Set ${menu}`, "Live Stream");
  };

  return (
    <Row>
      <Col>
        {isPremiumLive ? (
          <Button
            className="menu"
            style={menu === "info" ? buttonActive : buttonStyle}
            onClick={() => handleChangeMenu("info")}
          >
            <FaInfoCircle style={icon} /> Info
          </Button>
        ) : !hideMenu ? (
          <Button
            className="menu"
            style={menu === "room" ? buttonActive : buttonStyle}
            onClick={() => handleChangeMenu("room")}
          >
            <FaListAlt style={icon} /> Room
          </Button>
        ) : null}
        {!isLive.length && isLive.code !== 404 && (
          <>
            <Button
              className="menu"
              style={menu === "history" ? buttonActive : buttonStyle}
              onClick={() => handleChangeMenu("history")}
            >
              <RiBroadcastFill style={icon} /> History Live
            </Button>
            <Button
              className="menu"
              style={menu === "total" ? buttonActive : buttonStyle}
              onClick={() => handleChangeMenu("total")}
            >
              <AiFillTrophy style={icon} /> Rank
            </Button>
          </>
        )}
        {isLive.length !== 0 &&
          isLive.code !== 404 &&
          !hideMenu &&
          listMenu.map((item, idx) => (
            <Button
              key={idx}
              style={menu === item.menu ? buttonActive : buttonStyle}
              className="menu"
              onClick={() => handleChangeMenu(item.menu)}
            >
              {item.icon} {item.name}
            </Button>
          ))}
      </Col>
    </Row>
  );
}

export default Menu;

const icon = {
  marginBottom: 4,
};
