import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Col, Button } from 'reactstrap';
import { AiFillGift, AiFillTrophy } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";

function Menu({menu, setMenu, isLive, roomId, hideMenu}) {
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    axios.get(`/profile?room_id=${roomId}`).then((res) => {
      const profiles = res.data;
      const roomName = profiles.room_url_key !== 'officialJKT48' ? profiles.room_url_key.slice(6) : profiles.room_url_key
      setRoomName(roomName);
    });
  }, [roomId])

  const iconStyle = {
    marginBottom: 4
  }

  const listMenu = [
    {
      name: 'Chat',
      menu: 'chat',
      icon: <BsFillChatDotsFill style={iconStyle}/>
    },
    {
      name: 'Rank',
      menu: 'rank',
      icon: <AiFillTrophy style={iconStyle} />
    },
    {
      name: 'Gift',
      menu: 'gift',
      icon: <AiFillGift style={iconStyle} />
    },
  ]

  const buttonStyle = {
    backgroundColor: 'teal', border: 'none'
  }

  const buttonActive = {
    backgroundColor: '#008b9b', border: 'none'
  }

  return (
    <Row>
      <Col>
        {!hideMenu && (
          <Button
            className="menu"
            style={menu === 'room' ? buttonActive : buttonStyle}
            onClick={() => setMenu('room')}
          >
            <FaListAlt style={iconStyle} /> Room
          </Button>
        )}
        {!isLive && (
          <>
            <Button
              className="menu"
              style={buttonStyle}
              onClick={() => setMenu('total')}
            >
              <AiFillTrophy style={iconStyle} /> Total Rank {roomName} {roomName !== 'officialJKT48' && 'JKT48'}
            </Button>
          </>
        )}
        {isLive && !hideMenu && (
          listMenu.map((item, idx) => (
            <Button
              key={idx}
              style={menu === item.menu ? buttonActive : buttonStyle}
              className="menu"
              onClick={() => setMenu(item.menu)}
            >
              {item.icon} {item.name}
            </Button>
          ))
        )}
      </Col>
    </Row>
  )
}

export default Menu;