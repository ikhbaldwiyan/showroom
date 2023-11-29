import axios from "axios";
import { Loading } from "components";
import MainLayout from "pages/layout/MainLayout";
import React, { useEffect, useState } from "react";
import { BsCollectionPlayFill } from "react-icons/bs";
import { FaMoneyBillWave, FaTheaterMasks } from "react-icons/fa";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Col, Row } from "reactstrap";
import { MOST_WATCH, PREMIUM_LIVES } from "utils/api/api";
import formatNumber from "utils/formatNumber";
import { getSession } from "utils/getSession";
import { showToast } from "utils/showToast";
import Logo from "../../../src/assets/images/logo-dark.svg";

const ShowroomWrapped = () => {
  const [mostWatch, setMostWatch] = useState([]);
  const [premiumLives, setPremiumLives] = useState([]);

  const token = getSession()?.session?.cookie_login_id;
  const profile = getSession()?.profile;
  const user = getSession()?.user;
  const router = useHistory();

  useEffect(() => {
    axios.post(MOST_WATCH, { token }).then((res) => {
      setMostWatch(res.data);
    });

    axios.post(PREMIUM_LIVES, { token }).then((res) => {
      setPremiumLives(res.data);
    });
  }, []);

  useEffect(() => {
    if (!profile) {
      showToast("info", "Please login before using JKT48 Showroom Wrapped");

      setTimeout(() => {
        router.push("/");
      }, 2800);
    }
  }, []);

  return (
    <MainLayout>
      <div className="layout">
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
                <h5 className="wrapper-title">Top Premium Live Setlist 2023</h5>
              </div>
              <div className="setlist-wrapped">
                {premiumLives?.topSetlist ? (
                  <img
                    className="img-setlist"
                    src={premiumLives?.topSetlist}
                    alt=""
                  />
                ) : (
                  <img
                    alt="JKT48"
                    className="rounded mb-2"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/JKT48.svg/1200px-JKT48.svg.png"
                    width="60"
                    height={80}
                  />
                )}
                <ol
                  style={{ paddingLeft: "30px" }}
                  className="top-setlist-wrap"
                >
                  {premiumLives?.show?.slice(0, 3)?.map((item, idx) => (
                    <li key={idx}>
                      {item?.name} - <b>{item?.total}x</b>
                    </li>
                  ))}
                </ol>
              </div>
              {premiumLives?.totalPaidLive !== 0 && (
                <div className="total-paid-live">
                  <span>
                    Total Premium Live: {premiumLives?.totalPaidLive}x
                  </span>
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
                  <li>
                    Total JPY: <b>{formatNumber(premiumLives?.totalJPY)} JPY</b>
                  </li>
                  <li>
                    Total IDR: <b>{premiumLives?.totalIDR}</b>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default ShowroomWrapped;
