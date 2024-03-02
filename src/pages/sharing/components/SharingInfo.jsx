import React from "react";
import FAQ from "./FAQ";
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
      <FAQ />
    </div>
  );
};

export default SharingInfo;
