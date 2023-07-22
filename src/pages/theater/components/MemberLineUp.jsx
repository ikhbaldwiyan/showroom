import React from "react";
import { FaUsers } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { Card, CardBody } from "reactstrap";

const MemberLineUp = ({ members }) => {
  return (
    <Card
      style={{
        border: "none",
        borderRadius: "6px",
        height: "100%",
      }}
    >
      <CardBody className="member-wrapper">
        <div className="card-member-container">
          <button className="lineup-btn">
            <FaUsers size={28} className="mr-2" />
            <b>Lineup Members Theater</b>
          </button>
          {members.length ? (
            Array.from(
              { length: Math.ceil(members.length / 4) },
              (_, rowIndex) => (
                <div key={rowIndex} className="member-info-wrapper">
                  {members
                    .slice(rowIndex * 4, rowIndex * 4 + 4)
                    .map((member, idx) => (
                      <div key={idx} className="member-detail">
                        <div className="member-image">
                          <img
                            alt="member"
                            className="member-image"
                            src={member.image}
                          />
                        </div>
                        <div className="btn-member">
                          <div className="member-name">{member.stage_name}</div>
                        </div>
                      </div>
                    ))}
                </div>
              )
            )
          ) : (
            <div className="d-flex align-items-center justify-content-center flex-column">
              <IoIosPeople size={60} />
              <h3>Coming Soon</h3>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default MemberLineUp;
