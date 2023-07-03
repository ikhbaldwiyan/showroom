import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col, Container, Input, FormFeedback } from "reactstrap";
import { useParams } from "react-router-dom";
import { LIVE_STREAM_URL } from "utils/api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SummerTour from "../assets/images/summer-tour-banner.png";

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
  NoTicket,
} from "components";
import { isDesktop, isMobile } from "react-device-detect";
import { useSelector } from "react-redux";
import FarmStars from "components/FarmStars";
import { getSession } from "utils/getSession";
import { MdError } from "react-icons/md";

function Live(props) {
  let { id, name } = useParams();
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
  const [hideStars, setHideStars] = useState(false);
  const [isFarming, setIsFarming] = useState(false);
  const [isCustomLive, setIsCustomLive] = useState(false);
  const [customUrl, setCustomUrl] = useState(false);
  const [secretKey, setSecretKey] = useState();
  const [isFailed, setIsFailed] = useState();
  const cookies = getSession()?.session?.cookie_login_id ?? "stream";

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
      axios.get(LIVE_STREAM_URL(roomId, secretKey ?? cookies)).then((res) => {
        const streamUrl = res.data;
        setUrl(streamUrl);
        !streamUrl && messages();

        if (secretKey && streamUrl.code !== 404) {
          const secretCode = localStorage.getItem("secretKey");
          !secretCode &&
            toast.success("Congrats secret code is valid", {
              theme: "colored",
            });
          localStorage.setItem("secretKey", secretKey);
        }

        if (secretKey && streamUrl.code === 404) {
          setIsFailed(true);
        }
      });
      !url && setMenu("room");
    } catch (error) {
      console.log(error);
    }
  }, [roomId, secretKey]);

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
      autoClose: 1200,
    });

  useEffect(() => {
    const userSession = localStorage.getItem("session");
    const secretKey = localStorage.getItem("secretKey");
    if (userSession) {
      const foundSession = JSON.parse(userSession);
      setSession(foundSession);
    }
    setSecretKey(secretKey);
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
                    isFarming={isFarming}
                    setIsFarming={setIsFarming}
                    isCustomLive={isCustomLive}
                    secretKey={secretKey}
                  />
                  {session && !isMobile && !hideStars && !secretKey && (
                    <StarButton
                      roomId={roomId}
                      cookiesLoginId={cookiesLoginId}
                      csrfToken={csrfToken}
                      theme={props.theme}
                      user={user}
                      setUrl={setUrl}
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
            ) : name === "officialJKT48" && customUrl ? (
              <>
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <h3 className="mb-3">Input Live Code below </h3>
                  <Input
                    invalid={isFailed}
                    type="text"
                    name="secret code"
                    className="form-control mb-1"
                    placeholder="Input secret key"
                    onChange={(e) => setSecretKey(e.target.value)}
                  />
                  {isFailed && <FormFeedback>Secret Code Failed</FormFeedback>}
                </div>
              </>
            ) : url.code === 404 && name === "officialJKT48" && !secretKey ? (
              <NoTicket
                isCustomLive={isCustomLive}
                setIsCustomLive={setIsCustomLive}
                customUrl={customUrl}
                setCustomUrl={setCustomUrl}
              />
            ) : url.code === 404 && !secretKey ? (
              <div
                style={{ height: 500 }}
                className="d-flex justify-content-center align-items-center flex-column"
              >
                <h3>Sorry room not found</h3>
                <MdError size={100} />
              </div>
            ) : (
              ""
            )}
          </Col>
          <Col lg="4">
            {isDesktop && (
              <div className="d-flex py-2 justify-content-center">
                <a
                  href={process.env.REACT_APP_DISCORD_LINK}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    width="100%"
                    src={SummerTour}
                    alt="Summer Tour JKT48 SHOWROOM Banner"
                    style={{
                      borderTopRightRadius: "10px",
                      borderTopLeftRadius: "10px",
                    }}
                  />
                </a>
              </div>
            )}
            <Menu
              menu={menu}
              setMenu={setMenu}
              isLive={url}
              roomId={roomId}
              hideMenu={hideMenu}
              isFarming={isFarming}
              isCustomLive={isCustomLive}
              setIsCustomLive={setIsCustomLive}
              customUrl={customUrl}
              setCustomUrl={setCustomUrl}
            />
            {menu === "room" ? (
              <RoomList roomId={roomId} setRoomId={setRoomId} />
            ) : menu === "chat" ? (
              <LiveChat
                roomId={roomId}
                setRoomId={setRoomId}
                secretKey={secretKey}
              />
            ) : menu === "rank" ? (
              <StageUser roomId={roomId} secretKey={secretKey} />
            ) : menu === "gift" ? (
              <Gift roomId={roomId} secretKey={secretKey} />
            ) : menu === "total" ? (
              <TotalRank roomId={roomId} />
            ) : menu === "star" ? (
              <StarButton
                roomId={roomId}
                cookiesLoginId={cookiesLoginId}
                csrfToken={csrfToken}
                theme={props.theme}
                setUrl={setUrl}
              />
            ) : menu === "farming" ? (
              <FarmStars isSingleLive />
            ) : (
              ""
            )}
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
}

export default Live;
