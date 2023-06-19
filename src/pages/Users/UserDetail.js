import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Container } from 'reactstrap';
import { DETAIL_USER } from "utils/api/api";
import MainLayout from "pages/layout/MainLayout";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

const UserDetail = (props) => {
  const { userId } = useParams();
  const navigate = useHistory();

  const [userData, setUserData] = useState({
    user_id: '',
    name: '',
    can_3_room: false,
    can_4_room: false,
    can_farming_page: false,
    can_farming_detail: false,
    can_farming_multi: false,
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(DETAIL_USER(userId));
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(DETAIL_USER(userId), userData);
      toast.success("User success updated", {
        theme: "colored",
      });
      navigate.push("/admin");
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <MainLayout {...props} >
      <Container>
        <h3>User Detail</h3>
        <Form onSubmit={handleSubmit}>
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
              />{' '}
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
              />{' '}
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
              />{' '}
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
              />{' '}
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
              />{' '}
              Can Access Multi-Farming
            </Label>
          </FormGroup>
          <Button className="mt-2 mb-4" color="primary" type="submit">
            Update
          </Button>
        </Form>
      </Container>
    </MainLayout>
  );
};

export default UserDetail;
