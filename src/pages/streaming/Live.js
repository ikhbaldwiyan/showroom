import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import Header from 'parts/Header';
import Streaming from './Stream';
import Comment from 'pages/jeketi/Comment';

export default function Live(props) {
  const [url, setUrl] = useState([])

  useEffect(() => {
    axios.get('/streaming_url?room_id=318117').then(res => {
      const streamUrl = res.data.streaming_url_list
      setUrl(streamUrl)
    });
  }, [])

  return (
    <>
      <Header {...props} />
      <Row style={{ marginLeft: '48px', marginRight: '48px' }}>
        <Col lg="8">
          {url.slice(0, 1).map((item, idx) => (
            <Streaming key={idx} url={item.url} />
          ))}
          <h3 className="mt-3">
            Showroom
          </h3>
        </Col>
        <Col>
          <Comment />
        </Col>
      </Row>
    </>
  )
}

