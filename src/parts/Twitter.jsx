import React from 'react'
import { TwitterTimelineEmbed, TwitterTweetEmbed } from "react-twitter-embed";
import { Col, Row } from "reactstrap";


const Twitter = () => {
  return (
    <Row>
      <Col lg="12">
        <h3>Twitter</h3>
      </Col>
      <Col lg="6">
        <TwitterTweetEmbed tweetId="1703077747369869810" />
      </Col>
      <Col lg="6">
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="Jkt48_Showroom" 
          options={{ height: 670 }}
        />
      </Col>
    </Row>
  )
}

export default Twitter