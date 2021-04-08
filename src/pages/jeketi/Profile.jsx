import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardImg, CardHeader, CardText } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Profile({ roomId }) {
  const [profile, setProfile] = useState("");

  useEffect(() => {
    axios.get(`/profile?room_id=${roomId}`).then((res) => {
      const profiles = res.data;
      setProfile(profiles);
    });
  });

  return (
    <>
      <Row className="mb-3">
        <Col sm="5">
          {profile && profile.room_name.length < 16 ? (
            <h3>{profile.room_name}</h3>
          ) : (
            <h4>{profile.room_name}</h4>
          )}
        </Col>
        <Col>
          <h4>Showroom is Offline</h4>
        </Col>
      </Row>
      <Row>
        <Col sm="5">
          <CardImg
            top
            width="100%"
            src={profile.image}
            alt={profile.room_name}
          />
          <CardHeader
            className="mt-2"
            style={{ backgroundColor: "#dc3545", color: "white"}}
          >
            Biodata
          </CardHeader>
          <Card
            style={{ borderTopLeftRadius: "0", borderTopRightRadius: "0" }}
            body
            outline
            color="danger"
          >
            <CardText>
              <b>Name:</b> {profile.room_name} <br />
              <b>Follower:</b> {profile.follower_num} <br />
              <b>Room Level: </b>
              {profile.room_level}
            </CardText>
          </Card>
        </Col>
        <Col sm="7">
          <CardHeader
            style={{
              backgroundColor: "#dc3545",
              color: "white",
            }}
          >
            Fans Letter
          </CardHeader>
          <Card
            style={{
              borderTopLeftRadius: "0",
              borderTopRightRadius: "0",
              color: "black",
            }}
            body
            outline
            color="danger"
          >
            <CardText>
              {profile.recommend_comment_list != null &&
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
                ))}
            </CardText>
          </Card>
        </Col>
      </Row>
    </>
  );
}
