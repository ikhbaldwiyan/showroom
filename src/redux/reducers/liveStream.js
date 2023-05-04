import { ACTION_TYPES as STATE } from "redux/constans/actionTypes";

const intialState = {
  isLoading: false,
  isError: false,
  title: 'JKT48 SHOWROOM',
  url: [],
  isLive: false,
};

function reducer(state = intialState, action) {
  switch (action.type) {
    case STATE.GET_LIVE_STREAM_LOAD:
      return {
        ...state,
        isLoading: true,
      };
    case STATE.GET_LIVE_STREAM_ONLINE:
      return {
        ...state,
        isLoading: false,
        url: action.url,
        title: action.room_name,
        isLive: true,
      };
    case STATE.GET_LIVE_STREAM_OFFLINE:
      return {
        ...state,
        isLive: false,
        isLoading: false,
        url: []
      };
    case STATE.CLEAR_LIVE_STREAM:
      return intialState;
    default:
      return state;
  }
}

export default reducer;
