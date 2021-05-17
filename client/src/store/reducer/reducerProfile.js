import { LOGIN, LOGOUT } from "../actions/profile";
const initState = {
  profile: null,
};

export const reducerProfile = (state = initState, action) => {
  switch (action.type) {
    case LOGIN: {
      return { ...state, profile: action.payload };
    }
    case LOGOUT: {
      return { ...state, profile: action.payload };
    }
    default: {
      return state;
    }
  }
};
