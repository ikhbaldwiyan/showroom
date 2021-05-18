import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "elements/Button";
import formatViews from "utils/formatViews";

export default function Title({ roomId }) {
  const [profile, setProfile] = useState("");
  const [title, setTitle] = useState('');

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
    window.document.title = profile && `${profile.room_url_key.slice(6)} JKT48 Room`
  }, [profile])

  return (
    <h4>
      <b className="text-gray-800 mr-1">
        {profile && profile.room_url_key.includes('JKT48') && profile.room_url_key != 'officialJKT48' ? profile.room_url_key.slice(6) + ' JKT48': profile.room_name} |
      </b>
      {title}
      <Button className="btn-sm btn-info ml-1 mb-1">
        <img src="https://pbs.twimg.com/media/Erx2IE1VQAEqdZD?format=png&name=small"
          width="15"
          className="mb-1 mr-1"
        /> {formatViews(profile.view_num)}
      </Button>
    </h4>
  )
}
