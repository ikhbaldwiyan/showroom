import { ACTION_TYPES as STATE } from '../constans/actionTypes';

export const getStarsLoad = () => {
  return {
    type: STATE.GET_ALL_STARS_LOAD,
  };
};

export const getStarsSuccess = (stars) => {
  return {
    type: STATE.GET_ALL_STARS_SUCCESS,
    payload: stars,
  };
};

export const getClickCount = (count) => {
  return {
    type: STATE.SEND_STAR,
    payload: count,
  };
}