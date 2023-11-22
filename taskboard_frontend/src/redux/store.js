import React from "react";
import {createStore} from "redux";
import indexReducer from "./reducer/reducer";

const store = createStore(indexReducer);

export default store