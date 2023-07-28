import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import axios from "axios";
import MainLayout from "pages/layout/MainLayout";
import moment from "moment";
import TheaterDetail from "./TheaterDetail";
import { SCHEDULES_API, DETAIL_SCHEDULE, MEMBERS_API } from "utils/api/api";
import { showToast } from "utils/showToast";
import { FaBirthdayCake, FaEdit, FaEye, FaPlus, FaTrash } from "react-icons/fa";
import DashboardAdmin from "pages/admin/dashboard/DashboardAdmin";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { slugify } from "utils/slugify";
import { IoSchoolSharp } from "react-icons/io5";

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
    isComingSoon: false,
    isGraduationShow: false,
    graduationMember: {},
    setlist: "",
    memberList: [],
    isOnWeekSchedule: false,
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deletingScheduleId, setDeletingScheduleId] = useState(null);

  useEffect(() => {
    fetchSchedules();
    fetchMemberOptions();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get(SCHEDULES_API);
      setSchedules(response.data.reverse());
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
    setModalTitle(`Edit Schedule ${schedule.setlist.name}`);
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

  // Function to show the confirm modal for delete
  const showConfirmModalForDelete = (scheduleId) => {
    setDeletingScheduleId(scheduleId);
    setShowConfirmModal(true);
  };

  // Function to handle the delete action
  const handleDeleteConfirm = async () => {
    if (deletingScheduleId) {
      await handleDelete(deletingScheduleId);
      setShowConfirmModal(false);
      setDeletingScheduleId(null);
    }
  };

  // Function to close the confirm modal
  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setDeletingScheduleId(null);
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
        <div style={{ overflowX: "scroll", maxWidth: "100%" }}>
          <Table className="mt-4" dark>
            <thead>
              <tr style={{ color: "white" }}>
                <th>No</th>
                <th>Date</th>
                <th>Image</th>
                <th>Setlist</th>
                <th>Time</th>
                <th>Showing</th>
                <th>Special Show</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody style={{ color: "white" }}>
              {schedules.map((schedule, idx) => (
                <tr key={schedule._id}>
                  <td>{idx + 1}</td>
                  <td>{moment(schedule.showDate).format("DD MMMM")}</td>
                  <td>
                    <img
                      src={schedule?.setlist?.image}
                      width="100"
                      alt="img"
                      style={{
                        maxHeight: "70px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />{" "}
                  </td>
                  <td>{schedule.setlist.name}</td>
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
                      <FaBirthdayCake size={30} color="#ecfafc" />
                    ) : schedule.isGraduationShow ? (
                      <IoSchoolSharp size={30} color="#8660d3" />
                    ) : (
                      <AiFillCloseCircle size={30} color="#dc3545" />
                    )}
                  </td>
                  <td>
                    <div className="d-flex">
                      <a
                        href={`/theater/${slugify(schedule?.setlist?.name)}/${
                          schedule?._id
                        }`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Button
                          className="mr-1"
                          style={{ backgroundColor: "#0069d9", border: "none" }}
                        >
                          <FaEye size={18} />
                        </Button>{" "}
                      </a>
                      <Button
                        className="mr-1"
                        color="info"
                        onClick={() => handleEdit(schedule)}
                      >
                        <FaEdit size={18} />
                      </Button>{" "}
                      <Button
                        className="mr-1"
                        color="danger"
                        onClick={() => showConfirmModalForDelete(schedule._id)}
                      >
                        <FaTrash size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <TheaterDetail {...editProps} />
        {/* Confirm Modal */}
        <Modal isOpen={showConfirmModal} toggle={closeConfirmModal}>
          <ModalHeader
            toggle={closeConfirmModal}
            className="text-light"
            style={{ backgroundColor: "#DC3545" }}
          >
            Confirm Delete
          </ModalHeader>
          <ModalBody className="text-dark my-2">
            Are you sure you want to delete this schedule?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handleDeleteConfirm}>
              Yes
            </Button>
            <Button color="secondary" onClick={closeConfirmModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </MainLayout>
  );
}

export default TheaterList;
