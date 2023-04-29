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
import { FARM, PROFILE_API, SEND_GIFT } from "utils/api/api";
import shot from "../assets/audio/shot.mp3";
import combo from "../assets/audio/combo.mp3";
import { Card } from "reactstrap";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { AiFillStar } from "react-icons/ai";

const StarMulti = ({ roomId, theme, cookiesLoginId, csrfToken }) => {
  const dispatch = useDispatch();
  const { starsRedux, clickCountRedux, isLoadingStars } = useSelector(
    (state) => state.stars
  );

  const [isCounting, setIsCounting] = useState(false);
  const [disableCount, setDisableCount] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
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

      axios.post(PROFILE_API, {
        room_id: roomId.toString(),
        cookie: cookiesLoginId,
      }).then((res) => {
        const profiles = res.data;
        toast.info(`Send ${value} star to ${profiles.room_url_key.replace("JKT48_" , "")} success`, {
          theme: "colored",
          icon: <AiFillStar />,
        });
      });


      if (response.data.ok) {
        let data = response.data;
        dispatch(sendStarSuccess(key, data.remaining_num));

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

      axios.post(PROFILE_API, {
        room_id: roomId.toString(),
        cookie: cookiesLoginId,
      }).then((res) => {
        const profiles = res.data;
        toast.success(`Send 10 star to ${profiles.room_url_key.replace("JKT48_" , "")} success`, {
          theme: "colored",
          icon: <AiFillStar />,
        });
      });

      if (response.data.ok) {
        let data = response.data;
        dispatch(sendStarSuccess(key, data.remaining_num));

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

      toast.success(response.data.data.toast.message, {
        theme: "colored",
        icon: <AiFillStar />,
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
        if(starsRedux[i].count > 0) {
          setActiveButton(e.target.name)
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
  };

  return (
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
    </Card>
  );
};

export default StarMulti;
