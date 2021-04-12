import React from 'react'
import { Row, Col, Table , Button, FormGroup, Input } from 'reactstrap';
import showroom from './store/list-room';

export default function RoomList({setRoomId}) {
  const handleInputId = (event) => {
    setRoomId(event.target.value);
  }

  return (
    <Row>
      <Col>
        <FormGroup>
          <Input type="number" placeholder="Masukan ID Showroom" onChange={handleInputId} />
        </FormGroup>
        <Table dark>
          <thead>
            <tr>
              <th 
                colSpan="2" 
                style={{backgroundColor: '#24a2b7', color: 'white', border: 'none'}}>
                Daftar Showroom Member JKT48 
              </th>
            </tr>
          </thead>
          {showroom.map((item, idx) => (
            <tbody key={idx}>
              <tr>
                <td>{item.name}</td>
                <td>
                  <Button
                    color="primary"
                    style={{backgroundColor: '#24a2b7', color: 'white', border: 'none'}}
                    onClick={() => setRoomId([item.id])}>
                    See Room
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </Col>
    </Row>
  )
}
