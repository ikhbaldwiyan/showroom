import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container } from "reactstrap";
import { FaTrash, FaUserEdit } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { DELETE_USER, USERS } from "utils/api/api";
import MainLayout from "pages/layout/MainLayout";
import UserDetail from "./UserDetail";
import DeleteModal from "./DeleteModal";
import { toast } from "react-toastify";
import { isAdmin } from "utils/permissions/admin";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const UserList = (props) => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [userId, setUserId] = useState();
  const [isDelete, setIsDelete] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const router = useHistory();

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
  }, [modalOpen, userId, isDelete]);

  useEffect(() => {
    if (!isAdmin()) {
      toast.error("You don't have permission to access this page", {
        theme: "colored",
      });
      router.push("/");
    }
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(DELETE_USER(userId));
      toast.info("User success deleted", {
        theme: "colored",
      });
      toggleDelete();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleDelete = () => {
    setIsDelete(!isDelete);
  };

  const handleModalDetail = (id) => {
    toggleModal();
    setUserId(id);
    setIsCreate(false);
  };

  const handleModalDelete = (id) => {
    toggleDelete();
    setUserId(id);
  };

  const handleAddUser = () => {
    toggleModal()
    setIsCreate(true);
  }

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
            <Button onClick={() => handleAddUser()} color="primary">
              <IoPersonAddSharp className="mb-1 mr-2" />
              Add User
            </Button>
        </div>
        <Table dark>
          <thead>
            <tr>
              <th>No</th>
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
            {users.map((user, idx) => (
              <tr key={user._id}>
                <td>{idx + 1}</td>
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
                      onClick={() => handleModalDelete(user.user_id)}
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
          isCreate={isCreate}
          userId={userId}
          isOpen={modalOpen}
          toggleModal={toggleModal}
        />
        <DeleteModal
          modalDelete={isDelete}
          toggleDelete={handleModalDelete}
          handleDelete={() => handleDeleteUser(userId)}
        />
      </Container>
    </MainLayout>
  );
};

export default UserList;
