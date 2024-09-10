import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { useSelector } from "react-redux";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import ProfileModal from "./ProfileModal";

function Settings(props) {
  const [isOpen, setDropdownOpen] = useState(false);
  const [direction, setDirection] = useState("right");
  const [menu, setMenu] = useState([]);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
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
    number,
    removeSelectedRoom,
    updateMenu,
    setUrl,
    hidePodium,
    setHidePodium,
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
      {
        name: hideOrShow(hidePodium) + " Podium",
        update: () => setHidePodium(!hidePodium),
      },
    ];
    setMenu(settingsMenu);
  }, [hideViews, hideMenu, hideTime, hideStars, hidePodium]);

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
        <DropdownToggle size="md" style={css}>
          <IoMdSettings style={{ fontSize: 20, marginBottom: 2 }} />
        </DropdownToggle>
        <DropdownMenu>
          {menu.map((item, idx) => (
            <DropdownItem key={idx} onClick={item.update}>
              {item.name}
            </DropdownItem>
          ))}
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
  borderRadius: "10px",
};

const inline = { display: "inline" };
