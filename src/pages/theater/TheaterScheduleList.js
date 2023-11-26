import React from "react";
import MainLayout from "../layout/MainLayout";
import Schedule from "components/Schedule";

const TheaterScheduleList = (props) => {
  window.scrollTo(0, 0);
  return (
    <MainLayout title="Jadwal Theater JKT48" {...props}>
      <div className="layout">
        <div className="mb-4">
          <h3 className="mb-3">Jadwal Theater Minggu Ini</h3>
          <Schedule isShowing={true} />
          <h3 className="py-2">History Jadwal Theater</h3>
          <Schedule isShowing={false} />
        </div>
      </div>
    </MainLayout>
  );
};

export default TheaterScheduleList;
