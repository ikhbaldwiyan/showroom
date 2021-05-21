import React, { Component } from 'react'

import Header from 'pages/jeketi/Header';
import Home from 'parts/Home'
import Footer from 'pages/jeketi/Footer';

export default class LandingPage extends Component {
  componentDidMount() {
    document.title = 'JKT48 Showroom'
  }

  render() {
    return (
      <>
        <Header {...this.props} />
          <Home />
        <Footer />
      </>
    )
  }
}
