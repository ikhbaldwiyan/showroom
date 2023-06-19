import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container } from "reactstrap";
import { DELETE_USER, USERS } from "utils/api/api";
import MainLayout from "pages/layout/MainLayout";
import { Link } from "react-router-dom";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

const UserList = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(USERS);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(DELETE_USER(userId));
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <MainLayout {...props}>
      <Container>
        <div className="d-flex justify-content-between mb-3">
          <h3>User Permissions List</h3>
          <Link to="/add-user">
            <Button color="primary">Add User</Button>
          </Link>
        </div>
        <Table dark>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>3 Room Access</th>
              <th>Farming Access</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.user_id}</td>
                <td>{user.name}</td>
                <td>
                  {user.can_3_room === true ? (
                    <AiFillCheckCircle size={30} color="green" />
                  ) : (
                    <AiFillCloseCircle size={30} color="red" />
                  )}
                </td>
                <td>
                  {user.can_farming_page === true ? (
                    <AiFillCheckCircle size={30} color="green" />
                  ) : (
                    <AiFillCloseCircle size={30} color="red" />
                  )}
                </td>
                <td>
                  <Link to={`/detail-user/${user.user_id}`}>
                    <Button className="mr-3" color="info">
                      Detail
                    </Button>
                  </Link>
                  <Button
                    color="danger"
                    onClick={() => handleDeleteUser(user.user_id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </MainLayout>
  );
};

export default UserList;
