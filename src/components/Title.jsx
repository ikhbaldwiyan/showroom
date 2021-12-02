import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaUserFriends } from "react-icons/fa";
import formatViews from "utils/formatViews";
import { API } from "utils/api/api";

import Views from "elements/Button";
import Settings from "./Settings";
import LastSeen from "./LastSeen";

function Title({ roomId, hideMenu, setHideMenu, hideMultiMenu, setHideMultiMenu }) {
  const [profile, setProfile] = useState("");
  const [title, setTitle] = useState('');

  const [hideTime, setHideTime] = useState(true);
  const [hideName, setHideName] = useState(false);
  const [hideViews, setHideViews] = useState(false);

  const propSettings = {
    hideTime, setHideTime, hideName, setHideName, hideViews, setHideViews, profile, hideMenu, setHideMenu, hideMultiMenu, setHideMultiMenu
  }

  useEffect(() => {
    axios.get(`${API}/lives/info/${roomId}`).then((res) => {
      const profiles = res.data;
      setProfile(profiles);
      setTitle(profiles.title);
    },[profile]);

  }, [profile, roomId, title])

  useEffect(() => {
    window.document.title = profile && profile.room_url_key !== 0 && profile.room_url_key.includes("JKT48") ? `${profile.room_url_key.slice(6)} JKT48 Room` : profile && profile.room_name;
  }, [profile])

  return (
    <div className="mb-1">
      {!hideName &&
        <h4 style={{ display: 'inline' }}>
          <b className="mr-1">
            {profile && profile.room_url_key !== 0 && profile.room_url_key.includes('JKT48') && profile.room_url_key !== 'officialJKT48' ? profile.room_url_key.slice(6) + ' JKT48' : profile && profile.room_name} |
          </b>
        </h4>
      }

      {!hideTime &&
        <LastSeen times={profile.current_live_started_at} />
      }

      {!hideViews &&
        <Views className="btn-sm btn-info ml-2 mr-2 mb-2" style={{borderRadius: 5, backgroundColor: '#008b9b', borderColor: '#008b9b'}}>
          <FaUserFriends style={{fontSize: 20, marginBottom: 4, marginRight: 2}} /> {profile.views ? formatViews(profile.views) : '0'}
        </Views>
      }
      <Settings {...propSettings} />
    </div>
  );
}

export default Title;