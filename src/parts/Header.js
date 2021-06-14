import React from 'react';
import Fade from 'react-reveal/Fade';
import DarkModeToggle from "react-dark-mode-toggle";

import Button from 'elements/Button';
import Logo from 'parts/Logo';
import { isMobile } from 'react-device-detect';

export default function Header({setTheme, theme}) {
  let RoomId = window.location.pathname.slice('13')
  const getNavLinkClass = (path) => {
    return window.location.pathname === path ? " active" : "";
  };

  return (
    <Fade>
      <header className="spacing-sm">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <Logo />
            <DarkModeToggle 
              className={!isMobile && 'ml-3'}
              onChange={setTheme}
              checked={theme === 'dark'}
              size={48}
            />
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <li className={`nav-item${getNavLinkClass("/")}`}>
                  <Button className="nav-link" type="link" href="">
                    Home
                  </Button>
                </li>
                <li className={`nav-item${getNavLinkClass(`/live-stream/${RoomId}`)}`}>
                  <Button className="nav-link" type="link" href="/live-stream/332503">
                    Live Stream
                  </Button>
                </li>
                <li className={`nav-item${getNavLinkClass("/list-room")}`}>
                  <Button className="nav-link" type="link" href="/list-room">
                    Room List
                  </Button>
                </li>
                <li className={`nav-item${getNavLinkClass("/about")}`}>
                  <Button className="nav-link" type="link" href="/">
                    About
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
