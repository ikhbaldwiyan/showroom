import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
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
import { SCHEDULES_API, DETAIL_SCHEDULE, SETLIST_API } from "utils/api/api";
import { showToast } from "utils/showToast";

const TheaterDetail = ({
  formData,
  showModal,
  memberOptions,
  memberTrainee,
  modalTitle,
  fetchSchedules,
  setShowModal,
  setModalTitle,
  setFormData,
}) => {
  const [setlist, setSetlist] = useState();
  const allMember = [...memberOptions, ...memberTrainee];

  const toggleModal = () => {
    setShowModal(!showModal);
    setModalTitle("");
    setFormData({
      showDate: "",
      showTime: "",
      isBirthdayShow: false,
      birthdayMember: {},
      isComingSoon: false,
      isGraduationShow: false,
      graduateMember: {},
      setlist: "",
      memberList: [],
      ticketShowroom: "",
      ticketTheater: "",
      webImage: "",
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

    if (name === "isBirthdayShow" && !checked) {
      setFormData((prevData) => ({
        ...prevData,
        birthdayMember: null,
      }));
    }

    if (name === "isGraduationShow" && !checked) {
      setFormData((prevData) => ({
        ...prevData,
        graduateMember: null,
      }));
    }
  };

  const handleMemberRegularChange = (e) => {
    const selectedMember = memberOptions.filter(
      (member) => member._id === e.target.value
    );
    setFormData((prevState) => {
      const updatedMemberList = [...prevState.memberList, selectedMember[0]];
      return { ...prevState, memberList: updatedMemberList };
    });
  };

  const handleMemberTraineeChange = (e) => {
    const selectedMember = memberTrainee.filter(
      (member) => member._id === e.target.value
    );
    setFormData((prevState) => {
      const updatedMemberList = [...prevState.memberList, selectedMember[0]];
      return { ...prevState, memberList: updatedMemberList };
    });
  };

  const handleBirthdayMember = (e) => {
    const selectedMemberId = e.target.value;
    const selectedMember = memberOptions.find(
      (member) => member._id === selectedMemberId
    );

    setFormData({
      ...formData,
      birthdayMember: selectedMember,
    });
  };

  const handleGraduateMember = (e) => {
    const selectedMemberId = e.target.value;
    const selectedMember = memberOptions.find(
      (member) => member._id === selectedMemberId
    );

    setFormData({
      ...formData,
      graduateMember: selectedMember,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalTitle === "Create Schedule") {
        await axios.post(SCHEDULES_API, formData);
        showToast("success", "Jadwal Theater Created");
      } else if (modalTitle.includes("Edit Schedule")) {
        await axios.put(DETAIL_SCHEDULE(formData._id), formData);
        showToast("success", "Jadwal Theater Updated");
      }
      toggleModal();
      fetchSchedules();
    } catch (error) {
      showToast("error", "Error submitting:", error);
      console.error("Error submitting:", error);
    }
  };

  const handleRemoveMember = (index) => {
    setFormData((prevState) => {
      const updatedMemberList = [...prevState.memberList];
      updatedMemberList.splice(index, 1);
      return { ...prevState, memberList: updatedMemberList };
    });
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
    fetchSetlist();
  }, []);

  const MemberList = () => (
    <FormGroup>
      <hr />
      <Label for="memberList">
        <b>Member List</b>
      </Label>
      <Row>
        {formData.memberList.map((member, index) => (
          <div key={index} className="align-items-center">
            <Col>
              <img width={80} src={member.image} alt={member.name} />
              <div
                style={{
                  backgroundColor: "#FFE8F4",
                  color: "#ff005f",
                  borderRadius: "8px",
                  padding: "5px",
                  height: "40px",
                }}
                className="d-flex align-items-center justify-content-center mt-2 mb-3"
              >
                <p className="text-center mt-3">{member.stage_name}</p>
                <AiFillCloseCircle
                  color="#DC3545"
                  className=" mx-1"
                  onClick={() => handleRemoveMember(index)}
                />
              </div>
            </Col>
          </div>
        ))}
      </Row>
    </FormGroup>
  );

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
            <Col md="4">
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
            </Col>
            <Col md="4">
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
            <Col md="4">
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
            <Col md="4">
              {formData?.setlist === "64ba3ff18b8a8470e8d0f092" ||
              formData?.setlist?._id === "64ba3ff18b8a8470e8d0f092" ? (
                <FormGroup>
                  <Label>
                    <b>Choose Member Trainee</b>
                  </Label>
                  <select
                    className="form-control"
                    name="member"
                    onChange={(e) => handleMemberTraineeChange(e)}
                  >
                    <option value="">Select a member</option>
                    {memberTrainee?.map((member, idx) => {
                      if (
                        !formData.memberList.find(
                          (selectedMember) => selectedMember._id === member._id
                        )
                      ) {
                        return (
                          <option key={idx} value={member._id}>
                            {member.name}
                          </option>
                        );
                      }
                      return null;
                    })}
                  </select>
                </FormGroup>
              ) : (
                <FormGroup>
                  <Label>
                    <b>Choose Member Regular</b>
                  </Label>
                  <select
                    className="form-control"
                    name="member"
                    onChange={(e) => handleMemberRegularChange(e)}
                  >
                    <option value="">Select a member</option>
                    {memberOptions?.map((member, idx) => {
                      if (
                        !formData.memberList.find(
                          (selectedMember) => selectedMember._id === member._id
                        )
                      ) {
                        return (
                          <option key={idx} value={member._id}>
                            {member.name}
                          </option>
                        );
                      }
                      return null;
                    })}
                  </select>
                </FormGroup>
              )}
            </Col>
            <Col md="4">
              <FormGroup>
                <Label>
                  <b>Is Birthday Show</b>
                </Label>
                <Input
                  className="ml-2 mt-2"
                  type="checkbox"
                  name="isBirthdayShow"
                  checked={formData.isBirthdayShow}
                  onChange={handleCheckboxChange}
                />
                <select
                  className="form-control"
                  name="birthdayMember"
                  onChange={(e) => handleBirthdayMember(e)}
                  disabled={!formData.isBirthdayShow}
                >
                  <option value="">Select a member</option>
                  {allMember?.map((member, idx) => {
                    return (
                      <option
                        key={idx}
                        value={member._id}
                        selected={member._id === formData?.birthdayMember?._id}
                      >
                        {member.name}
                      </option>
                    );
                  })}
                </select>
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label>
                  <b>Is Graduation Show</b>
                </Label>
                <Input
                  className="ml-2 mt-2"
                  type="checkbox"
                  name="isGraduationShow"
                  checked={formData.isGraduationShow}
                  onChange={handleCheckboxChange}
                />
                <select
                  className="form-control"
                  name="graduateMember"
                  onChange={(e) => handleGraduateMember(e)}
                  disabled={!formData.isGraduationShow}
                >
                  <option value="">Select a member</option>
                  {allMember?.map((member, idx) => {
                    return (
                      <option
                        key={idx}
                        value={member._id}
                        selected={member._id === formData?.graduateMember?._id}
                      >
                        {member.name}
                      </option>
                    );
                  })}
                </select>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <FormGroup check>
                <Input
                  type="checkbox"
                  name="isOnWeekSchedule"
                  checked={formData.isOnWeekSchedule}
                  onChange={handleCheckboxChange}
                />
                <Label>
                  <b>Is On Schedule</b>
                </Label>
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup check>
                <Input
                  type="checkbox"
                  name="isComingSoon"
                  checked={formData.isComingSoon}
                  onChange={handleCheckboxChange}
                />
                <Label>
                  <b>Is Coming Soon</b>
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <MemberList />
          <Row>
            {formData.webImage && (
              <Col md="12">
                <img
                  className="mb-3"
                  src={formData?.webImage ?? formData?.setlist?.image}
                  width="100%"
                  alt="img"
                  style={{
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
              </Col>
            )}
            <Col md="6">
              <FormGroup>
                <Label for="ticketShowroom">
                  <b>Ticket Showroom</b>
                </Label>
                <Input
                  type="text"
                  name="ticketShowroom"
                  id="ticketShowroom"
                  value={formData.ticketShowroom}
                  placeholder="Input url link web"
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label for="ticketTheater">
                  <b>Ticket Theater</b>
                </Label>
                <Input
                  type="text"
                  name="ticketTheater"
                  id="ticketTheater"
                  value={formData.ticketTheater}
                  placeholder="Input url link web"
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup>
                <Label className="mt-2" for="webImage">
                  <b>Web Image</b>
                </Label>
                <Input
                  type="text"
                  name="webImage"
                  id="webImage"
                  placeholder="Input screenshot image web url"
                  value={formData.webImage}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
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

export default TheaterDetail;
