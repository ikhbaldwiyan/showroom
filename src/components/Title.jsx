import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaUserFriends } from "react-icons/fa";
import formatViews from "utils/formatViews";
import getTimes from "utils/getTimes";

import Views from "elements/Button";
import Settings from "./Settings";

function Title({ roomId, hideMenu, setHideMenu }) {
  const [profile, setProfile] = useState("");
  const [title, setTitle] = useState('');

  const [hideTime, setHideTime] = useState(true);
  const [hideName, setHideName] = useState(false);
  const [hideViews, setHideViews] = useState(false);

  const propSettings = {
    hideTime, setHideTime, hideName, setHideName, hideViews, setHideViews, profile, hideMenu, setHideMenu
  }

  useEffect(() => {
    axios.get(`/profile?room_id=${roomId}`).then((res) => {
      const profiles = res.data;
      setProfile(profiles);
    });

    axios.get(`/telop?room_id=${roomId}`).then(res => {
      const telop = res.data.telop
      setTitle(telop)
    });
  }, [profile, roomId])

  useEffect(() => {
    window.document.title = profile && profile.room_url_key.includes("JKT48") ? `${profile.room_url_key.slice(6)} JKT48 Room` : profile.room_name;
  }, [profile])

  return (
    <div className="mb-1">
      {!hideName &&
        <h4 style={{ display: 'inline' }}>
          <b className="mr-1">
            {profile && profile.room_url_key.includes('JKT48') && profile.room_url_key != 'officialJKT48' ? profile.room_url_key.slice(6) + ' JKT48' : profile.room_name} |
          </b>
        </h4>
      }

      {!hideTime &&
        <h5 style={{ display: 'inline' }}>{title ?? getTimes(profile.current_live_started_at)}</h5>
      }

      {!hideViews &&
        <Views className="btn-sm btn-info ml-2 mr-2 mb-2" style={{borderRadius: 5}}>
          <FaUserFriends style={{fontSize: 20, marginBottom: 4, marginRight: 2}} /> {profile.view_num ? formatViews(profile.view_num) : '0'}
        </Views>
      }
      <Settings {...propSettings} />
    </div>
  );
}

export default Title;