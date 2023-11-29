import MainLayout from "pages/layout/MainLayout";
import React from "react";
import { BsCollectionPlayFill } from "react-icons/bs";
import { FaMoneyBillWave, FaTheaterMasks } from "react-icons/fa";
import { Col, Row } from "reactstrap";
import formatNumber from "utils/formatNumber";

const ShowroomWrapped = () => {
  return (
    <MainLayout>
      <div className="layout">
        <Row>
          <Col className="d-flex" md="12">
            <div className="user">
              <div className="user-wrapper">
                <div>
                  <img
                    className="user-image"
                    src="https://static.showroom-live.com/image/prof/4897b6cf8df6bf452bf72337918461bd29f665953378a68f43ebb34a3ddf0e4f_s.png?v=1701003638"
                    alt=""
                  />
                </div>
                <div>
                  <b className="username">Inzoid</b> <br />
                  <span>ID: inzoid21</span>
                </div>
              </div>
            </div>
            <div className="avatar">
              <div className="user-wrapper">
                <div>
                  <img
                    className="user-image"
                    src="https://static.showroom-live.com/image/avatar/59.png?v=98"
                    alt=""
                  />
                </div>
                <div>
                  <h5 className="username">Level 26</h5>
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
                <img
                  className="img-top"
                  src="https://static.showroom-live.com/image/room/cover/1f4eca57063fe3f6be0bf5a66adefd5e3afa7395324c0a95e572a533c8c1f89a_square_l.jpeg?v=1675092239"
                  alt=""
                />
                <ol className="top-member-wrap">
                  <li>Ashel - 120x</li>
                  <li>Kathrina - 48x</li>
                  <li>Indira - 11x</li>
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
                <h5 className="wrapper-title">Top Premium Live Theater</h5>
              </div>
              <div className="setlist-wrapped">
                <img
                  className="img-setlist"
                  src="https://media.discordapp.net/attachments/1108380195175551047/1169569783528833074/a0d68478-a16a-4b8b-a722-d1a2027bd5d8-transformed_1.jpeg?ex=6555e1bd&is=65436cbd&hm=2913d772f62f381bf42e62c640e1062d48734049f40b67402fa89e89b0019571&=&width=950&height=607"
                  alt=""
                />
                <ol
                  style={{ paddingLeft: "30px" }}
                  className="top-setlist-wrap"
                >
                  <li>Cara Meminum Ramune - 28x</li>
                  <li>Tunas di Balik Seragam - 13x</li>
                  <li>Aturan Anti Cinta - 4x</li>
                </ol>
              </div>
              <div className="total-paid-live">
                <span>Total Premium Live: 48x</span>
              </div>
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
                    Total JPY: <b>{formatNumber("15180")} JPY</b>
                  </li>
                  <li>
                    Total IDR: <b>Rp 1.609.080</b>
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
