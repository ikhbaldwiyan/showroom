import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "reactstrap";
import axios from "axios";
import MainLayout from "pages/layout/MainLayout";
import moment from "moment";
import TheaterDetail from "./TheaterDetail";
import { SCHEDULES_API, DETAIL_SCHEDULE, MEMBERS_API } from "utils/api/api";
import { showToast } from "utils/showToast";
import { FaBirthdayCake, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import DashboardAdmin from "pages/admin/dashboard/DashboardAdmin";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

function TheaterList(props) {
  const [schedules, setSchedules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [memberOptions, setMemberOptions] = useState([]);
  const [memberTrainee, setMemberTrainee] = useState([]);
  const [formData, setFormData] = useState({
    showDate: "",
    showTime: "",
    isBirthdayShow: false,
    birthdayMemberName: "",
    setlist: "",
    memberList: [],
    isOnWeekSchedule: false,
  });

  useEffect(() => {
    fetchSchedules();
    fetchMemberOptions();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get(SCHEDULES_API);
      setSchedules(response.data);
    } catch (error) {
      showToast("error", "Error fetching schedule:", error);
      console.error("Error fetching schedules:", error);
    }
  };

  const fetchMemberOptions = async () => {
    const memberResponse = (type) => {
      return axios.get(`${MEMBERS_API}?type=${type}&showAll=true`);
    };

    const regular = await memberResponse("regular");
    const trainee = await memberResponse("trainee");
    setMemberOptions(regular?.data?.members);
    setMemberTrainee(trainee?.data?.members);
  };

  const handleEdit = (schedule) => {
    setModalTitle(`Edit Schedule ${schedule.setlist}`);
    setFormData(schedule);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(DETAIL_SCHEDULE(id));
      showToast("success", "Theater schedule deleted");
      fetchSchedules();
    } catch (error) {
      showToast("error", "Error deleting schedule:", error);
      console.error("Error deleting schedule:", error);
    }
  };

  const editProps = {
    formData,
    showModal,
    memberOptions,
    memberTrainee,
    modalTitle,
    fetchSchedules,
    setShowModal,
    setModalTitle,
    setFormData,
  };

  return (
    <MainLayout {...props}>
      <DashboardAdmin totalTheater={schedules.length} />
      <Container>
        <div className="d-flex justify-content-between">
          <h3>Theater Schedules</h3>
          <Button
            color="primary"
            onClick={() => {
              setModalTitle("Create Schedule");
              setShowModal(true);
            }}
          >
            <FaPlus className="mb-1" /> Add Schedule
          </Button>
        </div>
        <Table className="mt-4" dark>
          <thead>
            <tr style={{ color: "white" }}>
              <th>No</th>
              <th>Show Date</th>
              <th>Setlist</th>
              <th>Show Time</th>
              <th>On Scheduled</th>
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
                <td>
                  {schedule.isOnWeekSchedule ? (
                    <AiFillCheckCircle size={30} color="green" />
                  ) : (
                    <AiFillCloseCircle size={30} color="#dc3545" />
                  )}
                </td>
                <td>
                  {schedule.isBirthdayShow ? (
                    <FaBirthdayCake size={30} color="#ecfafc"  />
                  ) : (
                    <AiFillCloseCircle size={30} color="#dc3545" />
                  )}
                </td>
                <td>
                  <Button color="info" onClick={() => handleEdit(schedule)}>
                    <FaEdit size={18} />
                  </Button>{" "}
                  <Button
                    color="danger"
                    onClick={() => handleDelete(schedule._id)}
                  >
                    <FaTrash size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <TheaterDetail {...editProps} />
      </Container>
    </MainLayout>
  );
}

export default TheaterList;
