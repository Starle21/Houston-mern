import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import flightReducer from "./reducers/flightReducer";
import rocketReducer from "./reducers/rocketReducer";
import newFlightReducer from "./reducers/newFlightReducer";
import notificationReducer from "./reducers/notificationReducer";

const reducer = combineReducers({
  flights: flightReducer,
  newFlight: newFlightReducer,
  rockets: rocketReducer,
  notification: notificationReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
