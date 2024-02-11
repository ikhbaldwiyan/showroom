import React, { useCallback, useEffect, useState } from "react";
import MainLayout from "./layout/MainLayout";
import { LEADERBOARD_API } from "utils/api/api";
import axios from "axios";
import { Table } from "reactstrap";
import { Loading } from "components";
import { RiMedalFill } from "react-icons/ri";

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

  const Skeleton = () => (
    <>
      {[...Array(10)].map((_, index) => (
        <tr key={index}>
          {[...Array(5)].map((_, index) => (
            <td
              className="text-center align-middle"
              style={{ width: "100px", height: "30px" }}
            >
              <Loading size="25" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );

  return (
    <MainLayout title="Leaderboard JKT48 SHOWROOm" {...props}>
      <div className="layout">
        <h3 className="my-4 font-weight-bold">TOP LEADERBOARD ALL TIME</h3>
        <div className="row">
          <div className="col-lg-8">
            <div className="table-responsive">
              <Table
                style={{ color: "#ecfafc", borderTop: "none", fontWeight: "600" }}
                className="member-wrapper"
              >
                <thead className="text-center">
                  <tr>
                    <th>
                      <RiMedalFill size={30} />
                    </th>
                    <th>Username</th>
                    <th>Showroom</th>
                    <th>IDN</th>
                    <th>Total Watch</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <Skeleton />
                  ) : (
                    leaderboardData.map((lb, idx) => (
                      <tr key={lb._id}>
                        <td className="text-center align-middle">
                          <div
                            className={`rounded-circle d-flex justify-content-center align-items-center ${
                              idx === 0
                                ? "bg-warning"
                                : idx === 1
                                ? "bg-secondary bg-opacity-75"
                                : idx === 2
                                ? "bg-bronze"
                                : "bg-dark"
                            }`}
                            style={{
                              width: "30px",
                              height: "30px",
                              margin: "auto",
                            }}
                          >
                            {idx + 1}
                          </div>
                        </td>
                        <td style={{ maxWidth: "200px" }}>
                          <div className="row align-items-center">
                            <div className="col-auto">
                              <img width={55} src={lb.avatar} alt={lb.name} />
                            </div>
                            <div className="col">
                              <div
                                className="text-truncate"
                                style={{ maxWidth: "150px" }}
                              >
                                {lb.user_id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="text-center align-middle">
                          {lb.watchShowroomMember}x
                        </td>
                        <td className="text-center align-middle">
                          {lb.watchLiveIDN}x
                        </td>
                        <td className="text-center align-middle">
                          <div
                            style={{ color: "#24A2B7", fontWeight: "bold", fontSize: "16px" }}
                            className="bg-light badge px-3 py-1 w-5"
                          >
                            {lb.totalWatchLive}x
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Leaderboard;
