import React from "react";
import { Container } from "reactstrap";
import MainLayout from "../layout/MainLayout";
import Schedule from "components/Schedule";

const TheaterScheduleList = (props) => {
  window.scrollTo(0, 0);
  return (
    <MainLayout title="Jadwal Theater JKT48" {...props}>
      <Container className="mb-4">
        <h3 className="py-1">Jadwal Theater Minggu Ini</h3>
        <Schedule isShowing={true}  />
        <h3 className="py-1">History Jadwal Theater</h3>
        <Schedule isShowing={false} />
      </Container>
    </MainLayout>
  );
};

export default TheaterScheduleList;
