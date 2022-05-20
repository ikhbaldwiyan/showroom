import { combineReducers } from "redux"

import roomRegular from "./roomRegular"
import roomAcademy from "./roomAcademy"

const rootReducers = combineReducers({
    roomRegular,
    roomAcademy
});

export default rootReducers;