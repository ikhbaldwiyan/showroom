import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'reactstrap';
import { useParams } from "react-router-dom";

import Header from 'pages/jeketi/Header';
import Menu from 'pages/jeketi/Menu';
import Stream from './Stream';
import Title from 'pages/jeketi/Title';
import Profile from 'pages/jeketi/Profile';
import RoomList from 'pages/jeketi/RoomList';
import LiveChat from 'pages/jeketi/Comment';
import Setlist from 'pages/jeketi/Setlist';
import StageUser from 'pages/jeketi/StageUser';
import TotalRank from 'pages/jeketi/TotalRank';
import Gift from 'pages/jeketi/Gift';
import Loading from 'pages/jeketi/Loading';  
import Footer from 'pages/jeketi/Footer';

export default function Live(props) {
  let { id } = useParams();
  const [url, setUrl] = useState([]);
  const [roomId, setRoomId] = useState(id);
  const [menu, setMenu] = useState('room');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`/streaming_url?room_id=${roomId}`).then(res => {
      const streamUrl = res.data.streaming_url_list
      setUrl(streamUrl)
    });
    !url && setMenu('room')
  }, [roomId, url])

  useEffect(() => {
    window.document.title = 'JKT48 SHOWROOM'
    menu == 'room' && window.scrollTo(0, 0);

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [menu, roomId])

  useEffect(() => {
    id === 'undefined' && setRoomId('332503');
  }, [id])

  return (
    <>
      <Header {...props} />
      <Container>
        <Row>
          <Col lg="8">
            {url ? url.slice(0, 1).map((item, idx) => (
              <>
                <Stream key={idx} url={item.url} />
                <Title roomId={roomId} />
              </>
            )) : !url ? (
              <Profile roomId={roomId} setRoomId={setRoomId} isLoad={loading} menu={menu} />
            ) : (
              <Stream url="" />
            )}
          </Col>
          <Col lg="4">
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
            ) : menu === 'total' ? (
              loading ? <Loading /> :
              <TotalRank roomId={roomId} />
            ): (
              <Setlist />
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}

