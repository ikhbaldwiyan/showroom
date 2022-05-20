import { ACTION_TYPES } from "redux/constans/actionTypes";

const intialState = {
  data: [],
};

function roomRegularReducer(state = intialState, action) {
  switch (action.type) {
    case ACTION_TYPES.GET_ROOM_LIST_REGULAR:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}

export default roomRegularReducer;
