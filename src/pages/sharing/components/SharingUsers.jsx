import axios from "axios";
import { Loading } from "components";
import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { CardBody } from "reactstrap";
import { SHARING_LIVE_DETAIL } from "utils/api/api";
import DetailUser from "./DetailUser";
import { motion } from "framer-motion";

const SharingUsers = ({ sharingUsers }) => {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({});

  const toggleModal = () => {
    setModal(!modal);
  };

  const getSharingUserDetail = (id) => {
    axios.get(SHARING_LIVE_DETAIL(id)).then((res) => {
      setUser(res.data);
      toggleModal();
    });
  };

  return (
    <CardBody className="sharing-wrapper">
      <div className="card-member-container">
        <button className="lineup-btn">
          <FaUsers size={28} className="mr-2" />
          <b>Registered Sharing Users</b>
        </button>

        {sharingUsers.length ? (
          Array.from(
            { length: Math.ceil(sharingUsers.length / 4) },
            (_, rowIndex) => (
              <div key={rowIndex} className="sharing-info-wrapper">
                {sharingUsers
                  .slice(rowIndex * 4, rowIndex * 4 + 4)
                  .map((item, idx) => (
                    <motion.div whileTap={{ scale: 0.9 }}>
                      <div
                        key={idx}
                        className="member-detail"
                        style={{ cursor: "pointer" }}
                        onClick={() => getSharingUserDetail(item._id)}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <img
                            alt="users"
                            width={50}
                            src={
                              item.image ??
                              `https://static.showroom-live.com/image/avatar/${idx + 1
                              }.png?v=97`
                            }
                          />
                          <div
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              backgroundColor:
                                item.status === "paid"
                                  ? "#2dce89"
                                  : item.status === "cancelled"
                                    ? "#DC3545"
                                    : item.status === "registered"
                                      ? "#ECFAFC"
                                      : "gray",
                            }}
                          ></div>
                        </div>
                        <div className="btn-member">
                          <div className="showroom-name">
                            {item?.user_id?.name.length > 7
                              ? item?.user_id.name?.substr(0, 5) + "..."
                              : item?.user_id.name}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            )
          )
        ) : sharingUsers.length === 0 ? (
          <div className="d-flex align-items-center justify-content-center flex-column">
            <IoIosPeople size={60} />
            <h3>No Users</h3>
          </div>
        ) : (
          <Loading size={20} color="white" />
        )}
      </div>
      <DetailUser user={user} isOpen={modal} toggleModal={toggleModal} />
    </CardBody>
  );
};

export default SharingUsers;
