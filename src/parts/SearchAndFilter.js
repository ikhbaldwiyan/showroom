import React from "react";
import { FcSearch } from "react-icons/fc";
import { Button } from "reactstrap";
import { RiDashboardFill, RiUserSearchFill } from "react-icons/ri";
import { AiFillAppstore, AiFillCalendar } from "react-icons/ai";
import { IoSchoolSharp } from "react-icons/io5";
import { isMobile } from "react-device-detect";
import { FaUserGraduate } from "react-icons/fa";

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

  return !isMobile ? (
    <div className="row mt-2">
      <div className="col-md-4 col-sm-12 search-wrapper">
        <RiUserSearchFill className="search-bar" color="#333333" size="1.5em" />
        <input
          style={{ width: "100%", padding: "1rem 1rem 1rem 3rem", borderRadius: "5px" }}
          type="text"
          placeholder={isLive ? "Search theater schedule" : "Search member name"}
          onChange={handleSearch}
          className="form-control"
        />
      </div>
      <div className="col-md-7 col-sm-12 search-wrapper">
        <Button
          className="mx-2"
          style={{ backgroundColor: "teal", border: "none", borderRadius: "5px" }}
          onClick={filterAllMember}
          disabled={allMember ? "disabled" : ""}
        >
          <RiDashboardFill size={20} className="mb-1 mr-1" />{" "}
          <span className="text-filter">All Members</span>
        </Button>
        <Button
          className="mx-2"
          style={{ backgroundColor: "teal", border: "none", borderRadius: "5px" }}
          onClick={filterRegular}
          disabled={isRegular ? "disabled" : ""}
        >
          <FaUserGraduate size={20} className="mb-1 mr-2" />
          <span className="text-filter">Trainee</span>
        </Button>
      </div>
    </div>
  ) : (
    <div className="row mt-4">
      <div className="col-12 search-wrapper">
        <FcSearch className="search-bar" color="#03665c" size="1.5em" />
        <input
          style={{ width: "100%", padding: "1rem 1rem 1rem 3rem" }}
          type="text"
          placeholder={isLive ? "Search theater schedule" : "Search member name"}
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
          <AiFillAppstore className="mb-1" />{" "}
          <span className="text-filter">ALL</span>
        </Button>
        <Button
          className="mr-2"
          style={{ backgroundColor: "teal", border: "none" }}
          onClick={filterRegular}
          disabled={isRegular ? "disabled" : ""}
        >
          <IoSchoolSharp className="mb-1 mr-1" />{" "}
          <span className="text-filter">TRAINEE</span>
        </Button>
        <Button
          className="mr-2"
          color="info"
          onClick={filterIsLive}
          disabled={isLive ? "disabled" : ""}
        >
          <AiFillCalendar className="mb-1" />{" "}
          <span className="text-filter">Schedule</span>
        </Button>
      </div>
    </div>
  );
}

export default SearchAndFilter;
