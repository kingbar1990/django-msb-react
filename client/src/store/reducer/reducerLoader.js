import { LOADING_TRUE, LOADING_FALSE } from "../actions/toggleLoader";

export const reducerLoader = (state = false, action) => {
  switch (action.type) {
    case LOADING_TRUE: {
      return action.payload;
    }
    case LOADING_FALSE: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
