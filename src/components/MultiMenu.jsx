import React from "react";
import { Button, Col, Row } from "reactstrap";
import { FaUsersCog, FaUsersSlash, FaUsers } from "react-icons/fa";
import { MdResetTv } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { gaEvent } from "utils/gaEvent";
import { multiRoomUser } from "utils/permissions/multiRoomUser";
import { useState } from "react";
import ModalSorry from "./ModalSorry";

function MultiMenu({
  layout,
  setLayout,
  hideMultiMenu,
  setHideMultiMenu,
}) {
  const iconCss = {
    fontSize: 20,
    marginBottom: 2,
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const button = [
    {
      name: "3 Room",
      icon: <FaUsers style={iconCss} />,
      func: function () {
        return changeLayout();
      },
      color: "info",
    },
    {
      name: "4 Room",
      icon: <FaUsersCog style={iconCss} />,
      func: function () {
        return fourLayout();
      },
      color: "info",
    },
    {
      name: "Reset All Room",
      icon: <FaUsersSlash style={iconCss} />,
      func: function () {
        return window.location.reload();
      },
      color: "secondary",
    },
    {
      name: "Reset Layout",
      icon: <MdResetTv style={iconCss} />,
      func: function () {
        return resetLayout();
      },
      color: "danger",
    },
  ];

  const changeLayout = () => {
    if (multiRoomUser() === true) {
      gaEvent("Multi Room Setting", "Set 3 Room Success", "Multi Room");
      setLayout("4");
    } else {
      gaEvent("Multi Room Access", "Set 3 Room Failed", "Multi Room");
      toggleModal();
    }
  };

  const fourLayout = () => {
    toggleModal();
  };

  const resetLayout = () => {
    setLayout("6");
    gaEvent("Multi Room Setting", "Reset Layout", "Multi Room");
  };

  const isDisabled = (name, layout) => {
    if (name == "Reset Layout" && layout === "6") {
      return "disabled";
    }
  };

  const btnStyle = (index) => {
    return index !== 0 ? "mb-3 mx-2" : "mb-3 mr-2";
  };

  return (
    <Row>
      {!hideMultiMenu && (
        <>
          <Col lg="8">
            {button.map((menu, idx) => (
              <Button
                key={idx}
                className={btnStyle(idx)}
                onClick={menu.func}
                color={menu.color}
                disabled={isDisabled(menu.name, layout)}
              >
                {menu.icon} {menu.name}
              </Button>
            ))}
          </Col>
          <Col>
            <Button
              className="mb-3 ml-4 float-right"
              onClick={() => {
                setHideMultiMenu(!hideMultiMenu);
                gaEvent("Multi Room Screen", "Hide Options", "Multi Room");
              }}
              color="danger"
            >
              <AiFillCloseCircle style={iconCss} /> Hide Options
            </Button>
          </Col>
        </>
      )}
      <ModalSorry isOpen={isOpen} toggle={toggleModal} />
    </Row>
  );
}

export default MultiMenu;
