import { Container, Table } from "reactstrap";
import MainLayout from "./layout/MainLayout";
import React, { useEffect, useState } from "react";
import { Loading } from "components";
import { FARM, GET_OFFICIAL } from "utils/api/api";
import axios from "axios";
import Button from "elements/Button";

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


  useEffect(() => {
    const userSession = localStorage.getItem("session");
    const officialRoom = localStorage.getItem("official_room");
    const successRoom = localStorage.getItem("success_room");

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
      const foundSuccess = JSON.parse(successRoom);
      setSuccessRoom(foundSuccess);
    }
  }, []);

  const renderSwitch = (message) => {
    switch (message) {
      case 'foo':
        return 'bar';
      default:
        return 'foo';
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


  const test = async () => {
    // setSuccessRoom(successRoom.push('HAHAH'));
    // setSuccessRoom(prevData => [...prevData, '2103']);
    // localStorage.setItem("succes_room", JSON.stringify(successRoom.push('HAHAH')));
    // console.log('Tambah');

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
        await new Promise(resolve => setTimeout(resolve, 50 * 1000));

        const response2 = await axios.post(FARM, {
          cookies_login_id: cookiesLoginId,
          room_id: roomId
        });

        const data2 = response2.data;
        console.log(data2, 'SECOND');

        if (data2.message.includes('Sukses')) {
          // localStorage.setItem('success_room', JSON.stringify()) 
          // setCountSuccess(countSuccess + 1)
          // localStorage.setItem("count_success", JSON.stringify(countSuccess + 1));
          // console.log('Tambah');
        }

        if (data2.message.includes('Gagal')) {
          setAllMessage(prevData => [...prevData, data2.message]);
          return;
        }

        setAllMessage(prevData => [...prevData, data2.message]);
      }

      if (data.message.includes('Sukses')) {
        setCountSuccess(countSuccess + 1)
        localStorage.setItem("count_success", JSON.stringify(countSuccess + 1));
      }

      if (data.message.includes('Gagal')) {
        return;
      }

      setCompletedRoomIds(prevRoomIds => [...prevRoomIds, roomId]);

      setProgress(prevProgress => prevProgress + (100 / officialRoom.length));
      setCurrentRoomId(null);
    }
    // setLoading(false);
  };

  return (
    <MainLayout {...props} style={{ color: 'white' }}>
      <Container>
        <Button onClick={getOfficials} className="btn mb-5 text-light float-start" disabled={btnLoadingRoom ? true : false} style={{ backgroundColor: "#24a2b7" }}>
          {btnLoadingRoom ? <Loading color="white" size={8} /> : "Fetch Room"}
        </Button>
        <Button onClick={test} className="btn mb-5 text-light float-right" style={{ backgroundColor: "#24a2b7" }}>
          RUN TOOLS
        </Button>
        <div className="row">
          <Table bordered className="col-4">
            <thead style={{ backgroundColor: "#24a2b7", color: "white" }}>
              <tr style={{ textAlign: "center" }}>
                <th>ROOM ID</th>
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

          <div className="col-8">
            Sukses Room : {successRoom}
            {loading ?
              (
                <div>
                  {currentRoomId ? (
                    <p>Fetching data for roomId: {currentRoomId}</p>
                  ) : null}
                  <div style={{ width: "100%", height: "20px", background: "#ddd" }}>
                    <div
                      style={{
                        width: `${progress}%`,
                        height: "100%",
                        background: "#4CAF50"
                      }}
                    />
                  </div>

                  <div className="my-3">
                    <p className="p-0 m-0">Completed roomIds:</p>
                    <span>
                      {completedRoomIds.join(", ")}
                    </span>
                  </div>

                  <div className="">
                    <p>Message:</p>
                    {allMessage.map(
                      (message, idx) => (
                        <li key={idx}>
                          <p className={message.includes('Sukses') ? 'text-success' : 'text-light'}>
                            {message}
                          </p>
                        </li>
                      )
                    )}
                  </div>

                </div>
              ) : (
                ''
                // data.map(item => (
                //   // <p>{item.message}</p>
                // ))
              )}
          </div>
        </div>
      </Container>
    </MainLayout>
  );
}

export default Farm;
