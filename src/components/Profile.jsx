import axios from "axios";
import React, { useState, useEffect } from "react";
import { API } from "utils/api/api";
import { Row, Col, Card, CardImg, CardHeader, CardText, Button } from "reactstrap";

import formatNumber from "utils/formatNumber";
import formatDescription from "utils/formatDescription";
import getSchedule from "utils/getSchedule";
import SkeletonProfile from "parts/skeleton/SkeletonProfile";
import FanLetter from "./FanLetter";

import { useDispatch, useSelector } from "react-redux";
import { getRoomDetailLoad, getRoomDetailSucces, clearRoomDetail } from "redux/actions/roomDetail";
import { addFavoriteRoom } from "utils/addFavoriteRoom";
import { getRoomFavorite, removeFavoriteRoom } from "redux/actions/roomFavorite";
import { HiStar, HiTrash } from "react-icons/hi";
import { toast } from "react-toastify";

export default function Profile({ roomId, menu, theme }) {
  const { profile, isLoading, room_name } = useSelector((state) => state.roomDetail)
  const [schedule, setSchedule] = useState('');
  const [profiles, setProfile] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const roomFavorite = useSelector((state) => state.roomFavorite.data);
  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(getRoomDetailLoad());
    dispatch(getRoomFavorite());
    
    axios.get(`${API}/rooms/profile/${roomId}`).then((res) => {
      const profile = res.data;
      dispatch(getRoomDetailSucces(profile))
      setProfile(profile);
    });

    axios.get(`${API}/rooms/schedule/${roomId}`).then((res) => {
      const formatSchedule = getSchedule(res.data.epoch);
      setSchedule(formatSchedule);
    });

    return () => {
      dispatch(clearRoomDetail())
    }

  }, [roomId, menu]);

  const isMultiRoom = window.location.pathname == '/multi-room';
  const newProfile = isMultiRoom ? profiles : profile;

  useEffect(() => {
    setIsFavorite(false)
    window.document.title = room_name;
  }, [profile, profiles])

  useEffect(() => {
    if (roomFavorite) {
      for (let i = 0; i < roomFavorite.length; i++) {
        const data = roomFavorite[i];
        if (data.room_id === parseInt(roomId)) {
          setIsFavorite(true);
        }
      }
    }
  }, [roomId, getRoomFavorite(), isFavorite, profile])

  const handleRemoveFavoriteRoom = () => {
    setIsFavorite(false);
    dispatch(removeFavoriteRoom(roomId))

    let title = profile.room_url_key.includes("JKT48") && profile.room_url_key !== 'officialJKT48';
    let name = title ? `${profile.room_url_key.slice(6)} JKT48` : profile.room_name;

    toast.error(`${name} removed from favorite room`)
  }

  useEffect(() => {
    roomFavorite && localStorage.setItem('favorites', JSON.stringify(roomFavorite))
  }, [handleRemoveFavoriteRoom])

  return (
    isLoading && !isMultiRoom ? <SkeletonProfile theme={theme} /> : 
    <>
      <Row className="mb-2">
        <Col>
          <h4>{newProfile.room_name}</h4>
        </Col>
      </Row>
      <Row>
        <Col sm={!isMultiRoom ? '6' : '12'} className="mb-2">
          <CardImg
            top
            width="100%"
            src={newProfile.image}
            alt={newProfile.room_name}
            style={{boxShadow: '3px 3px 3px 3px', borderRadius: 8, marginBottom: 6}}
          />
          <CardHeader className="mt-2" style={header}>
            Biodata
          </CardHeader>
          <Card
            style={{ borderTopLeftRadius: "0", borderTopRightRadius: "0", borderColor: "#24a2b7" }}
            body
            outline
          >
            <CardText style={text}>
              <div dangerouslySetInnerHTML={{ __html: formatDescription(newProfile) }} />
              {newProfile.avatar && <h4 className="mt-3">Avatar List</h4>}
              {newProfile.avatar && newProfile.avatar.list.map((item, idx) => (
                <img key={idx} width="60" className="mr-2" src={item} />
              ))}
              <Button href={newProfile.share_url_live} className="btn-block mt-2" style={{backgroundColor: 'teal', border: 'none'}} target="_blank">Open Showroom</Button>
              <Button className="btn-block mt-2" color="danger" disabled>Offline</Button>
              {!isMultiRoom && (
                isFavorite ? (
                  <Button onClick={() => handleRemoveFavoriteRoom()} className="btn-block mt-2" color="danger" >
                  <HiTrash size={20} className="mb-1" /> Remove From Favorite
                  </Button>
                ) : (
                  <Button onClick={() => addFavoriteRoom(dispatch, profile)} className="btn-block mt-2" color="info" >
                    <HiStar size={20} className="mb-1" /> Add Room to Favorite
                  </Button>
                )
              )}
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
              style={{ borderColor: "#24a2b7",  borderTopLeftRadius: "0", borderTopRightRadius: "0" }}
              body
              outline
            >
              <CardText style={text}>
                <b>Room Level: </b> {newProfile.room_level} <br />
                <b>Schedule:</b> {schedule !== '07:00' ? schedule : 'TBD'} <br />
                <b>Category: </b> {newProfile.genre_name} <br />
                <b>Follower:</b> {formatNumber(newProfile.follower_num)} <br />
              </CardText>
            </Card>
            <FanLetter roomId={roomId} text={text} header={header} room_name={room_name} profile={newProfile} theme={theme} />
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