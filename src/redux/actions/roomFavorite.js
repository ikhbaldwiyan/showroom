import { ACTION_TYPES as STATE } from '../constans/actionTypes';

export const addRoomFavoriteSucces = (profile) => {
  return {
    type: STATE.ADD_ROOM_TO_FAVORITE,
    payload: profile,
  };
};

export const getRoomFavorite = () => {
  const favorites = localStorage.getItem('favorites') && JSON.parse(localStorage.getItem('favorites') || "");

  return {
    type: STATE.GET_ROOM_FAVORITE,
    payload: favorites,
  };
};