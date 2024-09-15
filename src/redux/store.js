import { createStore, applyMiddleware } from "redux";
import todoReducer from "../redux/reducer";
import { thunk } from "redux-thunk";

const store = createStore(todoReducer, applyMiddleware(thunk));

export default store;
