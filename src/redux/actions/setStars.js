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

export const getClickCount = (count, name) => {
  return {
    type: STATE.SEND_STAR,
    name,
    payload: count,
  };
}

export const getClickCountStar = (name) => {
  return {
    type: STATE.CLICK_COUNT_STAR,
    payload: {
      name,
    },
  };
}

export const sendStarSuccess = (name, count) => {
  return {
    type: STATE.SEND_STAR_SUCCESS,
    payload: {
      name,
      count
    },
  }
}

export const clearCountStar = () => {
  return {
    type: STATE.CLEAR_COUNT_STAR,
  };
}