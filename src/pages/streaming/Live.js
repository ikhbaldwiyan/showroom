import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'reactstrap';

import Header from 'parts/Header';
import Menu from 'pages/jeketi/Menu';
import Stream from './Stream';
import Profile from 'pages/jeketi/Profile';
import RoomList from 'pages/jeketi/RoomList';
import LiveChat from 'pages/jeketi/Comment';
import Setlist from 'pages/jeketi/Setlist';

export default function Live(props) {
  const [url, setUrl] = useState([]);
  const [roomId, setRoomId] = useState('317724');
  const [menu, setMenu] = useState('room');

  useEffect(() => {
    axios.get(`/streaming_url?room_id=${roomId}`).then(res => {
      const streamUrl = res.data.streaming_url_list
      setUrl(streamUrl)
    });
  }, [roomId])

  return (
    <>
      <Header {...props} />
      <Container>
        <Row>
          <Col lg="8">
            {url ? url.slice(0, 1).map((item, idx) => (
              <Stream key={idx} url={item.url} />
            )) : (
              <Profile roomId={roomId} setRoomId={setRoomId} />
            )}
          </Col>
          <Col>
            <Menu setMenu={setMenu} />
            {menu === 'room' ? (
              <RoomList setRoomId={setRoomId} />
            ) : menu === 'chat' ? (
              <LiveChat roomId={roomId} />
            ) : (
              <Setlist />
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}

