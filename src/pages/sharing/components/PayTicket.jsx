import axios from "axios";
import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import {
  FaCalendar,
  FaCalendarAlt,
  FaClipboardList,
  FaDiscord,
  FaMusic,
  FaRegClock,
  FaTheaterMasks,
  FaUser,
} from "react-icons/fa";
import { RiSlideshow3Fill } from "react-icons/ri";
import { Button } from "reactstrap";
import { SHARING_LIVE_DETAIL } from "utils/api/api";
import { getSession } from "utils/getSession";

const PayTicket = ({ sharingUsers, orderStatus, theater }) => {
  const [user, setUser] = useState({});
  const [idSharing, setIdSharing] = useState("");

  useEffect(() => {
    sharingUsers.map((item) => {
      if (item.user_id._id === getSession()?.userProfile?._id) {
        setIdSharing(item._id);
      }
    });

    idSharing &&
      axios.get(SHARING_LIVE_DETAIL(idSharing)).then((res) => {
        setUser(res.data);
      });
  }, [idSharing]);

  return (
    <div>
      <div className="row">
        <div className="col-12">
          {orderStatus === "paid" ? (
            <p>
              <b>Yeay Pembayaran berhasil</b>, silahkan tunggu hingga show premium live theater sudah di mulai,
              bisa juga cek live notif BOT di group discord
            </p>
          ) : (
            <p>
              Berhasil mendaftar sharing live silahkan kontak admin di server
              discord untuk info pembayaran dan kirimkan order id dibawah
            </p>
          )}
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mb-2">
          <div className="d-flex">
            <FaClipboardList className="mr-1" size={22} />
            <h5>
              ORDER ID: <b>(#{user.order_id})</b>
            </h5>
          </div>
        </div>
        <div className="col-md-6">
          <p className="d-flex align-items-center">
            <FaMusic size={16} className="mr-1" /> <b>Setlist</b>
          </p>
          <div className="d-flex align-items-center">
            <img
              style={{
                maxHeight: "100px",
                objectFit: "cover",
              }}
              width={200}
              className="mr-2 mb-2"
              src={theater?.setlist?.image}
              alt=""
            />
          </div>
        </div>
        <div className="col-md-6">
          <p className="d-flex align-items-center">
            <RiSlideshow3Fill size={20} className="mr-1" /> <b>Show Theater</b>
          </p>
          <div
            style={{
              flexDirection: "none",
              height: "auto",
              marginBottom: "6px",
            }}
          >
            <div className="d-flex flex-column">
              <div className="d-flex">
                <FaTheaterMasks
                  color="#18a2b8"
                  className="mb-2 mr-1"
                  size={18}
                />
                <h6 className="text-info">{theater?.setlist?.name}</h6>
              </div>
              <div className="d-flex align-items-center mt-2">
                <FaCalendarAlt className="mr-1" size={18} />
                {moment(theater?.showDate).format("DD MMM YYYY")}
              </div>
              <div className="d-flex mt-2 align-items-center">
                <FaRegClock className="mr-1" size={18} />
                {theater?.showTime} WIB
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <hr />
        </div>
        <div className="col-md-6">
          <p className="d-flex align-items-center">
            <FaCalendar className="mr-1" />
            <b>Register Date</b>
          </p>
          <p style={{ fontWeight: "600", color: "#6B747B" }}>
            {moment(user?.created_at).format("dddd, DD MMMM HH:mm ")}
          </p>
        </div>
        <div className="col-md-6">
          <p className="d-flex align-items-center">
            <AiFillInfoCircle size={20} className="mr-1" /> <b>Status</b>
          </p>
          <Button
            style={{
              backgroundColor: user.status === "registered" && "#6C757D",
              border: "none",
            }}
            color={
              user.status === "paid"
                ? "success"
                : user.status === "cancelled"
                ? "danger"
                : "info"
            }
          >
            {user?.status?.charAt(0)?.toUpperCase() + user?.status?.slice(1)}
          </Button>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <p className="d-flex align-items-center">
            <FaUser size={16} className="mr-1" /> <b>Showroom Account</b>
          </p>
          <div
            className="ticket-sharing"
            style={{
              flexDirection: "none",
              height: "auto",
              marginBottom: "6px",
            }}
          >
            <div className="d-flex align-items-center">
              <img width={60} className="mr-2" src={user.image} alt="" />
              <h4 style={{ color: "#ecfafc" }}>{user?.user_id?.name}</h4>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <p className="d-flex align-items-center">
            <FaDiscord size={20} className="mr-1" /> <b>Discord Account</b>
          </p>
          <div
            className="discord-account"
            style={{
              flexDirection: "none",
              height: "auto",
              marginBottom: "4px",
            }}
          >
            <div className="d-flex align-items-center">
              <img
                width={60}
                className="rounded mr-2"
                src={
                  user.discord_image ??
                  "https://static.vecteezy.com/system/resources/previews/006/892/625/original/discord-logo-icon-editorial-free-vector.jpg"
                }
                alt=""
              />
              <h4 style={{ color: "#ecfafc" }}>{user?.discord_name}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayTicket;
