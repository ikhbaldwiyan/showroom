import React from "react";
import { FaUsersCog } from "react-icons/fa";
import { UncontrolledAlert } from "reactstrap";
import { useSelector } from "react-redux";
import { activityLog } from "utils/activityLog";
import { useHistory } from "react-router-dom";
import { gaTag } from "utils/gaTag";
import { getSession } from "utils/getSession";

const UnlockRoom = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useHistory();

  const trackLinkClicked = () => {
    gaTag({
      action: "unlock_link_click",
      category: "Multi Room",
      label: "Alert Link",
    });
    activityLog({
      userId: user._id ?? "64e2090061ec79ea209a0160",
      logName: "Multi Room",
      description: "Unlock multi room page clicked",
    });
    navigate.push("/support-project");
  };

  return (
    (user?.can_3_room === false ||
      user?.can_4_room === false ||
      !getSession().session) && (
      <UncontrolledAlert color="primary">
        <FaUsersCog size="23px" className="mb-1 mr-2" />
        <span className="discord-text">
          Unlock fitur settings max 4 showroom member di multi room
        </span>
        <a style={{ cursor: "pointer" }} onClick={trackLinkClicked}>
          <b className="mx-1 discord-text">CEK DISINI</b>
        </a>
      </UncontrolledAlert>
    )
  );
};

export default UnlockRoom;
