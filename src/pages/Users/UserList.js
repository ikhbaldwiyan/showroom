import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container } from "reactstrap";
import { FaTrash, FaUserEdit } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { LIST_USERS, DELETE_USER } from "utils/api/api";
import { toast } from "react-toastify";
import { isAdmin } from "utils/permissions/admin";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FcSearch } from "react-icons/fc";

import MainLayout from "pages/layout/MainLayout";
import UserDetail from "./UserDetail";
import DeleteModal from "./DeleteModal";
import PaginationComponent from "parts/Pagination";

const UserList = (props) => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [userId, setUserId] = useState();
  const [isDelete, setIsDelete] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalUsers, setTotalUsers] = useState();
  const router = useHistory();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(LIST_USERS(page, search));
        setUsers(response.data.data);
        setTotalUsers(response.data.totalUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [modalOpen, userId, isDelete, page, search]);

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
    toggleModal();
    setIsCreate(true);
  };

  const InfoAccess = ({ menu }) => {
    return menu ? (
      <AiFillCheckCircle size={30} color="green" />
    ) : (
      <AiFillCloseCircle size={30} color="#dc3545" />
    );
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <MainLayout {...props}>
      <Container>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h3>User Permissions List</h3>
          <div className="col-md-4 col-sm-12 search-wrapper">
            <FcSearch className="search-bar" color="#03665c" size="1.5em" />
            <input
              style={{ width: "100%", padding: "1rem 1rem 1rem 3rem" }}
              type="text"
              placeholder="Search User"
              onChange={handleSearch}
              className="form-control"
            />
          </div>
          <div>
            <Button onClick={() => handleAddUser()} color="primary">
              <IoPersonAddSharp className="mb-1 mr-2" />
              Add User
            </Button>
          </div>
        </div>
        <Table style={{ overflowX: "scroll", maxWidth: "100%" }} dark>
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
            {users.map((user, idx) => (
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
        <PaginationComponent
          page={page}
          setPage={setPage}
          perPage={10}
          totalCount={totalUsers}
        />
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
