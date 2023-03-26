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
  Setlist
} from "components";
import { isMobile } from "react-device-detect";

function Live(props) {
  let { id } = useParams();
  const [url, setUrl] = useState([]);
  const [roomId, setRoomId] = useState(id);
  const [menu, setMenu] = useState("room");
  const [loading, setLoading] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);

  useEffect(() => {
    axios.get(liveDetail(roomId)).then((res) => {
      const streamUrl = res.data;
      setUrl(streamUrl);
    });
    !url && setMenu("room");
    !url && messages();
  }, [roomId, url]);

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
      autoClose: 1200
    });

  return (
    <MainLayout {...props}>
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
            {url.length ? (
              url?.slice(0, 1).map((item, idx) => (
                <>
                  <Stream key={idx} url={item?.url} />
                  <Title
                    roomId={roomId}
                    hideMenu={hideMenu}
                    setHideMenu={setHideMenu}
                    theme={props.theme}
                  />
                </>
              ))
            ) : !url ? (
              <Profile
                roomId={roomId}
                setRoomId={setRoomId}
                isLoad={loading}
                menu={menu}
                theme={props.theme}
              />
            ) : (
              <Stream url="" />
            )}
          </Col>
          <Col lg="4">
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
              <Setlist />
            )}
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
}

export default Live;
