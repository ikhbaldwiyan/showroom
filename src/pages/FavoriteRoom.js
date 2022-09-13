import RoomList from 'parts/RoomList';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getRoomFavorite } from "redux/actions/roomFavorite";
import MainLayout from "./layout/MainLayout";


function FavoriteRoom(props) {
  const roomFavorite = useSelector((state) => state.roomFavorite.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoomFavorite())
  }, [dispatch])
  

  return (
    <MainLayout {...props}>
      <section className="container">
        <RoomList room={roomFavorite} theme={props.theme} isFavoriteRoom />
      </section>
    </MainLayout>
  )
}

export default FavoriteRoom