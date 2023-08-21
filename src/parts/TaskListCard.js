import React from "react";
import { FaCommentDots, FaTheaterMasks } from "react-icons/fa";
import { RiMedalLine } from "react-icons/ri";
import { Progress } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const TaskListCard = () => {
  return (
    <div className="task-list-card">
      <div className="card">
        <div className="card-body">
          <div className="task-container">
            <FaTheaterMasks size={50} className="mb-2" />
            <div className="description">
              <span className="task-title">Watch Premium Live theater</span>
              <div className="d-flex">
                <span style={{ fontSize: "14px" }}>
                  Nonton 10 member live selama 3 menit
                  <Progress
                    className="mt-2"
                    barStyle={{
                      backgroundColor: "#00C853", // Custom progress bar color
                    }}
                    value="4"
                    max={10}
                  />
                </span>
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <b className="ml-2">1/10</b>
                </div>
              </div>
            </div>
            <div className="point-container">
              <RiMedalLine size={30} />
              <b className="point-text">400 Point</b>
              <button className="claim-btn">CLAIM</button>
            </div>
          </div>
          <hr style={{ borderWidth: "3px", backgroundColor: "#ECFAFC" }} />
          <div className="task-container mt-3">
            <FaCommentDots size={50} className="mb-2" />
            <div className="description">
              <span className="task-title">Comment 5 times to room live</span>
              <div className="d-flex">
                <span style={{ fontSize: "14px" }}>
                  komen sebanyak 5 kali kepada members
                  <Progress
                    className="mt-2"
                    barStyle={{
                      backgroundColor: "#00C853",
                    }}
                    value="5"
                    max={5}
                  />
                </span>
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <b className="ml-2">5/5</b>
                </div>
              </div>
            </div>
            <div className="point-container">
              <RiMedalLine size={30} />
              <b className="point-text">800 Point</b>
              <button className="claim-btn">CLAIM</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskListCard;
