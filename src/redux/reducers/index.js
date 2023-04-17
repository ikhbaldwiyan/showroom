import { combineReducers } from "redux"

import roomRegular from "./roomRegular"
import roomAcademy from "./roomAcademy"
import roomLives from "./roomLives"
import roomDetail from "./roomDetail"
import roomFollowed from "./roomFollowed"

const rootReducers = combineReducers({
    roomRegular,
    roomAcademy,
    roomLives,
    roomDetail,
    roomFollowed
});

export default rootReducers;