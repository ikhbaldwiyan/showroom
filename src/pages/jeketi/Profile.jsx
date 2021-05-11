import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardImg, CardHeader, CardText, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from 'pages/jeketi/Loading';  

export default function Profile({ roomId, isLoad }) {
  const [profile, setProfile] = useState("");

  useEffect(() => { 
    axios.get(`/profile?room_id=${roomId}`).then((res) => {
      const profiles = res.data;
      setProfile(profiles);
    });
  }, [roomId]);

  useEffect(() => {
    window.document.title = profile && profile.room_url_key !== 'officialJKT48' ? `${profile.room_url_key.slice(6)} JKT48 Room` : 'JKT48 Official SHOWROOM';
    console.log(profile.room_url_key)
  }, [profile])

  const text = {
    borderColor: "#24a2b7",
    borderTopLeftRadius: "0",
    borderTopRightRadius: "0",
    color: "black",
  }

  return (
    isLoad ? <Loading /> : 
    <>
      <Row className="mb-3">
        <Col>
          <h4 className="text-gray-800">{profile.room_name}</h4>
        </Col>
      </Row>
      <Row>
        <Col sm="5" className="mb-2">
          <CardImg
            top
            width="100%"
            src={profile.image}
            alt={profile.room_name}
            style={{boxShadow: '3px 3px 3px 2px'}}
          />
          <CardHeader
            className="mt-2"
            style={{ backgroundColor: "#24a2b7", color: "white"}}
          >
            Biodata
          </CardHeader>
          <Card
            style={{ borderColor: "#24a2b7",  borderTopLeftRadius: "0", borderTopRightRadius: "0" }}
            body
            outline
          >
            <CardText style={text}>
              <b>Name:</b> {profile.room_name} <br />
              <b>Follower:</b> {profile.follower_num} <br />
              <b>Room Level: </b> {profile.room_level} <br />
              <Button className="btn-block mt-2" color="danger" disabled>Offline</Button>
            </CardText>
          </Card>
        </Col>
        
        <Col className="mb-2" sm="7">
          <CardHeader
            style={{
              backgroundColor: "#24a2b7 ",
              color: "white",
            }}
          >
            Fans Letter
          </CardHeader>
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
