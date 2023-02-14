import { Container, Table } from "reactstrap";
import MainLayout from "./layout/MainLayout";
import React, { useEffect, useState, useRef } from "react";
import { Loading } from "components";
import { FARM, GET_OFFICIAL } from "utils/api/api";
import axios from "axios";
import { toast } from "react-toastify";

function Farm(props) {
  const [cookiesLoginId, setCookiesLoginId] = useState("");
  const [session, setSession] = useState("");
  const [officialRoom, setOfficialRoom] = useState([]);

  const [btnLoadingRoom, setBtnLoadingRoom] = useState(false);
  const [loading, setLoading] = useState(false);

  const [successRoom, setSuccessRoom] = useState([]);

  const [currentRoomId, setCurrentRoomId] = useState("");
  const [allMessage, setAllMessage] = useState([]);
  const [time, setTime] = useState(0);

  const [limitUntil, setLimitUntil] = useState("");
  const [until, setUntil] = useState("");
  const [countSuccess, setCountSuccess] = useState(0);
  const intervalId = useRef(null);

  useEffect(() => {
    const userSession = localStorage.getItem("session");
    const officialRoom = localStorage.getItem("official_room");
    const successRoom = localStorage.getItem("success_room");
    const limited = localStorage.getItem("limit_until");
    const untilLocal = localStorage.getItem("until");

    if (userSession) {
      const foundSession = JSON.parse(userSession);
      setSession(foundSession);
      setCookiesLoginId(foundSession.cookie_login_id);
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
        console.log("deleted");
      }, timeUntilTarget);
    }

    if (limited) {
      const foundLimit = JSON.parse(limited);
      setLimitUntil(foundLimit);
    }
  }, []);

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
      return "text-warning";
    } else {
      return "text-secondary";
    }
  };

  const getOfficials = async () => {
    try {
      setBtnLoadingRoom(true);
      const response = await axios.get(GET_OFFICIAL);
      if (response.data.room_id) {
        localStorage.setItem(
          "official_room",
          JSON.stringify(response.data.room_id)
        );
        setOfficialRoom(response.data.room_id);
        console.log(response.data.room_id);
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
        if (time > 0) {
          return time - 1;
        }
        clearInterval(intervalId.current);
        return 0;
      });
    }, 1000);
  };

  const startFarming = async () => {
    for (let i = 0; i < officialRoom.length; i++) {
      setLoading(true);
      const roomId = officialRoom[i];

      setCurrentRoomId(roomId);
      const response = await axios.post(FARM, {
        cookies_login_id: cookiesLoginId,
        room_id: roomId,
      });

      const data = response.data;
      console.log(data, "FIRST");

      setAllMessage((prevData) => [...prevData, data.message]);

      if (data.message.includes("Sedang")) {
        setTime(50);
        decrementTime();

        await new Promise((resolve) => setTimeout(resolve, 50 * 1000));

        const response2 = await axios.post(FARM, {
          cookies_login_id: cookiesLoginId,
          room_id: roomId,
        });

        const data2 = response2.data;
        console.log(data2, "SECOND");

        if (data2.message.includes("Sukses")) {
          deleteArray();
          setLocalAndState(roomId);
          toast.success(`Sukses Farm Di Room : ${roomId}`, {
            theme: "colored",
          });
        }

        if (data2.message.includes("Gagal")) {
          deleteArray();
          setAllMessage((prevData) => [...prevData, data2.message]);
          toast.error(
            data2.until ?? "Please try again after the displayed time",
            {
              theme: "colored",
            }
          );
          localStorage.setItem("limit_until", JSON.stringify(data2.until));
          setLimitUntil(data2.until);
          setExpire(data2.until);
          setLoading(false);
          return;
        }

        if (data2.message.includes("Sedang")) {
          deleteArray();
          data2.message = "[" + roomId + "] Skip Room";
        }

        if (data2.message.includes("Offline")) {
          deleteArray();
        }

        setAllMessage((prevData) => [...prevData, data2.message]);
      }

      if (data.message.includes("Sukses")) {
        deleteArray();
        setLocalAndState(roomId);
        toast.success(`Sukses Farm Di Room : ${roomId}`, {
          theme: "colored",
        });
      }

      if (data.message.includes("Gagal")) {
        deleteArray();
        toast.error(data.until ?? "Please try again after the displayed time", {
          theme: "colored",
        });
        localStorage.setItem("limit_until", JSON.stringify(data.until));
        setExpire(data.until);
        setLimitUntil(data.until);
        setLoading(false);
        return;
      }

      if (data.message.includes("Offline")) {
        deleteArray();
      }

      setCurrentRoomId(null);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <MainLayout {...props} style={{ color: "white" }}>
      <div className="row mb-5 justify-content-between">
        <button
          onClick={getOfficials}
          className="btn text-light"
          disabled={btnLoadingRoom ? true : false || limitUntil ? true : false}
          style={{ backgroundColor: "#24a2b7" }}
        >
          {btnLoadingRoom ? <Loading color="white" size={8} /> : "Fetch Room"}
        </button>
        
        {officialRoom.length > 0 ? (
          <button
            onClick={startFarming}
            className="btn text-light"
            disabled={loading ? true : false}
            style={{ backgroundColor: "#24a2b7" }}
          >
            {loading ? <Loading color="white" size={8} /> : "RUN FARM"}
          </button>
        ) : ''}
      </div>

      {limitUntil ? (
        <div className="row mb-5 justify-content-center text-danger">
          <h3>{limitUntil}</h3>
        </div>
      ) : (
        ""
      )}

      {officialRoom.length > 0 ? (
        <div className="row">
          <Table bordered className="col-3">
            <thead style={{ backgroundColor: "#24a2b7", color: "white" }}>
              <tr style={{ textAlign: "center" }}>
                <th>LIST ROOM FARM</th>
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
                  <td>{room}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="col-9 pl-5">
            {currentRoomId ? (
              time == 0 ? (
                ""
              ) : (
                <div className="mb-3">
                  <p className="text-light" style={{ fontWeight: "bold" }}>
                    Sedang farming di Room {currentRoomId} silahkan menunggu{" "}
                    {time} detik
                  </p>
                </div>
              )
            ) : null}

            <div className="">
              <p className="text-success m-0">Sukses farming di Room :</p>
              <p className="text-success">
                {JSON.stringify(successRoom)
                  .replaceAll(",", ",  ")
                  .replaceAll('"', "")}
              </p>
            </div>
            <div>
              <p>Progress Farm : </p>
              <div
                style={{ width: "100%", height: "20px", borderRadius: "10px" }}
                className="col mb-5 p-0 bg-secondary" >
                <div
                  style={{
                    width: `${(countSuccess / 10) * 100}%`,
                    height: "100%",
                    borderRadius: "10px",
                    background: "#4CAF50",
                  }}
                >
                  <p className="text-center m-1">{(countSuccess / 10) * 100}%</p>
                </div>
              </div>

              <div className="mt-5">
                <p>Status Log :</p>
                <ul className="pl-3">
                  {allMessage.map((message, idx) => (
                    <li key={idx}>
                      <p className={textColor(message)}>{message}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) :
        <div className="row mb-5 justify-content-center text-light">
          <h3>Please click "Fetch Room" before start farming</h3>
        </div>
      }
    </MainLayout>
  );
}

export default Farm;
