import { ACTION_TYPES as STATE } from "redux/constans/actionTypes";

const intialState = {
  data: [],
  premium_live: [],
  isLoading: false,
  isLive: false,
  isPremiumLive: false
};

function reducer(state = intialState, action) {
  switch (action.type) {
    case STATE.GET_ROOM_LIVE_LOAD:
      return {
        ...state,
        isLoading: true,
      };
    case STATE.GET_ROOM_LIVE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLive: true,
        data: action.payload,
      };
    case STATE.GET_ROOM_LIVE_FAILED:
      return {
        ...state,
        isLoading: false,
        isLive: false,
      };
    case STATE.GET_ROOM_PREMIUM_LIVE_LOAD:
      return {
        ...state,
        isLoading: true,
        isPremiumLive: false,
      };
    case STATE.GET_ROOM_PREMIUM_LIVE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isPremiumLive: true,
        premium_live: action.payload,
      };
    case STATE.GET_ROOM_PREMIUM_LIVE_FAILED:
      return {
        ...state,
        isLoading: false,
        isPremiumLive: false,
      };
    default:
      return state;
  }
}

export default reducer;
