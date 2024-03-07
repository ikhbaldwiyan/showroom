import axios from "axios";
import LeaderboardTable from "parts/LeaderboardTable";
import React, { useState } from "react";
import { useEffect } from "react";
import { FaInfo } from "react-icons/fa";
import { Fade } from "react-reveal";
import { PODIUM_STAGE, PODIUM_STAGE_IDN } from "utils/api/api";
import { gaTag } from "utils/gaTag";
import { getSession } from "utils/getSession";

const Podium = ({ liveId, isIDNLive }) => {
  const [users, setUsers] = useState([]);
  const [views, setViews] = useState();
  const [showLeaderboard, setShowLeaderboard] = useState(false)

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

  const handleOpenLeaderboard = () => {
    setShowLeaderboard(!showLeaderboard)
    gaTag({
      action: "leaderboard_podium_click",
      category: "Leaderboard",
      label: "Ledearboard Modal",
      username: getSession()?.profile?.name ?? "Guest"
    })
  }

  return (
    users?.length > 0 && (
      <div className="podium my-2">
        <div className="podium-views">
          <b>{views ?? 0}</b>
        </div>
        <div className="podium-leaderboard mr-1" onClick={handleOpenLeaderboard} >
          <FaInfo />
        </div>
        <div
          style={{
            overflowX: "scroll",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <div className="stage-name mt-2">
            {users?.map((item, idx) => (
              <div key={idx} className="podium-list">
                <Fade bottom>
                  <img
                    width={50}
                    src={
                      item.user.avatar ??
                      "https://static.showroom-live.com/image/avatar/1028686.png?v=100"
                    }
                    alt="avatar"
                  />
                  <p className="podium-name">
                    {item.user.name.replace(" ", "").slice(0, 9)}
                  </p>
                </Fade>
              </div>
            ))}
          </div>
          {showLeaderboard && (
            <LeaderboardTable />
          )}
        </div>
      </div>
    )
  );
};

export default Podium;
