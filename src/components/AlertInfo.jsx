import React from "react";
import { FaDiscord } from "react-icons/fa";
import { UncontrolledAlert } from "reactstrap";
import { gaEvent } from "utils/gaEvent";
import { useSelector } from "react-redux";
import { getSession } from "utils/getSession";
import { activityLog } from "utils/activityLog";

const AlertInfo = ({ page, label }) => {
  const user = useSelector((state) => state.user.user);

  const trackLinkClicked = () => {
    gaEvent(page, "Discord Link Click", label)
    activityLog({
      userId: user._id ?? "64e2090061ec79ea209a0160",
      logName: "Discord Link",
      description: "Discord Link Click",
    })
  }

  return (user?.can_3_room === false || getSession()?.session === null) && (
    <UncontrolledAlert color="primary">
      <FaDiscord size="23px" className="mb-1 mr-2" />
      <span className="discord-text">Join grup Discord untuk update info live dan fitur baru</span>
      <a
        href={process.env.REACT_APP_DISCORD_LINK}
        target="_blank"
        rel="noreferrer"
        onClick={trackLinkClicked}
      >
        <b className="mx-1 discord-text">
          JOIN DISINI
        </b>
      </a>
    </UncontrolledAlert>
  );
};

export default AlertInfo;
