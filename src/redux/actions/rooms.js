import { ACTION_TYPES } from '../constans/actionTypes';

export const getRoomListRegular = (rooms) => {
  return {
    type: ACTION_TYPES.GET_ROOM_LIST_REGULAR,
    payload: rooms,
  };
};

export const getRoomListAcademy = (rooms) => {
  return {
    type: ACTION_TYPES.GET_ROOM_LIST_ACADEMY,
    payload: rooms,
  };
};

export const getRoomListTrainee = (rooms) => {
  return {
    type: ACTION_TYPES.GET_ROOM_LIST_TRAINEE,
    payload: rooms,
  };
};
