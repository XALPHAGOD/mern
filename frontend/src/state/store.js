import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {
  userLogin_RegisterReducer: {
    userInfo: JSON.parse(localStorage.getItem("User Info")),
  },
};
const middlewares = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middlewares)
);

export default store;
