import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { PODIUM_STAGE, PODIUM_STAGE_IDN } from "utils/api/api";

const Podium = ({ liveId, isIDNLive }) => {
  const [users, setUsers] = useState([]);
  const [views, setViews] = useState()

  const API = isIDNLive ? PODIUM_STAGE_IDN(liveId) : PODIUM_STAGE(liveId);

  useEffect(() => {
    try {
      axios.get(API).then((res) => {
        setUsers(res?.data?.activityLog?.watch);
        setViews(res?.data?.liveData?.users)
      });
    } catch (error) {}
  }, [liveId]);

  return (
    <div className="podium my-2">
      <div className="stage-name mt-1">
        {users?.slice(0, 10)?.map((item, idx) => (
          <div key={idx} className="podium-list">
            <img width={50} src={item.user.avatar} alt="tes" />
            <p className="podium-name">{item.user.name.slice(0, 9)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Podium;
