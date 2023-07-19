import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";
import MainLayout from "./layout/MainLayout";
import React, { useEffect, useState, useRef } from "react";
import { Loading } from "components";
import { FARM, ROOM_OFFICIAL } from "utils/api/api";
import axios from "axios";
import { toast } from "react-toastify";
import formatLongDate from "utils/formatLongDate";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IoReload } from "react-icons/io5";
import { IoMdStopwatch } from "react-icons/io";
import { MdOutlineNotStarted } from "react-icons/md";
import combo from "../assets/audio/combo.mp3";
import { useTimer } from "react-timer-hook";
import { useSelector } from "react-redux";
import { gaTag } from "utils/gaTag";
import { getSession } from "utils/getSession";

function Farming(props) {
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
  const [info, setInfo] = useState("");
  const user = useSelector((state) => state.user.user);

  const stars = [
    {
      key: "a",
      image: "https://static.showroom-live.com/image/gift/1_s.png?v=1",
      count: star.a,
    },
    {
      key: "b",
      image: "https://static.showroom-live.com/image/gift/1001_s.png?v=1",
      count: star.b,
    },
    {
      key: "c",
      image: "https://static.showroom-live.com/image/gift/1002_s.png?v=1",
      count: star.c,
    },
    {
      key: "d",
      image: "https://static.showroom-live.com/image/gift/1003_s.png?v=1",
      count: star.d,
    },
    {
      key: "e",
      image: "https://static.showroom-live.com/image/gift/2_s.png?v=1",
      count: star.e,
    },
  ];

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
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isReady) {
      getFirstStar();
    }
  }, [isReady]);

  const getFirstStar = async (data) => {
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
    if (message.includes("Sukses")) {
      return "text-success";
    } else if (message.includes("Gagal")) {
      return "text-danger";
    } else if (message?.includes("kena limit")) {
      return "text-danger";
    } else if (message.includes("Sedang")) {
      return "text-light";
    } else if (message.includes("Offline")) {
      return "text-secondary";
    } else {
      return "text-secondary";
    }
  };

  const buttonInfo = () => {
    if (isFarming) {
      return (
        <span className="d-flex align-items-center">
          <IoMdStopwatch className="mx-1" /> Stop Farming
        </span>
      );
    } else if (starLoading) {
      return <span className="d-flex align-items-center">Please Wait</span>;
    } else {
      return (
        <span className="d-flex align-items-center">
          <MdOutlineNotStarted className="mx-1" size={16} /> Start Farming
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
        localStorage.setItem("official_room", JSON.stringify(response.data));
        setOfficialRoom(response.data);
        console.log(response.data);
        getFirstStar(response.data);
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
    setStarLoading(true);
    if (data.star === true) return;
    setStar({
      ...star,
      a: data.star[0].free_num,
      b: data.star[1].free_num,
      c: data.star[2].free_num,
      d: data.star[3].free_num,
      e: data.star[4].free_num,
    });
    setStarLoading(false);
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
      gaTag({
        action: "Start Farming",
        category: "Farming",
        label: "Farming Page",
        value: null,
        username: getSession()?.profile?.name,
      });
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
          setStarLoading(true);
        }

        if (data2.message.includes("Gagal")) {
          deleteArray();
          setAllMessage((prevData) => [
            ...prevData,
            { message: data2.message, timestamp },
            {
              message: `Farming Stars terkena limit sampai jam ${data2?.until?.replace(
                "You can get free gifts after",
                ""
              )}`,
              timestamp,
            },
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

  const FarmingTime = () => {
    useEffect(() => {
      if (allMessage && allMessage.length > 0) {
        const startTime = allMessage[0].timestamp;
        const endTime = allMessage[allMessage.length - 1].timestamp;
        const start = new Date(`2023-01-01T${startTime}:00`).getTime();
        const end = new Date(`2023-01-01T${endTime}:00`).getTime();
        const diffMs = end - start;
        const diffMin = Math.floor(diffMs / 60000);
        setFarmingTime(diffMin);
      }
    }, [allMessage]);

    const { minutes } = useTimer({
      expiryTimestamp: Date.now() + farmingTime * 60000,
      onExpire: () => setFarmingTime(0),
    });

    return (
      <p className="text-primary text-warning">
        Farming Time: {minutes} Minutes
      </p>
    );
  };

  const handleFarmingUser = () => {
    if (user?.can_farming_page) {
      getOfficials();
    } else {
      setBtnLoadingRoom(true);
      toast.info("Maaf akun anda tidak terdaftar untuk akses fitur farming", {
        theme: "colored",
      });
      setInfo(
        "Maaf akun id anda tidak terdaftar untuk akses fitur farming, kontak admin atau moderator discord untuk info lebih lanjut."
      );
      setTimeout(() => {
        setBtnLoadingRoom(false);
      }, 2000);
    }
  };

  return (
    <MainLayout title="Farming Stars" {...props} style={{ color: "white" }}>
      <Container>
        {limitUntil ? (
          <>
            <div className="row my-2 justify-content-center text-danger text-center">
              <h3>{limitUntil}</h3>
            </div>
            <hr style={{ borderColor: "silver" }} />
          </>
        ) : (
          <Container>
            {officialRoom.length > 0 ? (
              <div className="row d-flex justify-content-between">
                <Button
                  style={{
                    backgroundColor: "teal",
                  }}
                  onClick={getOfficials}
                  className="btn text-light"
                  disabled={
                    btnLoadingRoom ? true : false || limitUntil ? true : false
                  }
                >
                  {btnLoadingRoom ? (
                    <span className="d-flex align-items-center">
                      <Loading color="white"  /><span className="ml-2"> Loading..</span>
                    </span>
                  ) : (
                    <span className="d-flex align-items-center">
                      <IoReload className="mx-1" /> Refresh
                    </span>
                  )}
                </Button>
                <Button
                  onClick={isFarming ? handleStop : handleCheckStar}
                  className="btn text-light"
                  disabled={
                    btnLoadingRoom ? true : false || starLoading ? true : false
                  }
                  style={{
                    backgroundColor: isFarming ? "#dc3545" : "#24a2b7",
                  }}
                >
                  {buttonInfo()}
                </Button>
              </div>
            ) : (
              ""
            )}
          </Container>
        )}

        {officialRoom.length > 0 ? (
          <>
            <div className="row mt-5 mb-2">
              <div className="d-flex col-md-4 col-sm-12 justify-content-end flex-column">
                <h4 className="text-center ">Remaining Stars</h4>
                <div className="row mb-2 justify-content-center">
                  {stars.map(({ image, count }, index) => (
                    <div
                      key={index}
                      className={`star${
                        index === 0 ? "A" : "B"
                      } d-flex flex-column align-items-center p-1`}
                    >
                      <img src={image} width="50px" height="50px" alt="" />
                      {starLoading ? (
                        <Loading
                          color={props.theme === "dark" ? "white" : "black"}
                        />
                      ) : (
                        <p>{count}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-4 col-sm-12 d-flex align-items-center justify-content-center">
                {isFarming && !until ? (
                  <div
                    style={{ width: 120, height: 120 }}
                    className="mb-3 mx-auto"
                  >
                    <CircularProgressbar
                      value={
                        (time / 50) * 100 > 100 ? "100" : (time / 50) * 100
                      }
                      text={
                        <tspan dy={3} dx={0}>
                          {time === 50
                            ? "100%"
                            : ((time / 50) * 100).toFixed(2) > 100
                            ? "100%"
                            : ((time / 50) * 100)
                                .toFixed()
                                .replace(/.00$/, "") + "%"}
                        </tspan>
                      }
                      strokeWidth={15}
                      styles={buildStyles({
                        strokeLinecap: "butt",
                        textSize: "17px",
                        textColor: `white`,
                        pathTransitionDuration: 0.5,
                        pathColor: "#08BC0C",
                        trailColor: "#d6d6d6",
                      })}
                    />
                  </div>
                ) : (
                  <div
                    style={{ width: 120, height: 120 }}
                    className="mb-3 mx-auto"
                  >
                    <CircularProgressbar
                      value={limitUntil ? 100 : 0}
                      text={
                        <tspan dy={3} dx={0}>
                          {limitUntil ? "100%" : "0%"}
                        </tspan>
                      }
                      strokeWidth={15}
                      styles={buildStyles({
                        strokeLinecap: "butt",
                        textSize: "17px",
                        textColor: `white`,
                        pathTransitionDuration: 0.5,
                        pathColor: `#dc3545`,
                        trailColor: "#d6d6d6",
                      })}
                    />
                  </div>
                )}
              </div>
              <div className="col-md-4 col-sm-12 text-center d-flex align-items-center justify-content-center">
                {isFarming && !until ? (
                  <div className="mb-0">
                    <p style={{ fontWeight: "bold", textAlign: "center" }}>
                      Current room :
                      <p style={{ color: "#24a2b7" }}>[{currentRoomId}]</p>
                      <Button color="success mb-3" onClick={toggle}>
                        Total Farming Succes {countSuccess}
                      </Button>
                    </p>
                  </div>
                ) : (
                  <React.Fragment>
                    <Button color="success mb-3" onClick={toggle}>
                      Total Farming Succes {countSuccess}
                    </Button>
                    {until && <FarmingTime />}
                  </React.Fragment>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 col-sm-12 order-md-1 order-2">
                <Table bordered>
                  <thead style={{ backgroundColor: "teal", color: "white" }}>
                    <tr style={{ textAlign: "center" }}>
                      <th>Farm Room</th>
                    </tr>
                  </thead>
                  <tbody
                    style={{
                      textAlign: "center",
                      color: props.theme === "dark" && "white",
                    }}
                  >
                    {officialRoom?.slice(0, 15).map((room, idx) => (
                      <tr key={idx}>
                        <td className="text-center">{room.room_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div className="col-md-8 col-sm-12 order-md-2 order-1">
                <div>
                  <Table bordered>
                    <thead
                      style={{ backgroundColor: "#24a2b7", color: "white" }}
                    >
                      <tr>
                        <th>Farming Log Message</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allMessage && allMessage.length > 0 ? (
                        <>
                          {allMessage
                            ?.map(({ message, timestamp }, idx) => (
                              <tr key={idx}>
                                <td className={textColor(message)}>
                                  {message}
                                </td>
                                <td
                                  className="text-light"
                                  style={{
                                    fontSize: 14,
                                    textAlign: "center",
                                  }}
                                >
                                  {timestamp}
                                </td>
                              </tr>
                            ))
                            ?.reverse()}
                        </>
                      ) : (
                        ""
                      )}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div style={{ height: 500 }}>
            <div className="d-flex justify-content-center mt-5 mb-5">
              <Button
                style={{
                  backgroundColor: "#24a2b7",
                }}
                onClick={handleFarmingUser}
                className="btn text-light"
                disabled={
                  btnLoadingRoom ? true : false || limitUntil ? true : false
                }
              >
                {btnLoadingRoom ? (
                  <Loading color="white" />
                ) : (
                  "Click This Button To Activate Farm"
                )}
              </Button>
            </div>
            <div className="d-flex justify-content-center text-center">
              <div className="col-12 col-md-8">
                {info && <h4 className="text-danger">{info}</h4>}
              </div>
            </div>
          </div>
        )}

        <Modal isOpen={showModal} toggle={() => setShowModal(false)}>
          <ModalHeader style={header} toggle={() => setShowModal(false)}>
            Message
          </ModalHeader>
          <ModalBody>
            <span className="text-dark">
              Semua stars sudah full apakah tetap running auto farming ?
            </span>
          </ModalBody>
          <ModalFooter>
            <Button
              color="info"
              onClick={() => {
                startFarming();
                setShowModal(false);
                gaTag({
                  action: "Run Farming Full",
                  category: "Farming",
                  label: "Farming Page",
                  value: null,
                  username: getSession()?.profile?.name,
                });
              }}
            >
              Run
            </Button>
            <Button color="danger" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalLog} toggle={toggle}>
          <ModalHeader style={header} toggle={toggle}>
            {isFarming ? "Farming Succes History" : "Farming Ended"}
          </ModalHeader>
          <ModalBody
            style={{ backgroundColor: "#21252b" }}
            className="text-dark"
          >
            <h4 className="py-2 text-light text-center">
              <b className="text-success">{countSuccess} ROOM</b>
            </h4>
            <div className="text-center">
              <FarmingTime />
            </div>
            <Table bordered>
              <thead style={{ color: "white" }}>
                <tr>
                  <th>Success Log History</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {allMessage && allMessage.length > 0 ? (
                  <>
                    {allMessage
                      ?.map(
                        ({ message, timestamp }, idx) =>
                          message?.includes("Sukses") && (
                            <tr key={idx}>
                              <td className="text-light">{message}</td>
                              <td
                                className="text-light"
                                style={{
                                  fontSize: 14,
                                  textAlign: "center",
                                }}
                              >
                                {timestamp}
                              </td>
                            </tr>
                          )
                      )
                      ?.reverse()}
                  </>
                ) : (
                  ""
                )}
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter style={{ backgroundColor: "#21252b" }}>
            <Button color="secondary" onClick={toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </MainLayout>
  );
}

const header = {
  backgroundColor: "#24a2b7",
  color: "white",
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
};

export default Farming;
