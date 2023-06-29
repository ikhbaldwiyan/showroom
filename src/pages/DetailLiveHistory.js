import axios from "axios";
import Search from "components/Search";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AiFillGift } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { BsCalendarDateFill, BsFillStopCircleFill } from "react-icons/bs";
import { GiPodiumWinner, GiSandsOfTime } from "react-icons/gi";
import { MdNotStarted } from "react-icons/md";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {
  Card,
  CardBody,
  CardImg,
  Col,
  Container,
  Row,
  Button,
  Table,
  CardTitle,
} from "reactstrap";
import { DETAIL_LIVE_HISTORY } from "utils/api/api";
import formatLongDate from "utils/formatLongDate";
import formatViews from "utils/formatViews";
import { getLiveDuration } from "utils/getLiveDuration";
import MainLayout from "./layout/MainLayout";

const DetailLiveHistory = (props) => {
  let { id } = useParams();
  const [history, setHistory] = useState();
  const [rank, setRank] = useState([]);
  const [menu, setMenu] = useState("podium");
  const [gift, setGift] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getRoomList() {
      try {
        const response = await axios.get(DETAIL_LIVE_HISTORY(id));
        const data = response.data;
        setHistory(data);
        setRank(data.fans);
        setGift(data.live_info.gift.list);
        console.log(gift);
        window.document.title = `${response.data?.room_info?.name}Live History`;
      } catch (error) {
        console.log(error);
      }
    }
    getRoomList();
  }, [search]);

  const filterName = !search
    ? rank
    : rank.filter((data) =>
        data.name.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <MainLayout {...props}>
      <Container>
        <Row className="mb-4">
          <Col md="4">
            <h4 className="py-1">
              {history?.room_info?.url.replace("/JKT48_", "")} JKT48 Live Log{" "}
            </h4>
            <Card
              style={{
                background: `linear-gradient(165deg, #282c34, #24a2b7)`,
                borderColor: props.theme === "dark" ? "white" : "",
                color: "white",
              }}
            >
              <CardImg
                top
                alt={history?.room_info?.name}
                src={history?.room_info?.img}
              />
              <CardBody>
                <h4 className="py-1">
                  {history?.room_info?.url.replace("/JKT48_", "")} JKT48 Live
                  History{" "}
                </h4>
                <div
                  className="d-flex align-items-center mt-2"
                  style={{ color: "#CBD5E0" }}
                >
                  <BsCalendarDateFill size={20} className="mr-2 mb-2" />
                  <h5>{formatLongDate(history?.live_info.date.start)}</h5>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md="4">
            <div className="py-4"></div>
            <Card
              style={{
                background: `linear-gradient(165deg, #282c34, #24a2b7)`,
                borderColor: props.theme === "dark" ? "white" : "",
                color: "white",
              }}
            >
              <CardBody>
                <CardTitle>
                  <h5 className="py-1">
                    <BiTimeFive size={25} /> Live Time Info
                  </h5>
                  <hr style={{ borderColor: "white" }} />
                </CardTitle>
                <div
                  className=" align-items-center mt-2"
                  style={{ color: "#CBD5E0" }}
                >
                  <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center">
                      <MdNotStarted className="mr-1" size={20} />
                      Start:
                    </div>
                    <div className="mx-1">
                      {formatLongDate(history?.live_info.date.start, true)}
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center">
                      <BsFillStopCircleFill className="mr-1" size={16} />
                      End:
                    </div>
                    <div className="mx-1">
                      {formatLongDate(history?.live_info.date.end, true)}
                    </div>
                  </div>
                  <div className="">
                    <span>
                      <GiSandsOfTime /> Duration:
                    </span>
                    <span className="mx-1">
                      {getLiveDuration(
                        history?.live_info.date.start,
                        history?.live_info.date.end
                      )}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col md="4">
            <Button
              className="menu"
              style={menu === "podium" ? buttonActive : buttonStyle}
              onClick={() => setMenu("podium")}
            >
              <GiPodiumWinner className="mb-1" /> Podium
            </Button>
            <Button
              className="menu"
              style={menu === "gift" ? buttonActive : buttonStyle}
              onClick={() => setMenu("gift")}
            >
              <AiFillGift className="mb-1" /> Gift
            </Button>

            {menu === "podium" ? (
              <>
                <Table dark>
                  <Search setSearch={setSearch} placeholder="Search podium name" />
                  <div className="scroll-room">
                    <thead
                      style={{
                        backgroundColor: "#24a2b7",
                        color: "white",
                        borderTop: "none",
                      }}
                    >
                      <tr>
                        <th>Rank</th>
                        <th>Ava</th>
                        <th>Username</th>
                        <th>Points</th>
                      </tr>
                    </thead>
                    {filterName &&
                      filterName.map((item, idx) => (
                        <tbody key={idx}>
                          <tr>
                            <th className="text-center">{idx + 1}</th>
                            <td>
                              <img
                                width="40"
                                alt="avatar"
                                src={`https://static.showroom-live.com/image/avatar/${item.avatar_id}.png`}
                              />
                            </td>
                            <td style={{ wordBreak: "break-word" }}>
                              {item.name}
                            </td>
                            <td>{formatViews(item.fans_point)}</td>
                          </tr>
                        </tbody>
                      ))}
                  </div>
                </Table>
              </>
            ) : (
              <Table dark>
                <div className="scroll-room">
                  <thead
                    style={{
                      backgroundColor: "#24a2b7",
                      color: "white",
                      borderTop: "none",
                    }}
                  >
                    <tr>
                      <th>Img</th>
                      <th>Name</th>
                      <th>Num</th>
                      <th>User</th>
                    </tr>
                  </thead>
                  {gift &&
                    gift.map((item, idx) => (
                      <tbody key={idx}>
                        <tr>
                          <td>
                            <img width="40" alt="gift" src={item.img} />
                          </td>
                          <td style={{ wordBreak: "break-word" }}>
                            {item.name}
                          </td>
                          <td style={{ wordBreak: "break-word" }}>
                            {item.num}x
                          </td>
                          <td style={{ wordBreak: "break-word" }}>
                            <div className="d-flex align-items-center">
                              {item.user_count}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </div>
              </Table>
            )}
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </MainLayout>
  );
};

export default DetailLiveHistory;

const buttonStyle = {
  backgroundColor: "teal",
  border: "none",
};

const buttonActive = {
  backgroundColor: "#008b9b",
  border: "none",
};
