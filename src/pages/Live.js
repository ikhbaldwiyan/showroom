import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col, Container, Card } from "reactstrap";
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
  Setlist,
  Loading
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
      theme: "colored"
    });

  const [starA, setStarA] = useState(0);
  const [starB, setStarB] = useState(0);
  const [starC, setStarC] = useState(0);
  const [starD, setStarD] = useState(0);
  const [starE, setStarE] = useState(0);

  const [star, setStar] = useState({
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0
  });

  const [isCounting, setIsCounting] = useState(false);

  const handleClick = (e) => {
    setIsCounting(true);
    setStar({
      ...star, [e.target.name]: star[e.target.name] + 1
    })
    console.log(e.target);
  };


  useEffect(() => {
    let timeoutId;

    if (isCounting) {
      timeoutId = setTimeout(() => {
        // setStar(0);
        setStar({
          ...star, a: 0, b: 0, c: 0, d: 0, e: 0
        })
        setIsCounting(false);
      }, 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [star, isCounting]);

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
            {url ? (
              url.slice(0, 1).map((item, idx) => (
                <>
                  <Stream key={idx} url={item.url} />
                  <Title
                    roomId={roomId}
                    hideMenu={hideMenu}
                    setHideMenu={setHideMenu}
                    theme={props.theme}
                  />
                  <Card style={{ backgroundColor: '#343A40' }} className="mb-2 mt-3">
                    Clicked {star.a} times
                    Clicked {star.b} times
                    Clicked {star.c} times
                    Clicked {star.d} times
                    Clicked {star.e} times
                    <div className="row justify-content-center my-3">
                      <div className="d-flex flex-column align-items-center px-1 my-0">
                        <input type="image" src="https://static.showroom-live.com/image/gift/1_s.png?v=1" width='50px' height='50px' style={{ cursor: 'pointer' }} onClick={handleClick} name="a" />
                        {<p className="mb-0">A</p>}
                      </div>

                      <div className="d-flex flex-column align-items-center px-1 my-0">
                        <input type="image" src="https://static.showroom-live.com/image/gift/1001_s.png?v=1" width='50px' height='50px' style={{ cursor: 'pointer' }} onClick={handleClick} name="b" />
                        {<p className="mb-0">A</p>}
                      </div>

                      <div className="d-flex flex-column align-items-center px-1 my-0">
                        <input type="image" src="https://static.showroom-live.com/image/gift/1002_s.png?v=1" width='50px' height='50px' style={{ cursor: 'pointer' }} onClick={handleClick} name="c" />
                        {<p className="mb-0">A</p>}
                      </div>
                      <div className="d-flex flex-column align-items-center px-1 my-0">
                        <input type="image" src="https://static.showroom-live.com/image/gift/1003_s.png?v=1" width='50px' height='50px' style={{ cursor: 'pointer' }} onClick={handleClick} name="d" />
                        {<p className="mb-0">A</p>}
                      </div>
                      <div className="d-flex flex-column align-items-center px-1 my-0">
                        <input type="image" src="https://static.showroom-live.com/image/gift/2_s.png?v=1" width='50px' height='50px' style={{ cursor: 'pointer' }} onClick={handleClick} name="e" />
                        {<p className="mb-0">A</p>}
                      </div>
                    </div>
                  </Card>
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
