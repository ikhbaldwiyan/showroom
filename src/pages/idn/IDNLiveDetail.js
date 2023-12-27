import axios from "axios";
import MainLayout from "pages/layout/MainLayout";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Col, Row } from "reactstrap";
import { ROOM_LIVE_IDN_DETAIL } from "utils/api/api";
import formatNumber from "utils/formatNumber";
import RoomListIDN from "./components/RoomListIDN";
import Player from "./components/Player";
import { IoReload } from "react-icons/io5";
import { useRef } from "react";
import { gaTag } from "utils/gaTag";
import { getSession } from "utils/getSession";
import { activityLog } from "utils/activityLog";

const IDNLiveDetail = () => {
  const [live, setLive] = useState("");
  let { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);

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
      category: "Refresh - IDN Live",
      label: "Live Stream",
      username: getSession()?.profile?.name,
    });
  };

  useEffect(() => {
    if (getSession().userProfile && live?.stream_url) {
      activityLog({
        logName: "IDN",
        userId: getSession()?.userProfile?._id,
        description: `Watch IDN Live ${live.user.name}`,
        liveId: live.slug,
      });
    }
  }, [id, live]);

  return (
    <MainLayout title={`${live?.user?.name} - IDN Live`}>
      <div className="layout">
        <Row>
          <Col md="8">
            {live?.stream_url ? (
              <>
                <Player
                  refreshKey={refreshKey}
                  url={live?.stream_url}
                  views={formatNumber(live?.view_count ?? 0)}
                  idnUrl={`https://www.idn.app/${id}/live/${live.slug}`}
                />
                <div className="d-flex mb-3">
                  <h4 className="mr-2">
                    <b>{live?.user?.name}</b> | {live?.title}
                    <Button
                      onClick={handleRefresh}
                      color="secondary"
                      style={{ borderRadius: "10px" }}
                      className="ml-2 mb-1"
                    >
                      <IoReload
                        className={`${isRefresh && "spin-animation"}`}
                        size={20}
                      />
                    </Button>
                  </h4>
                </div>
              </>
            ) : (
              <h3>IDN Live Room Offline</h3>
            )}
          </Col>
          <Col>
            <RoomListIDN currentRoom={live?.user?.username} />
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default IDNLiveDetail;
