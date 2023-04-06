import { ACTION_TYPES } from '../constans/actionTypes';

export const getRoomFollowedLoad = () => {
  return {
    type: ACTION_TYPES.GET_ROOM_LIST_FOLLOWED_LOAD,
  };
};

export const getRoomFollowedSuccess = (rooms) => {
  return {
    type: ACTION_TYPES.GET_ROOM_LIST_FOLLOWED_SUCCESS,
    payload: rooms
  };
};

export const getRoomFollowedFailed = () => {
  return {
    type: ACTION_TYPES.GET_ROOM_LIST_FOLLOWED_FAILED,
  };
};

