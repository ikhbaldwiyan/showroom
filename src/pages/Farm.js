import { Container, Table } from "reactstrap";
import MainLayout from "./layout/MainLayout";
import React, { useEffect, useState, useRef } from "react";
import { Loading } from "components";
import { FARM, GET_OFFICIAL } from "utils/api/api";
import axios from "axios";
import Button from "elements/Button";
import { toast } from "react-toastify";

function Farm(props) {
  const [cookiesLoginId, setCookiesLoginId] = useState("");
  const [session, setSession] = useState("");
  const [officialRoom, setOfficialRoom] = useState([]);

  const [btnLoadingRoom, setBtnLoadingRoom] = useState(false);
  const [successRoom, setSuccessRoom] = useState([]);

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [currentRoomId, setCurrentRoomId] = useState('');
  const [completedRoomIds, setCompletedRoomIds] = useState([]);
  const [allMessage, setAllMessage] = useState([]);
  const [time, setTime] = useState(0);

  const [limitUntil, setLimitUntil] = useState([]);

  useEffect(() => {
    const userSession = localStorage.getItem("session");
    const officialRoom = localStorage.getItem("official_room");
    const successRoom = localStorage.getItem("success_room");
    const limited = localStorage.getItem("limit_until");

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
    }

    if (limited) {
      const foundLimit = JSON.parse(limited);
      setLimitUntil(foundLimit);
      let formatTime = foundLimit.replaceAll('.', '').split('after ')

      let currentTime = new Date();
      let currentDate = currentTime.toISOString().substr(0, 10);
      let targetTime = new Date(currentDate + " " + formatTime[1] + ":00");

      if (currentTime.getTime() > targetTime.getTime()) {
        targetTime.setDate(targetTime.getDate() + 1);
      }

      // console.log(currentTime, currentTime.getTime());
      // console.log(targetTime, targetTime.getTime());

      let timeUntilTarget = targetTime.getTime() - currentTime.getTime();
      console.log(timeUntilTarget);

      setTimeout(() => {
        localStorage.removeItem('official_room');
        localStorage.removeItem('success_room');
        localStorage.removeItem('limit_until');
        console.log('deleted');
      }, timeUntilTarget);
    }

  }, []);


  const textColor = (message) => {
    if (message.includes('Sukses')) {
      return 'text-success'
    } else if (message.includes('Gagal')) {
      return 'text-danger'
    } else if (message.includes('Sedang')) {
      return 'text-warning'
    } else {
      return 'text-secondary'
    }
  }

  const getOfficials = async () => {
    try {
      setBtnLoadingRoom(true);
      const response = await axios.get(GET_OFFICIAL);
      if (response.data.room_id) {
        localStorage.setItem("official_room", JSON.stringify(response.data.room_id))
        setOfficialRoom(response.data.room_id);
        console.log(response.data.room_id);
        setBtnLoadingRoom(false);
      }
    } catch (err) {
      setBtnLoadingRoom(false);
    }
  };

  const setLocalAndState = (roomId) => {
    var storedArray = localStorage.getItem('success_room');
    storedArray = JSON.parse(storedArray) || [];

    storedArray.push(roomId);
    storedArray = JSON.stringify(storedArray);
    localStorage.setItem('success_room', storedArray);
    setSuccessRoom(storedArray);
  }

  const deleteArray = () => {
    let arrayLocal = localStorage.getItem("official_room");
    arrayLocal = JSON.parse(arrayLocal) || [];

    let updatedArray = [...arrayLocal];
    updatedArray.shift();
    setOfficialRoom(updatedArray);
    localStorage.setItem("official_room", JSON.stringify(updatedArray));
  };

  const intervalId = useRef(null);

  const decrementTime = () => {
    clearInterval(intervalId.current);
    setTime(50);
    intervalId.current = setInterval(() => {
      setTime(time => {
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
        room_id: roomId
      });

      const data = response.data;
      console.log(data, 'FIRST');

      setAllMessage(prevData => [...prevData, data.message]);

      if (data.message.includes('Sedang')) {
        setTime(50)
        decrementTime()

        await new Promise(resolve => setTimeout(resolve, 50 * 1000));

        const response2 = await axios.post(FARM, {
          cookies_login_id: cookiesLoginId,
          room_id: roomId
        });

        const data2 = response2.data;
        console.log(data2, 'SECOND');

        if (data2.message.includes('Sukses')) {
          deleteArray()
          setLocalAndState(roomId)
          toast.success(`Sukses Farm Di Room : ${roomId}`, {
            theme: "colored"
          });
        }

        if (data2.message.includes('Gagal')) {
          deleteArray()
          setAllMessage(prevData => [...prevData, data2.message]);
          toast.error(
            data2.message.split(": ")[1] ??
            "An error occured. Please go back and try again.",
            {
              theme: "colored"
            }
          );
          localStorage.setItem('limit_until', JSON.stringify(data2.until));
          setLimitUntil(data2.until)
          return;
        }

        if (data2.message.includes('Sedang')) {
          deleteArray()
        }

        if (data2.message.includes('Offline')) {
          deleteArray()
        }

        setAllMessage(prevData => [...prevData, data2.message]);
      }

      if (data.message.includes('Sukses')) {
        deleteArray()
        setLocalAndState(roomId)
        toast.success(`Sukses Farm Di Room : ${roomId}`, {
          theme: "colored"
        });
      }

      if (data.message.includes('Gagal')) {
        deleteArray()
        toast.error(
          data.message.split(": ")[1] ??
          "An error occured. Please go back and try again.",
          {
            theme: "colored"
          }
        );
        localStorage.setItem('limit_until', JSON.stringify(data.until));
        setLimitUntil(data.until)
        return;
      }

      if (data.message.includes('Offline')) {
        deleteArray()
      }
      setCompletedRoomIds(prevRoomIds => [...prevRoomIds, roomId]);

      setProgress(prevProgress => prevProgress + (100 / officialRoom.length));
      setCurrentRoomId(null);
    }
  };

  const setWithExpiry = (key, value, ttl) => {
    const now = new Date()

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))
  }

  const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key)
    // if the item doesn't exist, return null
    if (!itemStr) {
      return null
    }

    const item = JSON.parse(itemStr)
    const now = new Date()
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key)
      return null
    }
    return item.value
  }

  return (
    <MainLayout {...props} style={{ color: 'white' }}>

      <div className="row mb-5 justify-content-between">
        <Button onClick={getOfficials} className="btn text-light" disabled={btnLoadingRoom ? true : false} style={{ backgroundColor: "#24a2b7" }}>
          {btnLoadingRoom ? <Loading color="white" size={8} /> : "Fetch Room"}
        </Button>
        <Button onClick={startFarming} className="btn text-light" style={{ backgroundColor: "#24a2b7" }}>
          RUN TOOLS
        </Button>
      </div>

      {
        limitUntil ? (
          <div className="row mb-5 justify-content-center text-warning">
            <h3>
              {limitUntil}
            </h3>
          </div>
        ) : ''
      }


      <div className="row">
        <Table bordered className="col-3">
          <thead style={{ backgroundColor: "#24a2b7", color: "white" }}>
            <tr style={{ textAlign: "center" }}>
              <th>LIST ROOM FARM</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center", color: props.theme === "dark" && "white" }}>
            {officialRoom.map(
              (room, idx) => (
                <tr key={idx}>
                  <td>{room}</td>
                </tr>
              )
            )}
          </tbody>
        </Table>

        <div className="col-9">
          Sukses farming di Room :
          <p>
            {/* {successRoom.join(", ")} */}
            {JSON.stringify(successRoom).replaceAll(',', ',  ').replaceAll('"', '')}
          </p>

          Jumlah Sukes Melakukan Faming :
          <p>
            {successRoom.length}
          </p>


          {currentRoomId ? (
            time == 0 ? '' : <p>Sedang farming di Room {currentRoomId} silahkan menunggu {time} detik</p>
          ) : null}

          <div>
            {/* <div style={{ width: "100%", height: "20px", background: "#ddd" }}>
                    <div
                      style={{
                        width: `${progress}%`,
                        height: "100%",
                        background: "#4CAF50"
                      }}
                    />
                  </div> */}

            {/* <div className="my-3">
                <p className="p-0 m-0">Telah farm di Room :</p>
                <span>
                  {completedRoomIds.join(", ")}
                </span>
              </div> */}

            <div className="">
              <p>Status:</p>
              <ul>
                {allMessage.map(
                  (message, idx) => (
                    <li key={idx}>
                      <p className={textColor(message)}>
                        {message}
                      </p>
                    </li>
                  )
                )}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Farm;
