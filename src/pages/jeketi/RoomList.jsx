import React from 'react'
import { Row, Col, Table , Button} from 'reactstrap';
import showroom from './store/list-room';

export default function RoomList({setRoomId}) {
  return (
    <Row>
      <Col>
        <Table dark>
          <thead>
            <tr>
              <th 
                colSpan="2" 
                style={{backgroundColor: '#3252DF', color: 'white'}}>
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
