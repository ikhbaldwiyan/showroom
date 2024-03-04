import axios from "axios";
import { Loading } from "components";
import CustomModal from "components/CustomModal";
import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { FaUnlock } from "react-icons/fa";
import { RiMedalFill } from "react-icons/ri";
import { Alert, Table } from "reactstrap";
import { LEADERBOARD_API } from "utils/api/api";

const LeaderboardTable = () => {
  const [modal, setModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);

  const handleModalClose = () => {
    setModal(!modal);
  };

  const getLeaderboard = useCallback(async () => {
    try {
      setLoading(true);
      const {
        data: { data }
      } = await axios.get(LEADERBOARD_API, {
        params: {
          filterBy: "month",
          month: moment().format("MM-YYYY")
        }
      });
      setLeaderboardData(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

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
    <CustomModal
      size="lg"
      color="success"
      autoShowModal={modal}
      toggle={handleModalClose}
      modalTitle={`TOP LEADERBOARD BULAN ${moment()
        .format("MMMM")
        .toUpperCase()}`}
      isShowButton={false}
    >
      <Alert className="d-flex align-items-center" color="primary">
        <FaUnlock className="mr-2" /> Unlock fitur settings max multi room jika akun
        kamu masuk TOP 10 Leaderboard bulan ini
      </Alert>
      <Table responsive className="member-wrapper text-white">
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
                      margin: "auto"
                    }}
                  >
                    {idx + 1}
                  </div>
                </td>
                <td style={{ maxWidth: "200px" }}>
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <img
                        width={55}
                        src={
                          lb.avatar ??
                          "https://static.showroom-live.com/image/avatar/1.png?v=99"
                        }
                        alt={lb.name}
                      />
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
                <td className="text-center align-middle">{lb.watchLiveIDN}x</td>
                <td className="text-center align-middle">
                  <div
                    style={{
                      color: "#24A2B7",
                      fontWeight: "bold",
                      fontSize: "16px"
                    }}
                    className="bg-light badge px-3 py-1 w-5"
                  >
                    {lb.watchShowroomMember + lb.watchLiveIDN}x
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </CustomModal>
  );
};

export default LeaderboardTable;
