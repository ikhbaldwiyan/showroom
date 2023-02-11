import React from 'react'
import { Container } from 'reactstrap';

import Header from 'parts/Header';
import Footer from 'parts/Footer';
import { isMobile } from 'react-device-detect';
import { ToastContainer } from "react-toastify";

function MainLayout(props) {
  return (
    isMobile ? (
      <>
        <Header {...props} />
          {props.children}
        <Footer />
      </>
    ) : (
      <>
          {props.isMultiRoom ? (
            <>
              <Header {...props} isMultiRoom/>
              <Container fluid>
                {props.children}
              </Container>
            </>
          ): (
            <>
              <ToastContainer position="top-right" autoClose={3000} />
              <Header {...props} />
              <Container>
                {props.children}
              </Container>
            </>
          )}
        <Footer />
      </>
    )
  )
}

export default MainLayout;