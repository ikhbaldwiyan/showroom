import React from "react";
import RegisterSharing from "./RegisterSharing";

const SharingInfo = ({
  theater,
  sharingUsers,
  setIsRegister,
  isSharingLive,
}) => {
  return (
    <div className="theater-container">
      <RegisterSharing
        sharingUsers={sharingUsers}
        theater={theater}
        setIsRegister={setIsRegister}
        isSharingLive={isSharingLive}
      />
    </div>
  );
};

export default SharingInfo;
