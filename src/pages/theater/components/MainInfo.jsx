import React from "react";
import moment from "moment";
import { Loading } from "components";
import {
  FaBirthdayCake,
  FaCalendarAlt,
  FaMoneyCheckAlt,
  FaRegClock,
  FaTheaterMasks,
} from "react-icons/fa";
import { IoSchoolSharp } from "react-icons/io5";
import SharingLive from "./SharingLive";

const MainInfo = ({ theater, sharingUsers, setIsRegister, isSharingLive }) => {
  return (
    <div className="theater-container">
      <div className="setlist-container">
        <div className="menu-setlist mt-1">
          <FaTheaterMasks className="mb-2" color="#ECFAFC" size={65} />
          <div className="mt-1">
            <span className="setlist-name">
              {theater?.setlist?.name ?? <Loading size={20} color="#ECFAFC" />}
            </span>
            <p className="setlist-subname mt-2">
              {theater?.setlist?.originalName}
            </p>
          </div>
        </div>
      </div>
      <div className="theater-info">
        <div className="info-container">
          <div className="menu-setlist mt-1">
            <FaCalendarAlt className="mb-2" color="#ECFAFC" size={35} />
            <div className="mt-1">
              <span className="info-theater">Show Date</span>
              <p className="theater-time mt-1">
                {moment(theater?.showDate).format("DD MMM YYYY")}
              </p>
            </div>
          </div>
        </div>
        <div className="info-container" style={{ backgroundColor: "#865CD6" }}>
          <div className="menu-setlist mt-1">
            <FaRegClock className="mb-2" color="#ECFAFC" size={35} />
            <div className="mt-1">
              <span className="info-theater">Show Time</span>
              <p className="theater-time mt-1">{theater?.showTime + " WIB"}</p>
            </div>
          </div>
        </div>
      </div>
      {theater?.isBirthdayShow && (
        <div className="birthday-btn">
          <div className="menu-ticket">
            <FaBirthdayCake className="mb-2" color="#ECFAFC" size={70} />
            <div
              className="d-flex flex-column justify-content-center text-center"
              style={{
                backgroundColor: "#ECFAFC",
                borderRadius: "6px",
                color: "#24A2B7",
                width: "140px",
                height: "60px",
              }}
            >
              <span
                className="setlist-subname mt-3"
                style={{ color: "#24A2B7", fontSize: "20px" }}
              >
                <b>BIRTHDAY</b>
              </span>
              <p
                className="setlist-subname mt-1"
                style={{
                  color: "#24A2B7",
                  borderRadius: "6px",
                  fontSize: "20px",
                  textTransform: "uppercase",
                }}
              >
                <b>
                  {theater?.birthdayMember?.stage_name ??
                    theater?.birthdayMemberName}
                </b>
              </p>
            </div>
            <img
              className="member-image"
              src={theater?.birthdayMember?.image}
              alt=""
            />
          </div>
        </div>
      )}
      {theater?.isGraduationShow && (
        <div className="birthday-btn">
          <div className="menu-ticket">
            <IoSchoolSharp className="mb-2" color="#ECFAFC" size={70} />
            <div
              className="d-flex flex-column justify-content-center text-center"
              style={{
                backgroundColor: "#ECFAFC",
                borderRadius: "6px",
                color: "#24A2B7",
                width: "150px",
                height: "70px",
              }}
            >
              <span
                className="setlist-subname mt-3"
                style={{ color: "#24A2B7", fontSize: "20px" }}
              >
                <b>GRADUATION</b>
              </span>
              <p
                className="setlist-subname mt-1"
                style={{
                  color: "#24A2B7",
                  borderRadius: "6px",
                  fontSize: "20px",
                  textTransform: "uppercase",
                }}
              >
                <b>{theater?.graduateMember?.stage_name}</b>
              </p>
            </div>
            <img
              className="member-image"
              src={theater?.graduateMember?.image}
              alt=""
            />
          </div>
        </div>
      )}
      {!isSharingLive && (
        <div className="ticket-info">
          <div className="menu-ticket">
            <FaMoneyCheckAlt className="mb-2" color="#ECFAFC" size={80} />
            <div className="d-flex flex-column justify-content-center text-center">
              <div className="ticket-name">SHOWROOM</div>
              <p className="setlist-subname mt-2">
                <b>385 JPY</b>
              </p>
            </div>
            <a href={theater?.ticketShowroom} target="_blank" rel="noreferrer">
              <button className="buy d-flex text-align-center justify-content-center align-items-center">
                Buy Ticket
              </button>
            </a>
          </div>
        </div>
      )}

      <SharingLive
        sharingUsers={sharingUsers}
        theater={theater}
        setIsRegister={setIsRegister}
      />

      <div className="ticket-info">
        <div className="menu-ticket">
          <FaMoneyCheckAlt className="mb-2" color="#ECFAFC" size={80} />
          <div className="d-flex flex-column justify-content-center text-center">
            <div className="ticket-name">THEATER</div>
            <p className="setlist-subname mt-2">
              <b>RP. 200.000</b>
            </p>
          </div>
          <a href={theater?.ticketTheater} target="_blank" rel="noreferrer">
            <button className="buy d-flex text-align-center justify-content-center align-items-center">
              Buy Ticket
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainInfo;
