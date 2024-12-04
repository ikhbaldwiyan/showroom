import axios from "axios";
import { Loading } from "components";
import Sidebar from "pages/layout/Sidebar";
import React, { useEffect, useState } from "react";
import { FaDownload, FaTwitter } from "react-icons/fa";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Col, Row } from "reactstrap";
import { MOST_WATCH, PREMIUM_LIVES } from "utils/api/api";
import formatNumber from "utils/formatNumber";
import { getSession } from "utils/getSession";
import { showToast } from "utils/showToast";
import useWindowDimensions from "utils/useWindowDimension";
import Logo from "../../../src/assets/images/logo-dark.svg";
import Header from "./Header";
import html2canvas from "html2canvas";
import { RiBroadcastFill } from "react-icons/ri";
import { activityLog } from "utils/activityLog";
import { gaTag } from "utils/gaTag";
import { ToastContainer } from "react-toastify";
import "./style.scss";

const ShowroomWrapped = () => {
  const [mostWatch, setMostWatch] = useState([]);
  const [premiumLives, setPremiumLives] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { width } = useWindowDimensions();

  const token = getSession()?.session?.cookie_login_id;
  const profile = getSession()?.profile;
  const user = getSession()?.user;
  const router = useHistory();

  useEffect(() => {
    try {
      axios.post(MOST_WATCH, { token }).then((res) => {
        setMostWatch(res.data);
      });
    } catch (error) {
      showToast("error", "Server Full Please try again later");
      console.log(error);
    }

    try {
      setIsLoading(true);
      axios.post(PREMIUM_LIVES, { token }).then((res) => {
        setPremiumLives(res.data);
        setIsLoading(false);
      });
    } catch (error) {
      showToast("error", "Server Full Please try again");
      console.log(error);
    }
  }, []);

  useEffect(() => {
    window.document.title = "JKT48 SHOWROOM WRAPPED";
    if (!profile) {
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
        windowWidth: 370,
        windowHeight: 900
      }).then((canvas) => {
        const screenshotImage = canvas.toDataURL("image/png");

        activityLog({
          logName: "Wrapped",
          description: "Download Showroom Wrapped",
          userId: getSession()?.userProfile?._id,
          liveId: getSession()?.session.cookie_login_id
        });

        gaTag({
          action: "download_showroom_wrapped",
          label: "Showroom Wrapped",
          category: "wrapped",
          username: getSession().profile.name
        });
        // Restore the original background color
        targetElement.style.backgroundColor = originalBackgroundColor;

        // Create a link for the user to download the screenshot
        const downloadLink = document.createElement("a");
        downloadLink.href = screenshotImage;
        downloadLink.download = "jkt48-showroom-wrapped.png";
        downloadLink.click();
      });
    }
  };

  const shareToTwitter = () => {
    const hashtag1 = "JKT48ShowroomWrapped";
    const hashtag2 = "#JKT48ShowroomWrapped2023";
    const additionalText = "My JKT48 Showroom Wrapped"; // Additional text to be included

    const encodedHashtags = encodeURIComponent(`${hashtag1} ${hashtag2}`);
    const encodedText = encodeURIComponent(additionalText);

    const twitterShareUrl = `https://twitter.com/intent/tweet?hashtags=${encodedHashtags}&text=${encodedText}`;

    activityLog({
      logName: "Wrapped",
      description: "Share twitter showroom wrapped ",
      userId: getSession()?.userProfile?._id,
      liveId: getSession()?.session.cookie_login_id
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
            {getSession().session && (
              <Row>
                <Col className="d-flex">
                  <div className="user">
                    <div className="user-wrapper">
                      <div>
                        <img
                          className="user-image"
                          src={
                            premiumLives?.user?.image ??
                            "https://static.showroom-live.com/assets/img/no_profile.jpg"
                          }
                          alt="user profile"
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <b className="username">{profile?.name}</b>
                        <span style={{ fontSize: "14px" }}>
                          ID: {user?.account_id}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="total-watch ml-2">
                    <div className="user-wrapper">
                      <div>
                        <RiBroadcastFill size={30} />
                      </div>
                      <div className="d-flex flex-column">
                        <b className="watch">Total Watch Live</b>
                        <span className="total-watch-live">
                          <b>SR</b> : 200x | <b>IDN</b>: 480x
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
                            <div className="d-flex">
                              <div
                                className={`rounded-circle d-flex justify-content-center align-items-center mr-3 ${
                                  idx === 0
                                    ? "bg-warning"
                                    : idx === 1
                                    ? "bg-dark bg-opacity-75"
                                    : idx === 2
                                    ? "bg-bronze"
                                    : "bg-dark"
                                }`}
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
                                className="rounded-lg mr-3"
                                width="101"
                                height="57"
                                src={item?.image}
                              />
                              <p className="text-semibold">
                                {item?.name}
                                <br />
                                <span style={{ fontSize: 13 }}>
                                  {item?.visit_2024}x Watch
                                </span>
                              </p>
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
          </div>
        </div>
        <Col>
          {!isLoading && (
            <div className="d-flex">
              <Button className="mr-3" color="success" onClick={takeScreenshot}>
                <div className="d-flex align-items-center">
                  <FaDownload className="mr-2" />
                  Download
                </div>
              </Button>
              <Button
                style={{ backgroundColor: "#1DA1F2", border: "none" }}
                color="info"
                onClick={shareToTwitter}
              >
                <div className="d-flex align-items-center text-white">
                  <FaTwitter className="mr-1" />
                  <span>Share to Twitter</span>
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
