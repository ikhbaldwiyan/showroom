import axios from "axios";
import React, { useState, useEffect } from 'react'
import { Container, Table } from "reactstrap";
import Header from 'pages/jeketi/Header';

export default function ListRoom(props) {
  const [room, setRoom] = useState([]);
  const [lastUpdate, setLastUpdate] = useState('')

  useEffect(() => {
    axios.get(`https://bot48.github.io/data/showroom.json`).then(res => {
      const listRoom = res.data.members
      const lastUpdates = res.data.last_update
      setRoom(listRoom)
      setLastUpdate(lastUpdates)
    });
  });

  return (
    <>
      <Header {...props} />
      <Container>
        <div className="row">
          <div className="col-9">
            <h3 className="text-gray-900 mb-3">Room List</h3>
          </div>
          <div className="col mt-2">
            <b>Update Terakhir: </b> {lastUpdate.slice(0, -9)}
          </div>
        </div>
        <Table bordered>
          <thead style={{backgroundColor: '#3252DF', color: 'white'}}>
            <tr>
              <th>Room Name</th>
              <th>Followers</th>
              <th>Room Level</th>
              <th>Jumlah Live</th>
            </tr>
          </thead>
          {room.map((member, idx) => (
            <tbody key={idx} >
              <tr>
                <th scope="row">{member.name}</th>
                <td>{member.followers}</td>
                <td>{member.room_level}</td>
                <td>{member.total_live}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      </Container>
    </>
  )
}
