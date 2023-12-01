import axios from "axios";
import { Loading } from "components";
import Sidebar from "pages/layout/Sidebar";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { BsCollectionPlayFill } from "react-icons/bs";
import { FaMoneyBillWave, FaTheaterMasks, FaVideoSlash } from "react-icons/fa";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Col, Row } from "reactstrap";
import { MOST_WATCH, PREMIUM_LIVES } from "utils/api/api";
import formatNumber from "utils/formatNumber";
import { getSession } from "utils/getSession";
import { showToast } from "utils/showToast";
import useWindowDimensions from "utils/useWindowDimension";
import Logo from "../../../src/assets/images/logo-dark.svg";
import Header from "./Header";

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

  return (
    <Row className="px-3">
      {width > 768 && (
        <Col md="2" className="p-0">
          <Sidebar />
        </Col>
      )}
      <Col className="p-0" sm="12" md="10">
        <Header />
        <div className={`layout ${!isMobile && "mx-3"}`}>
          {getSession().session && (
            <Row>
              <Col className="d-flex" md="12">
                <div className="user">
                  <div className="user-wrapper">
                    <div>
                      <img className="user-image" src={profile?.image} alt="" />
                    </div>
                    <div>
                      <b className="username">{profile?.name}</b> <br />
                      <span>ID: {user?.account_id}</span>
                    </div>
                    <div>
                      <div>
                        <img
                          className="user-image"
                          src={profile?.avatar_url}
                          alt="avatar"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          )}
          <Row className="py-3">
            <Col sm="12" md="5">
              <div className="wrapper-container">
                <div className="d-flex mb-2">
                  <BsCollectionPlayFill className="mr-2" size={23} />
                  <h5 className="wrapper-title">Most Watch Showroom</h5>
                </div>
                <div className="d-flex">
                  {mostWatch[0]?.image ? (
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
                        <>
                          <li>
                            {item.name} - <b>{item.visit}x</b>
                          </li>
                        </>
                      ))
                    ) : (
                      <Loading />
                    )}
                  </ol>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm="12" md="5">
              <div className="wrapper-container">
                <div className="d-flex mb-2">
                  <FaTheaterMasks className="mr-2" size={23} />
                  <h5 className="wrapper-title">
                    Top Premium Live Setlist 2023
                  </h5>
                </div>
                <div className="setlist-wrapped">
                  {isLoading ? (
                    <img src={Logo} alt="logo" width={50} />
                  ) : premiumLives?.topSetlist !==
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/JKT48.svg/1200px-JKT48.svg.png" ? (
                    <img
                      className="img-setlist"
                      src={premiumLives?.topSetlist}
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                  <ol
                    style={{ paddingLeft: "30px" }}
                    className="top-setlist-wrap"
                  >
                    {premiumLives?.show?.length > 0 ? (
                      premiumLives?.show?.slice(0, 3)?.map((item, idx) => (
                        <li key={idx}>
                          {item?.name} - <b>{item?.total}x</b>
                        </li>
                      ))
                    ) : isLoading ? (
                      <Loading />
                    ) : (
                      <div className="d-flex flex-column align-items-center justify-content-center justify-items-center">
                        <FaVideoSlash size={40} />
                        <span className="text-sm">
                          Premium Live History not found
                        </span>
                      </div>
                    )}
                  </ol>
                </div>
                {premiumLives?.totalPaidLive !== 0 && !isLoading && (
                  <div className="total-paid-live">
                    <span>Total Pembelian: {premiumLives?.totalPaidLive}x</span>
                  </div>
                )}
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm="12" md="5">
              <div className="money-container">
                <div className="d-flex mb-1">
                  <FaMoneyBillWave className="mr-2" size={24} />
                  <h5 className="wrapper-title">Money Spend</h5>
                </div>
                <div className="setlist-wrapped">
                  <ul className="top-setlist-wrap money-spend">
                    {isLoading ? (
                      <>
                        <li>
                          Total JPY: <Loading />
                        </li>
                        <li>
                          Total IDR: <Loading />
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          Total JPY:{" "}
                          <b>{formatNumber(premiumLives?.totalJPY)} JPY</b>
                        </li>
                        <li>
                          Total IDR: <b>{premiumLives?.totalIDR}</b>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default ShowroomWrapped;
