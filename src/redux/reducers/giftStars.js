import { ACTION_TYPES as STATE } from "redux/constans/actionTypes";

const intialState = {
  isLoading: false,
  isError: false,
  starsRedux: [
    {
      gift_id: "1",
      name: "a",
      count: 100,
      url: "https://static.showroom-live.com/image/gift/1_s.png?v=1",
    },
    {
      gift_id: "2",
      name: "b",
      count: 100,
      url: "https://static.showroom-live.com/image/gift/1001_s.png?v=1",
    },
    {
      gift_id: "3",
      name: "c",
      count: 0,
      url: "https://static.showroom-live.com/image/gift/1002_s.png?v=1",
    },
    {
      gift_id: "4",
      name: "d",
      count: 0,
      url: "https://static.showroom-live.com/image/gift/1003_s.png?v=1",
    },
    {
      gift_id: "5",
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
    case STATE.CLICK_COUNT_STAR:
      return {
        ...state,
        isLoading: false,
        clickCountRedux: action.payload,
      };
    case STATE.SEND_STAR:
      const stars = state.starsRedux.map(star => {
        if (star.name === action.name) {
          return {
            ...star,
            count: star.count - 1
          }
        }
        return star;
      });
      return {
        ...state,
        starsRedux: stars,
      };
    case STATE.CLEAR_ROOM_DETAIL:
      return intialState;
    default:
      return state;
  }
}

export default reducer;
