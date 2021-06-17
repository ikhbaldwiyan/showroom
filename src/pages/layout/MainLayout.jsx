import React from 'react'
import { Container } from 'reactstrap';

import Header from 'parts/Header';
import Footer from 'parts/Footer';
import { isMobile } from 'react-device-detect';

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
        <Header {...props} />
          <Container>
            {props.children}
          </Container>
        <Footer />
      </>
    )
  )
}

export default MainLayout;