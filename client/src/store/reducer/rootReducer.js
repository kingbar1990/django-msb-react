import { combineReducers } from "redux";
import { reducerLoader } from "./reducerLoader";
import { reducerProfile } from "./reducerProfile";

const rootReducer = combineReducers({
  loader: reducerLoader,
  profile: reducerProfile,
});

export default rootReducer;

