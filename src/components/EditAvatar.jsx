import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { Button } from "reactstrap";
import { GET_AVATAR, UPDATE_AVATAR } from "utils/api/api";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { RiUserSettingsFill } from "react-icons/ri";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { IoIosUnlock } from "react-icons/io";
import Loading from "./Loading";
import { AiOutlineHistory } from "react-icons/ai";
import SkeletonBox from "parts/skeleton/SkeletonBox";

const EditAvatar = ({
  session,
  isEditAvatar,
  setIsEditAvatar,
  profile,
  setProfile,
}) => {
  const [avatar, setAvatar] = useState([]);
  const [totalAvatar, setTotalAvatar] = useState(0);
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  const [selectedAvatarId, setSelectedAvatarId] = useState("");
  const [currentAvatar, setCurrentAvatar] = useState(profile.avatar_url);
  const [loadingPage, setLoadingPage] = useState(false);
  const [type, setType] = useState("all");
  const [title, setTitle] = useState("Unlocked");
  const [avatarLoading, setAvatarLoading] = useState("");
  const [icon, setIcon] = useState(<IoIosUnlock size={18} className="mb-1" />);
  const [isRandom, setIsRandom] = useState(false);
  const totalPages = Math.ceil(totalAvatar / limit);

  useEffect(() => {
    const fetchAvatar = async () => {
      const offset = (page - 1) * limit
      
      try {
        const response = await axios.post(GET_AVATAR, {
          csrf_token: session.csrf_token,
          cookies_id: session.cookie_login_id,
          limit,
          offset,
          type,
        });
        setAvatarLoading(false);

        const { current_user_avatar, user_avatars, avatar_num } = response.data;
        setAvatar(user_avatars);
        setTotalAvatar(avatar_num);

        if (page === 1) {
          setCurrentAvatar(current_user_avatar.image_url);
          setSelectedAvatarId(current_user_avatar.avatar_id);
        }
      } catch (error) {
        toast.error("Avatar failed to load please try again");
      }
    };
    fetchAvatar();
    setLoadingPage(false);

    if (type === "all") {
      setTitle("Unlocked");
      setIcon(<IoIosUnlock size={18} className="mb-1" />);
    } else if (type === "fav") {
      setAvatarLoading(true);
      setTitle("Favorite");
      setIcon(<FaStar className="mb-1" />);
    } else if (type === "recent_used") {
      setAvatarLoading(true);
      setTitle("History");
      setIcon(<AiOutlineHistory size={19} className="mb-1" />);
    }
  }, [isEditAvatar, page, type]);

  const handleAvatarSelect = (event, avatarId, avatarImage) => {
    event.preventDefault();
    setSelectedAvatarId(avatarId);
    setCurrentAvatar(avatarImage);
    setIsRandom(false);
  };

  const renderAvatarRows = () => {
    const rows = [];
    for (let i = 0; i < avatar.length; i += 4) {
      const row = avatar.slice(i, i + 4);
      rows.push(
        <div className="d-flex overflow-auto" key={i}>
          {row.map((item) => (
            <div className="py-1" key={item.avatar_id}>
              <Button
                style={{
                  background:
                    selectedAvatarId !== item.avatar_id
                      ? "linear-gradient(to bottom, #A4ABAE, #282C34)"
                      : "linear-gradient(to bottom, #24a2b7, #282C34)",
                }}
                className="mr-1 border-0 p-1"
                onClick={(event) =>
                  handleAvatarSelect(event, item.avatar_id, item.image_url)
                }
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

  const loadingAvatar = () => {
    const rows = [];
    for (let i = 0; i < 12; i += 4) {
      rows.push(
        <div className="d-flex overflow-auto" key={i}>
          <SkeletonBox />
        </div>
      );
    }
    return rows;
  };

  const updateAvatar = async (e) => {
    e.preventDefault();
    setLoadingPage(true);
    try {
      const response = await axios.post(UPDATE_AVATAR, {
        csrf_token: session.csrf_token,
        cookies_id: session.cookie_login_id,
        avatar_id: selectedAvatarId,
      });
      setIsEditAvatar(false);
      toast.info(response.data.message, {
        theme: "colored",
        autoClose: 1200,
        icon: (
          <img
            src={currentAvatar}
            className="rounded-circle"
            alt="avatar"
            width={25}
          />
        ),
      });
      const sessionProfile = JSON.parse(localStorage.getItem("profile"));
      sessionProfile.avatar_url = currentAvatar;
      localStorage.setItem("profile", JSON.stringify(sessionProfile));
      setProfile(profile);
    } catch (error) {
      toast.error(error.message, {
        theme: "colored",
      });
    }
    setLoadingPage(false);
  };

  const handlePrevPage = () => {
    setAvatarLoading(true);
    setPage(Math.max(1, page - 1));
  };

  const handleNextPage = () => {
    setAvatarLoading(true);
    setPage(Math.min(totalPages, page + 1));
  };

  const pickRandomAvatar = (e) => {
    e.preventDefault();
    setAvatarLoading(true);
    setIsRandom(true);
    const randomIndex = Math.floor(Math.random() * 12);
    const randomPage = Math.floor(Math.random() * totalPages);
    const randomAvatar = avatar[randomIndex];
    setPage(randomPage);
    setSelectedAvatarId(randomAvatar?.avatar_id ?? 1);
    setCurrentAvatar(randomAvatar?.image_url);
  };

  return (
    <div className="card-body p-2">
      <div className="my-3">
        <form>
          <div className="row ">
            <div className="col-12">
              <div className="text-center">
                <h4>{isRandom ? "Random" : "Selected"} Avatar</h4>
                <img
                  className="mt-2"
                  src={
                    avatar.find((item) => item.avatar_id === selectedAvatarId)
                      ?.image_url ?? currentAvatar
                  }
                  width={100}
                  alt="Selected Avatar"
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
                  border: "none",
                }}
                disabled={loadingPage}
              >
                <RiUserSettingsFill size={18} className="mx-1 mb-1" />
                {loadingPage ? (
                  <Loading color="white" size="6" />
                ) : (
                  "Update Avatar"
                )}
              </Button>
              <Button
                onClick={pickRandomAvatar}
                outline
                block
                type="submit"
                color="info"
                disabled={loadingPage}
              >
                <GiPerspectiveDiceSixFacesRandom
                  className="mb-1 mx-1"
                  size={20}
                />
                {loadingPage ? (
                  <Loading color="silver" size="6" />
                ) : (
                  "Pick Random Avatar"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
      <hr className="mt-0 mb-3" />

      <h6 className="text-dark">
        {icon} {title} Avatar:
        <b className="mx-1">{totalAvatar}</b>
      </h6>
      <div className="row">
        <div className="col-12">
          <Button
            onClick={() => {
              setType("all");
              setPage(1);
            }}
            outline={type !== "all"}
            className="mr-1"
            color="danger"
          >
            All
          </Button>
          <Button
            onClick={() => {
              setType("fav");
              setPage(1);
            }}
            outline={type !== "fav"}
            className="mx-1"
            color="warning"
          >
            Favorite
          </Button>
          <Button
            onClick={() => {
              setType("recent_used");
              setPage(1);
            }}
            outline={type !== "recent_used"}
            className="mx-1"
            color="info"
          >
            History
          </Button>
        </div>
      </div>
      {avatar.length && !avatarLoading ? (
        <div className="py-2">{renderAvatarRows()}</div>
      ) : (
        <div style={{ marginBottom: 20 }}>{loadingAvatar()}</div>
      )}
      <div className="d-flex justify-content-between mt-2">
        <Button
          color="info"
          outline
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          <MdNavigateBefore size={25} className="my-1" />
        </Button>
        <b className="text-muted py-2">
          {page} / {totalPages}
        </b>
        <Button
          color="info"
          outline
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          <MdNavigateNext size={25} className="my-1" />
        </Button>
      </div>
    </div>
  );
};

export default EditAvatar;
