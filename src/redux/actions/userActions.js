import { ACTION_TYPES as STATE } from '../constans/actionTypes';

export const getUserLoad = () => {
  return {
    type: STATE.GET_USER_LOAD,
  };
};

export const getUserSuccess = (users) => {
  
  return {
    type: STATE.GET_USER_SUCCESS,
    payload: users,
  };
};

export const getUserFailed = () => {
  return {
    type: STATE.GET_USER_FAILED,
  };
};

export const clearProfile = () => {
  return {
    type: STATE.CLEAR_USER,
  };
};