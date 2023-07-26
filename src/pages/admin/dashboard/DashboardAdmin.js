import { useState, useEffect } from "react";
import {
  FaDiscord,
  FaGithub,
  FaLaptopCode,
  FaTheaterMasks,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Container } from "reactstrap";
import { isAdmin } from "utils/permissions/admin";
import { showToast } from "utils/showToast";
import BotModal from "./BotModal";

const DashboardAdmin = ({ totalTheater, totalMembers, totalUsers }) => {
  const [botModal, setBotModal] = useState(false);
  const menu = [
    {
      name: "THEATER",
      title: "Schedule",
      total: totalTheater,
      icon: <FaTheaterMasks className="mb-3" size={75} />,
      link: "/theaters",
    },
    {
      name: "BOT",
      title: "Theater",
      icon: <FaDiscord className="mb-3" size={75} />,
      link: totalTheater,
    },
    {
      name: "USERS",
      title: "User",
      total: totalUsers,
      icon: <FaGithub className="mb-3" size={75} />,
      link: "/users",
    },
    {
      name: "LIVE",
      title: "Settings",
      total: totalMembers,
      icon: <FaLaptopCode className="mb-3" size={75} />,
      link: "/premium-live",
    },
  ];

  const router = useHistory();

  useEffect(() => {
    if (!isAdmin()) {
      showToast("error", "You don't have permission to access this page");
      router.push("/");
    }
  }, [router]);

  const toggleModal = () => {
    setBotModal(!botModal);
  };

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
            {item.name === "BOT" ? (
              <button onClick={toggleModal} className="btn-detail" block>
                Run Bot
              </button>
            ) : (
              <Link to={item.link}>
                <button className="btn-detail" block>
                  Detail
                </button>
              </Link>
            )}
          </div>
        ))}
        <BotModal
          modal={botModal}
          modalTitle="Discord Bot List"
          toggleModal={toggleModal}
        />
      </div>
    </Container>
  );
};

export default DashboardAdmin;
