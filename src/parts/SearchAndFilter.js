import React from "react";
import { FcSearch } from "react-icons/fc";
import { Button } from "reactstrap";
import { RiDashboardFill, RiUserSearchFill } from "react-icons/ri";
import { AiFillAppstore, AiFillCalendar } from "react-icons/ai";
import { isMobile } from "react-device-detect";
import { FaDiscord, FaTheaterMasks, FaTwitter, FaUserGraduate } from "react-icons/fa";
import { activityLog } from "utils/activityLog";
import { getSession } from "utils/getSession";

function SearchAndFilter({
  handleSearch,
  allMember,
  isAcademy,
  isRegular,
  setIsAcademy,
  setAllMember,
  setIsRegular,
  isLive,
  setIsLive,
}) {
  const filterAllMember = () => {
    setIsRegular(false);
    setAllMember(true);
    setIsAcademy(false);
    setIsLive(false);
  };

  const filterAcademy = () => {
    setIsAcademy(true);
    setAllMember(false);
    setIsRegular(false);
    setIsLive(false);
  };

  const filterRegular = () => {
    setIsRegular(true);
    setAllMember(false);
    setIsAcademy(false);
    setIsLive(false);
  };

  const filterIsLive = () => {
    setIsLive(true);
    setIsRegular(false);
    setAllMember(false);
    setIsAcademy(false);
  };

  const socmedClick = (type) => {
    activityLog({
      description: `${type} Button Click`,
      logName: `${type} Link`,
      userId: getSession()?.userProfile?._id,
    });
  };

  return !isMobile ? (
    <div className="row">
      <div className="col-md-4 col-sm-12 search-wrapper">
        <RiUserSearchFill className="search-bar" color="#333333" size="1.5em" />
        <input
          style={{
            width: "100%",
            padding: "1rem 1rem 1rem 3rem",
            borderRadius: "5px",
          }}
          type="text"
          placeholder={
            isLive ? "Search theater schedule" : "Search member name"
          }
          onChange={handleSearch}
          className="form-control"
        />
      </div>
      <div className="col-md-4 col-sm-12 search-wrapper">
        <Button
          className="menu-button mx-2"
          onClick={filterAllMember}
          disabled={allMember ? "disabled" : ""}
        >
          <RiDashboardFill size={20} className="mb-1 mr-1" />{" "}
          <span className="text-filter">All Members</span>
        </Button>
        <Button
          className="menu-button mx-2"
          onClick={filterRegular}
          disabled={isRegular ? "disabled" : ""}
        >
          <FaUserGraduate size={20} className="mb-1 mr-2" />
          <span className="text-filter">Trainee</span>
        </Button>
      </div>
      <div
        className="col-md-4 col-sm-12 search-wrapper"
        style={{ display: "flex", justifyContent: "end" }}
      >
        <a
          href={process.env.REACT_APP_DISCORD_LINK}
          target="_blank"
          rel="noreferrer"
          onClick={() => socmedClick("Discord")}
        >
          <Button
            className="mx-2"
            color="info"
            style={{ backgroundColor: "#5865F2", border: "none" }}
          >
            <FaDiscord size={20} className="mb-1 mr-2" />
            <span className="text-filter">Discord</span>
          </Button>
        </a>
        <a
          href="https://twitter.com/JKT48_SHOWROOM"
          target="_blank"
          rel="noreferrer"
          onClick={() => socmedClick("Twitter")}
        >
          <Button className="mx-2" color="info">
            <FaTwitter size={20} className="mb-1 mr-2" />
            <span className="text-filter">Twitter</span>
          </Button>
        </a>
      </div>
    </div>
  ) : (
    <div className="row">
      <div className="col-12 search-wrapper">
        <FcSearch className="search-bar" color="#03665c" size="1.5em" />
        <input
          style={{ width: "100%", padding: "1rem 1rem 1rem 3rem" }}
          type="text"
          placeholder={
            isLive ? "Search theater schedule" : "Search member name"
          }
          onChange={handleSearch}
          className="form-control"
        />
      </div>
      <div className="col-12 search-wrapper">
        <Button
          className="mr-2"
          color="danger"
          onClick={filterAllMember}
          disabled={allMember ? "disabled" : ""}
        >
          <RiDashboardFill className="mb-1" />{" "}
          <span className="text-filter">ALL</span>
        </Button>
        <Button
          className="mr-2"
          style={{ backgroundColor: "teal", border: "none" }}
          onClick={filterRegular}
          disabled={isRegular ? "disabled" : ""}
        >
          <FaUserGraduate className="mb-1 mr-1" />{" "}
          <span className="text-filter">TRAINEE</span>
        </Button>
        <Button
          className="mr-2"
          color="info"
          onClick={filterIsLive}
          disabled={isLive ? "disabled" : ""}
        >
          <FaTheaterMasks className="mb-1" />{" "}
          <span className="text-filter">Schedule</span>
        </Button>
      </div>
    </div>
  );
}

export default SearchAndFilter;
