import { combineReducers } from "redux";
import { reducerLoader } from "./reducerLoader";
import { reducerProfile } from "./reducerProfile";
import { reducerUtilityZones } from "./reducerUtilityZones";

const rootReducer = combineReducers({
  loader: reducerLoader,
  profile: reducerProfile,
  utility_zones: reducerUtilityZones,
});

export default rootReducer;
