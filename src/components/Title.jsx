import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaUserFriends } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import formatViews from "utils/formatViews";
import { API, LIVE_INFO } from "utils/api/api";

import Views from "elements/Button";
import Settings from "./Settings";
import LastSeen from "./LastSeen";
import getTimes from "utils/getTimes";
import { getSession } from "utils/getSession";

function Title({
  roomId,
  hideMenu,
  setHideMenu,
  hideMultiMenu,
  setHideMultiMenu,
  theme,
  hideStars,
  setHideStars,
  isFarming,
  setIsFarming,
  secretKey,
  isMultiRoom,
  number,
  removeSelectedRoom,
  updateMenu,
  setUrl
}) {
  const [profile, setProfile] = useState("");
  const [title, setTitle] = useState("");

  const [isTime, setIsTime] = useState(false);
  const [hideTime, setHideTime] = useState(true);
  const [hideName, setHideName] = useState(false);
  const [hideViews, setHideViews] = useState(false);
  const cookies = getSession()?.session?.cookie_login_id ?? "info";

  const propSettings = {
    roomId,
    hideTime,
    setHideTime,
    hideName,
    setHideName,
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
  };

  const icon = { fontSize: 20, marginBottom: 4, marginRight: 2 };

  useEffect(() => {
    try {
      axios.get(LIVE_INFO(roomId, secretKey ?? cookies)).then(
        (res) => {
          const profiles = res.data;
          setProfile(profiles);
          setTitle(profiles.title);
        },
        [profile]
      );
    } catch (error) {
      console.log(error);
    }
  }, [roomId, secretKey]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      try {
        axios.get(`${API}/lives/info/${roomId}`).then((res) => {
          const profiles = res.data;
          setProfile(profiles);
          setTitle(profiles.title);
        });
      } catch (error) {
        console.log(error);
      }
    }, 300000); // fetch every 5 minutes

    return () => clearInterval(intervalId);
  }, [roomId]);

  useEffect(() => {
    let title =
      profile &&
      profile?.room_url_key &&
      profile?.room_url_key?.includes("JKT48") &&
      profile?.room_url_key !== "officialJKT48";
    let name = title
      ? `${profile?.room_url_key?.slice(6)} JKT48 Room`
      : profile?.room_name;
    window.document.title = !isMultiRoom ? name : "Multi Room";
  }, [profile]);

  return (
    <div className="mb-1">
      {!hideName && (
        <h4 className="d-inline title">
          <b className="mr-1">
            {profile &&
            profile?.room_url_key !== 0 &&
            profile?.room_url_key?.includes("JKT48") &&
            profile?.room_url_key !== "officialJKT48"
              ? profile?.room_url_key?.slice(6) + " JKT48"
              : profile && profile?.room_name}{" "}
            |
          </b>
        </h4>
      )}

      {!hideTime && (
        <LastSeen theme={theme} times={profile.current_live_started_at} />
      )}

      {!hideViews && (
        <Views
          onClick={() => setIsTime(!isTime)}
          className="btn-sm btn-danger ml-2 mr-2 mb-2"
          style={{ borderRadius: 5 }}
        >
          {!isTime ? (
            <>
              <FaUserFriends style={icon} />{" "}
              {profile.views ? formatViews(profile.views) : "0"}
            </>
          ) : (
            <>
              <IoTimeSharp style={icon} />{" "}
              {profile.current_live_started_at
                ? getTimes(profile.current_live_started_at)
                : "00:00"}
            </>
          )}
        </Views>
      )}
      <Settings {...propSettings} />
    </div>
  );
}

export default Title;
