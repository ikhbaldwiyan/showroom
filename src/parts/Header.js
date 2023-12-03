import React, { useEffect, useState } from "react";
import Fade from "react-reveal/Fade";

import Button from "elements/Button";
import Logo from "parts/Logo";
import { isMobile } from "react-device-detect";
import { Button as LoginButton } from "reactstrap";
import { AiFillHome } from "react-icons/ai";
import { RiAdminFill, RiBroadcastFill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";
import { RiFileList3Fill, RiLoginBoxFill } from "react-icons/ri";
import { BsCollectionPlayFill, BsInfoCircleFill } from "react-icons/bs";
import { FaBars, FaDiscord } from "react-icons/fa";
import UserProfile from "./UserProfile";
import { isAdmin } from "utils/permissions/admin";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Header({ theme, toggleTheme, isMultiRoom }) {
  const [user, setUser] = useState("");
  const [profile, setProfile] = useState("");
  const [session, setSession] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useHistory();

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
  const mobileMenu = {
    backgroundColor: "#21252b",
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Fade>
      <header className="spacing-sm sticky">
        <div className={classMulti}>
          <nav className="navbar navbar-expand-lg navbar-light px-1">
            <Logo theme="dark" />
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleMobileMenu}
              style={{ borderColor: "silver" }}
            >
              <FaBars color="white" />
            </button>
            <div
              className={`collapse navbar-collapse ${
                isMobileMenuOpen ? "show mt-3" : ""
              }`}
              style={mobileMenu}
            >
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
                    href="/wrapped"
                  >
                    <BsCollectionPlayFill style={iconHome} /> Wrapped
                  </Button>
                </li>
                <li className={`nav-item${getNavLinkClass(roomUrl)}`}>
                  <Button
                    className="nav-link"
                    type="link"
                    href="/room/officialJKT48/332503"
                  >
                    <RiBroadcastFill style={iconHome} /> Live Stream
                  </Button>
                </li>
                <li className={`nav-item${getNavLinkClass("/multi-room")}`}>
                  <Button className="nav-link" type="link" href="/multi-room">
                    <HiUsers style={iconHome} /> Multi Room
                  </Button>
                </li>
                <li className={`nav-item${getNavLinkClass("/live-history")}`}>
                  <Button className="nav-link" type="link" href="/live-history">
                    <RiFileList3Fill style={iconHome} /> History
                  </Button>
                </li>
                {isAdmin() && (
                  <li className={`nav-item${getNavLinkClass("/admin")}`}>
                    <Button className="nav-link" type="link" href="/admin">
                      <RiAdminFill style={iconHome} /> Admin
                    </Button>
                  </li>
                )}
                <li className={`nav-item${getNavLinkClass("/about")}`}>
                  <Button className="nav-link" type="link" href="/about">
                    <BsInfoCircleFill style={iconHome} /> About
                  </Button>
                </li>
                <li className={`nav-item${getNavLinkClass("/about")}`}>
                  <Button
                    href="https://discord.com/invite/BX8BAs4kgu"
                    className="nav-link"
                    type="link"
                    isExternal
                  >
                    <FaDiscord style={iconHome} /> Join Discord
                  </Button>
                </li>
                {profile ? (
                  <UserProfile
                    profile={profile}
                    data={user}
                    session={session}
                    theme={theme}
                  />
                ) : isMobile ? (
                  <li className={`nav-item${getNavLinkClass("/login")}`}>
                    <Button className="nav-link" type="link" href="/login">
                      <RiLoginBoxFill style={iconHome} /> Login
                    </Button>
                  </li>
                ) : (
                  <li className={`nav-item${getNavLinkClass("/login")}`}>
                    <LoginButton
                      color="info"
                      className="nav-link text-white"
                      onClick={() => navigate.push("/login")}
                    >
                      <RiLoginBoxFill style={iconHome} /> Login
                    </LoginButton>
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
