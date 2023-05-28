import {combineReducers} from "redux";
import PivotReducer from "./pivot";

const AppReducers = combineReducers({
    pivotReducer: PivotReducer
})

export default AppReducers