import { combineReducers } from "redux";

import roomRegular from "./roomRegular";
import roomAcademy from "./roomAcademy";
import roomLives from "./roomLives";
import roomDetail from "./roomDetail";
import stars from "./giftStars";

const rootReducers = combineReducers({
  roomRegular,
  roomAcademy,
  roomLives,
  roomDetail,
  stars,
});

export default rootReducers;
