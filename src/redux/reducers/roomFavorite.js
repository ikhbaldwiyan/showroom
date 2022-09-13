import { ACTION_TYPES as STATE } from "redux/constans/actionTypes";

const intialState = {
  isLoading: false,
  isError: false,
  data: [],
  room_name: 'FAVORITE JKT48 SHOWROOM'
};

function reducer(state = intialState, action) {
  switch (action.type) {
    case STATE.ADD_ROOM_TO_FAVORITE:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case STATE.GET_ROOM_FAVORITE:
        return {
          ...state,
          isLoading: false,
          data: action.payload,
        };
    default:
      return state;
  }
}

export default reducer;
