import { GET_UTILITY_ZONES } from "../actions/utilityZones";
const initState = {
  utility_zones: null,
};

export const reducerUtilityZones = (state = initState, action) => {
  switch (action.type) {
    case GET_UTILITY_ZONES: {
      return { ...state, utility_zones: action.payload };
    }
    default: {
      return state;
    }
  }
};
