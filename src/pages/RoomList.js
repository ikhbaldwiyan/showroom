import axios from 'axios';
import Button from 'elements/Button';
import React, { useState, useEffect } from 'react';
import { Container, Table } from 'reactstrap';
import { API } from 'utils/api/api';
import formatNumber from 'utils/formatNumber';
import getSchedule from 'utils/getSchedule';
import MainLayout from './layout/MainLayout';

function RoomList(props) {
  const [room, setRoom] = useState([]);

  useEffect(() => {
    axios.get(`${API}/rooms`).then((res) => {
      const listRoom = res.data;
      setRoom(listRoom);
    });
  });

  return (
    <MainLayout {...props}>
      <Container>
        <div className="row">
          <div className="col-8">
            <h3 className="mb-3">Room List</h3>
          </div>
        </div>
        <Table bordered>
          <thead style={{ backgroundColor: '#24a2b7', color: 'white' }}>
            <tr style={{textAlign: 'center'}}>
              <th>Room Id</th>
              <th>Room Name</th>
              <th>Followers</th>
              <th>Jadwal Live</th>
              <th>Detail Room</th>
            </tr>
          </thead>
          {room.map(
            (member, idx) =>
              member.name.includes('JKT48') && member.next_live_schedule !== 0 && (
                <tbody key={idx} style={{textAlign: 'center', color: props.theme === 'dark' && 'white'}}>
                  <tr>
                    <th>{member.id}</th>
                    <th scope="row">{member.name}</th>
                    <td>{formatNumber(member.follower_num)}</td>
                    <td>
                      {member.next_live_schedule ? getSchedule(member.next_live_schedule) : '-'}
                    </td>
                    <td>
                      <Button style={{textDecoration: 'none'}} type="link" href={`/room/${member.url_key}/${member.id}`}>Detail</Button>
                    </td>
                  </tr>
                </tbody>
              )
          )}
          {room.map(
            (member, idx) =>
              member.name.includes('JKT48') && !member.next_live_schedule && (
                <tbody key={idx} style={{textAlign: 'center', color: props.theme === 'dark' && 'white'}}>
                  <tr>
                    <th>{member.id}</th>
                    <th scope="row">{member.name}</th>
                    <td>{formatNumber(member.follower_num)}</td>
                    <td>
                      {member.next_live_schedule ? getSchedule(member.next_live_schedule) : '-'}
                    </td>
                    <td>
                      <Button style={{textDecoration: 'none'}} type="link" href={`/room/${member.url_key}/${member.id}`}>Detail</Button>
                    </td>
                  </tr>
                </tbody>
              )
          )}
        </Table>
      </Container>
    </MainLayout>
  );
}

export default RoomList;
