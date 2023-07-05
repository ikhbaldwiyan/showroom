import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { AiFillCloseCircle } from "react-icons/ai";
import { GiFarmer } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { useSelector } from "react-redux";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { getSession } from "utils/getSession";
import ProfileModal from "./ProfileModal";

function Settings(props) {
  const [isOpen, setDropdownOpen] = useState(false);
  const [direction, setDirection] = useState("right");
  const [menu, setMenu] = useState([]);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const user = useSelector((state) => state.user.user);
  const isMultiRoom = window.location.pathname === "/multi-room";

  const {
    roomId,
    hideTime,
    setHideTime,
    hideViews,
    setHideViews,
    profile,
    hideMenu,
    setHideMenu,
    hideMultiMenu,
    setHideMultiMenu,
    hideStars,
    setHideStars,
    isFarming,
    setIsFarming,
    number,
    removeSelectedRoom,
    updateMenu,
    setUrl
  } = props;

  useEffect(() => {
    isMobile && setDirection("left");
  }, [direction]);

  function hideOrShow(menu) {
    return menu ? "Show" : "Hide";
  }

  useEffect(() => {
    const settingsMenu = [
      {
        name: hideOrShow(hideViews) + " Views",
        update: () => setHideViews(!hideViews),
      },
      {
        name: hideOrShow(hideMenu) + " Menu",
        update: () => setHideMenu(!hideMenu),
      },
      {
        name: hideOrShow(hideTime) + " Live Time",
        update: () => setHideTime(!hideTime),
      },
      ...(getSession().session
        ? [
            {
              name: hideOrShow(hideStars) + " Stars",
              update: () => setHideStars(!hideStars),
            },
          ]
        : []),
    ];
    setMenu(settingsMenu);
  }, [hideViews, hideMenu, hideTime, hideStars]);

  const removeThisRoom = (number) => {
    removeSelectedRoom(number);
    updateMenu("room");
    setUrl([]);
  };

  return (
    <div style={inline} className="ml-1 mt-1">
      <Dropdown
        style={inline}
        isOpen={isOpen}
        toggle={toggle}
        direction={direction}
      >
        <DropdownToggle style={css}>
          <IoMdSettings style={{ fontSize: 20, marginBottom: 2 }} />
        </DropdownToggle>
        <DropdownMenu>
          {menu.map((item, idx) => (
            <DropdownItem key={idx} onClick={item.update}>
              {item.name}
            </DropdownItem>
          ))}
          {user?.can_farming_detail &&
            window.location.pathname !== "/multi-room" && (
              <DropdownItem
                color={isFarming ? "primary" : "success"}
                onClick={() => setIsFarming(!isFarming)}
              >
                <GiFarmer className="mb-1" size={20} />{" "}
                {!isFarming ? "Farming" : "Hide Farm"}
              </DropdownItem>
            )}
          <ProfileModal
            roomId={roomId}
            className="btn-sm mt-1 px-4 mb-1"
            buttonLabel="Show Profile"
          />
          <DropdownItem href={profile.share_url_live} target="_blank">
            Open Showroom
          </DropdownItem>

          {isMultiRoom && (
            <>
              <DropdownItem onClick={() => setHideMultiMenu(!hideMultiMenu)}>
                {hideOrShow(hideMultiMenu)} Multi Options
              </DropdownItem>
              <DropdownItem
                onClick={() => removeThisRoom(number)}
                style={{ backgroundColor: "#DC3545", color: "white" }}
              >
                <div className="d-flex align-items-center">
                  <AiFillCloseCircle size={20} className="mr-1" />
                  Remove This Room
                </div>
              </DropdownItem>
            </>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default Settings;

const css = {
  backgroundColor: "#018b9b",
  border: "none",
  borderRadius: "10px",
  marginBottom: 4,
};
const inline = { display: "inline" };
