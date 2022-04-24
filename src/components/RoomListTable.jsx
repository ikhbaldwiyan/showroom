import React from "react";
import { Button } from "reactstrap";
import { RiLiveFill } from 'react-icons/ri'
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function RoomListTable({ data, children, setRoomId, idx }) {
  return (
    <tbody key={idx}>
      <tr>
        <td>
          <img
            src={data.image_url ?? data.image}
            style={{ borderRadius: "10px" }}
            alt={data.name}
            width="120"
          />
        </td>
        <td>
          {data.is_live || data.next_live_schedule !== 0 ? (
            <p className="mb-1">{data.url_key ? data.url_key.substr(6) : data.room_url_key !== 'officialJKT48' ? data.room_url_key.substr(6) : 'JKT48'}</p> 
          ) : (
            <p className="mt-4">{data.url_key ? data.url_key.substr(6) : data.room_url_key.substr(6)}</p> 
          )}
          {children}
        </td>
        <td>
          <Link to={location => ({ ...location, pathname: `/room/${data.url_key ?? data.room_url_key}/${data.id ? data.id : data.room_id}` })}>
            <Button
              className="mt-4"
              color="info"
              onClick={() => setRoomId([data.id ? data.id : data.room_id])}
              style={{backgroundColor: '#24a2a7', color: 'white', border: 'none'}}
            >
            <RiLiveFill className="mb-1" />
            </Button>
          </Link>
        </td>
      </tr>
    </tbody>
  );
}

export default RoomListTable;
