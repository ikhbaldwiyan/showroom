import { ACTION_TYPES as STATE } from "redux/constans/actionTypes";

const intialState = {
  data: [],
  isLoading: false,
};

function reducer(state = intialState, action) {
  switch (action.type) {
    case STATE.GET_TASK_LIST_LOAD:
      return {
        ...state,
        isLoading: true,
      };
    case STATE.GET_TASK_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case STATE.GET_TASK_LIST_FAILED:
      return {
        ...state,
        isLoading: false,
        isLive: false,
      };
    default:
      return state;
  }
}

export default reducer;