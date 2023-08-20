import axios from "axios";
import { ACTIVITY_LOG, CREATE_USER } from "./api/api";
import { getSession } from "./getSession";

export const activityLog = ({ userId, logName, description, taskId }) => {
  const user = getSession().user;
  const profile = getSession().profile;

  if (!userId) {
    axios
      .post(CREATE_USER, {
        user_id: user.account_id,
        name: profile.name
      })
      .then((res) => {
        activityLog({
          userId: res.data.user._id,
          logName: "Auto Register",
          description: `Auto Register user from activity log ${logName.toLowerCase()}`
        });
        localStorage.setItem("userProfile", JSON.stringify(res.data.user));

        return axios.post(ACTIVITY_LOG, {
          user_id: res.data.user._id,
          task_id: taskId,
          log_name: logName,
          description
        });
      });
  } else {
    return axios.post(ACTIVITY_LOG, {
      user_id: userId,
      task_id: taskId,
      log_name: logName,
      description
    });
  }
};
