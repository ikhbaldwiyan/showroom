import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";
import MainLayout from "pages/layout/MainLayout";
import moment from "moment";

function AdminSchedules(props) {
  const [schedules, setSchedules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [formData, setFormData] = useState({
    showDate: "",
    showTime: "",
    isBirthdayShow: false,
    setlist: "",
    memberList: [],
  });
  const [memberOptions, setMemberOptions] = useState();

  useEffect(() => {
    fetchSchedules();
    fetchMemberOptions();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get("http://localhost:8000/schedules");
      setSchedules(response.data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  const fetchMemberOptions = async () => {
    // Fetch member options for the dropdown
    const memberResponse = await axios.get("http://localhost:8000/member");
    const fetchedMembers = memberResponse.data;
    setMemberOptions(fetchedMembers);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setModalTitle("");
    setFormData({
      showDate: "",
      showTime: "",
      isBirthdayShow: false,
      setlist: "",
      memberList: [],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleMemberChange = (e) => {
    const selectedMember = memberOptions.filter(
      (member) => member._id === e.target.value
    );
    setFormData((prevState) => {
      const updatedMemberList = [...prevState.memberList, selectedMember[0]];
      return { ...prevState, memberList: updatedMemberList };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalTitle === "Create Schedule") {
        await axios.post("http://localhost:8000/schedules", formData);
      } else if (modalTitle === "Edit Schedule") {
        await axios.put(
          `http://localhost:8000/schedules/${formData._id}`,
          formData
        );
      }
      toggleModal();
      fetchSchedules();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    console.log(formData);
  };

  const handleEdit = (schedule) => {
    setModalTitle(`Edit Schedule ${schedule.setlist}`);
    setFormData(schedule);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/schedules/${id}`);
      fetchSchedules();
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  return (
    <MainLayout {...props}>
      <Container>
        <div className="d-flex justify-content-between">
          <h3>Theater Schedules Admin</h3>
          <Button
            color="primary"
            onClick={() => {
              setModalTitle("Create Schedule");
              setShowModal(true);
            }}
          >
            Create Schedule
          </Button>
        </div>
        <Table className="mt-4" dark>
          <thead>
            <tr style={{ color: "white" }}>
              <th>Show Date</th>
              <th>Setlist</th>
              <th>Show Time</th>
              <th>Birthday Show</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody style={{ color: "white" }}>
            {schedules.map((schedule) => (
              <tr key={schedule._id}>
                <td>{moment(schedule.showDate).format("DD MMM")}</td>
                <td>{schedule.setlist}</td>
                <td>{schedule.showTime}</td>
                <td>{schedule.isBirthdayShow ? "Yes" : "No"}</td>
                <td>
                  <Button
                    color="info"
                    size="sm"
                    onClick={() => handleEdit(schedule)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => handleDelete(schedule._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal size="lg" isOpen={showModal} toggle={toggleModal} centered>
          <Form onSubmit={handleSubmit}>
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
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label for="showDate">
                      <b>Show Date</b>
                    </Label>
                    <Input
                      type="date"
                      name="showDate"
                      id="showDate"
                      value={moment(formData.showDate).format("YYYY-MM-DD")}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label for="showTime">
                      <b>Show Time</b>
                    </Label>
                    <Input
                      type="time"
                      name="showTime"
                      id="showTime"
                      value={formData.showTime}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </Col>

                <Col md="6">
                  <FormGroup>
                    <Label for="setlist">
                      <b>Setlist</b>
                    </Label>
                    <Input
                      type="text"
                      name="setlist"
                      id="setlist"
                      value={formData.setlist}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup check>
                    <Input
                      type="checkbox"
                      name="isBirthdayShow"
                      checked={formData.isBirthdayShow}
                      onChange={handleCheckboxChange}
                    />
                    <Label>
                      <b>Is Birthday Show</b>
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="memberList">
                  <b>Member List</b>
                </Label>
                {formData.memberList.map((member, index) => (
                  <div key={index} className="d-flex align-items-center">
                    <p>{member.name}</p>
                  </div>
                ))}
                <p className="mt-3">
                  <b>Choose Member</b>
                </p>
                <select
                  className="form-control"
                  name="member"
                  onChange={(e) => handleMemberChange(e)}
                >
                  <option value="">Select a member</option>
                  {memberOptions?.map((member, idx) => (
                    <option key={idx} value={member._id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Save
              </Button>{" "}
              <Button color="secondary" onClick={toggleModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </Container>
    </MainLayout>
  );
}

export default AdminSchedules;
