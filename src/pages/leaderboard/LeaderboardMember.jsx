import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { LEADERBOARD_IDN, LEADERBOARD_SHOWROOM } from "utils/api/api";
import { Container, Table } from "reactstrap";
import { FilterDropdown, Loading } from "components";
import PaginationComponent from "parts/Pagination";
import moment from "moment";
import formatName from "utils/formatName";
import MainLayout from "pages/layout/MainLayout";
import { FaCalendarAlt } from "react-icons/fa";
import { RiBroadcastFill } from "react-icons/ri";

const LeaderboardMember = (props) => {
  const [loading, setLoading] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isOpenPlatform, setIsOpenPlatform] = useState(false);
  const [isOpenMonth, setIsOpenMonth] = useState(false);
  const [platform, setPlatform] = useState("Showroom");
  const [month, setMonth] = useState();
  const [titleMonth, setTitleMonth] = useState("Minggu Ini");
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [year, setYear] = useState(moment().format("YYYY"));
  const [filterDate, setFilterDate] = useState("");

  const toggler = (setDropdownOpen) =>
    setDropdownOpen((prevState) => !prevState);

  const getLeaderboardMember = useCallback(async () => {
    try {
      setLoading(true);
      const {
        data: { data, totalData, currentPage, filterDate }
      } = await axios.get(
        platform === "Showroom" ? LEADERBOARD_SHOWROOM : LEADERBOARD_IDN,
        {
          params: {
            page,
            filterBy: month !== "" ? "month" : "",
            month,
            year
          }
        }
      );
      setLeaderboardData(data);
      setTotalData(totalData);
      setPage(currentPage);
      setFilterDate(filterDate);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [month, platform, page]);

  useEffect(() => {
    getLeaderboardMember();
  }, [platform, page, month]);

  const Skeleton = () => (
    <>
      {[...Array(10)].map((_, index) => (
        <tr key={index}>
          {[...Array(4)].map((_, index) => (
            <td
              className={`align-middle ${
                (index === 0 || index === 3) && "text-center"
              }`}
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
        name: "Showroom",
        action: () => setPlatform("Showroom"),
        disabled: platform === "Showroom"
      },
      {
        name: "IDN",
        action: () => setPlatform("IDN"),
        disabled: platform === "IDN"
      }
    ]
  };

  const monthNames = [
    { name: "January", short: "01" },
    { name: "February", short: "02" },
    { name: "Maret", short: "03" },
    { name: "April", short: "04" },
    { name: "Mei", short: "05" },
    { name: "June", short: "06" },
    { name: "July", short: "07" },
    { name: "August", short: "08" },
    { name: "September", short: "09" },
    { name: "October", short: "10" },
    { name: "November", short: "11" },
    { name: "December", short: "12" }
  ];

  const filterMonthDropdownList = {
    title: "Select Month",
    current: titleMonth,
    dropdown: [
      {
        name: "Minggu Ini",
        action: () => {
          setMonth("");
          setTitleMonth("Minggu Ini");
        },
        disabled: month === ""
      },
      ...monthNames.map(({ name, short }) => ({
        name,
        action: () => {
          setMonth(`${short}`);
          setTitleMonth(name);
        },
        disabled: month === `${short}`
      }))
    ]
  };

  return (
    <MainLayout title="Leaderboard | JKT48 SHOWROOM" {...props}>
      <Container>
        <div className="row">
          <div className="col-lg-12">
            <h3 className="leaderboard-text my-3">
              Top Live {platform} {titleMonth} {titleMonth !== "Minggu Ini" && year}
            </h3>
          </div>
          <div className="col-lg-6 d-flex my-2">
            <FilterDropdown
              dropdownList={filterPlatformDropdownList}
              isOpen={isOpenPlatform}
              toggler={() => toggler(setIsOpenPlatform)}
            />
            <div className="ml-3">
              <FilterDropdown
                dropdownList={filterMonthDropdownList}
                isOpen={isOpenMonth}
                toggler={() => toggler(setIsOpenMonth)}
              />
            </div>
          </div>
          <div className="col-lg-6 d-flex flex-column flex-lg-row justify-content-end my-2">
            {filterDate && (
              <div className="leaderboard-date">
                <FaCalendarAlt size={19} />
                <b className="mr-2">
                  {filterDate.startDate.replace("2024", "")} -{" "}
                  {filterDate.endDate.replace("2024", "")} {year}
                </b>
              </div>
            )}
            <div className="leaderboard-total mt-2 mt-lg-0">
              <RiBroadcastFill size={22} />
              <p className="my-auto mr-2">
                Total Stream: <b>{totalData} Member</b>
              </p>
            </div>
          </div>
          <div className="col-lg-12 mt-3">
            <div className="table-responsive">
              <Table className="member-wrapper text-white">
                <thead className="">
                  <tr>
                    <th className="text-center">Rank</th>
                    <th className="text-left">Image</th>
                    <th className="text-left">Name</th>
                    <th className="text-center">Total Live</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <Skeleton />
                  ) : leaderboardData.length > 0 ? (
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
                              margin: "auto",
                              width: item?.rank > 9 ? "35px" : item?.rank < 4 ? "36px" : "30px",
                              height: item?.rank > 9 ? "35px" : item?.rank < 4 ? "36px" : "30px",
                              fontSize: item.rank < 4 ? 18 : 16,
                              fontWeight: item.rank < 4 ? "bold" : "normal"
                            }}
                          >
                            {item.rank}
                          </div>
                        </td>
                        <td>
                          {platform === "Showroom" ? (
                            <>
                              <img
                                width={120}
                                src={item?.profile?.image}
                                alt={item?.username}
                                className="rounded d-none d-lg-inline"
                              />
                              <img
                                width={70}
                                src={item?.profile?.image_square}
                                alt={item?.username}
                                className="rounded d-lg-none"
                              />
                            </>
                          ) : (
                            <>
                              <img
                                width={80}
                                src={item?.image}
                                alt={item?.username}
                                className="rounded d-none d-lg-inline"
                              />
                              <img
                                width={60}
                                src={item?.image}
                                alt={item?.username}
                                className="rounded d-lg-none"
                              />
                            </>
                          )}
                        </td>
                        <td>
                          <p className=" mt-4">
                            {item?.username !== "JKT48"
                              ? formatName(item?.username)
                              : item.username}
                          </p>
                        </td>
                        <td className="text-center align-middle">
                          <div
                            style={{
                              color: "#24A2B7",
                              fontWeight: "bold",
                              fontSize: "18px"
                            }}
                            className="bg-light badge px-3 py-2 w-5"
                          >
                            {item?.total_live}x
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <td colSpan="5" className="text-center align-middle">
                      <div
                        style={{
                          color: "#24A2B7",
                          fontWeight: "bold",
                          fontSize: "16px"
                        }}
                        className="bg-light badge px-3 py-1 w-5"
                      >
                        No data found on {titleMonth}
                      </div>
                    </td>
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
      </Container>
    </MainLayout>
  );
};

export default LeaderboardMember;
