import { Loading } from "components";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { CardBody } from "reactstrap";

const SharingUsers = ({ sharingUsers }) => {
  return (
    <CardBody className="member-wrapper">
      <div className="card-member-container">
        <button className="lineup-btn">
          <FaUsers size={28} className="mr-2" />
          <b>Registered Sharing Users</b>
        </button>

        {sharingUsers.length ? (
          Array.from(
            { length: Math.ceil(sharingUsers.length / 4) },
            (_, rowIndex) => (
              <div key={rowIndex} className="member-info-wrapper">
                {sharingUsers
                  .slice(rowIndex * 4, rowIndex * 4 + 4)
                  .map((item, idx) => (
                    <div key={idx} className="member-detail">
                      <div className="member-image">
                        <img
                          alt="member"
                          width={50}
                          src={
                            item.image ??
                            `https://static.showroom-live.com/image/avatar/${
                              idx + 1
                            }.png?v=97`
                          }
                        />
                      </div>
                      <div className="btn-member">
                        <div className="member-name">{item.user_id.name}</div>
                      </div>
                    </div>
                  ))}
              </div>
            )
          )
        ) : (
          <Loading size={20} color="white" />
        )}
      </div>
    </CardBody>
  );
};

export default SharingUsers;
