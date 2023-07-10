import axios from "axios";
import moment from "moment";
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
  Row,
  Col,
} from "reactstrap";

const EditSchedule = ({
  formData,
  showModal,
  memberOptions,
  modalTitle,
  fetchSchedules,
  setShowModal,
  setModalTitle,
  setFormData
}) => {

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
      } else if (modalTitle.includes("Edit Schedule")) {
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

  return (
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
                <p className="mr-1">{index + 1}</p>
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
  );
};

export default EditSchedule;
