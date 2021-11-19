import axios from "axios";
import React, { useState, useEffect } from 'react'
import { Table } from "reactstrap";
import { liveRanking } from "utils/api/api";

export default function StageUser({roomId}) {
  const [rank, setRank] = useState([]);

  useEffect(() => {
    axios.get(liveRanking(roomId)).then(res => {
      const userRank = res.data.stage_user_list
      setRank(userRank)
    });
  });

  return (
    <Table dark>
      <div style={{maxHeight: '500px'}}>
        <thead>
          <tr>
            <td>Rank</td>
            <td>Ava</td>
            <td>Name</td>
          </tr>
        </thead>
      </div>
      <div className="scroll">
        {rank.map((item, idx) => (
          <tbody key={idx} >
            <tr>
              <th scope="row">{item.order_no}</th>
              <td><img width="40" src={item.user.avatar_url} /></td>
              <td>{item.user.name}</td>
            </tr>
          </tbody>
        ))}
      </div>
    </Table>
  )
}