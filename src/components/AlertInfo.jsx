import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { UncontrolledAlert } from "reactstrap";

const AlertInfo = () => {
  return (
    <UncontrolledAlert color="primary">
      <FaInfoCircle size="20px" className="mb-1 mr-2" />
      Join komunitas discord untuk update info project ini:
      <a
        href="https://discord.com/invite/ZNEjfvHm"
        target="_blank"
        rel="noreferrer"
      >
        <b className="mx-1">JOIN GRUP</b>
      </a>
    </UncontrolledAlert>
  );
};

export default AlertInfo;
