import RoomList from 'parts/RoomList';
import React, { useEffect } from 'react'
import { MdOutlineSearchOff } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { getRoomFavorite } from "redux/actions/roomFavorite";
import MainLayout from "./layout/MainLayout";

function FavoriteRoom(props) {
  const roomFavorite = useSelector((state) => state.roomFavorite.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoomFavorite())
    window.document.title = 'Room Favorite';
  }, [dispatch])
  
  return (
    <MainLayout {...props}>
      <section className="container">
        <ToastContainer 
          position="top-right"
          autoClose={3000} 
        />
        {roomFavorite && roomFavorite.length !== 0 ? (
          <RoomList room={roomFavorite} theme={props.theme} isFavoriteRoom />
        ) : (
          <div>
            <div className="py-4" style={{display: "flex", justifyContent: "space-between"}}>
              <h3 >
                Room Favorite
              </h3>
            </div>
            <p style={{ fontSize: 18}}>
              <MdOutlineSearchOff className="inline" size={35} /> Room Not Found please add it in profile
            </p>
          </div>
        )}
      </section>
    </MainLayout>
  )
}

export default FavoriteRoom