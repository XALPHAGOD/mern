import { combineReducers } from "redux";
import { userLogin_RegisterReducer } from "./userReducer";
import { noteReducer } from "./noteReducer";
export default combineReducers({
  userLogin_RegisterReducer,
  noteReducer,
});
