import { combineReducers } from "redux"

import roomRegular from "./roomRegular"
import roomAcademy from "./roomAcademy"
import roomLives from "./roomLives"
import roomDetail from "./roomDetail"

const rootReducers = combineReducers({
    roomRegular,
    roomAcademy,
    roomLives,
    roomDetail
});

export default rootReducers;