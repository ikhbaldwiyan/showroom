import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import axios from "axios";
import {
  PREMIUM_LIVE_DETAIL,
  PREMIUM_LIVE_LIST,
  SCHEDULES_API,
  SETLIST_API,
} from "utils/api/api";
import moment from "moment";
import { showToast } from "utils/showToast";

const PremiumLiveModal = ({ isOpen, toggleModal, premiumLiveId }) => {
  const [formData, setFormData] = useState({
    liveDate: "",
    webSocketId: "",
    setlist: "",
    theaterShow: "",
  });
  const [schedules, setSchedules] = useState([]);
  const [setlist, setSetlist] = useState([]);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get(SCHEDULES_API);
      setSchedules(response.data.reverse());
    } catch (error) {
      showToast("error", "Error fetching schedule:", error);
      console.error("Error fetching schedules:", error);
    }
  };

  const fetchSetlist = async () => {
    try {
      const response = await axios.get(SETLIST_API);
      setSetlist(response.data);
    } catch (error) {
      showToast("error", "Error fetching setlist:", error);
      console.error("Error fetching setlists:", error);
    }
  };

  useEffect(() => {
    if (premiumLiveId) {
      const fetchPremiumLiveData = async () => {
        try {
          const response = await axios.get(PREMIUM_LIVE_DETAIL(premiumLiveId));
          const data = response.data;
          setFormData(data);
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchPremiumLiveData();
    } else {
      // Clear the formData for creating a new entry
      setFormData({
        liveDate: "",
        webSocketId: "",
        setlist: "",
        theaterShow: "",
      });
    }
    fetchSchedules();
    fetchSetlist();
  }, [premiumLiveId, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (premiumLiveId) {
        // For editing an existing entry
        await axios.put(PREMIUM_LIVE_DETAIL(premiumLiveId), formData);
      } else {
        // For creating a new entry
        await axios.post(PREMIUM_LIVE_LIST, formData);
      }
      toggleModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader
        style={{
          backgroundColor: "#24a2b7",
          color: "white",
        }}
        toggle={toggleModal}
      >
        {premiumLiveId ? "Edit" : "Create"} Premium Live
      </ModalHeader>
      <ModalBody style={{ color: "black" }}>
        <Form>
          <FormGroup>
            <Label for="liveDate">Live Date</Label>
            <Input
              type="date"
              name="liveDate"
              id="liveDate"
              value={moment(formData.liveDate).format("YYYY-MM-DD")}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="webSocketId">Web Socket ID</Label>
            <Input
              type="text"
              name="webSocketId"
              id="webSocketId"
              value={formData.webSocketId}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="setlist">
              <b>Setlist</b>
            </Label>
            <Input
              type="select"
              name="setlist"
              id="setlist"
              onChange={handleChange}
              required
            >
              <option value="">Select Setlist</option>
              {setlist?.map((item, idx) => (
                <option
                  key={idx}
                  value={item._id}
                  selected={item._id === formData.setlist._id}
                >
                  {item.name}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="message">
              <b>Theater Show</b>
            </Label>
            <Input
              type="select"
              name="theaterShow"
              id="theaterShow"
              onChange={handleChange}
              required
            >
              <option value="">Select theater schedule</option>
              {schedules.map(
                (item, idx) =>
                  item.isOnWeekSchedule && (
                    <option
                      key={idx}
                      value={item._id}
                      selected={item._id === formData.theaterShow._id}
                    >
                      {item.setlist.name} -{" "}
                      {moment(item.showDate).format("DD MMMM")}
                    </option>
                  )
              )}
            </Input>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>
          Save
        </Button>
        <Button color="secondary" onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PremiumLiveModal;
