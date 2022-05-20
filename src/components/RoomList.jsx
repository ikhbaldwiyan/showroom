import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from "react";
import { Row, Col, Table, FormGroup, Input } from "reactstrap";
import { RiBroadcastFill } from "react-icons/ri";
import { MdOutlineSearchOff } from "react-icons/md";
import { API } from "utils/api/api";
import { FcSearch } from 'react-icons/fc';

import Loading from "./Loading";
import LiveButton from "elements/Button";
import getSchedule from "utils/getSchedule";
import RoomListTable from "./RoomListTable";
import FilterRoomList from "./FilterRoomList";
import { useDispatch, useSelector } from "react-redux";
import { getRoomListRegular, getRoomListAcademy } from "redux/actions/rooms";

export default function RoomList({ roomId, setRoomId, isMultiRoom }) {
  const [roomLive, setRoomLive] = useState([]);
  const [search, setSearch] = useState('');

  const [allMember, setAllMember] = useState(true);
  const [isAcademy, setIsAcademy] = useState(false);
  const [isRegular, setIsRegular] = useState(false);
  const [isLive, setIsLive] = useState(false);

  //redux
  const roomRegular = useSelector((state) => state.roomRegularReducer.data);
  const roomAcademy = useSelector((state) => state.roomAcademyReducer.data);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getRoomList() {
      const room = await axios.get(`${API}/rooms`);
      dispatch(getRoomListRegular(room.data))
    }
    getRoomList();
    window.document.title = 'JKT48 SHOWROOM';
  }, []);

  useEffect(() => {
    async function getRoomLive() {
      const room = await axios.get(`${API}/rooms/onlives`)
      const onLive = room.data;
      onLive && onLive.length && setRoomLive(onLive)
    }
    getRoomLive();
  }, [roomLive]);

  useEffect(() => {
    async function getRoomAcademy() {
      const room = await axios.get(`${API}/rooms/academy`);
      dispatch(getRoomListAcademy(room.data))
    }
    getRoomAcademy();
  }, []);

  const handleInputId = (event) => {
    setRoomId(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filtered = !search ? roomRegular
    : roomRegular.filter((room) =>
      room.name.toLowerCase().includes(search.toLowerCase())
    );

  const filteredAcademy = !search ? roomAcademy
    : roomAcademy.filter((room) =>
      room.room_url_key.toLowerCase().includes(search.toLowerCase())
    );

  const filteredLive = !search ? roomLive
    : roomLive.filter((room) =>
      room.main_name.toLowerCase().includes(search.toLowerCase())
    );

  const SkeletonLoading = ({type}) => (
    <tbody>
      {Array.from(Array(type === 'live' ? roomLive.length : 6), (e, i) => {
        return (
          <tr>
            <td key={i} colSpan={3} className="text-center">
              <Loading />
            </td>
          </tr>
        )
      })}
    </tbody>
  );

  return (
    <Row>
      <Col>
        <FormGroup className="search-room-list mt-2">
          <FcSearch style={{ marginLeft: "1rem", position: "absolute" }} color="#03665c" size="1.5em" />
          <Input
            style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', }}
            type="text"
            placeholder="Search Room"
            onChange={handleSearch}
          />
        </FormGroup>

        <FilterRoomList
          isRoomLive={roomLive}
          isLive={isLive}
          isAcademy={isAcademy}
          allMember={allMember}
          isRegular={isRegular}
          setIsLive={setIsLive}
          setIsAcademy={setIsAcademy}
          setAllMember={setAllMember}
          handleSearch={handleSearch}
          setIsRegular={setIsRegular}
        />

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
            <thead className="room-list">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Room</th>
              </tr>
            </thead>

            {allMember ? (
              <>
                {/* Room Live */}
                {filteredLive && filteredLive.length !== 0 ? filteredLive.map(
                  (item, idx) => (
                    <RoomListTable idx={idx} data={item} roomId={roomId} setRoomId={setRoomId}>
                      <LiveButton
                        style={{ borderRadius: "6px" }}
                        className="btn-sm btn-danger"
                      >
                        <RiBroadcastFill className="mb-1" /> Live
                      </LiveButton>
                    </RoomListTable>
                  )
                ) : (
                  <SkeletonLoading type="live" />
                )}
                {/* Room Upcoming */}
                {filtered && filtered.length !== 0 && filtered.map(
                  (item, idx) => item.next_live_schedule !== 0 && (
                    <RoomListTable idx={idx} data={item} roomId={roomId} setRoomId={setRoomId}>
                      <LiveButton
                        className="btn-sm mt-1 text-white py-2"
                        style={{
                          backgroundColor: "teal",
                          border: "none",
                          borderRadius: "6px",
                        }}
                      >
                        Live <b>{getSchedule(item.next_live_schedule, 'home')}</b>
                      </LiveButton>
                    </RoomListTable>
                  )
                )}
                {/* Room Regular */}
                {filtered && filtered.length !== 0 ? filtered.map(
                  (item, idx) => !item.is_live && !item.next_live_schedule && (
                    <RoomListTable idx={idx} data={item} roomId={roomId} setRoomId={setRoomId} />
                  )
                ) : roomRegular.length === 0 ? (
                  <SkeletonLoading />
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan={3} className="text-center">
                        <p style={{ fontSize: 18 }} className="mt-3"><MdOutlineSearchOff className="mr-2" size={30} />Room Regular not found</p>
                      </td>
                    </tr>
                  </tbody>
                )}
                {/* Room Academy */}
                {filteredAcademy && filteredAcademy.length !== 0 ? filteredAcademy.map(
                  (item, idx) => !item.is_onlive && (
                    <RoomListTable idx={idx} data={item} roomId={roomId} setRoomId={setRoomId} />
                  )
                ) : roomAcademy.length === 0 ? (
                  <SkeletonLoading />
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan={3} className="text-center">
                        <p style={{ fontSize: 18 }} className="mt-3"><MdOutlineSearchOff className="mr-2" size={30} />Room Academy not found</p>
                      </td>
                    </tr>
                  </tbody>
                )}
              </>
            ) : isAcademy ? (
              filteredAcademy && filteredAcademy.length !== 0 ? filteredAcademy.map(
                (item, idx) => !item.is_onlive && (
                  <RoomListTable idx={idx} data={item} roomId={roomId} setRoomId={setRoomId} />
                )
              ) : roomAcademy.length === 0 ? (
                <SkeletonLoading />
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={3} className="text-center">
                      <p style={{ fontSize: 18 }} className="mt-3"><MdOutlineSearchOff className="mr-2" size={30} />Room Academy not found</p>
                    </td>
                  </tr>
                </tbody>
              )
            ) : isRegular ? (
              filtered && filtered.length !== 0 ? filtered.map(
                (item, idx) => !item.is_live && !item.next_live_schedule && (
                  <RoomListTable idx={idx} data={item} roomId={roomId} setRoomId={setRoomId} />
                )
              ) : roomRegular.length === 0 ? (
                <SkeletonLoading />
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={3} className="text-center">
                      <p style={{ fontSize: 18 }} className="mt-3"><MdOutlineSearchOff className="mr-2" size={30} />Room Regular not found</p>
                    </td>
                  </tr>
                </tbody>
              )
            ) : isLive ? (
              filteredLive && filteredLive.length !== 0 && filteredLive.map(
                (item, idx) => (
                  <RoomListTable idx={idx} data={item} roomId={roomId} setRoomId={setRoomId}>
                    <LiveButton
                      style={{ borderRadius: "6px" }}
                      className="btn-sm btn-danger"
                    >
                      <RiBroadcastFill className="mb-1" /> Live
                    </LiveButton>
                  </RoomListTable>
                )
              )
            ) : ''}
          </Table>
        </div>
      </Col>
    </Row>
  );
}
