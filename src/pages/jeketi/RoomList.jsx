import React from 'react'
import { Row, Col, Table , Button} from 'reactstrap';

export default function RoomList({setRoomId}) {
  const showroom = [
    {
      id: '317727',
      name: 'Zee',
    },
    {
      id: '318229',
      name: 'Jesslyn'
    },
    {
      id: '318213',
      name: 'Mira'
    },
    {
      id: '317724',
      name: 'Anin'
    },
    {
      id: '233157',
      name: 'Eli'
    },
    {
      id: '318207',
      name: 'Shani'
    },
  ]

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
