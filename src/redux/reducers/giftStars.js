import { ACTION_TYPES as STATE } from "redux/constans/actionTypes";

const intialState = {
  isLoading: false,
  isError: false,
  starsRedux: [
    {
      gift_id: "",
      name: "a",
      count: 0,
      url: "https://static.showroom-live.com/image/gift/1_s.png?v=1",
    },
    {
      gift_id: "",
      name: "b",
      count: 0,
      url: "https://static.showroom-live.com/image/gift/1001_s.png?v=1",
    },
    {
      gift_id: "",
      name: "c",
      count: 0,
      url: "https://static.showroom-live.com/image/gift/1002_s.png?v=1",
    },
    {
      gift_id: "",
      name: "d",
      count: 0,
      url: "https://static.showroom-live.com/image/gift/1003_s.png?v=1",
    },
    {
      gift_id: "",
      name: "e",
      count: 0,
      url: "https://static.showroom-live.com/image/gift/2_s.png?v=1",
    },
  ],
  clickCountRedux: {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
  }
};

function reducer(state = intialState, action) {
  switch (action.type) {
    case STATE.GET_ALL_STARS_LOAD:
      return {
        ...state,
        isLoading: true,
      };
    case STATE.GET_ALL_STARS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        starsRedux: action.payload,
      };
    case STATE.SEND_STAR:
      return {
        ...state,
        clickCountRedux: action.payload
      };
    case STATE.CLEAR_ROOM_DETAIL:
      return intialState;
    default:
      return state;
  }
}

export default reducer;
