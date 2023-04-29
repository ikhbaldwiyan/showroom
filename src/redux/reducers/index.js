import { combineReducers } from "redux";

import roomRegular from "./roomRegular";
import roomAcademy from "./roomAcademy";
import roomLives from "./roomLives";
import roomDetail from "./roomDetail";
import roomFollowed from "./roomFollowed"
import stars from "./giftStars";

const rootReducers = combineReducers({
  roomRegular,
  roomAcademy,
  roomLives,
  roomDetail,
  roomFollowed,
  stars,
});

export default rootReducers;
