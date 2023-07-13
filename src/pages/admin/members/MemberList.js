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

const MemberList = (props) => {
  const [members, setMembers] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [formData, setFormData] = useState({
    name: "",
    stage_name: "",
    type: "",
    image: "",
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(MEMBERS_API);
      setMembers(response.data);
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
      image: "",
    });
  };

  const handleAddMember = () => {
    toggleModal();
    setModalTitle("Add Member");
    setFormData({
      type: "regular",
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

  return (
    <MainLayout {...props}>
      <DashboardAdmin totalMembers={members.length} />
      <Container>
        <div className="d-flex justify-content-between">
          <h3>Member List</h3>
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
      </Container>
    </MainLayout>
  );
};

export default MemberList;
