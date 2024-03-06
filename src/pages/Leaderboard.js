import React, { useCallback, useEffect, useState } from "react";
import MainLayout from "./layout/MainLayout";
import { LEADERBOARD_API } from "utils/api/api";
import axios from "axios";
import { Table } from "reactstrap";
import { FilterDropdown, Loading } from "components";
import { RiMedalFill } from "react-icons/ri";
import PaginationComponent from "parts/Pagination";
import moment from "moment";

const Leaderboard = (props) => {
  const [loading, setLoading] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isOpenPlatform, setIsOpenPlatform] = useState(false);
  const [isOpenMonth, setIsOpenMonth] = useState(false);
  const [platform, setPlatform] = useState("");
  const [month, setMonth] = useState(moment().format("MM-YYYY"));
  const [titleMonth, setTitleMonth] = useState("");
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState("");

  const toggler = (setDropdownOpen) =>
    setDropdownOpen((prevState) => !prevState);

  const getLeaderboard = useCallback(async () => {
    try {
      setLoading(true);
      const {
        data: { data },
      } = await axios.get(LEADERBOARD_API, {
        params: {
          page,
          filterBy: month !== "" ? "month" : "",
          month,
          platform,
        },
      });
      setLeaderboardData(data.data);
      setTotalData(data.pagination.totalData);
      setPage(data.pagination.currentPage);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [month, platform, page]);

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

  const filterPlatformDropdownList = {
    title: "Select Platform",
    current: platform || "All Platform",
    dropdown: [
      {
        name: "All Platform",
        action: () => setPlatform(""),
        disabled: platform === "",
      },
      {
        name: "Showroom",
        action: () => setPlatform("Showroom"),
        disabled: platform === "Showroom",
      },
      {
        name: "IDN",
        action: () => setPlatform("IDN"),
        disabled: platform === "IDN",
      },
    ],
  };

  const filterMonthDropdownList = {
    title: "Select Month",
    current: month || "All Time",
    dropdown: [
      {
        name: "All Time",
        action: () => {
          setMonth("");
          setTitleMonth("All TIME");
        },
        disabled: month === "",
      },
      {
        name: "January",
        action: () => {
          setMonth("01-2024");
          setTitleMonth("January");
        },
        disabled: month === "01-2024",
      },
      {
        name: "February",
        action: () => {
          setMonth("02-2024");
          setTitleMonth("February");
        },
        disabled: month === "02-2024",
      },
      {
        name: "Maret",
        action: () => {
          setMonth("03-2024");
          setTitleMonth("Maret");
        },
        disabled: month === "03-2024",
      },
    ],
  };

  return (
    <MainLayout title="Leaderboard | JKT48 SHOWROOM" {...props}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h3 className="font-weight-bold my-3">
              TOP LEADERBOARD {platform.toUpperCase()}{" "}
              {titleMonth.toUpperCase() || titleMonth === "All TIME"
                ? "ALL TIME"
                : moment().format("MMMM").toUpperCase()}
            </h3>
          </div>
          <div className="col-lg-6 d-flex my-1">
            <p className="my-auto mr-3">Platform</p>
            <FilterDropdown
              dropdownList={filterPlatformDropdownList}
              isOpen={isOpenPlatform}
              toggler={() => toggler(setIsOpenPlatform)}
            />
          </div>
          <div className="col-lg-6 d-flex my-1">
            <p className="my-auto mr-2">Month</p>
            <FilterDropdown
              dropdownList={filterMonthDropdownList}
              isOpen={isOpenMonth}
              toggler={() => toggler(setIsOpenMonth)}
            />
          </div>
          <div className="col-lg-12 mt-3">
            <div className="table-responsive">
              <Table className="member-wrapper text-white">
                <thead className="text-center">
                  <tr>
                    <th>
                      <RiMedalFill size={30} />
                    </th>
                    <th>Username</th>
                    {(platform === "Showroom" || platform === "") && (
                      <th>Showroom</th>
                    )}
                    {(platform === "IDN" || platform === "") && <th>IDN</th>}
                    <th>All Platform</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <Skeleton />
                  ) : (
                    leaderboardData.map((item, idx) => (
                      <tr key={item._id}>
                        <td className="text-center align-middle">
                          <div
                            className={`rounded-circle d-flex justify-content-center align-items-center ${
                              idx === 0 && page === 1
                                ? "bg-warning"
                                : idx === 1 && page === 1
                                ? "bg-secondary bg-opacity-75"
                                : idx === 2 && page === 1
                                ? "bg-bronze"
                                : "bg-dark"
                            }`}
                            style={{
                              width: "30px",
                              height: "30px",
                              margin: "auto",
                            }}
                          >
                            {item?.rank}
                          </div>
                        </td>
                        <td style={{ maxWidth: "200px" }}>
                          <div className="row align-items-center">
                            <div className="col-auto">
                              <img
                                width={55}
                                src={
                                  item.avatar ??
                                  "https://static.showroom-live.com/image/avatar/1.png?v=99"
                                }
                                alt={item.name}
                              />
                            </div>
                            <div className="col">
                              <div
                                className="text-truncate"
                                style={{ maxWidth: "150px" }}
                              >
                                {item.user_id}
                              </div>
                            </div>
                          </div>
                        </td>
                        {(platform === "Showroom" || platform === "") && (
                          <td className="text-center align-middle">
                            {item.watchShowroomMember}x
                          </td>
                        )}
                        {(platform === "IDN" || platform === "") && (
                          <td className="text-center align-middle">
                            {item.watchLiveIDN}x
                          </td>
                        )}
                        <td className="text-center align-middle">
                          <div
                            style={{
                              color: "#24A2B7",
                              fontWeight: "bold",
                              fontSize: "16px",
                            }}
                            className="bg-light badge px-3 py-1 w-5"
                          >
                            {item.watchShowroomMember + item.watchLiveIDN}x
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
            <PaginationComponent
              page={page}
              setPage={setPage}
              perPage={10}
              totalCount={totalData}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Leaderboard;
