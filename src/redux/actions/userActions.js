import { ACTION_TYPES as STATE } from '../constans/actionTypes';

export const getUserLoad = () => {
  return {
    type: STATE.GET_USER_LOAD,
  };
};

export const getUserSuccess = (profile) => {
  
  return {
    type: STATE.GET_USER_SUCCESS,
    payload: profile,
  };
};

export const getUserFailed = (rooms) => {
  return {
    type: STATE.GET_USER_FAILED,
    payload: rooms,
  };
};

export const clearProfile = () => {
  return {
    type: STATE.CLEAR_USER,
  };
};