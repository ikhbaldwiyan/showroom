import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Button, Col, Row } from "reactstrap";
import { RECENT_LIVE_LOG_API } from "utils/api/api";
import { FaClock } from "react-icons/fa";
import { BsCalendarDateFill, BsPeopleFill } from "react-icons/bs";
import { BiLogInCircle } from "react-icons/bi";
import { GiBackwardTime } from "react-icons/gi";
import { FcSearch } from "react-icons/fc";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import TimeAgo from "react-timeago";
import formatViews from "utils/formatViews";
import formatLongDate from "utils/formatLongDate";
import MainLayout from "../layout/MainLayout";
import Pagination from "parts/Pagination";
import { Link } from "react-router-dom";
import { RiBroadcastFill } from "react-icons/ri";
import debounce from "lodash.debounce";

const LiveHistory = (props) => {
  const [logs, setLogs] = useState([]);
  const [sort, setSort] = useState("date");
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("active");
  const [order, setOrder] = useState("-1");
  const [perPage, setPerpage] = useState(12);
  const [totalCount, setTotalCount] = useState("");
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");

  useEffect(() => {
    async function getRoomList() {
      try {
        const history = await axios.get(
          RECENT_LIVE_LOG_API(
            sort,
            page,
            filter,
            order,
            perPage,
            search,
            "",
            type
          )
        );
        const { recents, perpage, total_count } = history.data;
        setLogs(recents);
        setPerpage(perpage);
        setTotalCount(total_count);
      } catch (error) {
        console.log(error);
      }
    }
    getRoomList();
    window.document.title = "Member Live History";
  }, [sort, page, filter, order, perPage, search, type]);

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      setSearch(searchTerm);
      setPage(1);
    }, 500),
    []
  );

  const handleSearch = (e) => {
    debouncedSearch(e.target.value);
  };

  const getLiveDuration = (duration) => {
    const minutes = Math.floor(duration / 60000);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${remainingMinutes} minutes`;
    } else {
      return `${hours} hours ${remainingMinutes} minutes`;
    }
  };

  return (
    <MainLayout {...props}>
      <div className="layout">
        <div className="d-flex justify-content-between align-items-center">
          <h3>History Live Showroom</h3>
        </div>
        <Row className="d-flex">
          <div className="col-md-4 col-sm-12 search-wrapper">
            <FcSearch className="search-bar" color="#03665c" size="1.5em" />
            <input
              style={{ width: "100%", padding: "1rem 1rem 1rem 3rem" }}
              type="text"
              placeholder="Search member history"
              onChange={handleSearch}
              className="form-control"
            />
          </div>
          <div className="col-md-3 col-sm-12 mt-3">
            <Button
              color={type === "all" ? "info" : "secondary"}
              onClick={() => setType("all")}
            >
              All
            </Button>
            <Button
              color={type === "showroom" ? "info" : "secondary"}
              className="ml-2"
              onClick={() => setType("showroom")}
            >
              Showroom
            </Button>
            <Button
              color={type === "idn" ? "info" : "secondary"}
              className="ml-2"
              onClick={() => setType("idn")}
            >
              IDN
            </Button>
          </div>
          <div className="col-md-5 col-sm-12 mt-3">
            <Pagination
              page={page}
              perPage={perPage}
              totalCount={totalCount}
              setPage={setPage}
            />
          </div>
        </Row>
        <Row>
          {logs.map((log, idx) => {
            const { member, live_info } = log;
            return (
              <Col key={idx} sm="6" md="4" className="py-3">
                <Card
                  style={{
                    background: `linear-gradient(180deg,#004A66  0%,  #009FCB 100%)`,
                    borderColor: "white",
                    color: "white"
                  }}
                >
                  <CardImg
                    top
                    src={member.img.replace("m.jpeg", "l.jpeg")}
                    alt={member.img_alt}
                    style={{
                      borderTopRightRadius: "6px",
                      borderTopLeftRadius: "6px",
                      maxHeight: "180px",
                      objectFit: "cover"
                    }}
                  />
                  <CardBody>
                    <CardTitle tag="h5" style={{ fontWeight: "bold" }}>
                      {member.name}
                    </CardTitle>
                    <div
                      className="d-flex align-items-center mt-2"
                      style={{ color: "#CBD5E0" }}
                    >
                      <BsCalendarDateFill className="mr-2" />
                      <span>{formatLongDate(live_info.date.start)}</span>
                      <span className="mx-1">-</span>
                      <span>{formatLongDate(live_info.date.end, true)}</span>
                    </div>
                    <hr style={{ borderColor: "white" }} />
                    <CardSubtitle tag="h6" className="mb-2">
                      <div className="d-flex align-items-center py-1 mt-1">
                        <BsPeopleFill className="mr-2" />
                        <span> {formatViews(live_info?.viewers?.num)}</span>
                      </div>
                      <div className="d-flex align-items-center py-1 mt-1">
                        <FaClock className="mr-2" />
                        <span>{getLiveDuration(live_info.duration)}</span>
                      </div>
                      <div className="d-flex align-items-center py-1 mt-1">
                        <RiBroadcastFill size={20} />
                        <b className="ml-1">
                          {log.type === "showroom" ? "Showroom" : "IDN Live"}
                        </b>
                      </div>
                    </CardSubtitle>
                    <hr style={{ borderColor: "silver" }} />
                    <div className="text-start mt-3">
                      <CardText className="font-weight-bold">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <GiBackwardTime
                              color="silver"
                              size={22}
                              className="mr-1"
                            />
                            <TimeAgo
                              style={{ color: "#E2E8F0" }}
                              date={live_info.date.end}
                            />
                          </div>
                          <Link
                            className="text-white"
                            to={`/history/${member.url}/${log.data_id}`}
                          >
                            <div className="d-flex align-items-center">
                              <BiLogInCircle className="mr-1" size={20} />
                              Detail
                            </div>
                          </Link>
                        </div>
                      </CardText>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </MainLayout>
  );
};

export default LiveHistory;
