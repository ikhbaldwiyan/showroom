import axios from "axios";
import { UPDATE_TASK_PROGRESS } from "./api/api";
import { showToast } from "./showToast";

export const updateTaskProgress = ({
  taskId,
  userId,
  liveId = "",
  progress,
  user,
  type,
}) => {
  const currentTask = user?.progressData?.taskProgress?.find(
    (task) => task?.taskId._id.toString() === taskId
  );

  let tasks = localStorage?.getItem("completedTask");
  const taskComplete = currentTask?.progress + progress >= currentTask?.taskId?.criteria;
  const setCompletedTask = (res) => {
    if (tasks) {
      tasks = JSON.parse(tasks);
      !tasks?.includes(res?.data?.task?._id) && tasks.push(res.data.task._id);
      localStorage.setItem("completedTask", JSON.stringify(tasks));
    } else {
      localStorage.setItem(
        "completedTask",
        JSON.stringify([res.data.task._id])
      );
    }
  };

  if (taskComplete && !currentTask?.liveIds?.includes(liveId?.toString())) {
    axios
      .put(UPDATE_TASK_PROGRESS(taskId), {
        userId,
        liveId,
        progress: currentTask?.taskId?.criteria,
      })
      .then((res) => {
        const completed = res.data.taskProgress.status === "completed";
        if (completed && !tasks?.includes(res?.data?.task?._id)) {
          showToast("success", `Task ${currentTask.taskId.name} completed`);
        }
        setCompletedTask(res);
      });
  }

  // update task type live
  if (type === "watch" && !currentTask?.liveIds?.includes(liveId?.toString())) {
    return axios
      .put(UPDATE_TASK_PROGRESS(taskId), {
        liveId,
        userId,
        progress: currentTask ? (currentTask.progress += progress) : progress,
      })
      .then((res) => {
        if (!taskComplete) {
          showToast("info", "Task watch member updated");
        }
      });
  }

  // update task type send stars
  if (type === "stars") {
    return axios
      .put(UPDATE_TASK_PROGRESS(taskId), {
        userId,
        progress: currentTask ? (currentTask.progress += progress) : progress,
      })
      .then((res) => {
        if (!taskComplete) {
          showToast("info", `Task send stars progress updated`);
        }
      });
  }
};
