import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardImg,
  Card,
  CardText,
} from "reactstrap";
import { PROFILE_API } from "utils/api/api";
import formatDescription from "utils/formatDescription";
import { getSession } from "utils/getSession";

const ProfileModal = ({ buttonLabel, className, roomId }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [profile, setProfile] = useState([]);

  axios
    .post(PROFILE_API, {
      room_id: roomId.toString(),
      cookie: getSession?.session?.cookie_login_id,
    })
    .then((res) => {
      const profile = res.data;
      setProfile(profile);
    });

  const text = {
    borderColor: "#24a2b7",
    borderTopLeftRadius: "0",
    borderTopRightRadius: "0",
    color: "black",
  };

  const header = {
    backgroundColor: "teal",
    color: "white",
  };

  return (
    <>
      <p
        style={{ fontSize: 16, cursor: "pointer" }}
        className={className}
        onClick={toggle}
      >
        {buttonLabel}
      </p>
      <Modal isOpen={modal}>
        <ModalHeader style={header} toggle={toggle}>
          {profile.room_name} Profile
        </ModalHeader>
        <ModalBody style={{ backgroundColor: "#21252b" }}>
          <Card
            style={{
              borderColor: "#24a2b7",
              borderTopLeftRadius: "0",
              borderTopRightRadius: "0",
              backgroundColor: "#21252b",
              color: "white",
            }}
            body
            outline
          >
            <CardImg
              top
              width="100%"
              src={profile.image_square}
              alt={profile.room_name}
              style={{ boxShadow: "3px 3px 3px 2px" }}
              className="mb-3"
            />
            <CardText style={text}>
              <div
                style={{ color: "white" }}
                dangerouslySetInnerHTML={{ __html: formatDescription(profile) }}
              />
              {profile.avatar && <h4 className="mt-3">Avatar List</h4>}
              {profile.avatar &&
                profile.avatar.list.map((item, idx) => (
                  <img key={idx} width="60" className="mr-2" src={item} />
                ))}
              <Button
                href={profile.share_url_live}
                className="btn-block mt-2"
                style={{ backgroundColor: "teal", border: "none" }}
                target="_blank"
              >
                Open Showroom
              </Button>
              {profile.is_onlive ? (
                <Button className="btn-block mt-2" color="info">
                  Online
                </Button>
              ) : (
                <Button className="btn-block mt-2" color="danger" disabled>
                  Offline
                </Button>
              )}
            </CardText>
          </Card>
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ProfileModal;
