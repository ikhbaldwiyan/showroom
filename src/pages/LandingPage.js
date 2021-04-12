import React, { Component } from 'react'
import Header from 'pages/jeketi/Header'
import landingPage from 'json/landingPage.json'
import MostPicked from 'parts/MostPicked'

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.refMostPicked = React.createRef();
  }

  render() {
    return (
      <>
        <Header {...this.props} />
        <MostPicked refMostPicked={this.refMostPicked} data={landingPage.mostPicked} />
      </>
    )
  }
}
