import axios from "axios";
import React, { useState, useEffect } from 'react'
import { Container, Table } from "reactstrap";
import formatLongDate from "utils/formatLongDate";
import MainLayout from "./layout/MainLayout";

function RoomList(props) {
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
    <MainLayout {...props}>
      <Container>
        <div className="row">
          <div className="col-8">
            <h3 className="mb-3">Room List</h3>
          </div>
          <div className="col mt-2">
            <b>Update Terakhir: </b> {formatLongDate(lastUpdate)}
          </div>
        </div>
        <Table bordered>
          <thead style={{backgroundColor: '#24a2b7', color: 'white'}}>
            <tr>
              <th>No</th>
              <th>Room Name</th>
              <th>Followers</th>
              <th>Room Level</th>
              <th>Jumlah Live</th>
            </tr>
          </thead>
          {room.map((member, idx) => (
            <tbody key={idx} >
              <tr>
                <th>{idx + 1}</th>
                <th scope="row">{member.name}</th>
                <td>{member.followers}</td>
                <td>{member.room_level}</td>
                <td>{member.total_live}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      </Container>
    </MainLayout >    
  )
}

export default RoomList;