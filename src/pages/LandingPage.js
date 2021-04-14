import React, { Component } from 'react'

import Header from 'pages/jeketi/Header';
import MostPicked from 'parts/MostPicked'
import Footer from 'pages/jeketi/Footer';

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.refMostPicked = React.createRef();
  }

  componentDidMount() {
    document.title = 'JKT48 Showroom'
  }

  render() {
    return (
      <>
        <Header {...this.props} />
          <MostPicked refMostPicked={this.refMostPicked} />
        <Footer />
      </>
    )
  }
}
