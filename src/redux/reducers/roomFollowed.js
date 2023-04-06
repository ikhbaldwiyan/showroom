import { ACTION_TYPES } from "redux/constans/actionTypes";

const intialState = {
  data: [],
  isLoading: false,
  isError: false
};

function reducer(state = intialState, action) {
  switch (action.type) {
    case ACTION_TYPES.GET_ROOM_LIST_FOLLOWED_LOAD:
      return {
        ...state,
        isLoading: true
      };
    case ACTION_TYPES.GET_ROOM_LIST_FOLLOWED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case ACTION_TYPES.GET_ROOM_LIST_FOLLOWED_FAILED:
      return {
        ...state,
        isError: true,
      };
    default:
      return state;
  }
}

export default reducer;
