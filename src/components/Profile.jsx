import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardImg, CardHeader, CardText, Button } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import formatNumber from "utils/formatNumber";
import formatDescription from "utils/formatDescription";
import getSchedule from "utils/getSchedule";
import Skeleton from "parts/Skeleton";

export default function Profile({ roomId, isLoad, menu }) {
  const [profile, setProfile] = useState("");
  const [schedule, setSchedule] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => { 
    axios.get(`/profile?room_id=${roomId}`).then((res) => {
      const profiles = res.data;
      setProfile(profiles);
    });

    axios.get(`/next_live?room_id=${roomId}`).then((res) => {
      const schedules = res.data;
      const formatSchedule = getSchedule(schedules.epoch);
      setSchedule(formatSchedule);
    });

    axios.get(`/recommend_comments?room_id=${roomId}`).then((res) => {
      const comment = res.data.recommend_comments;
      setComments(comment);
    });

  }, [roomId, menu]);

  const profileName = () => {
    let title = profile && profile.room_url_key.includes("JKT48") && profile.room_url_key !== 'officialJKT48';
    let name = title ? `${profile.room_url_key.slice(6)} JKT48 Room` : profile.room_name;
    return profile ? name : 'JKT48 SHOWROOM';
  };

  useEffect(() => {
    window.document.title = profileName();
  }, [profile, menu])

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
    if (idx !== 3) {
     return  <hr />
   }
  }

  const isMultiRoom = window.location.pathname !== '/multi-room';

  return (
    isLoad && menu == 'room' && isMultiRoom ? <Skeleton /> : 
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
            style={{ borderColor: "#24a2b7",  borderTopLeftRadius: "0", borderTopRightRadius: "0" }}
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
              {profile && profile.room_url_key.includes("JKT48") && profile.room_url_key !== 'officialJKT48' ? `${profile.room_url_key.slice(6)}` : profile.room_name } Room Info
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

            <CardHeader style={header}>Fans Letter</CardHeader>
            <Card
              style={text}
              body
              outline
            >
              <CardText>
                {profile.recommend_comment_list != null ?
                  comments.slice(0, 4).map((item, idx) => (
                    <div key={idx}>
                      <h5>
                        <img
                          width="30"
                          className="mr-2"
                          src={item.user.image}
                        />
                        {item.user.name}
                      </h5>
                      <p style={{fontWeight: '400', fontSize: 13, color:'grey'}}>{getSchedule(item.created_at)}</p>
                      <p>{item.comment}</p>
                      {hr(idx)}
                    </div>
                  )) : (
                    'No Message'
                  )}
              </CardText>
            </Card>
          </Col>
        )}
      </Row>
    </>
  );
}
