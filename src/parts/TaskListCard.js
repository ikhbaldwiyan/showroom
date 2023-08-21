import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTasks, FaTheaterMasks } from "react-icons/fa";
import { RiLiveFill, RiMedalLine, RiStarSFill } from "react-icons/ri";
import { Progress } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { DETAIL_USER, TASK_LIST } from "utils/api/api";
import { getUserSuccess } from "redux/actions/userActions";
import { getSession } from "utils/getSession";

const TaskListCard = ({ isTaskListOpen }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [task, setTask] = useState([]);

  useEffect(() => {
    axios.get(TASK_LIST).then((res) => {
      setTask(res.data);
    });
    async function getUserDetail() {
      const detailUser = await axios.get(
        DETAIL_USER(getSession().userProfile.user_id)
      );
      isTaskListOpen && dispatch(getUserSuccess(detailUser.data));
    }
    taskListProgress();
    getUserDetail();
  }, [isTaskListOpen]);

  const renderTaskIcon = (type) => {
    if (type === "watch") {
      return <RiLiveFill size={50} className="mb-2" />;
    } else if (type === "theater") {
      return <FaTheaterMasks size={50} className="mb-2" />;
    } else if (type === "stars") {
      return <RiStarSFill size={50} className="mb-2" />;
    } else {
      return <FaTasks size={50} className="mb-2" />;
    }
  };

  const taskListProgress = () => {
    const taskList = [];
    const userProgress = user.progressData.taskProgress;

    task.forEach((task) => {
      const matchingProgress = userProgress.find(
        (progress) => progress._id === task._id
      );
      if (matchingProgress) {
        taskList.push({ ...task, ...matchingProgress });
      } else {
        taskList.push({ ...task });
      }
    });

    return taskList;
  };

  return (
    <div className="task-list-card">
      <div className="card">
        <div className="card-body">
          {taskListProgress()?.map((item, idx) => (
            <>
              {idx !== 0 && (
                <hr
                  style={{ borderWidth: "3px", backgroundColor: "#ECFAFC" }}
                />
              )}
              <div className="task-container" kye={idx}>
                {renderTaskIcon(item.type)}
                <div className="description">
                  <span className="task-title">{item?.name}</span>
                  <div className="d-flex">
                    <span style={{ fontSize: "14px" }}>
                      {item.description}
                      <Progress
                        className="mt-2"
                        barStyle={{
                          backgroundColor: "#00C853",
                        }}
                        style={{ backgroundColor: "#D9D9D9" }}
                        value={item.progress}
                        max={item.criteria}
                      />
                    </span>
                    <div style={{ display: "flex", alignItems: "flex-end" }}>
                      <b className="ml-2">
                        {item.progress ?? 0}/{item.criteria}
                      </b>
                    </div>
                  </div>
                </div>
                <div className="point-container">
                  <RiMedalLine size={30} />
                  <b className="point-text">{item.reward} Point</b>
                  <button className="claim-btn">CLAIM</button>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskListCard;
