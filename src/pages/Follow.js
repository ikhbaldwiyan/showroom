import axios from "axios";
import React, { useEffect } from "react";
import { isMobile } from "react-device-detect";
import { FaPersonBooth } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";
import {
  getRoomFollowedLoad,
  getRoomFollowedSuccess,
  getRoomFollowedFailed,
} from "redux/actions/roomFollowed";
import { ROOM_FOLLOW } from "utils/api/api";
import MainLayout from "./layout/MainLayout";
import { useState } from "react";
import SkeletonList from "parts/skeleton/SkeletonList";
import { RoomList } from "parts";
import { getSession } from "utils/getSession";

const Follow = (props) => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const { data, isLoading } = useSelector((state) => state.roomFollowed);

  useEffect(() => {
    async function getRoomFollow() {
      dispatch(getRoomFollowedLoad());
      try {
        const response = await axios.post(ROOM_FOLLOW, {
          cookies_id: getSession().cookie_login_id,
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

  useEffect(() => {
    if (getSession()) {
      setIsLogin(true);
    }
  }, []);

  return (
    <MainLayout {...props}>
      <Container>
        <Container className="mb-4">
          {!isLogin ? (
            <div className="row mb-4">
              <h3 className="py-4">Follow List</h3>
              <div className="col-12 mt-5 text-center align-items-center">
                <IoLogIn size={100} />
                <p className="py-3">Room not found! Please login to see</p>
                <Link to="/login">
                  <Button color="info">Login</Button>
                </Link>
              </div>
            </div>
          ) : data.length >= 1 ? (
            <RoomList room={data} isRoomFollowed />
          ) : isLoading ? (
            <>
              <h3 className="py-4">Follow List</h3>
              {!isMobile && <SkeletonList theme={props.theme} />}
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
          )}
        </Container>
      </Container>
    </MainLayout>
  );
};

export default Follow;
