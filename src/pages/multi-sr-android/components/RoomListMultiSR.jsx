import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import { Row, Col, Table, Nav, NavItem, NavLink, Badge } from "reactstrap";
import { RiBroadcastFill } from "react-icons/ri";
import { API, ROOM_LIVES_API } from "utils/api/api";

import { useDispatch, useSelector } from "react-redux";
import { getRoomLiveSuccess, getRoomLiveFailed } from "redux/actions/roomLives";
import { getRoomListRegular } from "redux/actions/rooms";
import { FaUsers, FaUsersCog } from "react-icons/fa";
import RoomListTable from "components/RoomListTable";
import LiveButton from "elements/Button";
import { Loading } from "components";

export default function RoomList({
  roomId,
  setRoomId,
  isMultiRoom,
  updateMultiRoom,
  multiRoom,
  layoutName,
  setLayout
}) {
  const [search, setSearch] = useState("");
  const [activeRoomTab, setActiveRoomTab] = useState("1"); // Default to room 1

  const { data, isLoading, isLive } = useSelector((state) => state.roomLives);
  const roomLives = data;

  const params = new URLSearchParams(window.location.search);
  const isThreeRoom = params.get("threeRoom") === "true";
  const isFourRoom = params.get("fourRoom") === "true";

  const dispatch = useDispatch();

  useEffect(() => {
    async function getRoomList() {
      const room = await axios.get(`${API}/rooms`);
      dispatch(getRoomListRegular(room.data));
    }
    getRoomList();
  }, []);

  useEffect(() => {
    async function getRoomLive() {
      const room = await axios.get(ROOM_LIVES_API);
      if (room?.data?.data?.length >= 1) {
        dispatch(getRoomLiveSuccess(room.data.data));
      } else {
        dispatch(getRoomLiveFailed());
      }
    }
    getRoomLive();
  }, []);

  const toggleRoomTab = (tab) => {
    if (activeRoomTab !== tab) {
      setActiveRoomTab(tab);
    }
  };

  const filteredLive =
    isLive && !search
      ? roomLives
      : isLive &&
        roomLives?.filter((room) =>
          room.main_name.toLowerCase().includes(search.toLowerCase())
        );

  const SkeletonLoading = ({ type }) => (
    <tbody>
      {Array.from(Array(type === "live" ? roomLives.length : 6), (e, i) => {
        return (
          <tr key={`skeleton-${i}`}>
            <td colSpan={3} className="text-center">
              <Loading />
            </td>
          </tr>
        );
      })}
    </tbody>
  );

  // Function to render room content based on filters
  const renderRoomContent = () => {
    return (
      <>
        <>
          {/* Room Live */}
          {isLoading ? (
            <SkeletonLoading type="live" />
          ) : isLive && filteredLive && filteredLive.length !== 0 ? (
            filteredLive.map(
              (item, idx) =>
                item.premium_room_type !== 1 && (
                  <RoomListTable
                    key={`live-${idx}`}
                    idx={idx}
                    data={item}
                    roomId={roomId}
                    setRoomId={setRoomId}
                    updateMultiRoom={updateMultiRoom}
                    number={activeRoomTab}
                  >
                    <LiveButton
                      style={{ borderRadius: "6px" }}
                      className="btn-sm btn-danger"
                    >
                      <RiBroadcastFill className="mb-1" /> Live
                    </LiveButton>
                  </RoomListTable>
                )
            )
          ) : (
            <tbody>
              <tr className="text-center">
                <td colSpan={3}>Tidak ada member yang live huhu</td>
              </tr>
            </tbody>
          )}
        </>
      </>
    );
  };

  // Show room tabs only in multi-room mode
  const renderRoomTabs = () => {
    if (!isMultiRoom) return null;

    return (
      <Nav tabs className="select-room mt-3">
        <NavItem>
          <NavLink
            className={activeRoomTab === "1" ? "active" : ""}
            onClick={() => toggleRoomTab("1")}
            style={{ cursor: "pointer" }}
          >
            Room 1 {multiRoom?.[1]?.name && `(${multiRoom[1].name})`}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeRoomTab === "2" ? "active" : ""}
            onClick={() => toggleRoomTab("2")}
            style={{ cursor: "pointer" }}
          >
            Room 2 {multiRoom?.[2]?.name && `(${multiRoom[2].name})`}
          </NavLink>
        </NavItem>
        {(layoutName === "threeRoom" || layoutName === "fourRoom") && (
          <NavItem>
            <NavLink
              className={activeRoomTab === "3" ? "active" : ""}
              onClick={() => toggleRoomTab("3")}
              style={{ cursor: "pointer" }}
            >
              Room 3 {multiRoom?.[3]?.name && `(${multiRoom[3].name})`}
            </NavLink>
          </NavItem>
        )}
        {layoutName === "fourRoom" && (
          <NavItem>
            <NavLink
              className={activeRoomTab === "4" ? "active" : ""}
              onClick={() => toggleRoomTab("4")}
              style={{ cursor: "pointer" }}
            >
              Room 4 {multiRoom?.[4]?.name && `(${multiRoom[4].name})`}
            </NavLink>
          </NavItem>
        )}
      </Nav>
    );
  };

  return (
    <Row>
      <Col>
        <div className="d-flex mb-2">
          {(layoutName === "threeRoom" || layoutName === "fourRoom") && (
            <Badge
              className="mr-2"
              color="secondary"
              onClick={() => {
                setLayout("6");
                setActiveRoomTab("1");
              }}
            >
              Reset
            </Badge>
          )}
          {isThreeRoom && (
            <Badge
              className="mr-2"
              color="light"
              onClick={() => {
                setLayout("4");
                setActiveRoomTab("3");
              }}
            >
              <FaUsers /> Set 3 Room
            </Badge>
          )}
          {isThreeRoom && isFourRoom && (
            <Badge
              className="mr-1"
              color="light"
              onClick={() => {
                setLayout("3");
                setActiveRoomTab("4");
              }}
            >
              <FaUsersCog /> Set 4 Room
            </Badge>
          )}
        </div>
        {isMultiRoom && renderRoomTabs()}
        <div className="scroll-room rounded">
          <Table dark>
            {!isMultiRoom && (
              <thead className="room-list">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Room</th>
                </tr>
              </thead>
            )}

            {renderRoomContent()}
          </Table>
        </div>
      </Col>
    </Row>
  );
}
