import axios from 'axios';
import { Col } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { streamUrl } from 'utils/api/api';

import Stream from 'pages/streaming/Stream';
import { Profile, Title, Menu, RoomList, LiveChat, StageUser, TotalRank, Gift, Loading, Setlist } from 'components';

export default function Multi({layout, hideMultiMenu, setHideMultiMenu}) {
  const {id} = useParams();
  const [url, setUrl] = useState([]);
  const [roomId, setRoomId] = useState(id);
  const [menu, setMenu] = useState('room');
  const [loading, setLoading] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);

  useEffect(() => {
    axios.get(streamUrl(roomId)).then(res => {
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

  const isMultiRoom = window.location.pathname !== '/multi-room';

  return (
    <Col lg={layout}>
      {url ? url.slice(0, 1).map((item, idx) => (
        <>
          <Stream key={idx} url={item.url} />
          <Title roomId={roomId} hideMenu={hideMenu} setHideMenu={setHideMenu} hideMultiMenu={hideMultiMenu} setHideMultiMenu={setHideMultiMenu}  />
        </>
      )) : !url ? (
        <Profile roomId={roomId} setRoomId={setRoomId} isLoad={loading} menu={menu} />
      ) : (
        <Stream url="" />
      )}
      {roomId ? <Menu setMenu={setMenu} isLive={url} roomId={roomId} hideMenu={hideMenu} isMultiRoom={isMultiRoom} /> : ''}
      {menu === 'room' ? (
        <RoomList setRoomId={setRoomId} isMultiRoom={isMultiRoom}/>
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
  )
}

