import axios from "axios";
import React, { useState, useEffect } from "react";
import { API, FOLLOW, PROFILE_API } from "utils/api/api";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardHeader,
  CardText,
  Button,
} from "reactstrap";

import formatNumber from "utils/formatNumber";
import formatDescription from "utils/formatDescription";
import getSchedule from "utils/getSchedule";
import SkeletonProfile from "parts/skeleton/SkeletonProfile";

import { useDispatch, useSelector } from "react-redux";
import {
  getRoomDetailLoad,
  getRoomDetailSucces,
  clearRoomDetail,
} from "redux/actions/roomDetail";
import FanLetter from "./FanLetter";
import { toast } from "react-toastify";
import { IoPersonAdd } from "react-icons/io5";
import { RiUserUnfollowFill } from "react-icons/ri";

export default function Profile({ roomId, menu, theme, session }) {
  const { profile, isLoading, room_name, isFollow } = useSelector(
    (state) => state.roomDetail
  );
  const [schedule, setSchedule] = useState("");
  const [profiles, setProfile] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoomDetailLoad());

    const params = {
      room_id: roomId.toString(),
      cookie: session.cookie_login_id,
    };

    axios.post(PROFILE_API, params).then((res) => {
      const profile = res.data;
      dispatch(getRoomDetailSucces(profile, profile.is_follow ? 1 : 0));
    });

    axios.post(PROFILE_API, params).then((res) => {
      const profiles = res.data;
      setProfile(profiles);
    });

    axios.get(`${API}/rooms/schedule/${roomId}`).then((res) => {
      const formatSchedule = getSchedule(res.data.epoch);
      setSchedule(formatSchedule);
    });

    return () => {
      dispatch(clearRoomDetail());
    };
  }, [roomId, menu]);

  const isMultiRoom = window.location.pathname == "/multi-room";
  const newProfile = isMultiRoom ? profiles : profile;

  useEffect(() => {
    window.document.title = room_name;
  }, [profile]);

  const handleFollowRoom = (flag) => {
    try {
      axios.post(FOLLOW, {
        flag,
        room_id: roomId.toString(),
        csrf_token: session.csrf_token,
        cookies_id: session.cookie_login_id,
      });
      dispatch(getRoomDetailSucces(profile, flag));

      const setting = {
        theme: "colored",
        autoClose: 1200,
      };

      if (flag === 1) {
        toast.success(`Success Follow ${room_name}`, setting);
      } else {
        toast.info(`Success Unfollow ${room_name}`, setting);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading && !isMultiRoom ? (
    <SkeletonProfile theme={theme} />
  ) : (
    <>
      <Row className="mb-2">
        <Col>
          <h4>{newProfile.room_name}</h4>
        </Col>
      </Row>
      <Row>
        <Col sm={!isMultiRoom ? "6" : "12"} className="mb-2">
          <CardImg
            top
            width="100%"
            src={newProfile.image}
            alt={newProfile.room_name}
            style={{ boxShadow: "3px 3px 3px 2px" }}
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
              <div
                dangerouslySetInnerHTML={{
                  __html: formatDescription(newProfile),
                }}
              />
              {newProfile.avatar && <h4 className="mt-3">Avatar List</h4>}
              {newProfile.avatar &&
                newProfile.avatar.list.map((item, idx) => (
                  <img key={idx} width="60" className="mr-2" src={item} />
                ))}
              <Button
                href={newProfile.share_url_live}
                className="btn-block mt-2"
                style={{ backgroundColor: "teal", border: "none" }}
                target="_blank"
              >
                Open Showroom
              </Button>

              {session.length !== 0 &&
                (!isLoading && isFollow === 0 ? (
                  <Button
                    className="btn-block mt-2"
                    color="primary"
                    onClick={() => handleFollowRoom(1)}
                  >
                    <IoPersonAdd className="mb-1" /> Follow
                  </Button>
                ) : (
                  <Button
                    className="btn-block mt-2"
                    onClick={() => handleFollowRoom(0)}
                  >
                    <RiUserUnfollowFill size={18} className="mb-1" /> Unfollow
                  </Button>
                ))}
              <Button className="btn-block mt-2" color="danger" disabled>
                Offline
              </Button>
            </CardText>
          </Card>
        </Col>
        {!isMultiRoom && (
          <Col className="mb-2" sm="6">
            <CardHeader className="mt-2" style={header}>
              {room_name} Info
            </CardHeader>
            <Card
              className="mb-2"
              style={{
                borderColor: "#24a2b7",
                borderTopLeftRadius: "0",
                borderTopRightRadius: "0",
              }}
              body
              outline
            >
              <CardText style={text}>
                <b>Room Level: </b> {newProfile.room_level} <br />
                <b>Schedule:</b> {schedule !== "07:00" ? schedule : "TBD"}{" "}
                <br />
                <b>Category: </b> {newProfile.genre_name} <br />
                <b>Follower:</b> {formatNumber(newProfile.follower_num)} <br />
              </CardText>
            </Card>
            <FanLetter
              roomId={roomId}
              text={text}
              header={header}
              room_name={room_name}
              profile={newProfile}
              theme={theme}
            />
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
};

const header = {
  backgroundColor: "#24a2b7",
  color: "white",
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
};
