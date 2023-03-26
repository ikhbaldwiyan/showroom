import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { liveRanking } from "utils/api/api";
import Search from "./Search";

export default function StageUser({ roomId }) {
  const [rank, setRank] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(liveRanking(roomId)).then((res) => {
      const userRank = res.data;
      setRank(userRank);
    });
  }, [rank, search, roomId]);

  const filterName = !search
    ? rank
    : rank.filter((data) =>
        data.user.name.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <div>
      <Search setSearch={setSearch} placeholder="Search name" />
      <Table dark>
        <div style={{ maxHeight: "500px" }}>
          <thead>
            <tr>
              <td>Rank</td>
              <td>Ava</td>
              <td>Name</td>
            </tr>
          </thead>
        </div>
        <div className="scroll">
          {filterName &&
            filterName.length !== 0 &&
            filterName.map((item, idx) => (
              <tbody key={idx} style={{ width: "100%" }}>
                <tr>
                  <th scope="row">{item.order_no}</th>
                  <td>
                    <img width="40" src={item.user.avatar_url} />
                  </td>
                  <td>{item.user.name}</td>
                </tr>
              </tbody>
            ))}
        </div>
      </Table>
    </div>
  );
}
