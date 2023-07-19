import React from "react";
import { FaInfoCircle, FaMusic } from "react-icons/fa";
import { RiFileList3Fill } from "react-icons/ri";
import { Button, Col, Row } from "reactstrap";
import { gaEvent } from "utils/gaEvent";

const MenuSetlist = ({ menu, setMenu }) => {
  const menus = [
    {
      name: "Theater",
      menu: "theater",
      icon: <FaInfoCircle style={icon} />,
    },
    {
      name: "Setlist",
      menu: "setlist",
      icon: <FaMusic style={icon} />,
    },
    {
      name: "Encore",
      menu: "encore",
      icon: <RiFileList3Fill style={icon} />,
    },
  ];

  const handleChangeMenu = (menu) => {
    setMenu(menu);
    gaEvent("Menu Theater", `Set ${menu}`, "Theater Schedule");
  };

  return (
    <Row>
      <Col>
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
      </Col>
    </Row>
  );
};

export default MenuSetlist;

const icon = {
  marginBottom: 4,
};

const buttonStyle = {
  backgroundColor: "teal",
  border: "none",
};

const buttonActive = {
  backgroundColor: "#24A2B7",
  border: "none",
};
