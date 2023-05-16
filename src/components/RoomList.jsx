import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import { Row, Col, Table, FormGroup, Input } from "reactstrap";
import { RiBroadcastFill } from "react-icons/ri";
import { MdOutlineSearchOff } from "react-icons/md";
import { API, ROOM_FOLLOW, ROOM_TRAINEE_API } from "utils/api/api";

import Loading from "./Loading";
import Search from "./Search";
import LiveButton from "elements/Button";
import getSchedule from "utils/getSchedule";
import RoomListTable from "./RoomListTable";
import FilterRoomList from "./FilterRoomList";

import { useDispatch, useSelector } from "react-redux";
import { getRoomLiveSuccess, getRoomLiveFailed } from "redux/actions/roomLives";
import {
  getRoomListRegular,
  getRoomListAcademy,
  getRoomListTrainee,
} from "redux/actions/rooms";
import { getRoomFollowedSuccess } from "redux/actions/roomFollowed";
import { getSession } from "utils/getSession";

export default function RoomList({ roomId, setRoomId, isMultiRoom }) {
  const [search, setSearch] = useState("");

  const [allMember, setAllMember] = useState(true);
  const [isAcademy, setIsAcademy] = useState(false);
  const [isRegular, setIsRegular] = useState(false);
  const [isOnLive, setIsOnLive] = useState(false);

  //redux
  const roomRegular = useSelector((state) => state.roomRegular.data);
  const roomAcademy = useSelector((state) => state.roomAcademy.data);
  const roomFollowed = useSelector((state) => state.roomFollowed.data);
  const roomTrainee = useSelector((state) => state.roomTrainee.data);

  const { data, isLoading, isLive } = useSelector((state) => state.roomLives);
  const roomLives = data;

  const dispatch = useDispatch();

  useEffect(() => {
    async function getRoomList() {
      const room = await axios.get(`${API}/rooms`);
      dispatch(getRoomListRegular(room.data));
    }
    getRoomList();
    window.document.title = "JKT48 SHOWROOM";
  }, []);

  useEffect(() => {
    async function getRoomLive() {
      const room = await axios.get(`${API}/rooms/onlives`);
      if (room.data.length >= 1) {
        dispatch(getRoomLiveSuccess(room.data));
      } else {
        dispatch(getRoomLiveFailed());
      }
    }
    getRoomLive();
  }, []);

  useEffect(() => {
    async function getRoomAcademy() {
      const room = await axios.get(`${API}/rooms/academy`);
      dispatch(getRoomListAcademy(room.data));
    }
    getRoomAcademy();
  }, []);

  useEffect(() => {
    async function getRoomFollowed() {
      const response = await axios.post(ROOM_FOLLOW, {
        cookies_id: getSession().session?.cookie_login_id,
      });
      const jktRoom = response?.data?.rooms?.filter((room) =>
        room?.room_url_key?.includes("JKT48")
      );
      dispatch(getRoomFollowedSuccess(jktRoom));
    }
    getRoomFollowed();
  }, []);

  useEffect(() => {
    async function getRoomTrainee() {
      const room = await axios.get(ROOM_TRAINEE_API);
      dispatch(getRoomListTrainee(room.data));
    }
    getRoomTrainee();
  }, []);

  const handleInputId = (event) => {
    setRoomId(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filtered = !search
    ? roomRegular
    : roomRegular?.filter((room) =>
        room.name.toLowerCase().includes(search.toLowerCase())
      );

  const filteredAcademy = !search
    ? roomAcademy
    : roomAcademy?.filter((room) =>
        room.room_url_key.toLowerCase().includes(search.toLowerCase())
      );

  const filteredLive =
    isLive && !search
      ? roomLives
      : isLive &&
        roomLives?.filter((room) =>
          room.main_name.toLowerCase().includes(search.toLowerCase())
        );

  const filteredFollow = !search
    ? roomFollowed
    : roomFollowed?.filter((room) =>
        room?.room_name?.toLowerCase().includes(search.toLowerCase())
      );

  const filteredTrainee = !search
    ? roomTrainee
    : roomTrainee?.filter((room) =>
        room?.room_url_key?.toLowerCase().includes(search.toLowerCase())
      );

  const SkeletonLoading = ({ type }) => (
    <tbody>
      {Array.from(Array(type === "live" ? roomLives.length : 6), (e, i) => {
        return (
          <tr>
            <td key={i} colSpan={3} className="text-center">
              <Loading />
            </td>
          </tr>
        );
      })}
    </tbody>
  );

  return (
    <Row>
      <Col>
        <Search setSearch={setSearch} placeholder="Search room" />
        <FilterRoomList
          isRoomLive={isLive}
          isLive={isOnLive}
          isAcademy={isAcademy}
          allMember={allMember}
          isRegular={isRegular}
          setIsLive={setIsOnLive}
          setIsAcademy={setIsAcademy}
          setAllMember={setAllMember}
          handleSearch={handleSearch}
          setIsRegular={setIsRegular}
        />

        <div className="scroll-room">
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
                {isLoading ? (
                  <SkeletonLoading type="live" />
                ) : isLive && filteredLive && filteredLive.length !== 0 ? (
                  filteredLive.map((item, idx) => (
                    <RoomListTable
                      idx={idx}
                      data={item}
                      roomId={roomId}
                      setRoomId={setRoomId}
                    >
                      <LiveButton
                        style={{ borderRadius: "6px" }}
                        className="btn-sm btn-danger"
                      >
                        <RiBroadcastFill className="mb-1" /> Live
                      </LiveButton>
                    </RoomListTable>
                  ))
                ) : (
                  ""
                )}
                {/* Room Upcoming */}
                {filtered &&
                  filtered.length !== 0 &&
                  filtered.map(
                    (item, idx) =>
                      item.next_live_schedule !== 0 && (
                        <RoomListTable
                          idx={idx}
                          data={item}
                          roomId={roomId}
                          setRoomId={setRoomId}
                        >
                          <LiveButton
                            className="btn-sm mt-1 text-white py-2"
                            style={{
                              backgroundColor: "#CD0C0E",
                              border: "none",
                              borderRadius: "6px",
                            }}
                          >
                            <div className="d-flex">
                              <span className="text-sm mr-1">Live</span>
                              <b>
                                {getSchedule(item.next_live_schedule, "home")}
                              </b>
                            </div>
                          </LiveButton>
                        </RoomListTable>
                      )
                  )}
                {/* Room Regular */}
                {filtered && filtered.length !== 0 ? (
                  filtered.map(
                    (item, idx) =>
                      !item.is_live &&
                      !item.next_live_schedule && (
                        <RoomListTable
                          idx={idx}
                          data={item}
                          roomId={roomId}
                          setRoomId={setRoomId}
                        />
                      )
                  )
                ) : roomRegular.length === 0 ? (
                  <SkeletonLoading />
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan={3} className="text-center">
                        <p style={{ fontSize: 18 }} className="mt-3">
                          <MdOutlineSearchOff className="mr-2" size={30} />
                          Room Regular not found
                        </p>
                      </td>
                    </tr>
                  </tbody>
                )}
                {/* Room Academy */}
                {filteredAcademy && filteredAcademy.length !== 0 ? (
                  filteredAcademy.map(
                    (item, idx) =>
                      !item.is_onlive && (
                        <RoomListTable
                          idx={idx}
                          data={item}
                          roomId={roomId}
                          setRoomId={setRoomId}
                        />
                      )
                  )
                ) : roomAcademy.length === 0 ? (
                  <SkeletonLoading />
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan={3} className="text-center">
                        <p style={{ fontSize: 18 }} className="mt-3">
                          <MdOutlineSearchOff className="mr-2" size={30} />
                          Room Academy not found
                        </p>
                      </td>
                    </tr>
                  </tbody>
                )}
                {/* Room Trainee */}
                {filteredTrainee && filteredTrainee.length !== 0 ? (
                  filteredTrainee.map(
                    (item, idx) =>
                      !item.is_onlive && (
                        <RoomListTable
                          idx={idx}
                          data={item}
                          roomId={roomId}
                          setRoomId={setRoomId}
                        />
                      )
                  )
                ) : roomTrainee.length === 0 ? (
                  <SkeletonLoading />
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan={3} className="text-center">
                        <p style={{ fontSize: 18 }} className="mt-3">
                          <MdOutlineSearchOff className="mr-2" size={30} />
                          Room Trainee not found
                        </p>
                      </td>
                    </tr>
                  </tbody>
                )}
              </>
            ) : isAcademy ? (
              filteredAcademy && filteredAcademy.length !== 0 ? (
                filteredAcademy.map(
                  (item, idx) =>
                    !item.is_onlive && (
                      <RoomListTable
                        idx={idx}
                        data={item}
                        roomId={roomId}
                        setRoomId={setRoomId}
                      />
                    )
                )
              ) : roomAcademy.length === 0 ? (
                <SkeletonLoading />
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={3} className="text-center">
                      <p style={{ fontSize: 18 }} className="mt-3">
                        <MdOutlineSearchOff className="mr-2" size={30} />
                        Room Academy not found
                      </p>
                    </td>
                  </tr>
                </tbody>
              )
            ) : isRegular ? (
              filteredTrainee && filteredTrainee.length !== 0 ? (
                filteredTrainee.map((item, idx) => (
                  <RoomListTable
                    idx={idx}
                    data={item}
                    roomId={roomId}
                    setRoomId={setRoomId}
                  />
                ))
              ) : roomRegular.length === 0 ? (
                <SkeletonLoading />
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={3} className="text-center">
                      <p style={{ fontSize: 18 }} className="mt-3">
                        <MdOutlineSearchOff className="mr-2" size={30} />
                        Room Trainee not found
                      </p>
                    </td>
                  </tr>
                </tbody>
              )
            ) : isOnLive ? (
              filteredFollow &&
              filteredFollow.length !== 0 &&
              filteredFollow.map((item, idx) => (
                <RoomListTable
                  idx={idx}
                  data={item}
                  roomId={roomId}
                  setRoomId={setRoomId}
                >
                  {item.is_online !== 0 && (
                    <LiveButton
                      style={{ borderRadius: "6px" }}
                      className="btn-sm btn-danger"
                    >
                      <RiBroadcastFill className="mb-1" /> Live
                    </LiveButton>
                  )}
                </RoomListTable>
              ))
            ) : (
              ""
            )}
          </Table>
        </div>
      </Col>
    </Row>
  );
}
