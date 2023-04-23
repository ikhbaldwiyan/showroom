import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { BULK_GIFT, FARM, liveRanking, SEND_GIFT } from "utils/api/api";
import Loading from "./Loading";
import shot from "../assets/audio/shot.mp3";
import combo from "../assets/audio/combo.mp3";
import bulkImage from "../assets/images/bulk.svg";
import { motion } from "framer-motion";

function StarButton({ roomId, cookiesLoginId, theme, csrfToken, user }) {
  const [stars, setStars] = useState([
    {
      gift_id: "",
      name: "a",
      count: 0,
      url: "https://static.showroom-live.com/image/gift/1_s.png?v=1",
    },
    {
      gift_id: "",
      name: "b",
      count: 0,
      url: "https://static.showroom-live.com/image/gift/1001_s.png?v=1",
    },
    {
      gift_id: "",
      name: "c",
      count: 0,
      url: "https://static.showroom-live.com/image/gift/1002_s.png?v=1",
    },
    {
      gift_id: "",
      name: "d",
      count: 0,
      url: "https://static.showroom-live.com/image/gift/1003_s.png?v=1",
    },
    {
      gift_id: "",
      name: "e",
      count: 0,
      url: "https://static.showroom-live.com/image/gift/2_s.png?v=1",
    },
  ]);
  const [starLoading, setStarLoading] = useState(false);
  const [isCounting, setIsCounting] = useState(false);
  const [disableCount, setDisableCount] = useState(false);
  const [clickCount, setClickCount] = useState({
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
  });
  const [activeButton, setActiveButton] = useState(null);
  const [modal, setModal] = useState(false);
  const [rank, setRank] = useState();
  const toggle = () => setModal(!modal);

  useEffect(() => {
    setDisableCount(true);
    getFirstStar();
    setDisableCount(false);
  }, [roomId, cookiesLoginId]);

  const getFirstStar = async () => {
    setStarLoading(true);

    const response = await axios.post(FARM, {
      cookies_login_id: cookiesLoginId,
      room_id: roomId,
    });

    setAllStar(response.data);
    setStarLoading(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDisableCount(true);
      getFirstStar();
      setDisableCount(false);
    }, 1000 * 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timeoutId;

    if (isCounting) {
      timeoutId = setTimeout(() => {
        setIsCounting(false);
        console.log("stop");
        setDisableCount(true);

        Object.entries(clickCount).map(([key, value]) => {
          if (value < 10 && value > 0) {
            sendStar(key, value);

            setClickCount({
              a: 0,
              b: 0,
              c: 0,
              d: 0,
              e: 0,
            });
          }
        });
      }, 1000);
    }
    return () => clearTimeout(timeoutId);
  }, [stars, isCounting]);

  const setAllStar = (data) => {
    setStarLoading(true);
    if (data.star.length === 0) return;
    const updatedStar = stars.map((gift, index) => {
      return {
        ...gift,
        gift_id: data.star[index].gift_id,
        count: data.star[index].free_num,
      };
    });
    setStars(updatedStar);
    setStarLoading(false);
  };

  const sendAllStar = async () => {
    setModal(!modal);
    setStarLoading(true);
    setDisableCount(true);

    try {
      const response = await axios.post(BULK_GIFT, {
        cookies_id: cookiesLoginId,
        csrf_token: csrfToken,
        room_id: roomId,
      });

      if (response.data.ok) {
        console.log(response.data);

        const res = await axios.post(FARM, {
          cookies_login_id: cookiesLoginId,
          room_id: roomId,
        });

        setAllStar(res.data);

        toast.success(`Sukses Mengirim Semua Star`, {
          theme: "colored",
        });

        setDisableCount(false);
        setStarLoading(false);
      }
    } catch {
      toast.error("Gagal mengirim star", {
        theme: "colored",
      });
      setDisableCount(false);
      setStarLoading(false);
    }
  };

  const sendTenStar = async (e) => {
    console.log(e.target.name);
    console.log(clickCount[e.target.name] + 1);

    try {
      const response = await axios.post(SEND_GIFT, {
        cookies_id: cookiesLoginId,
        csrf_token: csrfToken,
        room_id: roomId,
        gift_name: e.target.name,
        num: clickCount[e.target.name] + 1,
      });

      if (response.data.ok) {
        console.log(response.data);
        let data = response.data;

        setStars((prevState) => [
          ...prevState.map((star) => {
            if (star.name === e.target.name) {
              return {
                ...star,
                count: data.remaining_num,
              };
            }
            return star;
          }),
        ]);

        setDisableCount(false);
        setActiveButton(null);
      }
    } catch {
      setDisableCount(false);
      setActiveButton(null);
    }
  };

  const sendStar = async (key, value) => {
    try {
      const response = await axios.post(SEND_GIFT, {
        cookies_id: cookiesLoginId,
        csrf_token: csrfToken,
        room_id: roomId,
        gift_name: key,
        num: value,
      });

      if (response.data.ok) {
        let data = response.data;
        console.log(response.data);

        setStars((prevState) => [
          ...prevState.map((star) => {
            if (star.name === key) {
              return {
                ...star,
                count: data.remaining_num,
              };
            }
            return star;
          }),
        ]);

        setDisableCount(false);
        setActiveButton(null);
      }
    } catch {
      setDisableCount(false);
      setActiveButton(null);
    }
  };

  const clickStar = (e) => {
    setIsCounting(true);
    setActiveButton(e.target.name);

    setStars((prevState) => {
      return prevState.map((starObj) => {
        if (starObj.name === e.target.name) {
          if (starObj.count > 0) {
            setClickCount({
              ...clickCount,
              [e.target.name]: clickCount[e.target.name] + 1,
            });

            if (clickCount[e.target.name] == 9) {
              sendTenStar(e);
              setDisableCount(true);

              setClickCount({
                a: 0,
                b: 0,
                c: 0,
                d: 0,
                e: 0,
              });
            }

            if (clickCount[e.target.name] == 9) {
              const audio = new Audio(combo);
              audio.volume = 1;
              audio.play();
            } else {
              const audio = new Audio(shot);
              audio.volume = 1;
              audio.play();
            }

            return {
              ...starObj,
              count: starObj.count - 1,
            };
          }
        }
        return starObj;
      });
    });
  };

  useEffect(() => {
    try {
      axios.get(liveRanking(roomId)).then((res) => {
        const rank = res.data;
        for (let i = 0; i < rank.length; i++) {
          if (rank[i].user.user_id == user.user_id) {
            setRank(rank[i]);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [starLoading]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Card
        style={{
          padding: "20px",
          display: "flex",
          flex: "1",
          alignItems: "center",
          backgroundColor: theme === "dark" ? "#343A40" : "white",
          borderRadius: "10px 0px 0px 10px",
        }}
        className="my-4"
      >
        <div className="row">
          {stars.map((gift) => (
            <motion.div
              className="d-flex flex-column align-items-center px-1 my-0 mx-3"
              onClick={disableCount ? void 0 : clickStar}
              whileTap={{ scale: 0.9 }}
            >
              <input
                type="image"
                src={
                  gift.gift_id
                    ? `https://static.showroom-live.com/image/gift/${gift.gift_id}_s.png?v=1`
                    : gift.url
                }
                disabled={activeButton != gift.name && activeButton != null}
                width="50px"
                height="50px"
                style={{ cursor: "pointer" }}
                onClick={disableCount ? void 0 : clickStar}
                name={gift.name}
                alt="stars"
              />
              <b className="mb-0">
                {starLoading ? (
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

      <button
        className="btn my-4"
        onClick={toggle}
        disabled={disableCount ? true : false || activeButton != null}
        style={{
          borderRadius: "0px 10px 10px 0px",
          backgroundColor: "#24a2b7",
          width: "70px",
        }}
      >
        <img src={bulkImage} height={44} width={44} alt="bulk gift" />
      </button>

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
    </div>
  );
}

export default StarButton;
