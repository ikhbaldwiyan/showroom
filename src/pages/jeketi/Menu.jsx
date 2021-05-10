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

  return (
    <Row>
      <Col>
        {!isLive && (
          <Button
            className="mb-2 mr-2 mt-1"
            style={{backgroundColor: 'teal', border: 'none'}}
            onClick={() => setMenu('room')}
          >
            Room List
          </Button>
        )}
        {isLive && (
          listMenu.map((menu, idx) => (
            <Button
              key={idx}
              style={{backgroundColor: 'teal', border: 'none'}}
              className="menu"
              onClick={() => setMenu(menu.menu)}
            >
              {menu.name}
            </Button>
          ))
        )}
      </Col>
    </Row>
  )
}
