import RoomList from 'parts/RoomList';
import React, { useEffect } from 'react'
import { MdOutlineSearchOff } from "react-icons/md";
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
        {roomFavorite && roomFavorite.length !== 0 ? (
          <RoomList room={roomFavorite} theme={props.theme} isFavoriteRoom />
        ) : (
          <div>
            <h3 className="py-4">
              Room Favorite
            </h3>
            <p style={{ fontSize: 18}}>
              <MdOutlineSearchOff className="inline" size={35} /> Room Not Found please add it
            </p>
          </div>
        )}
      </section>
    </MainLayout>
  )
}

export default FavoriteRoom