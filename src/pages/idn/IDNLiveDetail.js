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

const IDNLiveDetail = () => {
  let { id } = useParams();
  const [live, setLive] = useState("");
  const { profile, userProfile } = getSession();
  const location = useLocation();

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
                    <b className="mr-2">{live?.user?.name}</b> |{" "}
                    <span style={{ fontSize: "14px", marginLeft: "8px" }}> {live?.title}</span>
                    <IoReload
                      onClick={handleRefresh}
                      className={`${isRefresh && "spin-animation"} ml-3`}
                      size={20}
                    />
                  </h4>
                </div>
                <Podium liveId={live.slug} isIDNLive />
              </>
            ) : (
              <h3>IDN Live Room Offline</h3>
            )}
          </Col>
          <Col md="5">
            <MenuIDN id={id} live={live} />
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default IDNLiveDetail;
