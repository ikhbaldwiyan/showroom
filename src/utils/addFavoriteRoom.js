import { toast } from 'react-toastify';
import { addRoomFavoriteSucces } from "redux/actions/roomFavorite";

export const addFavoriteRoom = (dispatch, profile) => {
  const oldProfile = localStorage.getItem('favorites') && JSON.parse(localStorage.getItem('favorites') || "");

  if (!oldProfile) {
    localStorage.setItem('favorites', JSON.stringify([profile]))
    dispatch(addRoomFavoriteSucces([profile]))
  } else {
    localStorage.setItem('favorites', JSON.stringify([
      ...oldProfile,
      profile
    ]))
    dispatch(addRoomFavoriteSucces([
      ...oldProfile,
      profile
    ]))
  }

  toast.success(`${profile.room_name} added to favorite room`)
}