import axios from "axios";
import Button from "elements/Button";
import moment from "moment";
import SkeletonLive from "parts/skeleton/SkeletonLive";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { Fade } from "react-reveal";
import { SCHEDULES_API } from "utils/api/api";

const Schedule = ({ theme, isSearch }) => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    try {
      axios.get(SCHEDULES_API).then((res) => {
        setSchedule(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    !isSearch &&
    schedule.length !== 0 && (
      <>
        <h3 className="py-2 theater-title">Jadwal Theater</h3>
        <div className="container-grid">
          {schedule.length ? (
            schedule.map((item, idx) => (
              <div
                key={idx}
                className={`item ${isMobile ? "column-12" : `column-3`} row-1`}
              >
                <Fade bottom>
                  <div className="card card-featured">
                    <Button
                      href={`/theater/${item?._id}`}
                      type="link"
                    >
                      <div className="tag" style={{ backgroundColor: "teal" }}>
                        {moment(item?.showDate).format("DD MMMM")}
                      </div>
                      <figure className="img-wrapper">
                        <img
                          src={item?.setlist?.image}
                          alt={item?.setlist?.name}
                          className="img-cover"
                        />
                      </figure>
                      <div className="meta-wrapper">
                        <Button
                          type="link"
                          style={{ textDecoration: "none" }}
                          className="strecthed-link d-block text-white"
                          href={`/theater/${item?._id}`}
                        >
                          <h5>{item?.setlist?.name}</h5>
                        </Button>
                      </div>
                    </Button>
                  </div>
                </Fade>
              </div>
            ))
          ) : (
            <SkeletonLive theme={theme} />
          )}
        </div>
      </>
    )
  );
};

export default Schedule;
