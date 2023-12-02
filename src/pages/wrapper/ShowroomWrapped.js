import axios from "axios";
import { Loading } from "components";
import Sidebar from "pages/layout/Sidebar";
import React, { useEffect, useState } from "react";
import { BsCollectionPlayFill } from "react-icons/bs";
import {
  FaDownload,
  FaMoneyBillWave,
  FaTheaterMasks,
  FaTwitter,
} from "react-icons/fa";
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
      console.log(error);
    }

    try {
      setIsLoading(true);
      axios.post(PREMIUM_LIVES, { token }).then((res) => {
        setPremiumLives(res.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
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
        windowHeight: 900,
      }).then((canvas) => {
        const screenshotImage = canvas.toDataURL("image/png");

        activityLog({
          logName: "Wrapped",
          description: "Download Showroom Wrapped",
          userId: getSession()?.userProfile?._id
        })
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
      userId: getSession()?.userProfile?._id
    })
  
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
                </Col>
              </Row>
            )}
            <Row className="py-2">
              <Col sm="12" md="5">
                <div className="wrapper-container">
                  <div className="d-flex mb-2">
                    <BsCollectionPlayFill className="mr-2" size={23} />
                    <h5 className="wrapper-title">Most Watch Showroom</h5>
                  </div>
                  <div className="d-flex align-items-center">
                    {mostWatch[0]?.image && mostWatch[0]?.visit !== 0 ? (
                      <img
                        className="img-top"
                        src={mostWatch[0]?.image}
                        alt="member"
                      />
                    ) : (
                      <img src={Logo} alt="logo" width={50} />
                    )}
                    <ol className="top-member-wrap">
                      {mostWatch.length > 0 ? (
                        mostWatch?.slice(0, 3).map((item, idx) => (
                          <div key={idx}>
                            {item.visit === 0 ? (
                              <li>-</li>
                            ) : (
                              <li>
                                {item.name} - <b>{item.visit}x</b>
                              </li>
                            )}
                          </div>
                        ))
                      ) : (
                        <Loading />
                      )}
                    </ol>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm="12" md="5">
                <div className="wrapper-container">
                  <div className="d-flex mb-2">
                    <FaTheaterMasks className="mr-2" size={23} />
                    <h5 className="wrapper-title">Top Premium Live Setlist</h5>
                  </div>
                  <div className="setlist-wrapped">
                    <ol
                      style={{ paddingLeft: "20px" }}
                      className="top-setlist-wrap"
                    >
                      {premiumLives?.show?.length > 0 ? (
                        premiumLives?.show?.slice(0, 3)?.map((item, idx) => (
                          <li key={idx}>
                            {item?.total === 0 ? (
                              <span>-</span>
                            ) : (
                              <div>
                                {item?.name} - <b>{item?.total}x</b>
                              </div>
                            )}
                          </li>
                        ))
                      ) : isLoading ? (
                        <Loading />
                      ) : (
                        <div className="d-flex flex-column align-items-center justify-items-center">
                          <RiBroadcastFill size={40} />
                          <span className="text-sm">
                            No data premium live
                          </span>
                        </div>
                      )}
                    </ol>
                  </div>
                  {premiumLives?.totalPaidLive !== 0 && !isLoading && (
                    <div className="total-paid-live">
                      <span>
                        Total Pembelian: {premiumLives?.totalPaidLive}x
                      </span>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm="12" md="5">
                <div className="money-container mb-2">
                  <div className="d-flex mb-1">
                    <FaMoneyBillWave className="mr-2" size={24} />
                    <h5 className="wrapper-title">
                      Money Spend (Premium Live)
                    </h5>
                  </div>
                  <div className="setlist-wrapped">
                    <ul className="top-setlist-wrap money-spend">
                      {isLoading ? (
                        <>
                          <li>
                            Total JPY: <Loading size={12} />
                          </li>
                          <li>
                            Total IDR: <Loading size={12} />
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            Total JPY:{" "}
                            <b>{formatNumber(premiumLives?.totalJPY)} JPY</b>
                          </li>
                          <li>
                            Total IDR:{" "}
                            <b>
                              {premiumLives?.totalIDR === "Rp 00"
                                ? "Rp 0"
                                : premiumLives?.totalIDR}
                            </b>
                          </li>
                        </>
                      )}
                    </ul>
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
    </Row>
  );
};

export default ShowroomWrapped;
