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
  StarButton,
} from "components";
import { isMobile } from "react-device-detect";
import AlertInfo from "components/AlertInfo";
import { useSelector } from "react-redux";
import FarmStars from "components/FarmStars";

function Live(props) {
  let { id } = useParams();
  const [url, setUrl] = useState([]);
  const [roomId, setRoomId] = useState(id);
  const [menu, setMenu] = useState("room");
  const [loading, setLoading] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);
  const [cookiesLoginId, setCookiesLoginId] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [session, setSession] = useState("");
  const [user, setUser] = useState("");
  const { room_name } = useSelector((state) => state.roomDetail);
  const [hideStars, setHideStars] = useState(false)

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
    try {
      axios.get(liveDetail(roomId)).then((res) => {
        const streamUrl = res.data;
        setUrl(streamUrl);
      });
      !url && setMenu("room");
      !url && messages();
    } catch (error) {
      console.log(error);
    }
  }, [roomId]);

  useEffect(() => {
    window.document.title = "JKT48 SHOWROOM";
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
      autoClose: 1200,
    });

  useEffect(() => {
    const userSession = localStorage.getItem("session");
    if (userSession) {
      const foundSession = JSON.parse(userSession);
      setSession(foundSession);
    }
  }, []);

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
            {url && url.length > 0 ? (
              url?.slice(0, 1)?.map((item, idx) => (
                <>
                  <Stream key={idx} url={item?.url} />
                  <Title
                    roomId={roomId}
                    hideMenu={hideMenu}
                    setHideMenu={setHideMenu}
                    theme={props.theme}
                    hideStars={hideStars}
                    setHideStars={setHideStars}
                  />
                  {session && !isMobile && !hideStars && (
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
            ) : !url ? (
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
            ) : menu === "star" ? (
              <StarButton
                roomId={roomId}
                cookiesLoginId={cookiesLoginId}
                csrfToken={csrfToken}
                theme={props.theme}
              />
            ) : menu === "farming" ?  (
              <FarmStars />
            ) : (
              ''
            )}
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
}

export default Live;
