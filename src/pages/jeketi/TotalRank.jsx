import axios from "axios";
import React, { useState, useEffect } from 'react'
import { Table, Card } from "reactstrap";
import formatViews from "utils/formatViews";

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
        <div className="scroll">
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
                  <td>{formatViews(item.point)}</td>
                  <td>{item.visit_count}x</td>
                </tr>
              </tbody>
            ))}
          </Table>
        </div>
      ) : (
        <Card body inverse color="dark" className="mb-3">
          <h5 className="text-gray-200">
            <img width="30" className="mr-2" src="https://image.showroom-cdn.com/showroom-prod/image/avatar/1028686.png?v=87" alt="Minzoid" />
            Minzoid
          </h5>
          <p>Tunggu wots</p>
        </Card>
      )
    )
}
