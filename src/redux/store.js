import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "./root-reducer";

const middlewares = [thunk];
if (process.env.NODE_ENV === "development") middlewares.unshift(logger);

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
