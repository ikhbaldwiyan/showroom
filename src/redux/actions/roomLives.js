import { ACTION_TYPES as STATE } from '../constans/actionTypes';

export const getRoomLiveLoad = () => {
  return {
    type: STATE.GET_ROOM_LIVE_LOAD
  };
};

export const getRoomLiveSuccess = (rooms) => {
  return {
    type: STATE.GET_ROOM_LIVE_SUCCESS,
    payload: rooms,
  };
};

export const getRoomLiveFailed = () => {
  return {
    type: STATE.GET_ROOM_LIVE_FAILED,
  };
};

export const getRoomPremiumLiveLoad = () => {
  return {
    type: STATE.GET_ROOM_PREMIUM_LIVE_LOAD
  };
};

export const getRoomPremiumLiveSuccess = (rooms) => {
  return {
    type: STATE.GET_ROOM_PREMIUM_LIVE_SUCCESS,
    payload: rooms,
  };
};

export const getRoomPremiumLiveFailed = () => {
  return {
    type: STATE.GET_ROOM_PREMIUM_LIVE_FAILED,
  };
};