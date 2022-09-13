import { combineReducers } from "redux"

import roomRegular from "./roomRegular"
import roomAcademy from "./roomAcademy"
import roomLives from "./roomLives"
import roomDetail from "./roomDetail"
import roomFavorite from "./roomFavorite"

const rootReducers = combineReducers({
    roomRegular,
    roomAcademy,
    roomLives,
    roomDetail,
    roomFavorite
});

export default rootReducers;