import axios from "axios";
import { Loading } from "components";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCountStar,
  getClickCountStar,
  getStarsLoad,
  getStarsSuccess,
  sendStarSuccess,
} from "redux/actions/setStars";
import {
  BULK_GIFT,
  FARM,
  LIVE_RANKING,
  PROFILE_API,
  SEND_GIFT,
} from "utils/api/api";
import shot from "../assets/audio/shot.mp3";
import combo from "../assets/audio/combo.mp3";
import {
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { motion, useAnimation } from "framer-motion";
import { toast } from "react-toastify";
import { AiFillStar } from "react-icons/ai";
import { gaEvent } from "utils/gaEvent";
import { getSession } from "utils/getSession";
import { Link } from "react-router-dom";
import bulkImage from "../assets/images/bulk.svg";

const StarMulti = ({ roomId, theme, cookiesLoginId, csrfToken }) => {
  const dispatch = useDispatch();
  const { starsRedux, clickCountRedux, isLoadingStars } = useSelector(
    (state) => state.stars
  );

  const [isCounting, setIsCounting] = useState(false);
  const [disableCount, setDisableCount] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [modal, setModal] = useState(false);
  const [rank, setRank] = useState();
  const [avatarY, setAvatarY] = useState(0);
  const [avatarImage, setAvatarImage] = useState();
  const avatarAnimation = useAnimation();

  useEffect(() => {
    setAvatarImage(getSession().profile?.avatar_url);

    const interval = setInterval(() => {
      setDisableCount(true);
      getFirstStar();
      setDisableCount(false);
    }, 1000 * 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getFirstStar();
    dispatch(getStarsLoad());
  }, [roomId, cookiesLoginId]);

  useEffect(() => {
    let timeoutId;

    if (isCounting) {
      timeoutId = setTimeout(() => {
        setIsCounting(false);
        console.log("stop");
        setDisableCount(false);

        Object.entries(clickCountRedux).map(([key, value]) => {
          if (value < 10 && value > 0) {
            console.log(value, key);
            sendStar(key, value);
            dispatch(clearCountStar());
          }
        });
      }, 1000);
    }
    return () => clearTimeout(timeoutId);
  }, [starsRedux, isCounting]);

  const sendStar = async (key, value) => {
    try {
      const response = await axios.post(SEND_GIFT, {
        cookies_id: cookiesLoginId,
        csrf_token: csrfToken,
        room_id: roomId.toString(),
        gift_name: key,
        num: value,
      });

      axios
        .post(PROFILE_API, {
          room_id: roomId.toString(),
          cookie: cookiesLoginId,
        })
        .then((res) => {
          const profiles = res.data;
          toast.info(
            `Send ${value} star to ${profiles.room_url_key.replace(
              "JKT48_",
              ""
            )} success`,
            {
              theme: "colored",
              icon: <AiFillStar />,
            }
          );
        });

      if (response.data.ok) {
        let data = response.data;
        dispatch(sendStarSuccess(key, data.remaining_num));
        gaEvent("Stars", "Send Stars", "Multi Room");

        setDisableCount(false);
        setActiveButton(null);
      }
    } catch {
      setDisableCount(false);
      setActiveButton(null);
    }
  };

  const sendTenStar = async (key) => {
    try {
      const response = await axios.post(SEND_GIFT, {
        cookies_id: cookiesLoginId,
        csrf_token: csrfToken,
        room_id: roomId.toString(),
        gift_name: key,
        num: 10,
      });

      axios
        .post(PROFILE_API, {
          room_id: roomId.toString(),
          cookie: cookiesLoginId,
        })
        .then((res) => {
          const profiles = res.data;
          toast.success(
            `Send 10 star to ${profiles.room_url_key.replace(
              "JKT48_",
              ""
            )} success`,
            {
              theme: "colored",
              icon: <AiFillStar />,
            }
          );
        });

      if (response.data.ok) {
        let data = response.data;
        dispatch(sendStarSuccess(key, data.remaining_num));
        gaEvent("Stars", "Send Ten Star", "Multi Room");

        setDisableCount(false);
        setActiveButton(null);
      }
    } catch {
      setDisableCount(false);
      setActiveButton(null);
    }
  };

  // Fetch First stars with API
  const getFirstStar = async () => {
    const response = await axios.post(FARM, {
      cookies_login_id: cookiesLoginId,
      room_id: roomId.toString(),
    });

    if (response?.data?.data?.toast && !response?.data?.until) {
      const audio = new Audio(combo);
      audio.volume = 1;
      audio.play();

      axios
        .post(PROFILE_API, {
          room_id: roomId.toString(),
          cookie: cookiesLoginId,
        })
        .then((res) => {
          const profiles = res.data;
          toast.success(
            `${
              response.data.data.toast.message
            } from ${profiles.room_url_key.replace("JKT48_", "")}`,
            {
              theme: "colored",
              icon: <AiFillStar />,
            }
          );
        });
    }

    if (response.data?.until) {
      toast.error(
        response.data?.until ?? "Please try again after the displayed time",
        {
          theme: "colored",
        }
      );
    }

    setAllStar(response.data);
  };

  // SetAll star base on API
  const setAllStar = (data) => {
    if (data.star.length === 0) return;
    const updatedStar = starsRedux.map((gift, index) => {
      return {
        ...gift,
        gift_id: data.star[index].gift_id,
        count: data.star[index].free_num,
      };
    });
    dispatch(getStarsSuccess(updatedStar));
  };

  const clickStar = (e) => {
    setIsCounting(true);

    for (let i = 0; i < starsRedux.length; i++) {
      if (starsRedux[i].name === e.target.name) {
        if (starsRedux[i].count > 0) {
          setActiveButton(e.target.name);
          dispatch(getClickCountStar(e.target.name));
          if (clickCountRedux[e.target.name] === 9) {
            const audio = new Audio(combo);
            audio.volume = 1;
            audio.play();
          } else {
            const audio = new Audio(shot);
            audio.volume = 1;
            audio.play();
          }
        }
      }
    }

    if (clickCountRedux[e.target.name] === 9) {
      sendTenStar(e.target.name);
      setDisableCount(true);
      dispatch(clearCountStar());
    }

    // Trigger avatar animation
    avatarAnimation.start({
      y: avatarY - 10,
      transition: { duration: 0.5, ease: "easeInOut" },
    });

    // Reset avatar position after animation completes
    setTimeout(() => {
      avatarAnimation.start({
        y: 0,
        transition: { duration: 0.5, ease: "easeInOut" },
      });
    }, 500);
  };

  const sendAllStar = async () => {
    setModal(!modal);
    setDisableCount(true);

    try {
      const response = await axios.post(BULK_GIFT, {
        cookies_id: cookiesLoginId,
        csrf_token: csrfToken,
        room_id: roomId.toString(),
      });

      if (response.data.ok) {
        gaEvent("Stars", "Send All Stars - Multi", "Multi Room");

        const res = await axios.post(FARM, {
          cookies_login_id: cookiesLoginId,
          room_id: roomId,
        });

        setAllStar(res.data);

        toast.success(`Sukses Mengirim Semua Star`, {
          theme: "colored",
        });

        const audio = new Audio(combo);
        audio.volume = 1;
        audio.play();

        setDisableCount(false);
      }
    } catch {
      toast.error("Gagal mengirim star", {
        theme: "colored",
      });
      setDisableCount(false);
    }
  };

  const toggle = () => setModal(!modal);

  useEffect(() => {
    setRank("");
    try {
      axios
        .get(LIVE_RANKING(roomId, getSession()?.session?.cookie_login_id))
        .then((res) => {
          const rank = res.data;
          rank.map((item) => {
            if (item.user.user_id === parseInt(getSession().user?.user_id)) {
              setRank(item);
            }
          });
        });
    } catch (error) {
      console.log(error);
    }
  }, [isLoadingStars, roomId]);

  return getSession().session ? (
    <Card
      style={{
        padding: "20px",
        display: "flex",
        alignItems: "center",
        backgroundColor: theme === "dark" ? "#343A40" : "white",
        borderRadius: "10px",
      }}
      className="my-4"
    >
      <div className="row">
        {starsRedux.map((gift) => (
          <motion.div
            className="d-flex flex-column align-items-center px-1 my-0 mx-3"
            whileTap={{ scale: 0.9 }}
          >
            <input
              type="image"
              src={
                gift.gift_id
                  ? `https://static.showroom-live.com/image/gift/${gift.gift_id}_s.png?v=1`
                  : gift.url
              }
              width="50px"
              height="50px"
              style={{ cursor: "pointer" }}
              name={gift.name}
              alt="stars"
              disabled={activeButton != gift.name && activeButton != null}
              onClick={disableCount ? void 0 : clickStar}
            />
            <b className="mb-0">
              {isLoadingStars ? (
                <Loading
                  color={theme === "dark" ? "white" : "black"}
                  size={6}
                />
              ) : (
                gift.count
              )}
            </b>
          </motion.div>
        ))}
      </div>
      <div className="d-flex justify-content-center align-items-center mt-3">
        <button
          className="btn my-2"
          onClick={toggle}
          disabled={disableCount ? true : false || activeButton != null}
          style={{
            borderRadius: "10px",
            backgroundColor: "#24a2b7",
          }}
        >
          <div className="d-flex justify-content-center align-items-center">
            <img className="mb-1" src={bulkImage} height={44} width={44} alt="bulk gift" />
            <p className="mt-3" style={{ color: "white" }}>
              Send All Stars
            </p>
          </div>
        </button>
        <div className="d-flex flex-column align-items-center px-1 my-0 mx-3">
          <motion.img
            initial={{ y: 0 }}
            animate={avatarAnimation}
            style={{ y: avatarY }}
            width="40"
            alt="avatar"
            src={
              avatarImage ??
              "https://static.showroom-live.com/image/avatar/1.png?v=95"
            }
            onAnimationStart={() => setAvatarY(avatarY - 20)}
            onAnimationComplete={() => setAvatarY(0)}
          />
          <p className="mt-2 text-info">
            <b>Rank: {rank?.rank ?? "-"}</b>
          </p>
        </div>
      </div>
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader style={{ backgroundColor: "#24a2b7" }} toggle={toggle}>
            Send All Stars
          </ModalHeader>
          <ModalBody className="text-dark">
            Apakah Anda yakin ingin mengirim semua star ?
          </ModalBody>
          <ModalFooter>
            <Button color="info" onClick={sendAllStar}>
              Yes
            </Button>
            <Button color="secondary" onClick={toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </Card>
  ) : (
    <Card
      style={{
        padding: "16px",
        display: "flex",
        flex: "1",
        alignItems: "center",
        backgroundColor: theme === "dark" ? "#343A40" : "white",
        borderRadius: "10px",
        justifyContent: "center",
      }}
      className="my-2"
    >
      <p>Please login first to send stars gift</p>
      <Link to="/login">
        <Button color="info">Login here</Button>
      </Link>
    </Card>
  );
};

export default StarMulti;
