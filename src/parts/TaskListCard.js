import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTasks, FaTheaterMasks } from "react-icons/fa";
import { RiLiveFill, RiMedalLine, RiStarSFill } from "react-icons/ri";
import { Progress } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { COMPLETE_TASK, DETAIL_USER, TASK_LIST } from "utils/api/api";
import { getUserSuccess } from "redux/actions/userActions";
import { getSession } from "utils/getSession";
import { getTaskListSuccess } from "redux/actions/taskList";
import combo from "../assets/audio/combo.mp3";
import { showToast } from "utils/showToast";
import { AiFillCheckCircle } from "react-icons/ai";
import { activityLog } from "utils/activityLog";

const TaskListCard = ({ isTaskListOpen }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const taskList = useSelector((state) => state.taskList);
  const [task, setTask] = useState([]);

  async function getUserDetail() {
    const detailUser = await axios.get(
      DETAIL_USER(getSession()?.user?.account_id)
    );
    isTaskListOpen && dispatch(getUserSuccess(detailUser.data));
    axios.get(TASK_LIST).then((res) => {
      setTask(res.data);
    });
  }

  useEffect(() => {
    getUserDetail();
  }, [isTaskListOpen]);

  useEffect(() => {
    const taskListProgress = () => {
      const taskList = [];
      const userProgress = user?.progressData?.taskProgress;

      task?.forEach((task) => {
        const matchingProgress = userProgress?.find(
          (progress) => progress?.taskId?._id === task?._id
        );
        if (matchingProgress) {
          taskList.push({ ...task, ...matchingProgress });
        } else {
          taskList.push({ ...task });
        }
      });

      taskList.length > 0 && dispatch(getTaskListSuccess(taskList));
    };
    taskListProgress();
  }, [task, user]);

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

  const handleCompleteTask = (taskId, progressId) => {
    axios
      .put(COMPLETE_TASK(taskId), {
        userId: user._id,
        progressId: progressId,
      })
      .then((res) => {
        const audio = new Audio(combo);
        audio.volume = 1;
        audio.play();
        getUserDetail();
        showToast("success", res.data.message);
        activityLog({
          logName: "Task",
          userId: user._id,
          taskId,
          description: `Complete task ${res?.data?.task?.name}`
        })
      })
      .catch((err) => {
        console.log(err);
        showToast("error", "Failed complete task");
      });
  };

  return (
    <div className="task-list-card">
      <div className="card">
        <div className="card-body">
          {taskList.data
            ?.filter((item) => item.status !== "claimed")
            ?.filter((item) => item.active === true)
            .map((item, idx) => (
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
                    <RiMedalLine color="#fee103" size={30} />
                    <b className="point-text">{item.reward} Point</b>
                    {item.progress === item.criteria ? (
                      <button
                        onClick={() =>
                          handleCompleteTask(item.taskId._id, item._id)
                        }
                        className="claim-btn"
                      >
                        CLAIM
                      </button>
                    ) : (
                      <button className="claim-btn-disabled" disabled>
                        CLAIM
                      </button>
                    )}
                  </div>
                </div>
              </>
            ))}
          {/* Condition to display message when all tasks are claimed */}
          {taskList?.data?.every((item) => item.status === "claimed") && (
            <div className="d-flex justify-content-center">
              <AiFillCheckCircle size={30} className="mr-2" />
              <h4>All tasks already completed</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskListCard;
