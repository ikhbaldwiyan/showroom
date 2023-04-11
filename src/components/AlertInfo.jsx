import React from "react";
import { FaDiscord } from "react-icons/fa";
import { UncontrolledAlert } from "reactstrap";
import { gaEvent } from "utils/gaEvent";

const AlertInfo = ({ page, label }) => {
  return (
    <UncontrolledAlert color="primary">
      <FaDiscord size="23px" className="mb-1 mr-2" />
      Join grup Discord untuk update info fitur baru
      <a
        href={process.env.DISCORD_LINK}
        target="_blank"
        rel="noreferrer"
        onClick={() => gaEvent(page, "Discord Link Click", label)}
      >
        <b className="mx-1">
          JOIN DISINI
        </b>
      </a>
    </UncontrolledAlert>
  );
};

export default AlertInfo;
