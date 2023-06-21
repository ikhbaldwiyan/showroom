import { ACTION_TYPES as STATE } from "redux/constans/actionTypes";

const intialState = {
  isLoading: false,
  isError: false,
  user: [],
};

function reducer(state = intialState, action) {
  switch (action.type) {
    case STATE.GET_USER_LOAD:
      return {
        ...state,
        isLoading: true,
      };
    case STATE.GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case STATE.GET_USER_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case STATE.CLEAR_USER:
      return intialState;
    default:
      return state;
  }
}

export default reducer;
