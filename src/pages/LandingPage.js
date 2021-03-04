import React, { Component } from 'react'
import Header from 'parts/Header'
import landingPage from 'json/landingPage.json'
import Hero from 'parts/Hero'

export default class LandingPage extends Component {
  render() {
    return (
      <>
        <Header {...this.props} />
        <Hero data={landingPage.hero} />
      </>
    )
  }
}
