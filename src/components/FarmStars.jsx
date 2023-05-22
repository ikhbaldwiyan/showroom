import { Col } from "reactstrap";
import React, { useEffect, useState, useRef } from "react";
import { FARM, ROOM_OFFICIAL } from "utils/api/api";
import axios from "axios";
import { toast } from "react-toastify";
import formatLongDate from "utils/formatLongDate";
import { IoMdStopwatch } from "react-icons/io";
import { MdOutlineNotStarted } from "react-icons/md";
import combo from "../assets/audio/combo.mp3";
import { useDispatch, useSelector } from "react-redux";
import { getStarsLoad, getStarsSuccess } from "redux/actions/setStars";
import MainFarm from "./MainFarm";

function FarmStars({ isSingleLive, layout }) {
  const [cookiesLoginId, setCookiesLoginId] = useState("");
  const [session, setSession] = useState("");
  const [officialRoom, setOfficialRoom] = useState([]);

  const [btnLoadingRoom, setBtnLoadingRoom] = useState(false);
  const [isFarming, setIsFarming] = useState(false);
  const [successRoom, setSuccessRoom] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [currentRoomId, setCurrentRoomId] = useState("");
  const [allMessage, setAllMessage] = useState([]);
  const [time, setTime] = useState(0);
  const [farmingTime, setFarmingTime] = useState(0);

  const [limitUntil, setLimitUntil] = useState("");
  const [until, setUntil] = useState("");
  const [countSuccess, setCountSuccess] = useState(0);
  const intervalId = useRef(null);
  const [modalLog, setModalLog] = useState(false);
  const toggle = () => setModalLog(!modalLog);

  const [star, setStar] = useState({
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
  });

  const [isReady, setIsReady] = useState(false);
  const [starLoading, setStarLoading] = useState(false);

  const { starsRedux, isLoadingStars } = useSelector((state) => state.stars);
  const dispatch = useDispatch();

  useEffect(() => {
    setStarLoading(true);
    const userSession = localStorage.getItem("session");
    const officialRoom = localStorage.getItem("official_room");
    const successRoom = localStorage.getItem("success_room");
    const limited = localStorage.getItem("limit_until");
    const untilLocal = localStorage.getItem("until");
    const farmingLog = localStorage.getItem("farming_log");

    if (userSession) {
      const foundSession = JSON.parse(userSession);
      setSession(foundSession);
      setCookiesLoginId(foundSession.cookie_login_id);
      allMessage.length === 0 && setAllMessage(JSON.parse(farmingLog));
    }

    if (!userSession) {
      window.location = "/";
    }

    if (officialRoom) {
      const foundOfficial = JSON.parse(officialRoom);
      setOfficialRoom(foundOfficial);
    }

    if (successRoom) {
      const foundSuccess = JSON.parse(successRoom) || [];
      setSuccessRoom(foundSuccess);
      setCountSuccess(foundSuccess.length);
    }

    if (untilLocal) {
      setUntil(until);

      let unt = new Date(untilLocal);

      let currentTime = new Date();
      let timeUntilTarget = unt.getTime() - currentTime.getTime();

      setTimeout(() => {
        localStorage.removeItem("official_room");
        localStorage.removeItem("success_room");
        localStorage.removeItem("limit_until");
        localStorage.removeItem("until");
        localStorage.removeItem("farming_log");
        console.log("deleted");
        window.location.reload(false);
      }, timeUntilTarget);
    }

    if (limited) {
      const foundLimit = JSON.parse(limited);
      setLimitUntil(foundLimit);
    }

    setIsReady(true);
    window.document.title = "Farming Stars";
  }, []);

  useEffect(() => {
    if (isReady) {
      getFirstStar();
    }
  }, [isReady]);

  const getFirstStar = async (data) => {
    console.log(data);
    let rooms = [];
    if (data) {
      rooms = data;
    } else {
      rooms = officialRoom;
    }
    for (let i = 0; i < rooms.length; i++) {
      const roomId = rooms[i].room_id;
      const response = await axios.post(FARM, {
        cookies_login_id: cookiesLoginId,
        room_id: roomId,
      });

      const data = response.data;
      console.log(data);
      if (data.message.includes("Offline") || data.message.includes("Skip")) {
        deleteArray();
      } else {
        setAllStar(data);
        return;
      }
    }
    setStarLoading(false);
  };

  const setExpire = (until) => {
    let formatTime = until.replaceAll(".", "").split("after ");

    let currentTime = new Date();
    let currentDate = currentTime.toISOString().substr(0, 10);
    let targetTime = new Date(currentDate + " " + formatTime[1]);

    if (currentTime.getTime() > targetTime.getTime()) {
      targetTime.setDate(targetTime.getDate() + 1);
    }

    localStorage.setItem("until", targetTime);
    setUntil(targetTime);
  };

  const textColor = (message) => {
    if (message?.includes("Sukses")) {
      return "text-success";
    } else if (message?.includes("Gagal")) {
      return "text-danger";
    } else if (message?.includes("Sedang")) {
      return "text-light text-sm";
    } else if (message?.includes("Offline")) {
      return "text-secondary";
    } else {
      return "text-secondary";
    }
  };

  const buttonInfo = () => {
    if (isFarming) {
      return (
        <span className="d-flex align-items-center">
          <IoMdStopwatch className="mx-1" /> Stop
        </span>
      );
    } else if (isLoadingStars) {
      return <span className="d-flex align-items-center">Please Wait</span>;
    } else {
      return (
        <span className="d-flex align-items-center">
          <MdOutlineNotStarted className="mx-1" size={16} /> Start
        </span>
      );
    }
  };

  const getOfficials = async () => {
    try {
      setBtnLoadingRoom(true);
      setStarLoading(true);
      const response = await axios.get(ROOM_OFFICIAL);
      if (response.data) {
        getFirstStar(response.data);
        localStorage.setItem("official_room", JSON.stringify(response.data));
        setOfficialRoom(response.data);
        console.log(response.data);
        setBtnLoadingRoom(false);
      }
    } catch (err) {
      setBtnLoadingRoom(false);
    }
  };

  const setLocalAndState = (roomId) => {
    var storedArray = localStorage.getItem("success_room");
    storedArray = JSON.parse(storedArray) || [];

    storedArray.push(roomId);
    setCountSuccess(storedArray.length);
    storedArray = JSON.stringify(storedArray);
    localStorage.setItem("success_room", storedArray);
    setSuccessRoom(storedArray);
  };

  const deleteArray = () => {
    let arrayLocal = localStorage.getItem("official_room");
    arrayLocal = JSON.parse(arrayLocal) || [];

    let updatedArray = [...arrayLocal];
    updatedArray.shift();
    setOfficialRoom(updatedArray);
    localStorage.setItem("official_room", JSON.stringify(updatedArray));
  };

  const decrementTime = () => {
    clearInterval(intervalId.current);
    setTime(0);
    intervalId.current = setInterval(() => {
      setTime((time) => {
        // console.log(time);
        if (time < 50) {
          return setTime(time + 1);
        }
        clearInterval(intervalId.current);
        return 0;
      });
    }, 1000);
  };

  const setAllStar = (data) => {
    dispatch(getStarsLoad());
    if (data.star.length === 0) return;
    const updatedStar = starsRedux.map((gift, index) => {
      return {
        ...gift,
        gift_id: data.star[index]?.gift_id,
        count: data.star[index]?.free_num,
      };
    });
    console.log(data, "set all star");
    dispatch(getStarsSuccess(updatedStar));
  };

  const setFailed = (data) => {
    toast.error(data.until ?? "Please try again after the displayed time", {
      theme: "colored",
    });
    localStorage.setItem("limit_until", JSON.stringify(data.until));
    setLimitUntil(data.until);
    setModalLog(!modalLog);
    setExpire(data.until);
  };

  const handleCheckStar = () => {
    if (checkAllStars() === true) {
      setShowModal(true);
    } else {
      setShowModal(false);
      startFarming();
    }
  };

  const handleStop = () => {
    setTime(0);
    deleteArray();
    setIsFarming(false);
    window.location.reload(false);
  };

  const startFarming = async () => {
    for (let i = 0; i < officialRoom.length; i++) {
      setIsFarming(true);
      const roomId = officialRoom[i].room_id;
      const roomName = officialRoom[i].room_name;

      setCurrentRoomId(roomName);
      const response = await axios.post(FARM, {
        cookies_login_id: cookiesLoginId,
        room_id: roomId,
        room_name: roomName,
      });

      const data = response.data;
      console.log(data, "FIRST");
      setAllStar(data);

      let currentTime = new Date();
      let timestamp = formatLongDate(currentTime, true);

      setAllMessage((prevData) => {
        if (prevData) {
          return [...prevData, { message: data.message, timestamp }];
        } else {
          return [{ message: data.message, timestamp }];
        }
      });

      if (data.message.includes("Sedang")) {
        decrementTime();

        await new Promise((resolve) => setTimeout(resolve, 50 * 1000));

        const response2 = await axios.post(FARM, {
          cookies_login_id: cookiesLoginId,
          room_id: roomId,
          room_name: roomName,
        });

        const data2 = response2.data;
        console.log(data2, "SECOND");

        if (data2.message.includes("Sukses")) {
          deleteArray();
          setLocalAndState(roomId);
          const audio = new Audio(combo);
          audio.volume = 1;
          audio.play();
          toast.success(`Sukses Farm Di Room : ${roomName}`, {
            theme: "colored",
          });
          setAllStar(data2);
          setStarLoading(true);
        }

        if (data2.message.includes("Gagal")) {
          deleteArray();
          setAllMessage((prevData) => [
            ...prevData,
            { message: data2.message, timestamp },
          ]);
          setFailed(data2);
          setIsFarming(false);
          return;
        }

        if (data2.message.includes("Sedang")) {
          deleteArray();
          data2.message = "[" + roomName + "] Skip Room";
        }

        if (data2.message.includes("Offline")) {
          deleteArray();
        }

        setAllMessage((prevData) => [
          ...prevData,
          { message: data2.message, timestamp },
        ]);
      }

      if (data.message.includes("Sukses")) {
        deleteArray();
        setLocalAndState(roomId);
        toast.success(`Sukses Farm Di Room : ${roomName}`, {
          theme: "colored",
        });
        console.log(allMessage);
      }

      if (data.message.includes("Gagal")) {
        deleteArray();
        setFailed(data);
        setIsFarming(false);
        return;
      }

      if (checkAllStars == true) {
        toast.success(`Semua stars anda sudah full`, {
          theme: "colored",
        });
        setIsFarming(false);
        return;
      }

      if (data.message.includes("Offline")) {
        deleteArray();
      }

      setCurrentRoomId(null);
      setIsFarming(false);
      setIsFarming(false);
    }
  };

  useEffect(() => {
    localStorage.setItem(
      "farming_log",
      JSON.stringify(
        allMessage ?? [
          {
            messages: "Open Farming Page",
            timestamp: "Now",
          },
        ]
      )
    );
  }, [allMessage]);

  const checkAllStars = () => {
    const values = Object.values(star); // Get all values from the `star` object
    return values.every((value) => value === 99); // Check if all values are 99
  };

  const mainFarmProps = {
    limitUntil,
    starsRedux,
    currentRoomId,
    countSuccess,
    officialRoom,
    btnLoadingRoom,
    isFarming,
    until,
    time,
    allMessage,
    isLoadingStars,
    showModal,
    modalLog,
    farmingTime,
    header,
    getOfficials,
    handleStop,
    handleCheckStar,
    buttonInfo,
    startFarming,
    setShowModal,
    toggle,
    textColor,
    setFarmingTime,
  };

  return isSingleLive ? (
    <MainFarm {...mainFarmProps} />
  ) : (
    <Col lg={layout}>
      <MainFarm {...mainFarmProps} />
    </Col>
  );
}

const header = {
  backgroundColor: "#24a2b7",
  color: "white",
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
};

export default FarmStars;
