import axios from "axios";
import MainLayout from "pages/layout/MainLayout";
import { useState, useEffect } from "react";
import {
  useLocation,
  useParams
} from "react-router-dom/cjs/react-router-dom.min";
import { Col, Row } from "reactstrap";
import { ROOM_LIVE_IDN_DETAIL } from "utils/api/api";
import formatNumber from "utils/formatNumber";
import Player from "./components/Player";
import { IoReload } from "react-icons/io5";
import { useRef } from "react";
import { gaTag } from "utils/gaTag";
import { getSession } from "utils/getSession";
import { activityLog } from "utils/activityLog";
import Podium from "components/Podium";
import MenuIDN from "./components/MenuIDN";
import { isDesktop, isMobile } from "react-device-detect";
import formatName from "utils/formatName";
import Lottie from "react-lottie";
import { Fade } from "react-reveal";

const IDNLiveDetail = () => {
  let { id } = useParams();
  const [live, setLive] = useState("");
  const { profile, userProfile } = getSession();
  const location = useLocation();

  const [activeGift, setActiveGift] = useState("");
  const [giftAnimation, setGiftAnimation] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [senderGift, setSenderGift] = useState("");

  useEffect(() => {
    if (activeGift !== "") {
      setIsVisible(true);
      setGiftAnimation(activeGift?.animation);
      setSenderGift(activeGift?.item);
    }
  }, [activeGift]);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: giftAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (location.state) {
      const { liveData } = location?.state;
      setLive(liveData);
    }

    try {
      axios.get(ROOM_LIVE_IDN_DETAIL(id)).then((res) => {
        setLive(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefresh, setIsRefresh] = useState(false);

  const playerRef = useRef(null);

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
    setIsRefresh(true);
    if (playerRef?.current) {
      playerRef?.current.seekTo(0);
    }

    setTimeout(() => {
      setIsRefresh(false);
    }, 2000);

    gaTag({
      action: "refresh_idn_live",
      category: "IDN Live",
      label: "Live Stream",
      username: profile?.name,
      room: live?.user?.username
    });
  };

  useEffect(() => {
    if (live?.stream_url) {
      activityLog({
        logName: "Watch",
        userId: userProfile?._id,
        description: `Watch IDN Live ${live.user.name}`,
        liveId: live.slug
      });
    }

    gaTag({
      action: "watch_idn_live",
      category: "IDN Live",
      label: "Watch IDN - Live Stream",
      username: profile?.name,
      room: live?.user?.username
    });
  }, [id, live]);

  const handleComplete = () => {
    setIsVisible(false);
  };

  return (
    <MainLayout title={`${live?.user?.name ?? "Room Offline"} - IDN Live`}>
      <div className="layout">
        <Row>
          <Col md="7">
            {live?.stream_url ? (
              <>
                <Player
                  refreshKey={refreshKey}
                  url={`${process.env.REACT_APP_SERVICE_WORKER}?url=${live?.stream_url}`}
                  views={formatNumber(live?.view_count ?? 0)}
                  idnUrl={`https://www.idn.app/${id}/live/${live.slug}`}
                />
                <div className="d-flex mb-3">
                  <h4 className="d-flex align-items-center mr-2">
                    <b className="mr-2">{formatName(live?.user?.name, true)}</b>{" "}
                    |{" "}
                    <span style={{ fontSize: "14px", marginLeft: "8px" }}>
                      {" "}
                      {live?.title}
                    </span>
                    <IoReload
                      onClick={handleRefresh}
                      className={`${isRefresh && "spin-animation"} ml-3`}
                      size={20}
                    />
                  </h4>
                </div>
                {isDesktop && <Podium liveId={live.slug} isIDNLive />}
              </>
            ) : (
              <p>Room Offline</p>
            )}

            {activeGift && isVisible && (
              <div>
                <Fade top>
                  <div
                    className="mr-4"
                    style={{
                      position: "absolute",
                      top: 80,
                      right: 0,
                      backgroundColor: "#865CD6",
                      padding: "8px",
                      borderRadius: "12px",
                      maxWidth: "180px"
                    }}
                  >
                    <span style={{ fontSize: "14px", fontWeight: "600" }}>
                      {senderGift?.user?.name} mengirim {" "}
                      {senderGift?.gift?.name}
                    </span>
                  </div>
                </Fade>
                <Lottie
                  style={{
                    position: "absolute",
                    top: isMobile ? 0 : 20,
                    zIndex: 99
                  }}
                  options={defaultOptions}
                  height="auto"
                  width={200}
                  eventListeners={[
                    {
                      eventName: "complete",
                      callback: handleComplete
                    }
                  ]}
                />
              </div>
            )}
          </Col>
          <Col md="5">
            <MenuIDN id={id} live={live} setActiveGift={setActiveGift} />
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default IDNLiveDetail;
