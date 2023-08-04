import axios from "axios";
import moment from "moment";
// import SkeletonLive from "parts/skeleton/SkeletonLive";
import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaRegClock } from "react-icons/fa";
import { Fade } from "react-reveal";
import { Col, Row } from "reactstrap";
import { SCHEDULES_API } from "utils/api/api";
import "moment/locale/id";
import { slugify } from "utils/slugify";
import { Link } from "react-router-dom";

const Schedule = ({ theme, isSearch }) => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    try {
      axios.get(`${SCHEDULES_API}?isOnWeekSchedule=true`).then((res) => {
        setSchedule(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    !isSearch && (
      <Fade>
        <h3 className="py-1 font-weight-bold">Jadwal Theater</h3>
        <Row>
          {schedule.length !== 0 &&
            schedule.map((item, idx) => (
              <Col key={idx} className="mb-4" md="4" sm="12">
                <h4 className="py-2">
                  <b>{item?.setlist?.name}</b>
                </h4>
                <Row>
                  <Col md="8">
                    <div className="theater-date">
                      <div className="d-flex align-items-center">
                        <FaCalendarAlt size={18} className="mr-2" />
                        {moment(item.showDate)
                          .locale("id")
                          .format("dddd, DD MMMM YYYY")}
                      </div>
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="theater-schedule-time">
                      <div className="d-flex align-items-center">
                        <FaRegClock size={18} className="mr-2" />
                        {item?.showTime}
                      </div>
                    </div>
                  </Col>
                </Row>
                <img
                  width="100%"
                  src={item?.setlist?.image}
                  alt={item?.setlist?.name}
                  style={{
                    maxHeight: "215px",
                    objectFit: "cover",
                    borderRadius: "6px 6px 0px 0px",
                  }}
                />
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
                  <button className="theater-button">Detail Theater</button>
                </Link>
              </Col>
            ))}
        </Row>
      </Fade>
    )
  );
};

export default Schedule;
