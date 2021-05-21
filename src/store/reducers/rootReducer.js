import messageReducer from "../reducers/messageReducer";
import requestReducer from "../reducers/requestReducer";
import userReducer from "../reducers/userReducer";
import volunteerReducer from "../reducers/volunteerReducer";

import { combineReducers } from "redux";

const appReducer = combineReducers({
  message: messageReducer,
  request: requestReducer,
  user: userReducer,
  volunteer: volunteerReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
