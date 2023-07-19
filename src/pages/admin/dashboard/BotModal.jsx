import React from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Form,
} from "reactstrap";
import {
  DISCORD_THEATER_NOTIF,
  LIVE_NOTIF_BOT,
  MESSAGES_BOT,
} from "utils/api/api";
import { showToast } from "utils/showToast";
import { FaCommentDots, FaDiscord, FaTheaterMasks } from "react-icons/fa";
import { useState } from "react";
import { RiBroadcastFill } from "react-icons/ri";
import { Loading } from "components";

const BotModal = ({ toggleModal, modal, modalTitle }) => {
  const [data, setData] = useState({
    type: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(false);

  const handleRunBot = () => {
    axios
      .get(DISCORD_THEATER_NOTIF)
      .then((res) => {
        showToast("success", res.data.message);
      })
      .catch((err) => {
        showToast("error", "Failed send discord bot");
        console.log(err);
      });
  };

  const runLiveNotifBot = () => {
    setLoading(true);
    axios
      .get(LIVE_NOTIF_BOT)
      .then((res) => {
        showToast("success", "Live Notif send to channel discord server");
        setLoading(false);
      })
      .catch((err) => {
        showToast("error", "Failed send live notif bot");
        setLoading(false);
      });
  };

  const runMessageDiscordBot = (e) => {
    e.preventDefault();
    setLoadingMessage(true);

    axios
      .post(MESSAGES_BOT, data)
      .then((res) => {
        setLoadingMessage(false);
        showToast("success", res.data.message);
      })
      .catch((err) => {
        showToast("error", "Failed send discord bot");
        setLoadingMessage(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Modal isOpen={modal} toggle={toggleModal}>
      <ModalHeader
        style={{
          backgroundColor: "#24a2b7",
          color: "white",
        }}
        toggle={toggleModal}
      >
        {modalTitle}
      </ModalHeader>
      <ModalBody style={{ color: "black" }}>
        <Button onClick={handleRunBot} color="primary" block>
          <div className="d-flex justify-content-center align-items-center">
            <FaTheaterMasks size={25} className="mr-2" />
            Run Theater Schedule Bot
          </div>
        </Button>
        <Button
          onClick={runLiveNotifBot}
          color="danger"
          disabled={loading}
          block
        >
          {loading ? (
            <div className="d-flex justify-content-center align-items-center">
              <Loading size={16} />
              <span className="ml-2"> Checking status member live</span>
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <RiBroadcastFill size={25} className="mr-2" />
              Run Live Notif Bot
            </div>
          )}
        </Button>
        <hr />
        <Form onSubmit={runMessageDiscordBot}>
          <Row className="py-1">
            <Col md="12">
              <div className="d-flex">
                <FaCommentDots className="mr-2" size={25} />
                <h5 className="text-lg">Custom message channel bot</h5>
              </div>
              <hr />
            </Col>
            <Col md="12">
              <FormGroup>
                <Label for="type">
                  <b>Select Channel</b>
                </Label>
                <Input
                  type="select"
                  name="type"
                  id="type"
                  onChange={handleChange}
                  required
                >
                  <option value="general">General</option>
                  <option value="development">Development</option>
                  <option value="announcement">Announcement</option>
                  <option value="twitter">Twitter</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup>
                <Label for="message">
                  <b>Message</b>
                </Label>
                <Input
                  type="text"
                  name="message"
                  id="message"
                  onChange={handleChange}
                  placeholder="Enter your message here"
                  required
                />
              </FormGroup>
            </Col>
            <Col>
              <Button
                type="submit"
                color="info"
                block
                disabled={loadingMessage}
              >
                <div className="mt-1">
                  {loadingMessage ? (
                    <div className="d-flex justify-content-center align-items-center">
                      <Loading size={16} />
                      <span className="ml-2">Sending Message</span>
                    </div>
                  ) : (
                    <>
                      <FaDiscord className="mb-1 mr-2" size={25} />
                      Send Message Bot
                    </>
                  )}
                </div>
              </Button>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggleModal}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default BotModal;
