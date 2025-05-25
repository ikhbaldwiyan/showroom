import React, { useEffect, useState, useMemo } from "react";
import { Row } from "reactstrap";

import RoomsPlayer from "./components/RoomsPlayer";
import MainLayout from "pages/layout/MainLayout";
import RoomListMultiSR from "./components/RoomListMultiSR";

const getLayoutName = (layoutValue) => {
  switch (layoutValue) {
    case "4":
      return "threeRoom"; // Layout 4 shows 3 rooms
    case "3":
      return "fourRoom"; // Layout 3 shows 4 rooms
    case "6":
      return "twoRoom"; // Layout 6 shows 2 rooms
    default:
      return "";
  }
};

const getLayoutRoomCount = (layoutValue) => {
  switch (layoutValue) {
    case "4":
      return 3; // Layout 4 shows 3 rooms
    case "3":
      return 4; // Layout 3 shows 4 rooms
    case "6":
      return 2; // Layout 6 shows 2 rooms
    default:
      return 0;
  }
};

export default function MultiRoom(props) {
  const [layout, setLayout] = useState("6"); // Default to layout "6" (twoRoom)
  const [loading, setLoading] = useState(false);
  const [hideMultiMenu, setHideMultiMenu] = useState(false);
  const [isFarming, setIsFarming] = useState(false);

  const multiRoomInitialState = {
    1: { id: "", name: "" },
    2: { id: "", name: "" },
    3: { id: "", name: "" },
    4: { id: "", name: "" }
  };

  const [multiRoom, setMultiRoom] = useState(multiRoomInitialState);

  const layoutName = getLayoutName(layout);
  const roomCount = getLayoutRoomCount(layout);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [layout]);

  // Determine if we're in multi-room mode (any layout that shows more than 1 room)
  const isMultiRoom = roomCount > 1 ? "isMultiRoom" : "";

  // Load saved room data from localStorage on initial mount
  useEffect(() => {
    const storedMultiRoom = localStorage.getItem("multiRoom");
    if (storedMultiRoom) {
      try {
        setMultiRoom(JSON.parse(storedMultiRoom));
      } catch (e) {
        console.error("Error parsing stored multiRoom data:", e);
        localStorage.removeItem("multiRoom");
      }
    }
  }, []);

  // Save room data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("multiRoom", JSON.stringify(multiRoom));
  }, [multiRoom]);

  // Reset all rooms to empty
  const handleClearRoom = () => {
    setMultiRoom(multiRoomInitialState);
    localStorage.removeItem("multiRoom");
  };

  // Update a specific room position with new data
  const updateMultiRoom = (number, id, name) => {
    setMultiRoom((prevMultiRoom) => ({
      ...prevMultiRoom,
      [number]: { id, name }
    }));
  };

  // Remove a specific room
  const removeSelectedRoom = (number) => {
    setMultiRoom((prevMultiRoom) => ({
      ...prevMultiRoom,
      [number]: { id: "", name: "", url: "" }
    }));
  };

  // Props to pass to Multi components
  const propsMultiRoom = {
    hideMultiMenu,
    setHideMultiMenu,
    layout,
    setLayout,
    layoutName,
    theme: props.theme,
    isFarming,
    setIsFarming,
    updateMultiRoom,
    handleClearRoom,
    removeSelectedRoom
  };

  // Determine which rooms to render based on the layout
  const memoizedLayoutElements = useMemo(() => {
    const rooms = [];

    // Room 1 and 2 are always shown (all layouts have at least 2 rooms)
    rooms.push(
      <RoomsPlayer
        key="room1"
        {...propsMultiRoom}
        number="1"
        selectedRoom={multiRoom[1]}
      />,
      <RoomsPlayer
        key="room2"
        {...propsMultiRoom}
        number="2"
        selectedRoom={multiRoom[2]}
      />
    );

    // Add room 3 if layout shows 3 or 4 rooms (threeRoom or fourRoom)
    if (roomCount >= 3) {
      rooms.push(
        <RoomsPlayer
          key="room3"
          {...propsMultiRoom}
          number="3"
          selectedRoom={multiRoom[3]}
        />
      );
    }

    // Add room 4 if layout shows 4 rooms (fourRoom)
    if (roomCount >= 4) {
      rooms.push(
        <RoomsPlayer
          key="room4"
          {...propsMultiRoom}
          number="4"
          selectedRoom={multiRoom[4]}
        />
      );
    }

    return rooms;
  }, [layout, loading, multiRoom, propsMultiRoom, roomCount]);

  return (
    <MainLayout
      title={`Multi Room (${layoutName})`}
      {...props}
      isMultiRoom={isMultiRoom}
    >
      <div className="layout">
        <Row className="d-flex">{memoizedLayoutElements}</Row>

        <RoomListMultiSR
          updateMultiRoom={updateMultiRoom}
          multiRoom={multiRoom}
          setRoomId={() => {}}
          roomCount={roomCount}
          layoutName={layoutName}
          setLayout={setLayout}
        />
      </div>
    </MainLayout>
  );
}
