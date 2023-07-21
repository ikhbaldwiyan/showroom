import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
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
  THEATER_SCHEDULE_BOT,
  THEATER_SCHEDULE_SHOWROOM_BOT,
  LIVE_NOTIF_BOT,
  MESSAGES_BOT,
  SCHEDULES_API,
} from "utils/api/api";
import { showToast } from "utils/showToast";
import { FaCommentDots, FaDiscord, FaTheaterMasks } from "react-icons/fa";
import { RiBroadcastFill } from "react-icons/ri";
import { Loading } from "components";

const BotModal = ({ toggleModal, modal, modalTitle }) => {
  const [data, setData] = useState({
    type: "",
    message: "",
    messageType: "chat",
    scheduleId: ""
  });
  const [schedules, setSchedules] = useState([]);
  const [loadingTheaterBot, setLoadingTheaterBot] = useState(false);
  const [loadingShowroomBot, setLoadingShowroomBot] = useState(false);
  const [loadingLiveNotifBot, setLoadingLiveNotifBot] = useState(false);
  const [loadingMessageBot, setLoadingMessageBot] = useState(false);

  const buttons = [
    {
      label: "Run Theater Schedule Bot",
      api: THEATER_SCHEDULE_BOT,
      loading: loadingTheaterBot,
      setLoading: setLoadingTheaterBot,
      loadingText: "Sending Theater Schedule Bot",
      icon: <FaTheaterMasks className="mr-2" size={25} />,
    },
    {
      label: "Run Theater Schedule Showroom Bot",
      api: THEATER_SCHEDULE_SHOWROOM_BOT,
      loading: loadingShowroomBot,
      setLoading: setLoadingShowroomBot,
      lloadingText: "Sending Theater Showroom Schedule Bot",
      icon: <FaTheaterMasks className="mr-2" size={25} />,
    },
    {
      label: "Run Live Notif Bot",
      api: LIVE_NOTIF_BOT,
      loading: loadingLiveNotifBot,
      setLoading: setLoadingLiveNotifBot,
      loadingText: "Checking member live status",
      icon: <RiBroadcastFill className="mr-2" size={25} />,
    },
  ];

  const handleClick = (api, setLoading) => {
    setLoading(true);
    if (api === MESSAGES_BOT) {
      axios
        .post(api, data)
        .then((res) => {
          showToast("success", res.data.message);
        })
        .catch((err) => {
          showToast("error", "Failed to send discord bot");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      axios
        .get(api)
        .then((res) => {
          showToast(
            "success",
            api === LIVE_NOTIF_BOT
              ? "Live notif send to discord server"
              : res.data.message
          );
        })
        .catch((err) => {
          showToast("error", "Failed to send discord bot");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchSchedules = async () => {
    try {
      const response = await axios.get(SCHEDULES_API);
      setSchedules(response.data);
    } catch (error) {
      showToast("error", "Error fetching schedule:", error);
      console.error("Error fetching schedules:", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <Modal isOpen={modal} toggle={toggleModal}>
      <ModalHeader
        style={{ backgroundColor: "#24a2b7", color: "white" }}
        toggle={toggleModal}
      >
        {modalTitle}
      </ModalHeader>
      <ModalBody style={{ color: "black" }}>
        {buttons.map((button, index) => (
          <Button
            key={index}
            color={button.api === LIVE_NOTIF_BOT ? "danger" : "primary"}
            disabled={button.loading}
            block
            onClick={() => handleClick(button.api, button.setLoading)}
          >
            {button.loading ? (
              <div className="d-flex align-items-center justify-content-center">
                <Loading size={16} />
                <span className="ml-2">{button.loadingText}</span>
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-center">
                {button.icon}
                {button.label}
              </div>
            )}
          </Button>
        ))}
        <hr />
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleClick(MESSAGES_BOT, setLoadingMessageBot);
          }}
        >
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
                <Label for="messageType">
                  <b>Message Type</b>
                </Label>
                <Input
                  type="select"
                  name="messageType"
                  id="messageType"
                  onChange={handleChange}
                  required
                >
                  <option value="chat">Chat</option>
                  <option value="schedule">Theater Schedule</option>
                </Input>
              </FormGroup>
            </Col>
            {data.messageType === "chat" ? (
              <Col md="12">
                <FormGroup>
                  <Label for="message">
                    <b>Message</b>
                  </Label>
                  <Input
                    type="textarea"
                    name="message"
                    id="message"
                    value={data.message}
                    onChange={handleChange}
                    placeholder="Enter your message here"
                    required
                  />
                </FormGroup>
              </Col>
            ) : data.messageType === "schedule" ? (
              <Col md="12">
                <FormGroup>
                  <Label for="message">
                    <b>Available Theater Schedules</b>
                  </Label>
                  <Input
                    type="select"
                    name="scheduleId"
                    id="scheduleId"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select theater schedule</option>
                    {schedules.map((item, idx) => (
                      <option key={idx} value={item._id}>
                        {item.setlist.name} - {moment(item.showDate).format("DD MMMM")}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            ) : null}

            <Col>
              <Button
                type="submit"
                color="info"
                block
                disabled={loadingMessageBot}
              >
                {loadingMessageBot && (
                  <span>
                    <Loading size={16} /> Sending message
                  </span>
                )}
                {!loadingMessageBot && (
                  <>
                    <FaDiscord className="mb-1 mr-2" size={25} />
                    Send Message Bot
                  </>
                )}
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
