import React from "react";
import { FaInfoCircle, FaMusic, FaUsers } from "react-icons/fa";
import { Button, Col, Row } from "reactstrap";
import { gaTag } from "utils/gaTag";

const MenuInfo = ({ menu, setMenu }) => {
  const menus = [
    {
      name: "Theater",
      menu: "info",
      icon: <FaInfoCircle style={icon} />,
    },
    {
      name: "Line Up",
      menu: "line_up",
      icon: <FaUsers style={icon} />,
    },
    {
      name: "Setlist",
      menu: "setlist",
      icon: <FaMusic style={icon} />,
    },
  ];

  const handleChangeMenu = (menu) => {
    setMenu(menu);
    
    gaTag({
      action: `Set ${menu}`,
      category: "Sharing Live",
      label: "Menu Sharing Live"
    });
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

export default MenuInfo;

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
