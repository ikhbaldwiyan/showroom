import axios from "axios";
import React, { useEffect, useState } from 'react'
import { FaUserCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import { Button } from "reactstrap";
import { GET_AVATAR, UPDATE_AVATAR } from "utils/api/api";
import Loading from "./Loading";

const EditAvatar = ({ session, isEditAvatar, setIsEditAvatar }) => {
  const [avatar, setAvatar] = useState([]);
  const [totalAvatar, setTotalAvatar] = useState(0);
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  const [selectedAvatarId, setSelectedAvatarId] = useState("");
  const [currentAvatar, setCurrentAvatar] = useState("https://static.showroom-live.com/image/avatar/1.png?v=92");
  const [loadingPage, setLoadingPage] = useState(false);
  const totalPages = Math.ceil(totalAvatar / limit);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const offset = (page - 1) * limit;
        const response = await axios.post(GET_AVATAR, {
          csrf_token: session.csrf_token,
          cookies_id: session.cookie_login_id,
          limit,
          offset
        });
        setAvatar(response.data.user_avatars)
        setTotalAvatar(response.data.avatar_num)
        if (page === 1) {
          setCurrentAvatar(response.data.current_user_avatar.image_url)
          setSelectedAvatarId(response.data.current_user_avatar.avatar_id)
        }
      } catch (error) {
        toast.error(error.message, {
          theme: "colored"
        });
      }
    }
    fetchAvatar();
    setLoadingPage(false)
  }, [isEditAvatar, page]);

  const handleAvatarSelect = (event, avatarId, avatarImage) => {
    event.preventDefault();
    setSelectedAvatarId(avatarId);
    setCurrentAvatar(avatarImage);
  };

  const renderAvatarRows = () => {
    const rows = [];
    for (let i = 0; i < avatar.length; i += 4) {
      const row = avatar.slice(i, i + 4);
      rows.push(
        <div className="d-flex overflow-auto" key={i}>
          {row.map((item) => (
            <div className="py-2" key={item.avatar_id}>
              <Button
                style={{ backgroundColor: selectedAvatarId === item.avatar_id ? '#24A2B7' : 'silver' }}
                className="mx-1 border-0 p-1"
                onClick={(event) => handleAvatarSelect(event, item.avatar_id, item.image_url)}
              >
                <img src={item.image_url} width={50} alt={item.avatar_id} />
              </Button>
            </div>
          ))}
        </div>
      );
    }
    return rows;
  };

  const updateAvatar = async (e) => {
    e.preventDefault();
    setLoadingPage(true)
    try {
      const response = await axios.post(UPDATE_AVATAR, {
        csrf_token: session.csrf_token,
        cookies_id: session.cookie_login_id,
        avatar_id: selectedAvatarId,
      });
      setIsEditAvatar(false)
      toast.info(response.data.message, {
        theme: "colored",
        autoClose: 1200,
        icon: <FaUserCheck size={30} />
      });
      const sessionProfile = JSON.parse(localStorage.getItem('profile'));
      sessionProfile.avatar_url = currentAvatar;
      localStorage.setItem('profile', JSON.stringify(sessionProfile));
    } catch (error) {
      toast.error(error.message, {
        theme: "colored"
      });
    }
    setLoadingPage(false)
  }

  const handlePrevPage = () => {
    setPage(Math.max(1, page - 1));
  };

  const handleNextPage = () => {
    setPage(Math.min(totalPages, page + 1));
  };

  const pickRandomAvatar = (e) => {
    e.preventDefault();
    const randomIndex = Math.floor(Math.random() * 12);
    const randomPage = Math.floor(Math.random() * totalPages);
    const randomAvatar = avatar[randomIndex];
    setPage(randomPage);
    setSelectedAvatarId(randomAvatar?.avatar_id);
    setCurrentAvatar(randomAvatar?.image_url);
  }

  return (
    <div className="card-body p-2">
      <div className="my-3">
        <form>
          <div className="row ">
            <div className="col-12">
              <div className="text-center">
                <h4>Selected Avatar</h4>
                <input
                  type="image"
                  className="mt-2"
                  src={avatar.find((item) => item.avatar_id === selectedAvatarId)?.image_url ?? currentAvatar}
                  width={100} alt="Selected Avatar"
                />
              </div>
            </div>
            <div className="col-12 py-2">
              <Button
                onClick={updateAvatar}
                block
                type="submit"
                style={{
                  backgroundColor: "#008080",
                  border: "none"
                }}
                disabled={loadingPage}
              >
                {loadingPage ? <Loading color="white" size="6" /> : "Update Avatar"}
              </Button>
              <Button
                onClick={pickRandomAvatar}
                outline
                block
                type="submit"
                color="info"
                disabled={loadingPage}
              >
                {loadingPage ? <Loading color="silver" size="6" /> : "Pick Random Avatar"}
              </Button>
            </div>
          </div>
        </form>
      </div>
      <hr className="mt-0 mb-4" />

      <h6 className="text-muted">Unlocked Avatar: {totalAvatar}</h6>
      {renderAvatarRows()}
      <div className="d-flex justify-content-between mt-2">
        <Button color="info" outline onClick={handlePrevPage} disabled={page === 1}>
          Prev
        </Button>
        <b className="text-muted py-2"> {page} / {totalPages}</b>
        <Button color="info" outline onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default EditAvatar