import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col, Container, Input, FormFeedback } from "reactstrap";
import { useParams } from "react-router-dom";
import {
  LIVE_STREAM_URL,
  PROFILE_API,
  TODAY_SCHEDULE_API
} from "utils/api/api";
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
  NoTicket
} from "components";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import FarmStars from "components/FarmStars";
import { getSession } from "utils/getSession";
import { MdError } from "react-icons/md";
import { useRef } from "react";
import { gaTag } from "utils/gaTag";
import { gaEvent } from "utils/gaEvent";
import Setlist from "./theater/components/Setlist";
import MemberLineUp from "./theater/components/MemberLineUp";
import { getRoomDetailSucces } from "redux/actions/roomDetail";
import { activityLog } from "utils/activityLog";
import { showToast } from "utils/showToast";

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
  const { room_name, profile } = useSelector((state) => state.roomDetail);
  const [hideStars, setHideStars] = useState(false);
  const [isFarming, setIsFarming] = useState(false);
  const [isCustomLive, setIsCustomLive] = useState(false);
  const [customUrl, setCustomUrl] = useState(false);
  const [secretKey, setSecretKey] = useState(
    localStorage?.getItem("secretKey")
  );
  const [isFailed, setIsFailed] = useState();
  const [setlist, setSetlist] = useState([]);
  const [member, setMember] = useState([]);
  const [isPremiumLive, setIsPremiumLive] = useState(false);
  const cookies = getSession()?.session?.cookie_login_id ?? "stream";
  const dispatch = useDispatch();

  useEffect(() => {
    const session = localStorage.getItem("session");
    const userProfile = localStorage.getItem("userProfile");
    if (session) {
      const foundSession = JSON.parse(session);
      const userSession = JSON.parse(userProfile);
      setSession(foundSession);
      setCookiesLoginId(foundSession.cookie_login_id);
      setCsrfToken(foundSession.csrf_token);
      setUser(userSession);
    }

    axios
      .post(PROFILE_API, {
        room_id: roomId.toString(),
        cookie: session?.cookie_login_id
      })
      .then((res) => {
        const profile = res.data;
        dispatch(getRoomDetailSucces(profile, profile.is_follow ? 1 : 0));
      });
  }, [roomId]);

  useEffect(() => {
    try {
      axios.get(LIVE_STREAM_URL(roomId, secretKey ?? cookies)).then((res) => {
        const streamUrl = res.data;
        setUrl(streamUrl);
        !streamUrl && messages();

        if (secretKey && streamUrl.code !== 404) {
          const secretCode = localStorage.getItem("secretKey");
          !secretCode &&
          showToast("success", "Congrats secret code is valid")
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
      autoClose: 1200
    });

  useEffect(() => {
    setSession(getSession().session);
    setSecretKey(secretKey);
    if (isPremiumLive) {
      activityLog({
        logName: "Premium Live",
        userId: user?._id,
        description: `Watch Premium Live Showroom`,
        liveId: cookiesLoginId
      });
    }
  }, [isPremiumLive]);

  const [refreshKey, setRefreshKey] = useState(0);
  const playerRef = useRef(null);

  const handleRefresh = () => {
    // Increment the key to trigger ReactPlayer reload
    setRefreshKey((prevKey) => prevKey + 1);

    // Pause the player (optional)
    if (playerRef?.current) {
      playerRef?.current.seekTo(0);
    }

    gaEvent("Live Stream", "Refresh Button - Regular", "Live Stream");
    gaTag({
      action: "refresh_button_regular",
      category: "Refresh - Regular",
      label: "Live Stream",
      value: null,
      username: getSession()?.profile?.name
    });
  };

  useEffect(() => {
    axios.get(TODAY_SCHEDULE_API).then((res) => {
      setSetlist(res?.data?.setlist?.songs);
      setMember(res?.data?.memberList);
    });
  }, [isPremiumLive]);

  useEffect(() => {
    if (getSession().user && url?.length > 1 && profile) {
      setTimeout(() => {
        activityLog({
          logName: "Watch",
          userId: user?._id,
          description: `Watch Live ${room_name}`,
          liveId: profile.live_id
        });
      }, 120000);
    }
  }, [user, room_name, roomId]);

  return (
    <MainLayout
      title={room_name}
      description={`Showroom ${room_name.replace("Room", "")}`}
      keywords={`showroom ${room_name.replace("Room", "")}`}
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
                  <Stream refreshKey={refreshKey} key={idx} url={item?.url} />
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
                    handleRefresh={handleRefresh}
                    setIsPremiumLive={setIsPremiumLive}
                  />
                  {session && !isMobile && !hideStars && !secretKey && (
                    <StarButton
                      roomId={roomId}
                      cookiesLoginId={cookiesLoginId}
                      csrfToken={csrfToken}
                      theme={props.theme}
                      user={user}
                      setUrl={setUrl}
                      room_name={room_name}
                      isPremiumLive={isPremiumLive}
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
            ) : url.code === 404 && name === "officialJKT48" ? (
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
            {url.code === 404 && name === "officialJKT48" ? (
              <MemberLineUp members={member} isComingSoon={false} />
            ) : (
              <>
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
                  isPremiumLive={isPremiumLive}
                />
                {menu === "room" ? (
                  <RoomList roomId={roomId} setRoomId={setRoomId} />
                ) : menu === "chat" ? (
                  <LiveChat
                    roomId={roomId}
                    setRoomId={setRoomId}
                    secretKey={secretKey}
                    room_name={room_name}
                    isPremiumLive={isPremiumLive}
                  />
                ) : menu === "rank" ? (
                  <StageUser roomId={roomId} secretKey={secretKey} />
                ) : menu === "gift" ? (
                  <Gift roomId={roomId} secretKey={secretKey} />
                ) : menu === "setlist" ? (
                  <Setlist songs={setlist} />
                ) : menu === "info" ? (
                  <MemberLineUp members={member} />
                ) : menu === "total" ? (
                  <TotalRank roomId={roomId} />
                ) : menu === "star" ? (
                  <StarButton
                    roomId={roomId}
                    cookiesLoginId={cookiesLoginId}
                    csrfToken={csrfToken}
                    theme={props.theme}
                    setUrl={setUrl}
                    room_name={room_name}
                    isPremiumLive={isPremiumLive}
                  />
                ) : menu === "farming" ? (
                  <FarmStars isSingleLive />
                ) : (
                  ""
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
}

export default Live;
