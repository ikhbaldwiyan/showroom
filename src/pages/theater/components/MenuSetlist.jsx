import React from "react";
import { FaInfoCircle, FaKey, FaMusic } from "react-icons/fa";
import { RiFileList3Fill } from "react-icons/ri";
import { Button, Col, Row } from "reactstrap";
import { gaEvent } from "utils/gaEvent";

const MenuSetlist = ({
  menu,
  setMenu,
  isCustomLive,
  setCustomUrl,
  customUrl,
}) => {
  const menus = [
    {
      name: "Theater",
      menu: "theater",
      icon: <FaInfoCircle  />,
    },
    {
      name: "Setlist",
      menu: "setlist",
      icon: <FaMusic  />,
    },
    ...(!isCustomLive
      ? [
          {
            name: "Encore",
            menu: "encore",
            icon: <RiFileList3Fill  />,
          },
        ]
      : []),
  ];

  const handleChangeMenu = (menu) => {
    setMenu(menu);
    gaEvent("Menu Theater", `Set ${menu}`, "Theater Schedule");
  };

  return (
    <Row>
      <Col className="d-flex">
        {menus.map((item, idx) => (
          <Button
            key={idx}
            style={menu === item.menu ? buttonActive : buttonStyle}
            className="menu"
            onClick={() => handleChangeMenu(item.menu)}
          >
            {item.icon} {item.name}
          </Button>
        ))}

        {isCustomLive && (
          <Button
            className="mb-2 mr-1"
            onClick={() => setCustomUrl(!customUrl)}
            color="danger"
          >
            <FaKey className="mb-1" />
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default MenuSetlist;


const buttonStyle = {
  backgroundColor: "teal",
  border: "none",
};

const buttonActive = {
  backgroundColor: "#24A2B7",
  border: "none",
};
