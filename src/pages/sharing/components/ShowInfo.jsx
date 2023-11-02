import { Loading } from "components";
import moment from "moment";
import React from "react";
import { isMobile } from "react-device-detect";
import { FaCalendarAlt, FaRegClock, FaTheaterMasks, FaUsers } from "react-icons/fa";
import { Card, CardBody, CardHeader, CardText } from "reactstrap";

const ShowInfo = ({ theater, sharingUsers }) => {
  return (
    <Card
      className="mt-1 mb-3"
      style={{
        border: "none",
        borderRadius: "6px",
      }}
    >
      <CardHeader
        style={{
          backgroundColor: "#008080",
          padding: "10px",
          borderTopRightRadius: "6px",
          borderTopLeftRadius: "6px",
        }}
      >
        <div className="d-flex">
          <FaTheaterMasks className="mb-2 mr-2" color="#ECFAFC" size={35} />
          <div className="mt-1">
            <h4>
              {theater?.setlist?.originalName ?? (
                <Loading size={20} color="#ECFAFC" />
              )}
            </h4>
          </div>
        </div>
      </CardHeader>
      <img
        style={{
          maxHeight: "220px",
          objectFit: "cover",
        }}
        alt="Banner"
        src={
          theater?.setlist?.image ??
          "https://static.showroom-live.com/image/room/cover/73f495d564945090f4af7338a42ce09ffa12d35fbfa8ce35c856220bcf96c5f3_m.png?v=1683304746"
        }
      />
      <CardBody
        style={{
          backgroundColor: "#008080",
          borderBottomRightRadius: "6px",
          borderBottomLeftRadius: "6px",
          padding: "15px",
        }}
      >
        <CardText style={{ fontWeight: "600" }}>
          <div className="d-flex">
            <div className="menu-setlist mt-1 mr-4">
              <FaCalendarAlt className="mb-2" color="#ECFAFC" size={35} />
              <div className="mt-1">
                <span className="info-theater">Show Date</span>
                <p className="theater-time mt-1">
                  {moment(theater?.showDate).format("DD MMM YYYY")}
                </p>
              </div>
            </div>
            <div className="menu-setlist mt-1">
              <FaRegClock className="mb-2" color="#ECFAFC" size={35} />
              <div className="mt-1">
                <span className="info-theater">Show Time</span>
                <p className="theater-time mt-1">
                  {theater?.showTime + " WIB"}
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div className="menu-setlist mt-1 mr-4">
              <FaUsers className="mb-2" color="#ECFAFC" size={50} />
              <div className="mt-1">
                <span className="info-theater">Total Sharing User Registered</span>
                <p className="mt-1">
                  {sharingUsers.length} Users
                  <span className="ml-3">
                    {sharingUsers?.slice(0, isMobile ? 4 : 5).map((item, idx) => (
                      <img key={idx} width={30} src={item.image} alt={item.discord_name} />
                    ))}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </CardText>
      </CardBody>
    </Card>
  );
};

export default ShowInfo;
