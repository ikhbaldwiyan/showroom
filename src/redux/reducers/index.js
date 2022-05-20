import { combineReducers } from "redux"

import roomRegular from "./roomRegular"
import roomAcademy from "./roomAcademy"
import roomLive from "./roomLive"

const rootReducers = combineReducers({
    roomRegular,
    roomAcademy,
    roomLive
});

export default rootReducers;