import axios from "axios";
import moment from "moment";
import MainLayout from "pages/layout/MainLayout";
import React, { useState } from "react";
import { useEffect } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import {
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  Container,
  Button,
  ModalFooter
} from "reactstrap";
import { ACTIVITY_LOG, ACTIVITY_LOG_DETAIL } from "utils/api/api";
import { showToast } from "utils/showToast";
import DashboardAdmin from "../dashboard/DashboardAdmin";

const ActivityLogList = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [logData, setLogData] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    axios.get(ACTIVITY_LOG).then((res) => {
      setLogData(res.data);
    });
  }, [showConfirmModal]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleRowClick = (log) => {
    setSelectedLog(log);
    toggleModal();
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(ACTIVITY_LOG_DETAIL(id));
      showToast("Success", "Log succes deleted");
      closeConfirmModal()
    } catch (error) {
      console.error("Error deleting log:", error);
    }
  };

  const showConfirmModalForDelete = (data) => {
    setShowConfirmModal(true);
    setSelectedLog(data);
  };

  // Function to close the confirm modal
  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  return (
    <MainLayout {...props}>
      <DashboardAdmin />
      <Container>
        <div className="d-flex justify-content-between mb-4">
          <h3>Activity Log</h3>
        </div>
        <Table dark bordered responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Log Name</th>
              <th>User</th>
              <th>Description</th>
              <th>Time</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {logData?.map((log, idx) => (
              <tr key={log?._id}>
                <td>{idx + 1}</td>
                <td>
                  <b>{log?.log_name}</b>
                </td>
                <td>{log?.user?.name}</td>
                <td>{log?.description}</td>
                <td>{moment(log?.timestamp).format("HH:mm")}</td>
                <td>{moment(log?.timestamp).format("dddd, DD MMM ")}</td>
                <td>
                  <Button
                    className="mr-2"
                    color="info"
                    onClick={() => handleRowClick(log)}
                  >
                    <FaEye />
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => showConfirmModalForDelete(log)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal isOpen={modalOpen} toggle={toggleModal}>
          <ModalHeader
            toggle={toggleModal}
            style={{
              backgroundColor: "#24a2b7",
              color: "white"
            }}
          >
            Log Detail{" "}
            {selectedLog?.log_name}
          </ModalHeader>
          <ModalBody style={{ color: "black" }}>
            {selectedLog && (
              <div>
                <p>
                  <strong>User:</strong> {selectedLog?.user?.name}
                </p>
                <p>
                  <strong>Account ID:</strong> {selectedLog?.user?.user_id}
                </p>
                <p>
                  <strong>Description:</strong> {selectedLog?.description}
                </p>
                <p>
                  <strong>Timestamp:</strong>{" "}
                  {moment(selectedLog?.timestamp).format("dddd, DD MMMM HH:mm ")}
                </p>
              </div>
            )}
          </ModalBody>
        </Modal>
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
            Are you sure you want to delete this log?
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onClick={() => handleDeleteClick(selectedLog._id)}
            >
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
};

export default ActivityLogList;
