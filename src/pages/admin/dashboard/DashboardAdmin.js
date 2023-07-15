import axios from "axios";
import { useEffect } from "react";
import {
  FaDiscord,
  FaGithub,
  FaTheaterMasks,
  FaUserAstronaut,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Container } from "reactstrap";
import { DISCORD_THEATER_NOTIF } from "utils/api/api";
import { isAdmin } from "utils/permissions/admin";
import { showToast } from "utils/showToast";

const DashboardAdmin = ({ totalTheater, totalMembers, totalUsers }) => {
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
      link: totalTheater
    },
    {
      name: "USERS",
      title: "User",
      total: totalUsers,
      icon: <FaGithub className="mb-3" size={75} />,
      link: "/users",
    },
    {
      name: "MEMBERS",
      title: "Member",
      total: totalMembers,
      icon: <FaUserAstronaut className="mb-3" size={75} />,
      link: "/members",
    },
  ];

  const router = useHistory();

  useEffect(() => {
    if (!isAdmin()) {
      showToast("error", "You don't have permission to access this page");
      router.push("/");
    }
  }, [router]);

  const handleRunBot = () => {
    axios
      .get(DISCORD_THEATER_NOTIF)
      .then((res) => {
        showToast("success", res.data.message);
      })
      .catch((err) => {
        showToast("error", "Failed send discord bot");
        console.log(err);
      });
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
              <button onClick={handleRunBot} className="btn-detail" block>
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
      </div>
    </Container>
  );
};

export default DashboardAdmin;
