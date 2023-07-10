import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
} from "reactstrap";
import axios from "axios";
import MainLayout from "pages/layout/MainLayout";
import moment from "moment";
import EditSchedule from "./EditSchedule";

function AdminSchedules(props) {
  const [schedules, setSchedules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [memberOptions, setMemberOptions] = useState();
  const [formData, setFormData] = useState({
    showDate: "",
    showTime: "",
    isBirthdayShow: false,
    setlist: "",
    memberList: [],
  });

  useEffect(() => {
    fetchSchedules();
    fetchMemberOptions();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get("http://localhost:8000/schedules");
      setSchedules(response.data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  const fetchMemberOptions = async () => {
    const memberResponse = await axios.get("http://localhost:8000/member");
    const fetchedMembers = memberResponse.data;
    setMemberOptions(fetchedMembers);
  };


  const handleEdit = (schedule) => {
    setModalTitle(`Edit Schedule ${schedule.setlist}`);
    setFormData(schedule);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/schedules/${id}`);
      fetchSchedules();
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  const editProps = {
    formData,
    showModal,
    memberOptions,
    modalTitle,
    fetchSchedules,
    setShowModal,
    setModalTitle,
    setFormData
  }

  return (
    <MainLayout {...props}>
      <Container>
        <div className="d-flex justify-content-between">
          <h3>Theater Schedules Admin</h3>
          <Button
            color="primary"
            onClick={() => {
              setModalTitle("Create Schedule");
              setShowModal(true);
            }}
          >
            Create Schedule
          </Button>
        </div>
        <Table className="mt-4" dark>
          <thead>
            <tr style={{ color: "white" }}>
              <th>No</th>
              <th>Show Date</th>
              <th>Setlist</th>
              <th>Show Time</th>
              <th>Birthday Show</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody style={{ color: "white" }}>
            {schedules.map((schedule, idx) => (
              <tr key={schedule._id}>
                <td>{idx + 1}</td>
                <td>{moment(schedule.showDate).format("DD MMM")}</td>
                <td>{schedule.setlist}</td>
                <td>{schedule.showTime}</td>
                <td>{schedule.isBirthdayShow ? "Yes" : "No"}</td>
                <td>
                  <Button
                    color="info"
                    size="sm"
                    onClick={() => handleEdit(schedule)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => handleDelete(schedule._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <EditSchedule {...editProps} />
      </Container>
    </MainLayout>
  );
}

export default AdminSchedules;
