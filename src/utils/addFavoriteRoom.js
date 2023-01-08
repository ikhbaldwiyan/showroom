import { toast } from 'react-toastify';
import { addRoomFavoriteSucces } from "redux/actions/roomFavorite";

export const addFavoriteRoom = (dispatch, profile) => {
  let isFavorite = false;

  const oldProfile = localStorage.getItem('favorites') && JSON.parse(localStorage.getItem('favorites') || "");

  const urlKey = profile.room_url_key ?? profile.url_key;
  const roomName = profile.room_name ?? profile.name;

  let title = profile && urlKey.includes("JKT48") && urlKey !== 'officialJKT48';
  let name = title ? `${urlKey.slice(6)} JKT48` : roomName;

  // check room is in favorite
  for (let i = 0; i < oldProfile.length; i++) {
    const data = oldProfile[i];
    if (data.room_id === parseInt(profile.room_id ?? profile.id) || data.id === parseInt(profile.room_id ?? profile.id)) {
      isFavorite = true;
    }
  }

  if (isFavorite) {
    toast.error(`${name} already in favorite room`)
  } else  {
    if (!oldProfile) {
      localStorage.setItem('favorites', JSON.stringify([profile]))
      dispatch(addRoomFavoriteSucces([profile]))
    } else {
      localStorage.setItem('favorites', JSON.stringify([
        profile,
        ...oldProfile,
      ]))
      dispatch(addRoomFavoriteSucces([
        profile,
        ...oldProfile,
      ]))
    }
  }



  !isFavorite && toast.success(`${name} added to favorite room`)
}