import React from 'react';
import Fade from 'react-reveal/Fade';
import DarkModeToggle from "react-dark-mode-toggle";

import Button from 'elements/Button';
import Logo from 'parts/Logo';
import { isMobile } from 'react-device-detect';
import { AiFillHome } from 'react-icons/ai';
import { RiBroadcastFill } from "react-icons/ri";
import { HiStar, HiUsers } from "react-icons/hi";
import { RiFileList3Fill } from "react-icons/ri";
import { BsInfoCircleFill } from "react-icons/bs";

export default function Header({theme, toggleTheme, isMultiRoom}) {
  let roomUrl = '/room' + window.location.pathname.replace('room/' , '')
  const getNavLinkClass = (path) => {
    return window.location.pathname === path ? "active" : "";
  };

  const icon = {marginBottom: 4};
  const classMulti =  isMultiRoom ? 'container-fluid' : 'container';

  const navigation = [
    {
      name: 'Home',
      icon: <AiFillHome style={icon} />,
      href: "/",
    },
    {
      name: 'Live Stream',
      icon: <RiBroadcastFill style={icon} />,
      href: '/room/JKT48/332503'
    },
    {
      name: 'Multi Room',
      icon: <HiUsers style={icon} />,
      href: '/multi-room'
    },
    {
      name: 'Favorite',
      icon: <HiStar style={icon} />,
      href: '/favorite'
    },
    // {
    //   name: 'Room List',
    //   icon: <RiFileList3Fill style={icon} />,
    //   href: '/list-room'
    // },
    {
      name: 'About',
      icon: <BsInfoCircleFill style={icon} />,
      href: '/about'
    },
  ]

  return (
    <Fade>
      <header className="spacing-sm sticky">
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
                {navigation.map((item, idx) => (
                  <li 
                    key={idx} 
                    className={`nav-item ${getNavLinkClass(item.name == 'Live Stream' ? roomUrl : item.href)}`}
                  >
                    <Button className="nav-link" type="link" href={item.href}>
                      {item.icon} {item.name}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </Fade>
  )
}
