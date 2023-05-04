import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "reactstrap";
import { useParams } from "react-router-dom";
import { liveDetail } from "utils/api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainLayout from "./layout/MainLayout";
import Stream from "./streaming/Stream";
import {
  Profile,
  Title,
  Menu,
  RoomList,
  LiveChat,
  StageUser,
  TotalRank,
  Gift,
  StarButton
} from "components";
import { isMobile } from "react-device-detect";
import AlertInfo from "components/AlertInfo";
import { useDispatch, useSelector } from "react-redux";
import {
  clearLiveStream,
  getLiveStreamLoad,
  getLiveStreamOffline,
  getLiveStreamOnline
} from "redux/actions/liveStream";

function Live(props) {
  let { id } = useParams();
  const [roomId, setRoomId] = useState(id);
  const [menu, setMenu] = useState("room");
  const [loading, setLoading] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);
  const [cookiesLoginId, setCookiesLoginId] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [session, setSession] = useState("");
  const [user, setUser] = useState("");

  //redux
  const dispatch = useDispatch();
  const { room_name } = useSelector((state) => state.roomDetail);
  const { url, isLive } = useSelector((state) => state.liveStream);

  useEffect(() => {
    const session = localStorage.getItem("session");
    const user = localStorage.getItem("user");
    if (session) {
      const foundSession = JSON.parse(session);
      const userSession = JSON.parse(user);
      setSession(foundSession);
      setCookiesLoginId(foundSession.cookie_login_id);
      setCsrfToken(foundSession.csrf_token);
      setUser(userSession);
    }
  }, []);

  useEffect(() => {
    dispatch(getLiveStreamLoad());
    try {
      axios.get(liveDetail(roomId)).then((res) => {
        const url = res.data;
        url
          ? dispatch(getLiveStreamOnline({ url, room_name }))
          : dispatch(getLiveStreamOffline());
      });
      !url && setMenu("room");
      !url.length && messages();
    } catch (error) {
      console.log(error);
    }

    return () => {
      dispatch(clearLiveStream());
    };
  }, [roomId]);

  useEffect(() => {
    menu === "room" && window.scrollTo(0, 0);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [menu, roomId]);

  useEffect(() => {
    id === "undefined" && setRoomId("332503");
  }, [id]);

  const messages = () =>
    toast.error("Room Offline", {
      theme: "colored",
      autoClose: 1200
    });

  return (
    <MainLayout
      title={room_name}
      description={`Showroom ${room_name.replace("Room", "")}`}
      keywords={`Nonton Showroom ${room_name.replace("Room", "")}`}
      {...props}
    >
      <Container>
        {!isMobile && (
          <Row>
            <Col>
              <ToastContainer position="top-right" autoClose={3000} />
            </Col>
          </Row>
        )}
        <Row>
          <Col lg="8">
            {isLive ? (
              url?.slice(0, 1)?.map((item, idx) => (
                <>
                  <Stream key={idx} url={item?.url} />
                  <Title
                    roomId={roomId}
                    hideMenu={hideMenu}
                    setHideMenu={setHideMenu}
                    theme={props.theme}
                  />
                  {session && !isMobile && (
                    <StarButton
                      roomId={roomId}
                      cookiesLoginId={cookiesLoginId}
                      csrfToken={csrfToken}
                      theme={props.theme}
                      user={user}
                    />
                  )}
                </>
              ))
            ) : !isLive ? (
              <Profile
                roomId={roomId}
                setRoomId={setRoomId}
                isLoad={loading}
                menu={menu}
                theme={props.theme}
                session={session}
              />
            ) : (
              <Stream url="" />
            )}
          </Col>
          <Col lg="4">
            <AlertInfo page="Detail Screen" label="Detail" />
            <Menu
              menu={menu}
              setMenu={setMenu}
              isLive={url}
              roomId={roomId}
              hideMenu={hideMenu}
            />
            {menu === "room" ? (
              <RoomList roomId={roomId} setRoomId={setRoomId} />
            ) : menu === "chat" ? (
              <LiveChat roomId={roomId} />
            ) : menu === "rank" ? (
              <StageUser roomId={roomId} />
            ) : menu === "gift" ? (
              <Gift roomId={roomId} />
            ) : menu === "total" ? (
              <TotalRank roomId={roomId} />
            ) : (
              <StarButton
                roomId={roomId}
                cookiesLoginId={cookiesLoginId}
                csrfToken={csrfToken}
                theme={props.theme}
              />
            )}
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
}

export default Live;
