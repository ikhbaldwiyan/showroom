import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from "react";
import { Row, Col, Table, FormGroup, Input } from "reactstrap";
import { RiBroadcastFill } from "react-icons/ri";
import { MdOutlineSearchOff } from "react-icons/md";
import { API } from "utils/api/api";

import Loading from "./Loading";
import LiveButton from "elements/Button";
import getSchedule from "utils/getSchedule";
import RoomListTable from "./RoomListTable";

export default function RoomList({ setRoomId, isMultiRoom, loading }) {
  const handleInputId = (event) => {
    setRoomId(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const [room, setRoom] = useState("");
  const [roomLive, setRoomLive] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getRoomList() {
      const room = await axios.get(`${API}/rooms`)
      const listRoom = room.data;
      setRoom(listRoom);
    }
    getRoomList();
  }, [room]);
  
  useEffect(() => {
    async function getRoomLive() {
      const room = await axios.get(`${API}/rooms/onlives`)
      const onLive = room.data;
      onLive && onLive.length && setRoomLive(onLive)
    }
    getRoomLive();
  }, [roomLive]);


  const filtered = !search ? room
    : room.filter((room) =>
      room.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div>
      <Row>
        <Col>
          <FormGroup className="mt-2">
            <Input
              type="text"
              placeholder="Search Room"
              onChange={handleSearch}
            />
          </FormGroup>
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
              {roomLive && roomLive.map(
                (item, idx) => (
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
                (item, idx) => item.next_live_schedule !== 0 && (
                  search === item.room_url_key (
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
              )}
      
              {/* Room Not Live */}
              {filtered && filtered.length !== 0 ? filtered.map(
                (item, idx) => !item.is_live && (
                  <RoomListTable idx={idx} data={item} setRoomId={setRoomId} />
                )
              ) : loading && !room ? (
                <tbody>
                  <tr>
                    <td colSpan={3} className="text-center">
                      <Loading />
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={3} className="text-center">
                      <p style={{fontSize: 18}} className="mt-3"><MdOutlineSearchOff className="mr-2" size={30} />Room not found</p>
                    </td>
                  </tr>
                </tbody>
              )}
            </Table>
          </div>
        </Col>
      </Row>
    </div>
  );
}
