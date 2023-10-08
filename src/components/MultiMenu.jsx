import React from "react";
import { Button, Col, Row } from "reactstrap";
import { FaUsersCog, FaUsersSlash, FaUsers } from "react-icons/fa";
import { MdResetTv } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { gaEvent } from "utils/gaEvent";
import { GiFarmer } from "react-icons/gi";
import { useSelector } from "react-redux";
import SettingsRoom from "./SettingsRoom";
import { getSession } from "utils/getSession";

function MultiMenu({
  layout,
  setLayout,
  hideMultiMenu,
  setHideMultiMenu,
  isFarming,
  setIsFarming,
  handleClearRoom,
}) {
  const iconCss = {
    fontSize: 20,
    marginBottom: 2,
  };

  const user = useSelector((state) => state.user.user);

  const button = [
    ...(user?.can_3_room
      ? [
          {
            name: "3 Room",
            icon: <FaUsers style={iconCss} />,
            func: function () {
              return changeLayout();
            },
            color: "info",
          },
        ]
      : []),
    ...(user?.can_4_room
      ? [
          {
            name: "4 Room",
            icon: <FaUsersCog style={iconCss} />,
            func: function () {
              return fourLayout();
            },
            color: "info",
          },
        ]
      : []),
    ...(user?.can_farming_multi
      ? [
          {
            name: !isFarming ? "Set Farm" : "Hide Farm",
            icon: <GiFarmer className="mb-1" />,
            func: function () {
              setIsFarming(!isFarming);
            },
            color: "success",
          },
        ]
      : []),
    {
      name: "Reset All Room",
      icon: <FaUsersSlash style={iconCss} />,
      func: function () {
        return handleClearRoom();
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
    gaEvent("Multi Room Setting", "Set 3 Room Success", "Multi Room");
    setLayout("4");
  };

  const fourLayout = () => {
    gaEvent("Multi Room Setting", "Set 4 Room Success", "Multi Room");
    setLayout("3");
  };

  const resetLayout = () => {
    setLayout("6");
    gaEvent("Multi Room Setting", "Reset Layout", "Multi Room");
  };

  const isDisabled = (name, layout) => {
    if (name === "Reset Layout" && layout === "6") {
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
            {/* <div className="float-right">
              {getSession().session && (
                <SettingsRoom
                  set3Room={changeLayout}
                  set4Room={fourLayout}
                  iconCss={iconCss}
                />
              )}
            </div> */}
          </Col>
        </>
      )}
    </Row>
  );
}

export default MultiMenu;
