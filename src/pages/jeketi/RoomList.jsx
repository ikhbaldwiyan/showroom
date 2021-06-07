import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col, Table , Button, FormGroup, Input } from 'reactstrap';
import LiveButton from 'elements/Button';

export default function RoomList({setRoomId}) {
  const handleInputId = (event) => {
    setRoomId(event.target.value);
  }

  const [room, setRoom] = useState("");

  useEffect(() => {
    axios.get('/room_status_list.json').then((res) => {
      const listRoom = res.data;
      setRoom(listRoom);
    })
  });

  return (
    <Row>
      <Col className="scroll">
        <FormGroup>
          <Input type="number" placeholder="Masukan ID Showroom" onChange={handleInputId} />
        </FormGroup>
        <Table dark>
          <thead style={{backgroundColor: '#24a2b7', color: 'white', borderTop: 'none'}}>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Room</th>
            </tr>
          </thead>

          {/* Is live */}
          {room && room.map((item, idx) => (
            item.name.includes("JKT48") && item.is_live &&
            <tbody key={idx}>
              <tr>
                <td><img src={item.image_url} style={{borderRadius: '10px'}} alt={item.name} width="120" /></td>
                <td>{item.url_key.substr(6)} <br /> <LiveButton className="btn-sm btn-danger mt-1" isPrimary>Live Now</LiveButton></td>
                <td>
                  <Button
                    className="mt-4"
                    color="primary"
                    style={{backgroundColor: '#24a2b7', color: 'white', border: 'none'}}
                    onClick={() => setRoomId([item.id])}>
                    See
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}

          {/* Not Live */}
          {room && room.map((item, idx) => (
            item.name.includes("JKT48") && !item.is_live &&
            <tbody key={idx}>
              <tr>
                <td><img src={item.image_url} style={{borderRadius: '10px'}} alt={item.name} width="120" /></td>
                <td>{item.url_key.substr(6)}</td>
                <td>
                  <Button
                    color="primary"
                    style={{backgroundColor: '#24a2b7', color: 'white', border: 'none'}}
                    onClick={() => setRoomId([item.id])}>
                    See 
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
