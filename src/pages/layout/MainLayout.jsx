import React from 'react'
import { Container } from 'reactstrap';

import Header from 'parts/Header';
import Footer from 'parts/Footer';

function MainLayout(props) {
  return (
    <>
      <Header {...props} />
        <Container>
          {props.children}
        </Container>
      <Footer />
    </>
  )
}

export default MainLayout;