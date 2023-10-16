import React from "react";
import { Container } from "reactstrap";
import MainLayout from "../layout/MainLayout";
import Schedule from "components/Schedule";

const SharingLive = (props) => {
  window.scrollTo(0, 0);
  return (
    <MainLayout title="Sharing Live JKT48" {...props}>
      <Container className="mb-4">
        <h3 className="py-2">Daftar show sharing live</h3>
        <Schedule isShowing={true} isSharing />
      </Container>
    </MainLayout>
  );
};

export default SharingLive;
