import Logo from "parts/Logo";
import React from "react";
import { Button as LoginButton } from "reactstrap";
import { AiFillHome } from "react-icons/ai";
import {
  RiAdminFill,
  RiBroadcastFill,
  RiChatHistoryFill,
  RiUserFollowFill,
} from "react-icons/ri";
import { HiUsers } from "react-icons/hi";
import { RiLoginBoxFill } from "react-icons/ri";
import { BsInfoCircleFill } from "react-icons/bs";
import Button from "elements/Button";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import UserProfile from "parts/UserProfile";
import { isAdmin } from "utils/permissions/admin";
import { FaDiscord, FaTheaterMasks } from "react-icons/fa";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [user, setUser] = useState("");
  const [profile, setProfile] = useState("");
  const [session, setSession] = useState("");
  const navigate = useHistory();

  const getNavLinkClass = (path) => {
    return window.location.pathname === path ? " active" : "";
  };

  const iconHome = {
    marginBottom: 4,
    fontSize: "26px",
    marginRight: "8px",
  };

  const buttonStyle = { color: "white", fontSize: "20px", fontWeight: "600" };

  const isActive = (page) => {
    return window.location.pathname === page;
  };

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

  const menus = [
    {
      name: "Home",
      icon: <AiFillHome style={iconHome} />,
      link: "/",
    },
    {
      name: "Live Stream",
      icon: <RiBroadcastFill style={iconHome} />,
      link: "/room/officialJKT48/332503",
    },
    {
      name: "Multi Room",
      icon: <HiUsers style={iconHome} />,
      link: "/multi-room",
    },
    {
      name: "History Live",
      icon: <RiChatHistoryFill style={iconHome} />,
      link: "/live-history",
    },
    {
      name: "Jadwal Theater",
      icon: <FaTheaterMasks style={iconHome} />,
      link: "/theater-schedule",
    },
    {
      name: "Followed Room",
      icon: <RiUserFollowFill style={iconHome} />,
      link: "/follow",
    },
    {
      name: "Join Discord",
      icon: <FaDiscord style={iconHome} />,
      link: "https://discord.com/invite/BX8BAs4kgu",
    },
  ];

  return (
    <div style={{ position: "sticky", top: 0 }}>
      <div
        style={{
          backgroundColor: "#21252b",
          height: "768px",
          padding: "10px",
        }}
      >
        <Logo theme="dark" />
        <div className="sidebar">
          <ul className="navbar-nav ml-auto">
            {menus.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 0.9 }}
                whileTap={{ scale: 0.9 }}
              >
                <li className="mt-1">
                  <Button
                    style={{
                      color: isActive(item.link) ? "#24A2B7" : "white",
                      fontSize: isActive(item.link) ? "22px" : "20px",
                      fontWeight: isActive(item.link) ? "600" : "500",
                    }}
                    className="nav-link"
                    type="link"
                    href={item.link}
                    isExternal={item.name === "Join Discord"}
                  >
                    {item.icon} {item.name}
                  </Button>
                </li>
              </motion.div>
            ))}

            {!isAdmin() ? (
              <li className={`nav-item${getNavLinkClass("/admin")}`}>
                <Button
                  style={buttonStyle}
                  className="nav-link"
                  type="link"
                  href="/admin"
                >
                  <RiAdminFill style={iconHome} /> Admin
                </Button>
              </li>
            ) : (
              <li className={`nav-item${getNavLinkClass("/about")}`}>
                <Button
                  style={buttonStyle}
                  className="nav-link"
                  type="link"
                  href="/about"
                >
                  <BsInfoCircleFill style={iconHome} /> About
                </Button>
              </li>
            )}
          </ul>
        </div>
        <div
          style={{ marginTop: "150px", position: "sticky", bottom: 10 }}
          className="mx-1"
        >
          <hr style={{ borderColor: "white" }} />

          {profile ? (
            <UserProfile
              profile={profile}
              data={user}
              session={session}
              theme="dark"
            />
          ) : (
            <LoginButton
              block
              color="info"
              className="nav-link text-white"
              onClick={() => navigate.push("/login")}
              style={{ fontWeight: 600, fontSize: "18px", borderRadius: "6px" }}
            >
              <RiLoginBoxFill style={iconHome} /> Login
            </LoginButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
