import axios from "axios";
import React, { useState, useEffect } from "react";
import { API } from "utils/api/api";
import { Row, Col, Card, CardImg, CardHeader, CardText, Button } from "reactstrap";

import formatNumber from "utils/formatNumber";
import formatDescription from "utils/formatDescription";
import getSchedule from "utils/getSchedule";
import SkeletonProfile from "parts/skeleton/SkeletonProfile";

import { useDispatch, useSelector } from "react-redux";
import { getRoomDetailLoad, getRoomDetailSucces, clearRoomDetail } from "redux/actions/roomDetail";
import FanLetter from "./FanLetter";

export default function Profile({ roomId, menu, theme }) {
  const { profile, isLoading, room_name } = useSelector((state) => state.roomDetail)
  const [schedule, setSchedule] = useState('');
  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(getRoomDetailLoad());
    
    axios.get(`${API}/rooms/profile/${roomId}`).then((res) => {
      const profile = res.data;
      dispatch(getRoomDetailSucces(profile))
    });

    axios.get(`${API}/rooms/schedule/${roomId}`).then((res) => {
      const formatSchedule = getSchedule(res.data.epoch);
      setSchedule(formatSchedule);
    });

    return () => {
      dispatch(clearRoomDetail())
    }

  }, [roomId, menu]);

  useEffect(() => {
    window.document.title = room_name;
  }, [profile])

  const isMultiRoom = window.location.pathname !== '/multi-room';

  return (
    isLoading && isMultiRoom ? <SkeletonProfile theme={theme} /> : 
    <>
      <Row className="mb-2">
        <Col>
          <h4>{profile.room_name}</h4>
        </Col>
      </Row>
      <Row>
        <Col sm={isMultiRoom ? '6' : '12'} className="mb-2">
          <CardImg
            top
            width="100%"
            src={profile.image}
            alt={profile.room_name}
            style={{boxShadow: '3px 3px 3px 2px'}}
          />
          <CardHeader className="mt-2" style={header}>
            Biodata
          </CardHeader>
          <Card
            style={{ borderTopLeftRadius: "0", borderTopRightRadius: "0" }}
            body
            outline
          >
            <CardText style={text}>
              <div dangerouslySetInnerHTML={{ __html: formatDescription(profile) }} />
              {profile.avatar && <h4 className="mt-3">Avatar List</h4>}
              {profile.avatar && profile.avatar.list.map((item, idx) => (
                <img key={idx} width="60" className="mr-2" src={item} />
              ))}
              <Button href={profile.share_url_live} className="btn-block mt-2" style={{backgroundColor: 'teal', border: 'none'}} target="_blank">Open Showroom</Button>
              <Button className="btn-block mt-2" color="danger" disabled>Offline</Button>
            </CardText>
          </Card>
        </Col>
        {isMultiRoom && (
          <Col className="mb-2" sm="6">
            <CardHeader className="mt-2" style={header}>
              {room_name} Info
            </CardHeader>
            <Card
              className="mb-2"
              style={{ borderColor: "#24a2b7",  borderTopLeftRadius: "0", borderTopRightRadius: "0" }}
              body
              outline
            >
              <CardText style={text}>
                <b>Room Level: </b> {profile.room_level} <br />
                <b>Schedule:</b> {schedule !== '07:00' ? schedule : 'TBD'} <br />
                <b>Category: </b> {profile.genre_name} <br />
                <b>Follower:</b> {formatNumber(profile.follower_num)} <br />
              </CardText>
            </Card>
            <FanLetter roomId={roomId} text={text} header={header} room_name={room_name} profile={profile} theme={theme} />
          </Col>
        )}
      </Row>
    </>
  );
}

const text = {
  borderColor: "#24a2b7",
  borderTopLeftRadius: "0",
  borderTopRightRadius: "0",
  color: "black",
}

const header = {
  backgroundColor: "#24a2b7",
  color: "white",
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
}

const hr = (idx) => {
  if (idx !== 2) {
   return  <hr />
 }
}