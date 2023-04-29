import axios from "axios";
import React, { useEffect } from "react";
import { isMobile } from "react-device-detect";
import { FaPersonBooth } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import {
  getRoomFollowedLoad,
  getRoomFollowedSuccess,
  getRoomFollowedFailed,
} from "redux/actions/roomFollowed";
import { ROOM_FOLLOW } from "utils/api/api";
import RoomList from "./RoomList";
import SkeletonList from "./skeleton/SkeletonList";

const RoomFollow = ({ session, isLogin, theme }) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.roomFollowed);

  useEffect(() => {
    async function getRoomFollow() {
      dispatch(getRoomFollowedLoad());
      try {
        const response = await axios.post(ROOM_FOLLOW, {
          cookies_id: session.cookie_login_id,
        });
        const jktRoom = response.data.rooms.filter((room) =>
          room.room_url_key.includes("JKT48")
        );
        dispatch(getRoomFollowedSuccess(jktRoom));
      } catch (error) {
        console.log(error);
        dispatch(getRoomFollowedFailed());
      }
    }
    getRoomFollow();
  }, []);

  return !isLogin ? (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-5 text-center align-items-center">
          <IoLogIn size={100} />
          <h4 className="py-3">Room Not Found! <br /> Please login to see</h4>
          <Link to="/login">
            <Button color="info">Login</Button>
          </Link>
        </div>
      </div>
    </div>
  ) : data.length >= 1 ? (
    <RoomList room={data} isRoomFollowed />
  ) : isLoading ? (
    <>
      <h3 className="py-4">Follow List</h3>
      {!isMobile && <SkeletonList theme={theme} />}
    </>
  ) : data.length === 0 ? (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-5 text-center align-items-center">
          <FaPersonBooth size={100} />
          <h3 className="py-3">No Room Followed</h3>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default RoomFollow;
