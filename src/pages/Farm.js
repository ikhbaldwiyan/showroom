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
  const [data, setData] = useState([]);

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


  const fetchData = async (roomId) => {
    setCurrentRoomId(roomId);
    try {
      const response = await axios.post(FARM, {
        cookies_login_id: cookiesLoginId,
        room_id: roomId
      });

      const data = response.data;
      console.log(data);

      setCompletedRoomIds(prevRoomIds => [...prevRoomIds, roomId]);
      setProgress(prevProgress => prevProgress + (100 / officialRoom.length));
      setCurrentRoomId(null);

      return data;
    } catch (err) {
      console.log(error);
    }
  }

  async function fetchAllData() {
    setLoading(true);

    const promises = officialRoom.map(roomId => fetchData(roomId));
    const results = await Promise.all(promises);

    setData(results);
    setLoading(false);
  }


  return (
    <MainLayout {...props} style={{ color:'white' }}>
      <Container>
        <Button onClick={getOfficials} className="btn mb-5 text-light float-start" style={{ backgroundColor: "#24a2b7" }}>
          FETCH ROOM
        </Button>
        <Button onClick={fetchAllData} className="btn mb-5 text-light float-right" style={{ backgroundColor: "#24a2b7" }}>
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

        <div className="col-6">
          {loading ? (
            <div>
              <p className="text-light">Loading...</p>
              {currentRoomId ? (
                <p>Fetching data for roomId: {currentRoomId}</p>
              ) : null}
              <p>Completed roomIds: {completedRoomIds.join(", ")}</p>
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
