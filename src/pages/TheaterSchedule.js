import React from "react";
import { Container } from "reactstrap";
import MainLayout from "./layout/MainLayout";
import Schedule from "components/Schedule";

const TheaterSchedule = (props) => {
  window.scrollTo(0,0)
  return (
    <MainLayout title="Jadwal Theater JKT48" {...props}>
      <Container className="mb-4">
        <Schedule />
      </Container>
    </MainLayout>
  );
};

export default TheaterSchedule;
