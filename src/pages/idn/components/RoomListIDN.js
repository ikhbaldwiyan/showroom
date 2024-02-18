import React from "react";
import { Table, Button } from "reactstrap";
import LiveButton from "elements/Button";
import { useState } from "react";
import { useEffect } from "react";
import { ROOM_LIVES_IDN } from "utils/api/api";
import axios from "axios";
import { RiBroadcastFill, RiLiveFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { IoReload } from "react-icons/io5";
import { gaTag } from "utils/gaTag";
import { getSession } from "utils/getSession";

const RoomListIDN = ({ currentRoom }) => {
  const [room, setRoom] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 2000);

    gaTag({
      action: "refresh_room_list_idn",
      category: "Refresh - Regular",
      label: "Live Stream",
      value: null,
      username: getSession()?.profile?.name,
    });
  };

  useEffect(() => {
    try {
      axios.get(ROOM_LIVES_IDN).then((res) => {
        setRoom(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [currentRoom, refresh]);

  return (
    <div className="scroll-room rounded">
      <Table dark>
        <thead className="room-list">
          <tr>
            <th colSpan={2}>Room Live IDN</th>
            <th onClick={handleRefresh}>
              <IoReload
                size={20}
                className={`${refresh && "spin-animation"}`}
              />
            </th>
          </tr>
        </thead>
        {room?.map((data, idx) => (
          <tbody key={idx}>
            <tr>
              <td>
                <img
                  src={data.user.avatar}
                  style={{ borderRadius: "10px" }}
                  alt={data.name}
                  width="80"
                />
              </td>
              <td className="d-flex flex-column align-items-center">
                <span className="mt-1">
                  {data?.user?.name !== "JKT48"
                    ? data?.user?.name.replace("JKT48", "")
                    : data?.user?.name}
                </span>
                <LiveButton
                  style={{ borderRadius: "6px" }}
                  className="btn-sm btn-danger mt-1"
                >
                  <RiBroadcastFill className="mb-1" /> Live
                </LiveButton>
              </td>
              <td>
                <div className="mt-4">
                  <Link
                    to={(location) => ({
                      ...location,
                      pathname: `/idn/${data.user.username}`,
                    })}
                  >
                    <Button
                      color={
                        currentRoom === data.user.username ? "success" : "info"
                      }
                    >
                      <RiLiveFill className="mb-1" />
                    </Button>
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
};

export default RoomListIDN;
