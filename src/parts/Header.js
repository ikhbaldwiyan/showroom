import React from 'react';
import Fade from 'react-reveal/Fade';
import DarkModeToggle from "react-dark-mode-toggle";

import Button from 'elements/Button';
import Logo from 'parts/Logo';
import { isMobile } from 'react-device-detect';
import { AiFillHome } from 'react-icons/ai';
import { RiBroadcastFill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";
import { RiFileList3Fill } from "react-icons/ri";
import { BsInfoCircleFill } from "react-icons/bs";

export default function Header({theme, toggleTheme, isMultiRoom}) {
  let RoomId = window.location.pathname.slice('13')
  const getNavLinkClass = (path) => {
    return window.location.pathname === path ? " active" : "";
  };

  const iconHome = {marginBottom: 4};
  const classMulti =  isMultiRoom ? 'container-fluid' : 'container';

  return (
    <Fade>
      <header className="spacing-sm">
        <div className={classMulti}>
          <nav className="navbar navbar-expand-lg navbar-light">
            <Logo />
            <DarkModeToggle 
              className={!isMobile && 'ml-3'}
              onChange={toggleTheme}
              checked={theme === 'dark'}
              size={48}
            />
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <li className={`nav-item${getNavLinkClass("/")}`}>
                  <Button className="nav-link" type="link" href="">
                    <AiFillHome style={iconHome} /> Home
                  </Button>
                </li>
                <li className={`nav-item${getNavLinkClass(`/live-stream/${RoomId}`)}`}>
                  <Button className="nav-link" type="link" href="/live-stream/332503">
                    <RiBroadcastFill style={iconHome} /> Live Stream
                  </Button>
                </li>
                <li className={`nav-item${getNavLinkClass("/multi-room")}`}>
                  <Button className="nav-link" type="link" href="/multi-room">
                    <HiUsers style={iconHome} /> Multi Room
                  </Button>
                </li>
                <li className={`nav-item${getNavLinkClass("/list-room")}`}>
                  <Button className="nav-link" type="link" href="/list-room">
                    <RiFileList3Fill style={iconHome} /> Room List
                  </Button>
                </li>
                <li className={`nav-item${getNavLinkClass("/about")}`}>
                  <Button className="nav-link" type="link" href="/about">
                    <BsInfoCircleFill style={iconHome} /> About
                  </Button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </Fade>
  )
}
