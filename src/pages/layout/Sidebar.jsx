import Logo from "parts/Logo";
import React from "react";
import { Button as LoginButton } from "reactstrap";
import { AiFillAndroid, AiFillHome } from "react-icons/ai";
import {
  RiBroadcastFill,
  RiChatHistoryFill,
  RiMedalFill
} from "react-icons/ri";
import { HiUsers } from "react-icons/hi";
import { RiLoginBoxFill } from "react-icons/ri";
import { BsInfoCircleFill } from "react-icons/bs";
import Button from "elements/Button";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import UserProfile from "parts/UserProfile";
import { FaDonate, FaTheaterMasks } from "react-icons/fa";
import { motion } from "framer-motion";
import useWindowDimensions from "utils/useWindowDimension";
import { getSession } from "utils/getSession";
import { activityLog } from "utils/activityLog";
import { MdSmartDisplay } from "react-icons/md";

const Sidebar = () => {
  const user = getSession().user;
  const profile = getSession().profile;
  const session = getSession().session;
  const navigate = useHistory();
  const { width } = useWindowDimensions();

  const iconHome = {
    fontSize: "24px"
  };

  const isActive = (page) => {
    return window.location.pathname === page;
  };

  const menus = [
    {
      name: "Home",
      icon: <AiFillHome style={iconHome} />,
      link: "/"
    },
    {
      name: "Leaderboard",
      icon: <RiMedalFill style={iconHome} />,
      link: "/leaderboard"
    },
    {
      name: "Live Stream",
      icon: <RiBroadcastFill style={iconHome} />,
      link: "/room/officialJKT48/332503"
    },
    {
      name: "Multi Room",
      icon: <HiUsers style={iconHome} />,
      link: "/multi-room"
    },
    {
      name: "Multi IDN",
      icon: <MdSmartDisplay style={iconHome} />,
      link: "/multi-room-idn"
    },
    {
      name: "History Live",
      icon: <RiChatHistoryFill style={iconHome} />,
      link: "/live-history"
    },
    {
      name: "Jadwal Theater",
      icon: <FaTheaterMasks style={iconHome} />,
      link: "/theater-schedule"
    },
    {
      name: "Download APK",
      icon: <AiFillAndroid style={iconHome} />,
      link: "/android"
    },
    {
      name: "Support Us",
      icon: <FaDonate style={iconHome} />,
      link: "/support-project"
    }
  ];

  const trackLinkClicked = () => {
    activityLog({
      userId: user._id ?? "64e2090061ec79ea209a0160",
      logName: "Discord Link",
      description: "Discord Link Click"
    });
  };

  const isDesktopView = width > 1200;

  return (
    <div className="sticky-sidebar">
      <div className="main-sidebar">
        <Logo />
        <div className="sidebar">
          <ul className="navbar-nav ml-auto">
            {menus.map((item, idx) => {
              const roomUrl =
                "/room" + window.location.pathname.replace("room/", "");
              const page = item.name === "Live Stream" ? roomUrl : item.link;

              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 0.9 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <li className="mt-1">
                    <Button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        color: isActive(page) ? "#24A2B7" : "white",
                        fontSize: isActive(page) ? "19px" : "18px",
                        fontWeight: isActive(page) ? "700" : "400"
                      }}
                      className="nav-link"
                      type="link"
                      href={item.link}
                    >
                      {item.icon} {isDesktopView && item.name}
                    </Button>
                  </li>
                </motion.div>
              );
            })}

            {/* <motion.div whileHover={{ scale: 0.9 }} whileTap={{ scale: 0.9 }}>
              <li className="mt-2">
                <a
                  href="https://discord.com/invite/BX8BAs4kgu"
                  target="_blank"
                  rel="noreferrer"
                  onClick={trackLinkClicked}
                  style={buttonStyle}
                >
                  <FaDiscord style={iconHome} />{" "}
                  {isDesktopView && "Join Discord"}
                </a>
              </li>
            </motion.div> */}

            <motion.div whileHover={{ scale: 0.9 }} whileTap={{ scale: 0.9 }}>
              <li className="mt-2">
                <Button
                  className="nav-link"
                  type="link"
                  href="/about"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    color: isActive("/about") ? "#24A2B7" : "white",
                    fontSize: isActive("/about") ? "19px" : "18px",
                    fontWeight: isActive("/about") ? "700" : "400"
                  }}
                >
                  <BsInfoCircleFill style={iconHome} />{" "}
                  {isDesktopView && "About"}
                </Button>
              </li>
            </motion.div>
          </ul>
        </div>
      </div>
      {isDesktopView && (
        <div
          style={{ position: "sticky", bottom: 10, backgroundColor: "#21252b" }}
        >
          <div className="mx-2">
            <hr style={{ borderColor: "white" }} />
            {profile ? (
              <UserProfile profile={profile} data={user} session={session} />
            ) : (
              <LoginButton
                block
                color="info"
                className="nav-link text-white"
                onClick={() => navigate.push("/login")}
                style={{
                  fontWeight: 600,
                  fontSize: "18px",
                  borderRadius: "6px"
                }}
              >
                <RiLoginBoxFill style={iconHome} /> Login
              </LoginButton>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
