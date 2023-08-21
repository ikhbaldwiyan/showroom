import axios from "axios";
import { UPDATE_TASK_PROGRESS } from "./api/api";
import { showToast } from "./showToast";

export const updateTaskProgress = ({
  taskId,
  userId,
  liveId,
  progress,
  user,
  type,
}) => {
  const currentTask = user?.progressData?.taskProgress?.find(
    (task) => task?._id === taskId
  );

  // update task type live
  if (type === "watch" && !currentTask?.liveIds?.includes(liveId?.toString())) {
    return axios
      .put(UPDATE_TASK_PROGRESS(taskId), {
        liveId,
        userId,
        progress: currentTask ? (currentTask.progress += progress) : progress,
      })
      .then((res) => {
        showToast("info", res.data.message);
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
        showToast("info", `Task send stars progress updated`);
      });
  }
};
