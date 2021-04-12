import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";

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

  return (
    <h4>
      <b className="mr-1 text-gray-900">{profile.main_name} |</b>
      {title}
      <Button
        style={{ marginLeft: '4px'}}
        color="danger"
      >
        <img src="https://pbs.twimg.com/media/Erx2IE1VQAEqdZD?format=png&name=small"
          width="15"
          className="mb-1 mr-1"
        /> {profile.view_num}
      </Button>
    </h4>
  )
}
