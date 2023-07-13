import React from "react";
import axios from "axios";
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
import { MEMBERS_API, DETAIL_MEMBER } from "utils/api/api";
import { showToast } from "utils/showToast";

const MemberDetail = ({
  fetchMembers,
  toggleModal,
  modal,
  modalTitle,
  formData,
  setFormData,
}) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalTitle === "Add Member") {
        await axios.post(MEMBERS_API, formData);
        showToast("success", "New Member Added");
      } else if (modalTitle.includes("Edit Member")) {
        await axios.put(DETAIL_MEMBER(formData._id), formData);
        showToast("info", `Member ${formData.name} updated`)
      }
      toggleModal();
      setFormData({
        name: "",
        stage_name: "",
        type: "",
        image: "",
      });
      fetchMembers();
    } catch (error) {
      showToast("error", "Error submit member:", error);
      console.error("Error submit member:", error);
    }
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
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">
              <b>Name</b>
            </Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="member name"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="stage_name">
              <b>Stage Name</b>
            </Label>
            <Input
              type="text"
              name="stage_name"
              id="stage_name"
              value={formData.stage_name}
              onChange={handleChange}
              placeholder="stage name"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="type">
              <b>Type</b>
            </Label>
            <select
              className="form-control"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="regular" selected>Regular</option>
              <option value="trainee">Trainee</option>
            </select>
          </FormGroup>
          <FormGroup>
            <Label for="image">
              <b>Image</b>
            </Label>
            <Input
              type="text"
              name="image"
              id="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="image url"
              required
            />
          </FormGroup>
          <ModalFooter>
            <Button color="primary" type="submit">
              Save
            </Button>
            <Button color="secondary" onClick={toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default MemberDetail;
