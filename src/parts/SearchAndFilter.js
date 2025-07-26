import React from "react";
import { FcSearch } from "react-icons/fc";
import { Button, Col, Input, Row } from "reactstrap";
import { RiDashboardFill, RiUserSearchFill } from "react-icons/ri";
import { FaGithub, FaTheaterMasks, FaUserGraduate } from "react-icons/fa";
import { activityLog } from "utils/activityLog";
import { getSession } from "utils/getSession";
import useWindowDimensions from "utils/useWindowDimension";
import { FaSquareXTwitter } from "react-icons/fa6";

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
      description: `${type} Banner Click`,
      logName: `${type} Link`,
      userId: getSession()?.userProfile?._id,
    });
  };

  const { width } = useWindowDimensions();

  return width > 768 ? (
    <Row className="align-items-center">
      <Col md="4" sm="12" className="search-wrapper">
        <RiUserSearchFill className="search-bar" color="#333333" size="1.5em" />
        <Input
          style={{
            padding: "1rem 1rem 1rem 3rem",
            borderRadius: "5px",
          }}
          type="text"
          placeholder={
            isLive ? "Search theater schedule" : "Search member name"
          }
          onChange={handleSearch}
        />
      </Col>

      <Col md="4" sm="12" className="search-wrapper">
        <Button
          className="menu-button mx-2"
          onClick={filterAllMember}
          disabled={allMember ? true : false}
        >
          <RiDashboardFill size={20} className="mb-1 mr-1" />
          <span className="text-filter">All Members</span>
        </Button>
        <Button
          className="menu-button mx-2"
          onClick={filterRegular}
          disabled={isRegular ? true : false}
        >
          <FaUserGraduate size={20} className="mb-1 mr-2" />
          <span className="text-filter">Trainee</span>
        </Button>
      </Col>

      <Col md="4" sm="12" className="search-wrapper d-flex justify-content-end">
        <a
          href={process.env.REACT_APP_DISCORD_LINK}
          target="_blank"
          rel="noreferrer"
          onClick={() => socmedClick("Discord")}
        >
          <img
            height={45}
            className="rounded mx-3"
            src="https://discordapp.com/api/guilds/1076511743909564506/widget.png?style=banner2"
            alt="Discord"
          />
        </a>
        <a
          href="https://twitter.com/JKT48_SHOWROOM"
          target="_blank"
          rel="noreferrer"
          onClick={() => socmedClick("Twitter")}
        >
          <Button className="mr-2" color="dark">
            <FaSquareXTwitter size={28} />
          </Button>
        </a>
        <a
          href="https://github.com/ikhbaldwiyan/showroom"
          target="_blank"
          rel="noreferrer"
          onClick={() => socmedClick("Github")}
        >
          <Button className="mr-1" color="dark">
            <FaGithub size={28} />
          </Button>
        </a>
      </Col>
    </Row>
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