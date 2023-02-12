import React, { useEffect, useState } from "react";
import Fade from "react-reveal/Fade";
import DarkModeToggle from "react-dark-mode-toggle";

import Button from "elements/Button";
import Logo from "parts/Logo";
import { isMobile } from "react-device-detect";
import { AiFillHome } from "react-icons/ai";
import { RiBroadcastFill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";
import { RiFileList3Fill, RiLoginBoxFill } from "react-icons/ri";
import { BsInfoCircleFill } from "react-icons/bs";
import UserProfile from "./UserProfile";

export default function Header({ theme, toggleTheme, isMultiRoom }) {
  const [user, setUser] = useState("");
  const [profile, setProfile] = useState("");
  const [session, setSession] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    const userSession = localStorage.getItem("session");
    const userProfile = localStorage.getItem("profile");

    if (loggedInUser && userSession) {
      const foundUser = JSON.parse(loggedInUser);
      const foundSession = JSON.parse(userSession);
      const foundProfile = JSON.parse(userProfile);
      setUser(foundUser);
      setSession(foundSession);
      setProfile(foundProfile);
    }
  }, []);

  let roomUrl = "/room" + window.location.pathname.replace("room/", "");
  const getNavLinkClass = (path) => {
    return window.location.pathname === path ? " active" : "";
  };

  const iconHome = { marginBottom: 4 };
  const classMulti = isMultiRoom ? "container-fluid" : "container";

  return (
    <Fade>
      <header className="spacing-sm sticky">
        <div className={classMulti}>
          <nav className="navbar navbar-expand-lg navbar-light">
            <Logo />
            <DarkModeToggle
              className={!isMobile && "ml-3"}
              onChange={toggleTheme}
              checked={theme === "dark"}
              size={48}
            />
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <li className={`nav-item${getNavLinkClass("/")}`}>
                  <Button className="nav-link" type="link" href="">
                    <AiFillHome style={iconHome} /> Home
                  </Button>
                </li>
                <li className={`nav-item${getNavLinkClass(roomUrl)}`}>
                  <Button
                    className="nav-link"
                    type="link"
                    href="/room/jkt48/332503"
                  >
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
                {profile ? (
                  <UserProfile profile={profile} data={user} />
                ) : (
                  <li className={`nav-item${getNavLinkClass("/login")}`}>
                    <Button className="nav-link" type="link" href="/login">
                      <RiLoginBoxFill style={iconHome} /> Login
                    </Button>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </Fade>
  );
}
