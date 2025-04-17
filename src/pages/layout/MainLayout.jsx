import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import { isMobile } from "react-device-detect";
import { ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";

import Header from "parts/Header";
import Footer from "parts/Footer";
import Sidebar from "./Sidebar";
import useWindowDimensions from "utils/useWindowDimension";

function MainLayout(props) {
  const { width } = useWindowDimensions();
  const sidebarResponsive = width < 1200 ? "1" : "2";
  const containerResponsive = width < 1200 ? "11" : "10";
  const [isAndroidView, setIsAndroidView] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const viewType = searchParams.get("view_type");
    setIsAndroidView(viewType === "android");
  }, []);

  return (
    <>
      <Helmet>
        <title>{props.title ?? "JKT48 SHOWROOM"}</title>
        <meta name="robots" content="index,follow" />
        <meta
          name="description"
          content={props.description ?? "Nonton Showroom JKT48"}
        />
        <meta
          name="keywords"
          content={
            props.keywords ??
            "showroom jkt48, jkt48 showroom, multi showroom jkt48, jkt48 showroom, dimana nonton showroom jkt48, jkt48 multi stream, jkt48 live multi stream, jadwal showroom jkt48"
          }
        />
      </Helmet>
      {isMobile || width < 768 ? (
        <>
          {!isAndroidView && <Header {...props} />}
          {props.children}
          <ToastContainer position="bottom-center" autoClose={3000} />
          {!isAndroidView && <Footer />}
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
            <Row className="px-3">
              <Col md={sidebarResponsive} className="p-0">
                <Sidebar />
              </Col>
              <Col md={containerResponsive}>
                <div className="mt-3">{props.children}</div>
              </Col>
              <ToastContainer position="top-right" autoClose={3000} />
            </Row>
          )}
          <Footer theme="dark" />
        </>
      )}
    </>
  );
}

export default MainLayout;
