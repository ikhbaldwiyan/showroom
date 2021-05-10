import React from 'react'
import { Row, Col, Button } from 'reactstrap';

export default function Menu({setMenu, isLive}) {

  const listMenu = [
    {
      name: 'Room List',
      menu: 'room'
    },
    {
      name: 'Live Chat',
      menu: 'chat'
    },
    {
      name: 'Rank',
      menu: 'rank'
    },
    {
      name: 'Gift',
      menu: 'gift'
    },
  ]

  const buttonStyle = {
    backgroundColor: 'teal', border: 'none'
  }

  return (
    <Row>
      <Col>
        {!isLive && (
          <>
            <Button
              className="menu"
              style={buttonStyle}
              onClick={() => setMenu('room')}
            >
              Room List
            </Button>
            <Button
              className="menu"
              style={buttonStyle}
              onClick={() => setMenu('total')}
            >
              Total Ranking
            </Button>
          </>
        )}
        {isLive && (
          listMenu.map((item, idx) => (
            <Button
              key={idx}
              style={buttonStyle}
              className="menu"
              onClick={() => setMenu(item.menu)}
            >
              {item.name}
            </Button>
          ))
        )}
      </Col>
    </Row>
  )
}
