import React from "react";
import { FaDiscord } from "react-icons/fa";
import { UncontrolledAlert } from "reactstrap";
import { gaEvent } from "utils/gaEvent";

const AlertInfo = () => {
  return (
    <UncontrolledAlert color="primary">
      <FaDiscord size="23px" className="mb-1" />
      <a
        href="https://discord.com/invite/ZNEjfvHm"
        target="_blank"
        rel="noreferrer"
        onClick={() => gaEvent("Home Screen", "Discord Link Click", "Home") }
      >
        <b className="mx-1">Join komunitas discord untuk update info fitur baru</b>
      </a>
    </UncontrolledAlert>
  );
};

export default AlertInfo;
