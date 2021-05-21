import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardImg, CardHeader, CardText, Button } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import TwitterLogo from 'assets/images/twitter.png'
import InstagramLogo from 'assets/images/instagram.png'
import Loading from 'pages/jeketi/Loading';  
import formatViews from "utils/formatViews";

export default function Profile({ roomId, isLoad, menu }) {
  const [profile, setProfile] = useState("");
  const [schedule, setSchedule] = useState("");

  useEffect(() => { 
    axios.get(`/profile?room_id=${roomId}`).then((res) => {
      const profiles = res.data;
      setProfile(profiles);
    });

    axios.get(`/next_live?room_id=${roomId}`).then((res) => {
      const schedules = res.data.text;
      setSchedule(schedules);
    });
  }, [roomId]);

  useEffect(() => {
    let title = profile && profile.room_url_key.includes("JKT48") && profile.room_url_key !== 'officialJKT48';
    window.document.title = title ? `${profile.room_url_key.slice(6)} JKT48 Room` : profile.room_name;
  }, [profile])

  const text = {
    borderColor: "#24a2b7",
    borderTopLeftRadius: "0",
    borderTopRightRadius: "0",
    color: "black",
  }

  const header = {
    backgroundColor: "#24a2b7",
    color: "white",
  }

  let value = profile && profile.description;
  const description = value.replace(/\n/g, " <br /> ").replace(/"/g, "").replace(/Instagram:/g, `<img src=${InstagramLogo} width="40" class="ml-1 mr-1" alt="Instagram"/> `).replace(/Twitter:/g, `<img src=${TwitterLogo} width="48" alt="Twitter"/> `);
  
  function createTextLinks(text) {
    return (text || "").replace(
      /([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi,
      function (match, space, url) {
        let hyperlink = url;
        if (!hyperlink.match("^https?://")) {
          hyperlink = "http://" + hyperlink;
        }
        let title = profile.room_url_key.includes("JKT48") ? `${profile.room_url_key.slice(6)} JKT48` : profile.room_name
        return space + '<a href="' + hyperlink + '" target="_blank">' + title + "</a>";
      }
    );
  }

  return (
    isLoad && menu == 'room' ? <Loading /> : 
    <>
      <Row className="mb-2">
        <Col>
          <h4>{profile.room_name}</h4>
        </Col>
      </Row>
      <Row>
        <Col sm="6" className="mb-2">
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
              <div dangerouslySetInnerHTML={{ __html: createTextLinks(description) }} />
              {profile.avatar && <h4 className="mt-3">Avatar List</h4>}
              {profile.avatar && profile.avatar.list.map((item, idx) => (
                <img key={idx} width="60" className="mr-2" src={item} />
              ))}
              <Button className="btn-block mt-2" color="danger" disabled>Offline</Button>
            </CardText>
          </Card>
        </Col>
        
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
              <b>Schedule:</b> {schedule} <br />
              <b>Category: </b> {profile.genre_name} <br />
              <b>Follower:</b> {formatViews(profile.follower_num)} <br />
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
                profile.recommend_comment_list.map((item, idx) => (
                  <div key={idx}>
                    <h5>
                      <img
                        width="30"
                        className="mr-2"
                        src={item.user.image}
                      />
                      {item.user.name}
                    </h5>
                    <p>{item.comment}</p>
                    <hr />
                  </div>
                )) : (
                  'No Message'
                )}
            </CardText>
          </Card>
        </Col>
      </Row>
    </>
  );
}
