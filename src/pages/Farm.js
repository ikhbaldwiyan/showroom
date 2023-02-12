import { Container, Table } from "reactstrap";
import MainLayout from "./layout/MainLayout";
import React, { useEffect, useState } from "react";
import { Loading } from "components";
import { FARM, GET_OFFICIAL, LOGIN } from "utils/api/api";
import axios from "axios";
import Button from "elements/Button";

function Farm(props) {
  const [error, setError] = useState("");
  const [cookiesLoginId, setCookiesLoginId] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [session, setSession] = useState("");
  const [officialRoom, setOfficialRoom] = useState([]);
  const [farmStatus, setFarmStatus] = useState('');

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentRoomId, setCurrentRoomId] = useState('');
  const [completedRoomIds, setCompletedRoomIds] = useState([]);
  const [data, setData] = useState('');
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const userSession = localStorage.getItem("session");
    const officialRoom = localStorage.getItem("official_room");

    if (userSession) {
      const foundSession = JSON.parse(userSession);
      setSession(foundSession);
      setCookiesLoginId(foundSession.cookie_login_id);
    }

    if (officialRoom) {
      const foundOfficial = JSON.parse(officialRoom);
      setOfficialRoom(foundOfficial);
    }
  }, []);

  const getOfficials = async () => {
    try {
      const response = await axios.get(GET_OFFICIAL);
      if (response.data.room_id) {
        localStorage.setItem("official_room", JSON.stringify(response.data.room_id))
        setOfficialRoom(response.data.room_id);
        console.log(response.data.room_id);
      }
    } catch (err) {
      console.log(error);
      setButtonLoading(false);
    }
  };


  const test = async () => {
    for (let i = 0; i < officialRoom.length; i++) {
      setLoading(true);
      const roomId = officialRoom[i];

      setCurrentRoomId(roomId);
      console.log(roomId, 'FIRST');

      await new Promise(resolve => setTimeout(resolve, 5000));

      console.log(roomId, 'SECOND');
      setAllData(prevData => [...prevData, `Berhasil Mengambil ${roomId}`]);

      setCompletedRoomIds(prevRoomIds => [...prevRoomIds, roomId]);

      setProgress(prevProgress => prevProgress + (100 / officialRoom.length));
      setCurrentRoomId(null);
    }
    // setLoading(false);
  };

  return (
    <MainLayout {...props} style={{ color: 'white' }}>
      <Container>
        <Button onClick={getOfficials} className="btn mb-5 text-light float-start" style={{ backgroundColor: "#24a2b7" }}>
          FETCH ROOM
        </Button>
        <Button onClick={test} className="btn mb-5 text-light float-right" style={{ backgroundColor: "#24a2b7" }}>
          RUN TOOLS
        </Button>

        {/* <Table bordered className="col-6">
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
        </Table> */}

        <div className="col-12">
          {loading ? 
          (
            <div>
              <p className="text-light">Loading...</p>
              {currentRoomId ? (
                <p>Fetching data for roomId: {currentRoomId}</p>
              ) : null}
              <p>Completed roomIds: {completedRoomIds.join(", ")}</p>
              <p>Completed Data: {allData.join(", ")}</p>
              <div style={{ width: "100%", height: "20px", background: "#ddd" }}>
                <div
                  style={{
                    width: `${progress}%`,
                    height: "100%",
                    background: "#4CAF50"
                  }}
                />
              </div>
            </div>
          ) : (
            ''
            // data.map(item => (
            //   // <p>{item.message}</p>
            // ))
          )}
        </div>
      </Container>
    </MainLayout>
  );
}

export default Farm;
