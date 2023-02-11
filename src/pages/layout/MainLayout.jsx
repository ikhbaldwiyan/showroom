import React from "react";
import { Container } from "reactstrap";

import Header from "parts/Header";
import Footer from "parts/Footer";
import { isMobile } from "react-device-detect";
import { ToastContainer } from "react-toastify";

function MainLayout(props) {
  return isMobile ? (
    <>
      <Header {...props} />
      {props.children}
      <ToastContainer position="bottom-center" autoClose={3000} />
      <Footer />
    </>
  ) : (
    <>
      {props.isMultiRoom ? (
        <>
          <Header {...props} isMultiRoom />
          <Container fluid>
            {props.children}
            <ToastContainer position="top-right" autoClose={3000} />
          </Container>
        </>
      ) : (
        <>
          <Header {...props} />
          <Container>
            {props.children}
            <ToastContainer position="top-right" autoClose={3000} />
          </Container>
        </>
      )}
      <Footer />
    </>
  );
}

export default MainLayout;
