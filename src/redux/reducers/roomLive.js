import { ACTION_TYPES } from "redux/constans/actionTypes";

const intialState = {
  data: [],
  is_live: false
};

function reducer(state = intialState, action) {
  switch (action.type) {
    case ACTION_TYPES.GET_ROOM_LIST_LIVE:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
