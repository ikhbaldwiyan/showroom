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

function Farming(props) {
  const [cookiesLoginId, setCookiesLoginId] = useState("");
  const [session, setSession] = useState("");
  const [officialRoom, setOfficialRoom] = useState([]);

  const [btnLoadingRoom, setBtnLoadingRoom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successRoom, setSuccessRoom] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [currentRoomId, setCurrentRoomId] = useState("");
  const [allMessage, setAllMessage] = useState([]);
  const [time, setTime] = useState(0);

  const [limitUntil, setLimitUntil] = useState("");
  const [until, setUntil] = useState("");
  const [countSuccess, setCountSuccess] = useState(0);
  const intervalId = useRef(null);

  const [star, setStar] = useState({
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
  });

  const [isReady, setIsReady] = useState(false);
  const [starLoading, setStarLoading] = useState(false);

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
      }, timeUntilTarget);
    }

    if (limited) {
      const foundLimit = JSON.parse(limited);
      setLimitUntil(foundLimit);
    }

    setIsReady(true);
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
      if (!data.message.includes("Offline") && !data.message.includes("Skip")) {
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
    } else if (message.includes("Sedang")) {
      return "text-primary";
    } else if (message.includes("Offline")) {
      return "text-secondary";
    } else {
      return "text-warning";
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
    setTime(50);
    intervalId.current = setInterval(() => {
      setTime((time) => {
        console.log(time);
        if (time > 0) {
          return setTime(time - 1);
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

  const setGagal = (data) => {
    toast.error(data.until ?? "Please try again after the displayed time", {
      theme: "colored",
    });
    localStorage.setItem("limit_until", JSON.stringify(data.until));
    setLimitUntil(data.until);
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

  const startFarming = async () => {
    for (let i = 0; i < officialRoom.length; i++) {
      setLoading(true);
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

      setAllMessage((prevData) => [
        ...prevData,
        { message: data.message, timestamp }
      ]);

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
          toast.success(`Sukses Farm Di Room : ${roomName}`, {
            theme: "colored",
          });
        }

        if (data2.message.includes("Gagal")) {
          deleteArray();
          setAllMessage((prevData) => [
            ...prevData,
            { message: data2.message, timestamp },
          ]);
          setGagal(data2);
          setLoading(false);
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
        setGagal(data);
        setLoading(false);
        return;
      }

      if (data.message.includes("Offline")) {
        deleteArray();
      }

      setCurrentRoomId(null);
      setLoading(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("farming_log", JSON.stringify(allMessage));
  }, [allMessage]);

  const checkAllStars = () => {
    const values = Object.values(star); // Get all values from the `star` object
    return values.every((value) => value === 99); // Check if all values are 99
  };

  return (
    <MainLayout {...props} style={{ color: "white" }}>
      <Container>
        {limitUntil ? (
          <>
            <div className="row my-4 justify-content-center text-danger text-center">
              <h3>{limitUntil}</h3>
            </div>
            <hr style={{ borderColor: "silver" }} />
          </>
        ) : (
          <Container>
            <div className="row justify-content-between">
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
                  <Loading color="white" size={8} />
                ) : (
                  "Fetch Room"
                )}
              </Button>
              {officialRoom.length > 0 ? (
                <Button
                  onClick={handleCheckStar}
                  className="btn text-light"
                  disabled={loading ? true : false}
                  style={{ backgroundColor: "#24a2b7" }}
                >
                  {loading || starLoading ? (
                    <Loading color="white" size={8} />
                  ) : (
                    "Start Farming"
                  )}
                </Button>
              ) : (
                ""
              )}
            </div>
          </Container>
        )}

        {officialRoom.length > 0 ? (
          <>
            <div className="row mt-4">
              <div className="col-md-4 col-sm-12">
                <h4 className="text-center">Farming Result : </h4>
                <div className="row mb-3 justify-content-center">
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
                          size={3}
                        />
                      ) : (
                        <p>{count}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-8 col-sm-12">
                {successRoom && successRoom.length > 0 ? (
                  <div className="d-flex">
                    <p className="mr-1">Total Success Farming Room :</p>
                    <p className="text-success">{countSuccess}</p>
                  </div>
                ) : (
                  ""
                )}
                {currentRoomId
                  ? time !== 0 && (
                      <div className="mb-3">
                        <p style={{ fontWeight: "bold" }}>
                          Process farming in{" "}
                          <span className="text-primary">{currentRoomId}</span>{" "}
                          <br />
                          please wait{" "}
                          <span className="text-main">{time} second</span>
                        </p>
                      </div>
                    )
                  : null}
                <div>
                  <div
                    style={{
                      width: "100%",
                      height: "25px",
                      borderRadius: "15px",
                    }}
                    className="col mb-5 p-0 bg-secondary"
                  >
                    <div
                      style={{
                        width: limitUntil
                          ? "100%"
                          : `${(countSuccess / 10) * 100}%`,
                        height: "100%",
                        borderRadius: "15px",
                        background: "#4CAF50",
                      }}
                    >
                      {limitUntil ? (
                        <p className="text-center text-light m-3">100%</p>
                      ) : (
                        <p className="text-left mx-3 text-light">
                          {(countSuccess / 10) * 100 > 100
                            ? 100
                            : (countSuccess / 10) * 100}
                          %
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-sm-12 order-md-1 order-2">
                <Table bordered>
                  <thead style={{ backgroundColor: "teal", color: "white" }}>
                    <tr style={{ textAlign: "center" }}>
                      <th>List Online Room</th>
                    </tr>
                  </thead>
                  <tbody
                    style={{
                      textAlign: "center",
                      color: props.theme === "dark" && "white",
                    }}
                  >
                    {officialRoom.map((room, idx) => (
                      <tr key={idx}>
                        <td className="text-center">{room.room_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div className="col-md-8 col-sm-12 order-md-2 order-1">
                {allMessage.length > 0 ? (
                  <div>
                    <Table bordered>
                      <thead
                        style={{ backgroundColor: "#24a2b7", color: "white" }}
                      >
                        <tr className="text-center">
                          <th>Farming Log Message</th>
                          <th>Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allMessage
                          .reverse()
                          .map(({ message, timestamp }, idx) => (
                            <tr key={idx}>
                              <td className={textColor(message)}>{message}</td>
                              <td
                                className="text-light"
                                style={{ fontSize: 14 }}
                              >
                                {timestamp}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </>
        ) : (
          <Container>
            <div className="row mb-5 mt-5">
              <h3>Please click "Fetch Room" before start farming</h3>
            </div>
          </Container>
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
              }}
            >
              Run
            </Button>
            <Button color="danger" onClick={() => setShowModal(false)}>
              Cancel
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
