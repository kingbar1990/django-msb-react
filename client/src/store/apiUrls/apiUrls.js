import { BACKEND_URL } from "../../constants/index";

export const TOKEN_URL = BACKEND_URL + "/api/users/me/?format=json";
export const LOGIN = BACKEND_URL + "/auth/login/";
export const LOG_OUT = BACKEND_URL + "/auth/logout/";
