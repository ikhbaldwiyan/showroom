import React from "react";
import MainLayout from "../layout/MainLayout";
import Schedule from "components/Schedule";

const SharingLive = (props) => {
  window.scrollTo(0, 0);
  return (
    <MainLayout title="Sharing Live JKT48" {...props}>
      <div className="layout">
        <h3 className="py-2">Daftar show sharing live</h3>
        <Schedule isShowing={true} isSharing />
      </div>
    </MainLayout>
  );
};

export default SharingLive;
