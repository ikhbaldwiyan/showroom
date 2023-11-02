import React from "react";
import { Table } from "reactstrap";

const Songs = ({ songs, isEncore }) => {
  const data = isEncore ? songs.slice(13, 16) : songs;

  return (
    <Table
      style={{ color: "#ecfafc", borderTop: "none", fontWeight: "600" }}
      className="member-wrapper"
    >
      <thead>
        <tr>
          <th>No</th>
          <th>Nama Lagu</th>
        </tr>
      </thead>
      {data?.map((item, idx) => (
        <tbody>
          <tr>
            <th scope="row">{isEncore ? idx + 13 + 1 : idx + 1}</th>
            <td>{item.translatedTitle ?? item.title}</td>
          </tr>
        </tbody>
      ))}
    </Table>
  );
};

export default Songs;
