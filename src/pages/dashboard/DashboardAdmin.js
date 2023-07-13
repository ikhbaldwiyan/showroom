import MainLayout from "pages/layout/MainLayout";
import React from "react";
import {
  FaGithub,
  FaTheaterMasks,
  FaUserAstronaut,
  FaUserCog,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";

const DashboardAdmin = (props) => {
  const menu = [
    {
      name: "THEATER",
      title: "Schedule",
      total: 4,
      icon: <FaTheaterMasks className="mb-3" size={75} />,
      link: "/theaters",
    },
    {
      name: "Users",
      title: "User",
      total: 48,
      icon: <FaGithub className="mb-3" size={75} />,
      link: "/users",
    },
    {
      name: "MEMBERS",
      title: "Member",
      total: 26,
      icon: <FaUserAstronaut className="mb-3" size={75} />,
      link: "/members",
    },
    {
      name: "ADMIN",
      title: "User",
      total: 3,
      icon: <FaUserCog className="mb-3" size={75} />,
      link: "#",
    },
  ];

  return (
    <Container>
      <div className="dashboard">
        {menu.map((item, idx) => (
          <div key={idx} className="card-admin">
            <div className="menu-admin">
              {item.icon}
              <div>
                <span className="title">{item.name}</span>
                <p className="info">
                  {item.total} {item.title}
                </p>
              </div>
            </div>
            <Link to={item.link}>
              <button className="btn-detail" block>
                Detail
              </button>
            </Link>
          </div>
        ))}
      </div>
    </Container>
  )
};

export default DashboardAdmin;
