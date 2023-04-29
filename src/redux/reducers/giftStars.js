import { ACTION_TYPES as STATE } from "redux/constans/actionTypes";

const intialState = {
  isLoadingStars: false,
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
        isLoadingStars: true,
      };
    case STATE.GET_ALL_STARS_SUCCESS:
      return {
        ...state,
        isLoadingStars: false,
        starsRedux: action.payload,
      };
    case STATE.SEND_STAR:
      return {
        ...state,
      };
    case STATE.SEND_STAR_SUCCESS:
      const current_num = state.starsRedux.map(star => {
        if (star.name === action.payload.name) {
          return {
            ...star,
            count: action.payload.count
          }
        }
        return star;
      });

      return {
        ...state,
        isLoadingStars: false,
        starsRedux: current_num,
      };
    case STATE.CLICK_COUNT_STAR:
      const stars = state.starsRedux.map(star => {
        if (star.name === action.payload.name) {
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
        clickCountRedux: {
          ...state.clickCountRedux,
          [action.payload.name]: state.clickCountRedux[action.payload.name] + 1,
        }
      };
    case STATE.CLEAR_COUNT_STAR:
      return {
        ...state,
        clickCountRedux: {
          a: 0,
          b: 0,
          c: 0,
          d: 0,
          e: 0,
        }
      };
    default:
      return state;
  }
}

export default reducer;
