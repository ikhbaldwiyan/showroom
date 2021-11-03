import React from "react";
import { Button } from "reactstrap";

function RoomListTable({ data, children, setRoomId, idx }) {
  return (
    <tbody key={idx}>
      <tr>
        <td>
          <img
            src={data.image_url}
            style={{ borderRadius: "10px" }}
            alt={data.name}
            width="120"
          />
        </td>
        <td>
          {data.is_live || data.next_live_schedule !== 0 ? (
            <p className="mb-1">{data.url_key.substr(6)}</p> 
          ) : (
            <p className="mt-4">{data.url_key.substr(6)}</p> 
          )}
          {children}
        </td>
        <td>
          <Button
            className="mt-4"
            color="info"
            onClick={() => setRoomId([data.id])}
            style={{backgroundColor: '#24a2b7', color: 'white', border: 'none'}}
          >
            See
          </Button>
        </td>
      </tr>
    </tbody>
  );
}

export default RoomListTable;
