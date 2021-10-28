import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col, Table, FormGroup, Input } from "reactstrap";
import LiveButton from "elements/Button";
import getSchedule from "utils/getSchedule";
import RoomListTable from "./RoomListTable";

export default function RoomList({ setRoomId }) {
  const handleInputId = (event) => {
    setRoomId(event.target.value);
  };

  const group = 'JKT48';
  const [room, setRoom] = useState("");

  useEffect(() => {
    axios.get("/room_status_list.json").then((res) => {
      const listRoom = res.data;
      setRoom(listRoom);
    });
  });

  const RoomLive = () => (
    room && room.map(
      (item, idx) =>
        item.name.includes(group) && item.is_live && (
          <RoomListTable idx={idx} data={item} setRoomId={setRoomId}>
            <LiveButton
              style={{ borderRadius: "6px" }}
              className="btn-sm btn-danger"
            >
              Live Now
            </LiveButton>
          </RoomListTable>
        )
    )
  );

  const RoomUpcoming = () => (
    room && room.map(
      (item, idx) =>
        item.name.includes(group) && item.next_live_schedule !== 0 && (
          <RoomListTable idx={idx} data={item} setRoomId={setRoomId}>
            <LiveButton
              className="btn-sm mt-1 text-white py-2"
              style={{
                backgroundColor: "teal",
                border: "none",
                borderRadius: "6px",
              }}
            >
              Live <b>{getSchedule(item.next_live_schedule)}</b>
            </LiveButton>
          </RoomListTable>
        )
    )
  )

  const RoomNotLive = () => (
    room &&room.map(
      (item, idx) => item.name.includes(group) && !item.is_live && (   
        <RoomListTable idx={idx} data={item} setRoomId={setRoomId} /> 
      )
    )
  );

  return (
    <Row>
      <Col>
        <div className="scroll">
          <FormGroup>
            <Input
              type="number"
              placeholder="Masukan ID Showroom"
              onChange={handleInputId}
            />
          </FormGroup>
          <Table dark>
            <thead style={{ backgroundColor: "#24a2b7", color: "white", borderTop: "none"}}>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Room</th>
              </tr>
            </thead>
            <RoomLive />
            <RoomUpcoming />
            <RoomNotLive />
          </Table>
        </div>
      </Col>
    </Row>
  );
}
