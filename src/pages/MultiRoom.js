import React, { useEffect, useState } from "react";
import { Container, Row } from "reactstrap";

import MainLayout from "./layout/MainLayout";
import Multi from "parts/Multi";
import Loading from "components/Loading";
import MultiMenu from "components/MultiMenu";
import AlertInfo from "components/AlertInfo";
import FarmStars from "components/FarmStars";

export default function MultiRoom(props) {
  const [layout, setLayout] = useState("6");
  const [loading, setLoading] = useState(false);
  const [hideMultiMenu, setHideMultiMenu] = useState(false);
  const [isFarming, setIsFarming] = useState(false);

  const multiRoomState = {
    1: {
      id: "",
      name: "",
    },
    2: {
      id: "",
      name: "",
    },
    3: {
      id: "",
      name: "",
    },
    4: {
      id: "",
      name: "",
    },
  }
  const [multiRoom, setMultiRoom] = useState(multiRoomState);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [layout]);

  const isMultiRoom = layout === "4" || layout === "3" ? "isMultiRoom" : "";

  const updateMultiRoom = (number, id, name) => {
    setMultiRoom((prevMultiRoom) => ({
      ...prevMultiRoom,
      [number]: {
        id,
        name,
      },
    }));
  };

  useEffect(() => {
    // Retrieve multiRoom data from local storage
    const storedMultiRoom = localStorage.getItem('multiRoom');
    if (storedMultiRoom) {
      setMultiRoom(JSON.parse(storedMultiRoom));
    }
  }, []);
  
  useEffect(() => {
    // Save multiRoom data to local storage
    localStorage.setItem('multiRoom', JSON.stringify(multiRoom));
  }, [multiRoom]);

  const handleClearRoom = () => {
    setMultiRoom(multiRoomState);
    localStorage.removeItem('multiRoom');
  };

  const removeSelectedRoom = (number) => {
    const updatedMultiRoom = {
      ...multiRoom,
      [number]: {
        id: "", // Reset the ID to initial state
        name: "", // Reset the name to initial state
      },
    };
    setMultiRoom(updatedMultiRoom);
    localStorage.setItem('multiRoom', JSON.stringify(updatedMultiRoom));
  };

  const propsMultiRoom = {
    hideMultiMenu,
    setHideMultiMenu,
    layout,
    setLayout,
    theme: props.theme,
    isFarming,
    setIsFarming,
    updateMultiRoom,
    handleClearRoom,
    removeSelectedRoom
  };

  return (
    <MainLayout title="Multi Room" {...props} isMultiRoom={isMultiRoom}>
      <Container fluid>
        <MultiMenu {...propsMultiRoom} />
        <Row className="d-flex">
          <Multi {...propsMultiRoom} number="1" selectedRoom={multiRoom[1]} />
          {isFarming && layout !== "4" && layout !== "3" ? (
            <FarmStars {...propsMultiRoom} />
          ) : (
            <Multi {...propsMultiRoom} number="2" selectedRoom={multiRoom[2]} />
          )}
          {layout === "4" || layout === "3" ? (
            loading && layout !== "3" ? (
              <Loading />
            ) : isFarming && layout === "4" ? (
              <FarmStars {...propsMultiRoom} />
            ) : (
              <Multi {...propsMultiRoom} number="3" selectedRoom={multiRoom[3]} />
            )
          ) : (
            ""
          )}
          {layout === "3" &&
            (loading && layout !== "4" ? (
              <Loading />
            ) : isFarming && layout === "3" ? (
              <FarmStars {...propsMultiRoom} />
            ) : (
              <Multi {...propsMultiRoom} number="4" selectedRoom={multiRoom[4]} />
            ))}
        </Row>
      </Container>
    </MainLayout>
  );
}
