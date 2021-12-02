import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'reactstrap';
import { useParams } from "react-router-dom";
import { API } from 'utils/api/api';

import MainLayout from './layout/MainLayout';
import Stream from './streaming/Stream';
import { Profile, Title, Menu, RoomList, LiveChat, StageUser, TotalRank, Gift, Loading, Setlist } from 'components';

function Live(props) {
  let { id } = useParams();
  const [url, setUrl] = useState([]);
  const [roomId, setRoomId] = useState(id);
  const [menu, setMenu] = useState('room');
  const [loading, setLoading] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);

  useEffect(() => {
    axios.get(`${API}/lives/${roomId}`).then(res => {
      const streamUrl = res.data
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
    <MainLayout {...props}>
      <Container>
        <Row>
          <Col lg="8">
            {url ? url.slice(0, 1).map((item, idx) => (
              <>
                <Stream key={idx} url={item.url} />
                <Title roomId={roomId} hideMenu={hideMenu} setHideMenu={setHideMenu} />
              </>
            )) : !url ? (
              <Profile roomId={roomId} setRoomId={setRoomId} isLoad={loading} menu={menu} />
            ) : (
              <Stream url="" />
            )}
          </Col>
          <Col lg="4">
            <Menu menu={menu} setMenu={setMenu} isLive={url} roomId={roomId} hideMenu={hideMenu} />
            {menu === 'room' ? (
              <RoomList setRoomId={setRoomId} />
            ) : menu === 'chat' ? (
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
    </MainLayout>
  )
}

export default Live;