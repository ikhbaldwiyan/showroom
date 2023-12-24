import axios from "axios";
import MainLayout from "pages/layout/MainLayout";
import Streaming from "pages/streaming/Stream";
import { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { RiBroadcastFill, RiLiveFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Col, Row, Button, Table } from "reactstrap";
import { ROOM_LIVES_IDN, ROOM_LIVE_IDN_DETAIL } from "utils/api/api";
import formatNumber from "utils/formatNumber";
import LiveButton from "elements/Button";

const IDNLiveDetail = () => {
  const [live, setLive] = useState("");
  const [room, setRoom] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id])

  useEffect(() => {

    try {
      axios.get(ROOM_LIVE_IDN_DETAIL(id)).then((res) => {
        setLive(res.data);
      });
    } catch (error) {
      console.log(error);
    }

    try {
      axios.get(ROOM_LIVES_IDN).then((res) => {
        setRoom(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  return (
    <MainLayout>
      <div className="layout">
        <Row>
          <Col md="8">
            <Streaming url={live?.stream_url} />
            <div className="d-flex mb-3">
              <h4 className="mr-2">
                <b>{live?.user?.name}</b> | {live?.title}
              </h4>
              <LiveButton  className="btn-sm btn-danger">
                <div className="d-flex align-items-center">
                  <FaUsers size={20} className="mr-1" />
                  {formatNumber(live?.view_count ?? 0)}
                </div>
              </LiveButton>
            </div>
          </Col>
          <Col>
            <div className="scroll-room">
              <Table dark>
                <thead className="room-list">
                  <tr>
                    <th>Image</th>
                    <th className="text-center">Name</th>
                    <th>Room</th>
                  </tr>
                </thead>
                {room?.map((data, idx) => (
                  <tbody key={idx}>
                    <tr>
                      <td>
                        <img
                          src={data.user.avatar}
                          style={{ borderRadius: "10px" }}
                          alt={data.name}
                          width="80"
                        />
                      </td>
                      <td className="d-flex flex-column align-items-center">
                        <span className="mt-1">
                          {data?.user?.name.replace("JKT48", "")}
                        </span>
                        <LiveButton
                          style={{ borderRadius: "6px" }}
                          className="btn-sm btn-danger mt-1"
                        >
                          <RiBroadcastFill className="mb-1" /> Live
                        </LiveButton>
                      </td>
                      <td>
                        <div className="mt-4">
                          <Link
                            to={(location) => ({
                              ...location,
                              pathname: `/idn/${data.user.username}/${data.slug}`,
                            })}
                          >
                            <Button color="info">
                              <RiLiveFill className="mb-1" />
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </Table>
            </div>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default IDNLiveDetail;
