import axios from "axios";
import { Loading } from "components";
import Sidebar from "pages/layout/Sidebar";
import React, { useEffect, useState } from "react";
import { FaDownload, FaTwitter } from "react-icons/fa";
import {
  useHistory,
  useLocation
} from "react-router-dom/cjs/react-router-dom.min";
import { Button, Col, Row } from "reactstrap";
import {
  DETAIL_USER,
  MOST_WATCH,
  MOST_WATCH_IDN,
} from "utils/api/api";
import formatNumber from "utils/formatNumber";
import { getSession } from "utils/getSession";
import { showToast } from "utils/showToast";
import useWindowDimensions from "utils/useWindowDimension";
import Header from "./Header";
import html2canvas from "html2canvas";
import { RiBroadcastFill } from "react-icons/ri";
import { activityLog } from "utils/activityLog";
import { gaTag } from "utils/gaTag";
import { ToastContainer } from "react-toastify";
import "./style.scss";
import { getUserLoad, getUserSuccess } from "redux/actions/userActions";
import { useDispatch } from "react-redux";
import { FaSquareXTwitter } from "react-icons/fa6";

const ShowroomWrapped = () => {
  const [mostWatch, setMostWatch] = useState([]);
  const [mostWatchIdn, setMostWatchIdn] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { width } = useWindowDimensions();
  const [totalWatchSR, setTotalWatchSr] = useState(0);
  const [totalWatchIDN, setTotalWatchIDN] = useState(0);

  const location = useLocation();
  const router = useHistory();
  const dispatch = useDispatch();

  const getParams = (parameter) => {
    const params = new URLSearchParams(location?.search);
    return params.get(parameter) || null; 
  };

  const session = getSession() || {};
  const {
    session: sessionData = {},
    profile = {},
    user = {},
    userProfile = {}
  } = session;

  // Safely retrieve values with fallback
  const token = getParams("token") || sessionData?.cookie_login_id || "";
  const userId = getParams("userId") || userProfile?._id || "";
  const username = getParams("username") || profile?.name || "Guest"; 
  const account_id = getParams("account_id") || user?.account_id || "";
  const avatar = getParams("avatar") || profile?.image || "/default-avatar.png"; 
  const displayName = username ?? profile?.name;

  useEffect(() => {
    try {
      axios.post(MOST_WATCH, { token }).then((res) => {
        const totalVisits = res.data.reduce(
          (sum, item) => sum + (item.visit_2024 || 0),
          0
        );

        setTotalWatchSr(totalVisits);
        setMostWatch(res.data);
      });
    } catch (error) {
      showToast("error", "Server Full Please try again later");
      console.log(error);
    }

    try {
      axios
        .get(MOST_WATCH_IDN(userId))
        .then((res) => {
          setMostWatchIdn(res.data.data);
        });
    } catch (error) {
      showToast("error", "Server Full Please try again later");
      console.log(error);
    }
  }, []);

  useEffect(() => {
    dispatch(getUserLoad());
    async function getUserDetail() {
      const detail = await axios.get(DETAIL_USER(user?.account_id));
      setTotalWatchIDN(detail?.data?.watchLiveIDN);
      dispatch(getUserSuccess(detail.data));
    }
    getUserDetail();
  }, []);

  useEffect(() => {
    window.document.title = "JKT48 SHOWROOM WRAPPED";
    if (!profile && !userId && !token) {
      showToast("info", "Please login before using JKT48 Showroom Wrapped");

      setTimeout(() => {
        router.push("/login");
      }, 2500);
    }
  }, []);

  const takeScreenshot = () => {
    const targetElement = document.getElementById("screenshotTarget"); // Replace 'screenshotTarget' with the appropriate ID of the element you want to capture
    if (targetElement) {
      const originalBackgroundColor = targetElement.style.backgroundColor;
      targetElement.style.backgroundColor = "#282c34"; // Change background color to transparent

      // Wait for images to load before taking the screenshot
      html2canvas(targetElement, {
        allowTaint: true,
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 400,
        windowHeight: 900
      }).then((canvas) => {
        const screenshotImage = canvas.toDataURL("image/png");

        activityLog({
          logName: "Wrapped",
          description: "Download Showroom Wrapped",
          userId: userId,
          liveId: token
        });

        gaTag({
          action: "download_showroom_wrapped",
          label: "Showroom Wrapped",
          category: "wrapped",
          username: displayName
        });
        // Restore the original background color
        targetElement.style.backgroundColor = originalBackgroundColor;

        // Create a link for the user to download the screenshot
        const downloadLink = document.createElement("a");
        downloadLink.href = screenshotImage;
        downloadLink.setAttribute('target', '_blank');
        downloadLink.download = "jkt48-showroom-wrapped-2024.png";
        downloadLink.click();
      });
    }
  };

  const shareToTwitter = () => {
    const hashtag1 = "JKT48ShowroomWrapped";
    const hashtag2 = "#JKT48ShowroomWrapped2024";
    const additionalText = "My JKT48 Showroom Wrapped 2024"; // Additional text to be included

    const encodedHashtags = encodeURIComponent(`${hashtag1} ${hashtag2}`);
    const encodedText = encodeURIComponent(additionalText);

    const twitterShareUrl = `https://twitter.com/intent/tweet?hashtags=${encodedHashtags}&text=${encodedText}`;

    activityLog({
      logName: "Wrapped",
      description: "Share twitter showroom wrapped ",
      userId: userId,
      liveId: token
    });

    gaTag({
      action: "share_showroom_wrapped",
      label: "Showroom Wrapped",
      category: "wrapped",
      username: getSession()?.profile.name
    });

    window.open(twitterShareUrl, "_blank");
  };

  return (
    <Row className="px-3">
      {width > 768 && (
        <Col md="2" className="p-0">
          <Sidebar />
        </Col>
      )}
      <Col className="p-0" sm="12" md="10">
        <div id="screenshotTarget">
          <Header />
          <div className="layout wrapped-container">
            {token && (
              <Row>
                <Col className="d-flex">
                  <div className="user">
                    <div className="user-wrapper">
                      <div>
                        <img
                          className="user-image"
                          src={
                            avatar ??
                            "https://static.showroom-live.com/assets/img/no_profile.jpg"
                          }
                          alt="user profile"
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <b className="username">
                          {displayName?.length > 10
                            ? `${displayName?.slice(0, 10)}...`
                            : displayName}
                        </b>

                        <span style={{ fontSize: "14px" }}>
                          ID:{" "}
                          {account_id?.length > 10
                            ? `${account_id.slice(0, 12)}...`
                            : account_id}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="total-watch ml-2">
                    <div className="user-wrapper">
                      <div>
                        <RiBroadcastFill size={26} />
                      </div>
                      <div className="d-flex flex-column">
                        <b className="watch">Total Watch Live</b>
                        <span className="total-watch-live">
                          <b>SR</b> : {totalWatchSR}x | <b>IDN</b>:{" "}
                          {formatNumber(totalWatchIDN)}x
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            )}
            <Row className="py-2">
              <Col sm="12" md="5">
                <div className="wrapper-container">
                  <div className="d-flex mb-2">
                    <h5 className="wrapper-title">Top Watch Showroom 2024</h5>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="top-member-wrap">
                      {mostWatch.length > 0 ? (
                        mostWatch?.slice(0, 3).map((item, idx) => (
                          <div key={idx}>
                            <div className="d-flex align-items-center">
                              <div
                                className={`rounded-circle d-flex justify-content-center align-items-center mr-3 bg-dark`}
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  margin: "auto",
                                  fontWeight: "bold"
                                }}
                              >
                                {idx + 1}
                              </div>
                              <img
                                className="rounded-lg mr-3 mt-2"
                                width="101"
                                height="57"
                                src={item?.image}
                              />
                              <div>
                                <span className="member-name-wrapped">
                                  {item?.name}
                                </span>
                                <br />
                                <span style={{ fontSize: 13 }}>
                                  {item?.visit_2024}x Watch
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="d-flex justify-content-center align-items-center">
                          <Loading />
                          <span className="ml-2">Counting data wrapped..</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="pb-3">
              <Col sm="12" md="5">
                <div className="idn-card">
                  <div className="d-flex mb-2">
                    <h5 className="wrapper-title">Top Watch IDN Live 2024</h5>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="top-member-wrap">
                      {mostWatchIdn.length > 0 ? (
                        mostWatchIdn
                          .filter(
                            (item, index, self) =>
                              item?.member?.name &&
                              index ===
                                self.findIndex(
                                  (t) =>
                                    t?.member?.name === item?.member?.name &&
                                    item?.member?.name !== "JKT48"
                                )
                          )
                          ?.slice(0, 3)
                          .map((item, idx) => (
                            <div key={idx}>
                              <div className="d-flex align-items-center">
                                <div
                                  className={`rounded-circle d-flex justify-content-center align-items-center mr-3 bg-dark`}
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    margin: "auto",
                                    fontWeight: "bold"
                                  }}
                                >
                                  {idx + 1}
                                </div>
                                <img
                                  className="rounded-lg mr-3 mt-2"
                                  width="70"
                                  src={item?.member?.image}
                                />
                                <div>
                                  <span className="member-name-wrapped">
                                    {item?.member?.name}
                                  </span>
                                  <br />
                                  <span style={{ fontSize: 13 }}>
                                    {item?.watch}x Watch
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))
                      ) : mostWatchIdn?.length === 0 ? (
                        <p>No data watch found</p>
                      ) : (
                        <div className="d-flex justify-content-center align-items-center">
                          <Loading />
                          <span className="ml-2">Counting data wrapped..</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <Col>
          {!isLoading && (
            <div className="d-flex">
              <Button className="mr-3" color="primary" onClick={takeScreenshot}>
                <div className="d-flex align-items-center">
                  <FaDownload className="mr-2" />
                  Download
                </div>
              </Button>
              <Button
                style={{ backgroundColor: "#01A982", border: "none" }}
                color="success"
                onClick={shareToTwitter}
              >
                <div className="d-flex align-items-center mx-2 text-white">
                  <FaSquareXTwitter className="mr-1" />
                  <span>Share to X</span>
                </div>
              </Button>
            </div>
          )}
        </Col>
      </Col>
      <ToastContainer position="bottom-center" autoClose={3000} />
    </Row>
  );
};

export default ShowroomWrapped;
