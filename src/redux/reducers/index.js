import { combineReducers } from "redux";
import petReducer from "./petReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  pet: petReducer,
  user: userReducer,
});

export default rootReducer;
