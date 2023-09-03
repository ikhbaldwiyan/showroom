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

  const isComplete =
    currentTask.progress + progress === currentTask.taskId.criteria;
  const taskComplete =
    currentTask.progress + progress >= currentTask.taskId.criteria;

  if (
    taskComplete &&
    type === "watch" &&
    !currentTask?.liveIds?.includes(liveId?.toString())
  ) {
    axios
      .put(UPDATE_TASK_PROGRESS(taskId), {
        userId,
        liveId,
        progress: currentTask?.taskId?.criteria,
      })
      .then((res) => {
        if (isComplete) {
          showToast("succes", `Task ${currentTask.taskId.name} completed`);
        }
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
