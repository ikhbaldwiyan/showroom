import { useEffect } from "react";
import {
  FaGithub,
  FaTheaterMasks,
  FaUserAstronaut,
  FaUserCog,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Container } from "reactstrap";
import { isAdmin } from "utils/permissions/admin";
import { showToast } from "utils/showToast";

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

  const router = useHistory();

  useEffect(() => {
    if (!isAdmin()) {
      showToast("error", "You don't have permission to access this page")
      router.push("/");
    }
  }, [router]);

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
