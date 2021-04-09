import axios from "axios";
import React, { useState, useEffect } from 'react'
import { Table } from "reactstrap";

export default function StageUser({roomId}) {
  const [rank, setRank] = useState([]);

  useEffect(() => {
    axios.get(`/stage_user_list?room_id=${roomId}`).then(res => {
      const userRank = res.data.stage_user_list
      setRank(userRank)
    });
  });

  return (
    <Table dark>
      {rank.map((item, idx) => (
        <tbody key={idx} >
          <tr>
            <th scope="row">{item.order_no}</th>
            <td><img width="40" src={item.user.avatar_url} /></td>
            <td>{item.user.name}</td>
          </tr>
        </tbody>
      ))}
    </Table>
  )
}