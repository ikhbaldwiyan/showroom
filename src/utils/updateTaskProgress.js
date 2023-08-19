import axios from "axios";
import { UPDATE_TASK_PROGRESS } from "./api/api";
import { showToast } from "./showToast";

export const updateTaskProgress = ({ taskId, userId, liveId, progress }) => {
  return axios
    .put(UPDATE_TASK_PROGRESS(taskId), {
      liveId,
      userId,
      progress,
    })
    .then((res) => {
      showToast("info", res.data.message);
    });
};
