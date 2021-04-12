import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'reactstrap';

import Header from 'pages/jeketi/Header';
import Menu from 'pages/jeketi/Menu';
import Stream from './Stream';
import Profile from 'pages/jeketi/Profile';
import RoomList from 'pages/jeketi/RoomList';
import LiveChat from 'pages/jeketi/Comment';
import Setlist from 'pages/jeketi/Setlist';
import StageUser from 'pages/jeketi/StageUser';
import Gift from 'pages/jeketi/Gift';
import Loading from 'pages/jeketi/Loading';  

export default function Live(props) {
  const [url, setUrl] = useState([]);
  const [roomId, setRoomId] = useState('317727');
  const [menu, setMenu] = useState('room');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.document.title = 'JKT48 Showroom'
    window.scrollTo(0, 0);

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
    
    axios.get(`/streaming_url?room_id=${roomId}`).then(res => {
      const streamUrl = res.data.streaming_url_list
      setUrl(streamUrl)
    });
  }, [roomId, menu])

  return (
    <>
      <Header {...props} />
      <Container>
        <Row>
          <Col lg="8">
            {url ? url.slice(0, 1).map((item, idx) => (
              <Stream roomId={roomId} key={idx} url={item.url} />
            )) : !url ? (
              <Profile roomId={roomId} setRoomId={setRoomId} isLoad={loading} />
            ) : menu === 'live' ? (
              <Stream url="" />
            ) : 'null'}
          </Col>
          <Col>
            <Menu setMenu={setMenu} isLive={url} />
            {menu === 'room' ? (
              <RoomList setRoomId={setRoomId} />
            ) : menu === 'chat' ? (
              loading ? <Loading /> :
              <LiveChat roomId={roomId} />
            ) : menu === 'rank' ? (
              loading ? <Loading /> :
              <StageUser roomId={roomId} />
            ) : menu === 'gift' ? (
              loading ? <Loading /> :
              <Gift roomId={roomId} />
            ): (
              <Setlist />
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}

