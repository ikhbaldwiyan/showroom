import React, { useCallback, useEffect, useState } from "react";
import MainLayout from "./layout/MainLayout";
import { LEADERBOARD_API } from "utils/api/api";
import axios from "axios";

const Leaderboard = (props) => {
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ currentPage: 1 });
  const [leaderboardData, setLeaderboardData] = useState([]);

  const getLeaderboard = useCallback(async () => {
    try {
      setLoading(true);
      const {
        data: { data },
      } = await axios.get(LEADERBOARD_API, {
        params: { page: pagination.currentPage },
      });
      setLeaderboardData(data.data);
      setPagination(data.pagination);
      return { data };
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [pagination.currentPage]);

  useEffect(() => {
    getLeaderboard();
  }, [getLeaderboard]);

  return (
    <MainLayout {...props}>
      <h4>Leaderboard</h4>
      <table className="tw-table-auto tw-text-black">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Showroom</th>
            <th>IDN</th>
            <th>Total Watch</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((lb, idx) => (
            <tr key={lb._id}>
              <td>{idx + 1}</td>
              <td>
                <div className="tw-flex">
                  <img src={lb.avatar} alt={lb.name} className="tw-max-w-5" />
                  {lb.user_id}
                </div>
              </td>
              <td>{lb.watchShowroomMember}</td>
              <td>{lb.watchLiveIDN}</td>
              <td>{lb.totalWatchLive}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  );
};

export default Leaderboard;
