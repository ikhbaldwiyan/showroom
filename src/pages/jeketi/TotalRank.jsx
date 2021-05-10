import axios from "axios";
import React, { useState, useEffect } from 'react'
import { Table } from "reactstrap";

export default function SummaryRank({roomId}) {
    const [summary, setSummary] = useState('')

    useEffect(() => {
      axios.get(`/summary_ranking?room_id=${roomId}`).then(res => {
        const totalRank = res.data.ranking
        setSummary(totalRank)
      });
    });
  

    return (
      summary ? (
        <Table dark>
          <thead style={{backgroundColor: '#24a2b7', color: 'white', borderTop: 'none'}}>
            <tr>
              <th>Rank</th>
              <th>Ava</th>
              <th>Username</th>
              <th>Points</th>
              <th>Visit</th>
            </tr>
          </thead>
          {summary && summary.map((item, idx) => (
            <tbody key={idx} >
              <tr>
                <th className="text-center">{item.rank}</th>
                <td><img width="40" src={item.avatar_url} /></td>
                <td>{item.name}</td>
                <td>{item.point}</td>
                <td>{item.visit_count}x</td>
              </tr>
            </tbody>
          ))}
        </Table>
      ) : (
        <h5>Tunggu Wots</h5>
      )
    )
}
