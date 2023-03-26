import axios from "axios";
import React, { useState, useEffect } from 'react'
import { Table } from "reactstrap";
import { liveGift } from "utils/api/api";
import Search from "./Search";

export default function Gift({roomId}) {
  const [gift, setGift] = useState([])
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      axios.get(liveGift(roomId)).then(res => {
        const giftLog = res.data.reverse();
        setGift(giftLog);
      })
    } catch (error) {
      console.log(error)
    }
    
  }, [gift.length, roomId])

  const filterName = !search
  ? gift
  : gift.filter((data) =>
      data.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    gift.length !== 0 ? (
      <div>
        <Search setSearch={setSearch} placeholder="Search gift" />
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
            {filterName.map((item, idx) => (
              <tbody key={idx} >
                <tr>
                  <td><img width="40" src={item.avatar_url} /></td>
                  <th style={{wordBreak: 'break-word'}}>{item.name}</th>
                  <td><img width="40" src={item.image} /></td>
                  <td>x{item.num}</td>
                </tr>
              </tbody>
            ))}
          </Table>
        </div>
      </div>
    ) : (
      <Table dark>
        <thead>
          <tr>
            <th>Ava</th>
            <th>Name</th>
            <th>Gift</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <td colSpan="4" className="text-center">Gift not found</td>
        </tbody>
      </Table>
    )
  )
}
