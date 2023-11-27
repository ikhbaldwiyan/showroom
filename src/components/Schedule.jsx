import axios from "axios";
import moment from "moment";
// import SkeletonLive from "parts/skeleton/SkeletonLive";
import React, { useEffect, useState } from "react";
import { FaArrowRight, FaBirthdayCake, FaCalendarAlt, FaRegClock, FaTheaterMasks } from "react-icons/fa";
import { Fade } from "react-reveal";
import { Col, Row } from "reactstrap";
import { SCHEDULES_API } from "utils/api/api";
import "moment/locale/id";
import { slugify } from "utils/slugify";
import { Link } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi";
import { IoSchoolSharp } from "react-icons/io5";

const Schedule = ({ isSearch, isShowing, isHome }) => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(`${SCHEDULES_API}?isOnWeekSchedule=${isShowing}`)
        .then((res) => {
          setSchedule(isHome ? res.data : res.data.reverse());
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    !isSearch && schedule.length > 0 && (
      <Fade>
        <Row>
          {isHome && (
            <Col lg="12">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h3>Jadwal Theater</h3>
                <Link to="/theater-schedule">
                  <div
                    className="d-flex align-items-center"
                    style={{ color: "#ECFAFC" }}
                  >
                    <FaArrowRight className="mb-2 mr-2" size={25} />
                    <h5>See More</h5>
                  </div>
                </Link>
              </div>
            </Col>
          )}
          {schedule.length !== 0 &&
            schedule.map((item, idx) => (
              <Col key={idx} className="mb-4" md="4" sm="12">
                <div className="theater-schedule-title">
                  <div className="d-flex align-items-center">
                    <FaTheaterMasks size={25} className="mr-2" />
                    {item?.setlist?.name}
                  </div>
                </div>
                <Row>
                  <Col md="12">
                    <div className="theater-date">
                      <div className="d-flex align-items-center">
                        <FaCalendarAlt size={18} className="mr-2" />
                        {moment(item.showDate)
                          .locale("id")
                          .format("dddd, DD MMMM YYYY")} - {" "}
                        <FaRegClock size={17} className="ml-2 mr-1" />
                        {item?.showTime}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Link
                  to={`/theater/${slugify(item?.setlist?.name)}/${item?._id}`}
                >
                  <div className="card card-setlist mt-2">
                    {item?.isBirthdayShow && (
                      <div className="info">
                        <FaBirthdayCake size={18} className="mr-1 mb-1" />
                        {item?.birthdayMember?.stage_name ?? item?.birthdayMemberName}
                      </div>
                    )}
                    {item?.isGraduationShow && (
                      <div className="info">
                        <IoSchoolSharp size={18} className="mr-1 mb-1" />
                        {item?.graduateMember?.stage_name}
                      </div>
                    )}
                    <figure className="img-wrapper">
                      <img
                        className="img-cover"
                        width="100%"
                        src={item?.setlist?.image}
                        alt={item?.setlist?.name}
                        style={{
                          maxHeight: "215px",
                          objectFit: "cover",
                          borderRadius: "6px 6px 0px 0px",
                        }}
                      />
                    </figure>
                  </div>
                </Link>
                <div className="card-schedule">
                  <div className="card-desc">
                    {item?.setlist?.description &&
                      item.setlist.description.length > 160
                      ? item.setlist.description.slice(0, 160) + "..."
                      : item.setlist.description}
                  </div>
                </div>
                <Link
                  to={`/theater/${slugify(item?.setlist?.name)}/${item?._id}`}
                >
                  <button className="theater-button">
                    <BiLogInCircle className="mr-1 mb-1" size={20} />
                    Detail Show
                  </button>
                </Link>
              </Col>
            ))}
        </Row>
      </Fade>
    )
  );
};

export default Schedule;
