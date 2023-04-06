import { ACTION_TYPES as STATE } from "redux/constans/actionTypes";

const intialState = {
  isLoading: false,
  isError: false,
  profile: [],
  room_name: 'JKT48',
  isFollow: 0
};

function reducer(state = intialState, action) {
  switch (action.type) {
    case STATE.GET_ROOM_DETAIL_LOAD:
      return {
        ...state,
        isLoading: true,
      };
    case STATE.GET_ROOM_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: action.payload,
        room_name: action.room_name,
        isFollow: action.isFollow
      };
    case STATE.GET_ROOM_DETAIL_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case STATE.CLEAR_ROOM_DETAIL:
      return intialState;
    default:
      return state;
  }
}

export default reducer;
