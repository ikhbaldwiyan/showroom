import axios from "axios";
import React, { useEffect } from "react";
import { Row, Col, Button } from "reactstrap";
import { AiFillGift, AiFillTrophy } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

function Menu({ menu, setMenu, isLive, hideMenu }) {
  const { room_name } = useSelector((state) => state.roomDetail);

  useEffect(() => {
    isLive.length && setMenu("chat");
  }, [isLive.length]);

  const iconStyle = {
    marginBottom: 4,
  };

  const listMenu = [
    {
      name: "Chat",
      menu: "chat",
      icon: <BsFillChatDotsFill style={iconStyle} />,
    },
    {
      name: "Rank",
      menu: "rank",
      icon: <AiFillTrophy style={iconStyle} />,
    },
    {
      name: "Gift",
      menu: "gift",
      icon: <AiFillGift style={iconStyle} />,
    },
  ];

  const buttonStyle = {
    backgroundColor: "teal",
    border: "none",
  };

  const buttonActive = {
    backgroundColor: "#008b9b",
    border: "none",
  };

  return (
    <Row>
      <Col>
        {!hideMenu && (
          <Button
            className="menu"
            style={menu === "room" ? buttonActive : buttonStyle}
            onClick={() => setMenu("room")}
          >
            <FaListAlt style={iconStyle} /> Room
          </Button>
        )}
        {!isLive.length && (
          <>
            <Button
              className="menu"
              style={menu === "total" ? buttonActive : buttonStyle}
              onClick={() => setMenu("total")}
            >
              <AiFillTrophy style={iconStyle} /> Total Rank {room_name.replace("Room", "")}
            </Button>
          </>
        )}
        {isLive.length !== 0 &&
          !hideMenu &&
          listMenu.map((item, idx) => (
            <Button
              key={idx}
              style={menu === item.menu ? buttonActive : buttonStyle}
              className="menu"
              onClick={() => setMenu(item.menu)}
            >
              {item.icon} {item.name}
            </Button>
          ))}
      </Col>
    </Row>
  );
}

export default Menu;
