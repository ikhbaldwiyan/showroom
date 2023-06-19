import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container } from "reactstrap";
import { FaTrash, FaUserEdit } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { DELETE_USER, USERS } from "utils/api/api";
import { Link } from "react-router-dom";
import MainLayout from "pages/layout/MainLayout";
import UserDetail from "./UserDetail";

const UserList = (props) => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [userId, setUserId] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(USERS);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [modalOpen, userId]);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(DELETE_USER(userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleModalDetail = (id) => {
    toggleModal();
    setUserId(id);
  };

  const InfoAccess = ({ menu }) => {
    return menu ? (
      <AiFillCheckCircle size={30} color="green" />
    ) : (
      <AiFillCloseCircle size={30} color="#dc3545" />
    );
  };

  return (
    <MainLayout {...props}>
      <Container>
        <div className="d-flex justify-content-between mb-3">
          <h3>User Permissions List</h3>
          <Link to="/add-user">
            <Button color="primary">
              <IoPersonAddSharp className="mb-1 mr-2" />
              Add User
            </Button>
          </Link>
        </div>
        <Table dark>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>3 Room</th>
              <th>4 Room</th>
              <th>Farming</th>
              <th>Farming Detail</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.user_id}</td>
                <td>{user.name}</td>
                <td>
                  <InfoAccess menu={user.can_3_room} />
                </td>
                <td>
                  <InfoAccess menu={user.can_4_room} />
                </td>
                <td>
                  <InfoAccess menu={user.can_farming_page} />
                </td>
                <td>
                  <InfoAccess menu={user.can_farming_detail} />
                </td>
                <td>
                  <div className="d-flex">
                    <Button
                      className="mr-3"
                      color="info"
                      onClick={() => handleModalDetail(user.user_id)}
                    >
                      <FaUserEdit className="mb-1" size={20} />
                    </Button>
                    <Button
                      color="danger"
                      onClick={() => handleDeleteUser(user.user_id)}
                    >
                      <FaTrash className="mb-1" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <UserDetail
          userId={userId}
          isOpen={modalOpen}
          toggleModal={toggleModal}
        />
      </Container>
    </MainLayout>
  );
};

export default UserList;
