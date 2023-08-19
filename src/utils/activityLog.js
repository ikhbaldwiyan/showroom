import axios from "axios";
import { ACTIVITY_LOG } from "./api/api";

export const activityLog = ({ userId, logName, description, taskId }) => {
  return axios.post(ACTIVITY_LOG, {
    user_id: userId,
    task_id: taskId,
    log_name: logName,
    description,
  });
};
