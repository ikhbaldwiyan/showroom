import { combineReducers } from "redux"

import roomRegularReducer from "./roomRegular"
import roomAcademyReducer from "./roomAcademy"

const rootReducers = combineReducers({
    roomRegularReducer,
    roomAcademyReducer
});

export default rootReducers;