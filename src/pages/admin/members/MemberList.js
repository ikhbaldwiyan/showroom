import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Container, Table } from "reactstrap";
import MainLayout from "pages/layout/MainLayout";
import MemberDetail from "./MemberDetail";
import { DETAIL_MEMBER, MEMBERS_API } from "utils/api/api";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { showToast } from "utils/showToast";
import { IoSchoolSharp } from "react-icons/io5";
import { FaTheaterMasks } from "react-icons/fa";
import DashboardAdmin from "pages/admin/dashboard/DashboardAdmin";
import PaginationComponent from "parts/Pagination";

const MemberList = (props) => {
  const [members, setMembers] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [formData, setFormData] = useState({
    name: "",
    stage_name: "",
    type: "",
    image: ""
  });
  const [page, setPage] = useState(1);
  const [totalMembers, setTotalMembers] = useState(1);
  const [filterType, setFilterType] = useState("");

  const handleFilterChange = (event) => {
    const selectedType = event.target.value;
    setFilterType(selectedType);
    fetchMembers(1, selectedType);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async (page = 1, type = "") => {
    try {
      const response = await axios.get(
        `${MEMBERS_API}?page=${page}&type=${type}`
      );
      setMembers(response.data.members);
      setTotalMembers(response.data.totalMembers);
    } catch (error) {
      showToast("error", "Error fetching members:", error);
      console.error("Error fetching members:", error);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
    setFormData({
      name: "",
      stage_name: "",
      type: "",
      image: ""
    });
  };

  const handleAddMember = () => {
    toggleModal();
    setModalTitle("Add Member");
    setFormData({
      type: "regular"
    });
  };

  const handleEdit = (member) => {
    setModalTitle(`Edit Member ${member.name}`);
    setFormData(member);
    setModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(DETAIL_MEMBER(id));
      showToast("success", "Member deleted");
      fetchMembers();
    } catch (error) {
      showToast("error", `Error deleting member: ${error}`);
    }
  };

  useEffect(() => {
    fetchMembers(page, filterType);
  }, [page, filterType]);

  return (
    <MainLayout {...props}>
      <DashboardAdmin totalMembers={members.length} />
      <Container>
        <div className="d-flex justify-content-between">
          <h3>Member List</h3>
          <div className="d-flex">
            <h4 className="mx-2">Type: </h4>
            <select
              className="form-control"
              value={filterType}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="regular">Regular</option>
              <option value="trainee">Trainee</option>
            </select>
          </div>
          <Button color="primary" onClick={handleAddMember}>
            <FaPlus className="mb-1" /> Add Member
          </Button>
        </div>
        <Table className="mt-4" dark>
          <thead>
            <tr style={{ color: "white" }}>
              <th>No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Stage Name</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, idx) => (
              <tr key={member._id}>
                <td>{idx + 1} </td>
                <td>
                  <img
                    src={member.image}
                    alt={member.name}
                    width="60"
                    style={{ borderRadius: "8px" }}
                  />
                </td>
                <td>
                  <p className="mt-4">{member.name}</p>
                </td>
                <td>
                  <p className="mt-4">{member.stage_name}</p>
                </td>
                <td>
                  <p className="mt-4">
                    {member.type === "regular" ? (
                      <FaTheaterMasks color="green" size={20} />
                    ) : (
                      <IoSchoolSharp size={20} />
                    )}
                  </p>
                </td>
                <td>
                  <div className="mt-4">
                    <Button color="info" onClick={() => handleEdit(member)}>
                      <FaEdit size={18} />
                    </Button>{" "}
                    <Button
                      color="danger"
                      onClick={() => handleDelete(member._id)}
                    >
                      <FaTrash size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <MemberDetail
          modal={modal}
          modalTitle={modalTitle}
          formData={formData}
          setFormData={setFormData}
          fetchMembers={fetchMembers}
          toggleModal={toggleModal}
        />
        <PaginationComponent
          page={page}
          setPage={setPage}
          perPage={10}
          totalCount={totalMembers}
        />
      </Container>
    </MainLayout>
  );
};

export default MemberList;
