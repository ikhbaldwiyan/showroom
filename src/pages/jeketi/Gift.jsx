import axios from "axios";
import React, { useState, useEffect } from 'react'
import { Table } from "reactstrap";

export default function Gift({roomId}) {
  const [gift, setGift] = useState([])

  useEffect(() => {
    axios.get(`/gift_log?room_id=${roomId}`).then(res => {
      const giftLog = res.data.gift_log.reverse();
      setGift(giftLog);
    })

  }, [gift])

  return (
    gift && (
      <div className="scroll">
        <Table dark>
          <thead>
            <tr>
              <th>Ava</th>
              <th>Name</th>
              <th>Gift</th>
              <th>Total</th>
            </tr>
          </thead>
          {gift.map((item, idx) => (
            <tbody key={idx} >
              <tr>
                <td><img width="40" src={item.avatar_url} /></td>
                <th scope="row">{item.name}</th>
                <td><img width="40" src={item.image} /></td>
                <td>x{item.num}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    )
  )
}
