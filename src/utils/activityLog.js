import axios from "axios";
import { isMobile } from "react-device-detect";
import { ACTIVITY_LOG, CREATE_USER } from "./api/api";
import { getSession } from "./getSession";

export const activityLog = ({ userId, logName, description, liveId }) => {
  const user = getSession().user;
  const profile = getSession().profile;

  if (window.location.hostname !== "localhost") {
    if (!userId) {
      axios
        .post(CREATE_USER, {
          user_id: user?.account_id,
          name: profile?.name
        })
        .then((res) => {
          activityLog({
            userId: res?.data?.user?._id,
            logName: "Auto Register",
            description: `Auto Register user from activity log ${logName.toLowerCase()}`
          });
          localStorage.setItem("userProfile", JSON.stringify(res.data.user));

          return axios.post(ACTIVITY_LOG, {
            user_id: res.data.user._id,
            live_id: liveId,
            log_name: logName,
            description,
            device: isMobile ? "Mobile" : "Desktop"
          });
        });
    } else {
      return axios.post(ACTIVITY_LOG, {
        user_id: userId ?? "64e2090061ec79ea209a0160",
        live_id: liveId,
        log_name: logName,
        description,
        device: isMobile ? "Mobile" : "Desktop"
      });
    }
  }
};
