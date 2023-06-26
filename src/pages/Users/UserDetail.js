import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { CREATE_USER, DETAIL_USER } from "utils/api/api";
import { toast } from "react-toastify";

const UserDetail = ({ isCreate, isOpen, toggleModal, userId }) => {
  const [userData, setUserData] = useState({
    user_id: "",
    name: "",
    can_3_room: false,
    can_4_room: false,
    can_farming_page: false,
    can_farming_detail: false,
    can_farming_multi: false,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(DETAIL_USER(userId));
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();

    try {
      if (type === "create") {
        await axios.post(CREATE_USER, userData);
        clearInputForm();
      } else {
        await axios.put(DETAIL_USER(userId), userData);
        clearInputForm();
      }
      toast.success(
        isCreate ? "User success created" : "User success updated",
        {
          theme: "colored",
        }
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
    toggleModal();
  };

  const clearInputForm = () => {
    setUserData({
      user_id: "",
      name: "",
      can_3_room: false,
      can_4_room: false,
      can_farming_page: false,
      can_farming_detail: false,
      can_farming_multi: false,
    });
  };

  const handleCloseButton = () => {
    toggleModal();
    clearInputForm();
  };

  return (
    <Modal isOpen={isOpen} toggle={handleCloseButton}>
      <ModalHeader
        style={{ backgroundColor: "#24a2b7", color: "white" }}
        toggle={handleCloseButton}
      >
        {isCreate ? "Create User" : "User Detail"}
      </ModalHeader>
      <ModalBody style={{ backgroundColor: "#21252b" }}>
        <Form>
          <FormGroup>
            <Label for="user_id">User ID</Label>
            <Input
              type="text"
              id="user_id"
              name="user_id"
              value={userData.user_id}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="can_3_room"
                checked={userData.can_3_room}
                onChange={handleChange}
              />{" "}
              Can Access 3 Room
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="can_4_room"
                checked={userData.can_4_room}
                onChange={handleChange}
              />{" "}
              Can Access 4 Room
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="can_farming_page"
                checked={userData.can_farming_page}
                onChange={handleChange}
              />{" "}
              Can Access Farming Page
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="can_farming_detail"
                checked={userData.can_farming_detail}
                onChange={handleChange}
              />{" "}
              Can Access Farming Detail
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="can_farming_multi"
                checked={userData.can_farming_multi}
                onChange={handleChange}
              />{" "}
              Can Access Multi-Farming
            </Label>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter style={{ backgroundColor: "#21252b" }}>
        {isCreate ? (
          <Button color="primary" onClick={(e) => handleSubmit(e, "create")}>
            Create
          </Button>
        ) : (
          <Button color="primary" onClick={(e) => handleSubmit(e, "update")}>
            Update
          </Button>
        )}
        <Button color="danger" onClick={handleCloseButton}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UserDetail;
