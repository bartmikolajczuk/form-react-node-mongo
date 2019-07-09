import { createStore } from "redux";
import formReducer from "../reducers/index";

const store = createStore(formReducer);

export default store;