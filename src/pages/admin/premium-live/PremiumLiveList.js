import React, { useState, useEffect } from "react";
import { Table, Button, Container } from "reactstrap";
import axios from "axios";
import moment from "moment";
import MainLayout from "pages/layout/MainLayout";
import { PREMIUM_LIVE_LIST } from "utils/api/api";
import PremiumLiveModal from "./PremiumLiveModal";
import DashboardAdmin from "../dashboard/DashboardAdmin";
import { FaEdit, FaPlus } from "react-icons/fa";

const PremiumLiveList = (props) => {
  const [premiumLives, setPremiumLives] = useState([]);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState();

  useEffect(() => {
    const fetchPremiumLives = async () => {
      try {
        const response = await axios.get(PREMIUM_LIVE_LIST);
        setPremiumLives(response.data.reverse());
      } catch (error) {
        console.error(error);
      }
    };

    fetchPremiumLives();
  }, [modal]);

  const handleEdit = (id) => {
    setModal(!modal);
    setId(id);
  };

  return (
    <MainLayout {...props}>
      <DashboardAdmin />
      <Container>
        <div className="d-flex justify-content-between mb-3">
          <h3>Premium Live List</h3>
          <Button
            color="primary"
            onClick={() => {
              setModal(!modal);
            }}
          >
            <FaPlus className="mb-1" /> Add Schedule
          </Button>
        </div>
        <Table dark responsive>
          <thead>
            <tr>
              <th>Live Date</th>
              <th>Image</th>
              <th>Web Socket ID</th>
              <th>Setlist</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {premiumLives?.map((premiumLive) => (
              <tr key={premiumLive._id}>
                <td>{moment(premiumLive.liveDate).format("DD MMMM")}</td>
                <td>
                  <img
                    src={premiumLive?.setlist?.image}
                    width="80"
                    alt="img"
                    style={{
                      maxHeight: "70px",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />{" "}
                </td>
                <td>{premiumLive.webSocketId}</td>
                <td>{premiumLive.setlist.name}</td>
                <td>
                  <Button
                    color="primary"
                    onClick={() => handleEdit(premiumLive._id)}
                  >
                    <FaEdit />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <PremiumLiveModal
          isOpen={modal}
          toggleModal={() => setModal(!modal)}
          premiumLiveId={id}
        />
      </Container>
    </MainLayout>
  );
};

export default PremiumLiveList;
