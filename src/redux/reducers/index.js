import { combineReducers } from "redux";

import roomRegular from "./roomRegular";
import roomAcademy from "./roomAcademy";
import roomLives from "./roomLives";
import roomDetail from "./roomDetail";
import roomFollowed from "./roomFollowed"
import roomTrainee from "./roomTrainee"
import stars from "./giftStars";
import user from "./user";
import taskList from "./taskList";

const rootReducers = combineReducers({
  roomRegular,
  roomAcademy,
  roomLives,
  roomDetail,
  roomFollowed,
  stars,
  roomTrainee,
  user,
  taskList
});

export default rootReducers;
