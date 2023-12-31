import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { PODIUM_STAGE, PODIUM_STAGE_IDN } from "utils/api/api";

const Podium = ({ liveId, isIDNLive }) => {
  const [users, setUsers] = useState([]);
  const [views, setViews] = useState()

  const API = isIDNLive ? PODIUM_STAGE_IDN(liveId) : PODIUM_STAGE(liveId);

  const fetchPodium = async () => {
    try {
      const res = await axios.get(API);
      setUsers(res?.data?.activityLog?.watch.reverse());
      setViews(res?.data?.liveData?.users);
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };
  
  useEffect(() => {
    setTimeout(() => {
      fetchPodium(); 
    }, 1000);
  
    // Set interval to fetch data every 2 minutes
    const interval = setInterval(() => {
      fetchPodium();
    }, 2 * 60 * 1000); // 2 minutes in milliseconds
  
    return () => clearInterval(interval);
  }, [liveId, views]);

  return users?.length > 0 && (
    <div className="podium my-2">
      <div className="podium-views">
        <b>{views ?? 0}</b>
      </div>
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
