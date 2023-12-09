import React from "react";
import { UncontrolledAlert } from "reactstrap";
import { Link } from "react-router-dom";
import { BsCollectionPlayFill } from "react-icons/bs";
import { gaTag } from "utils/gaTag";
import { getSession } from "utils/getSession";

const WrappedAlert = () => {
  const trackLinkClicked = () => {
    gaTag({
      action: "banner_showroom_wrapped",
      label: "Showroom Wrapped",
      category: "wrapped",
      username: getSession()?.profile?.name ?? "Guest",
    });
  };

  return (
    <UncontrolledAlert className="mt-4" color="primary">
      <BsCollectionPlayFill size="20px" className="mb-1 mr-2" />
      <span className="discord-text">
        Coba fitur JKT48 Showroom Wrapped untuk cek perjalanan ngidolmu
      </span>
      <Link to="/wrapped" onClick={trackLinkClicked}>
        <b className="mx-1 discord-text">DISINI</b>
      </Link>
    </UncontrolledAlert>
  );
};

export default WrappedAlert;
