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
  let title = profile.room_url_key.includes("JKT48") && profile.room_url_key !== 'officialJKT48';
  let name = title ? `${profile.room_url_key.slice(6)} JKT48` : profile.room_name;

  toast.success(`${name} added to favorite room`)
}