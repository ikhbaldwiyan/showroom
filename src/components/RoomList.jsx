import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col, Table, FormGroup, Input } from "reactstrap";
import { RiBroadcastFill } from "react-icons/ri";
import { roomList } from "utils/api/api";

import LiveButton from "elements/Button";
import getSchedule from "utils/getSchedule";
import RoomListTable from "./RoomListTable";

export default function RoomList({ setRoomId, isMultiRoom }) {
  const handleInputId = (event) => {
    setRoomId(event.target.value);
  };

  const group = 'JKT48';
  const [room, setRoom] = useState("");

  useEffect(() => {
    async function getRoomList() {
      const room = await axios.get(roomList)
      const listRoom = room.data;
      setRoom(listRoom);
    }
    getRoomList();
  }, []);

  return (
    <Row>
      <Col>
        <div className="scroll">
          {isMultiRoom && (
            <FormGroup>
              <Input
                type="number"
                placeholder="Masukan ID Showroom"
                onChange={handleInputId}
              />
            </FormGroup>
          )}
          <Table dark>
            <thead style={{ backgroundColor: "#24a2b7", color: "white", borderTop: "none"}}>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Room</th>
              </tr>
            </thead>
            {/* Room Live */}
            {room && room.map(
              (item, idx) =>
                item.name.includes(group) && item.is_live && (
                  <RoomListTable idx={idx} data={item} setRoomId={setRoomId}>
                    <LiveButton
                      style={{ borderRadius: "6px" }}
                      className="btn-sm btn-danger"
                    >
                      <RiBroadcastFill className="mb-1" /> Live
                    </LiveButton>
                  </RoomListTable>
                )
            )}
            {/* Room Upcoming */}
            {room && room.map(
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
            )}
            
            {/* Room Not Live */}
            {room &&room.map(
              (item, idx) => item.name.includes(group) && !item.is_live && (   
                <RoomListTable idx={idx} data={item} setRoomId={setRoomId} /> 
              )
            )}
          </Table>
        </div>
      </Col>
    </Row>
  );
}
