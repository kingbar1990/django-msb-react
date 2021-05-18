import { BACKEND_URL } from "../../constants/index";

export const TOKEN_URL = BACKEND_URL + "/api/users/me/?format=json";
export const LOGIN = BACKEND_URL + "/auth/login/";
export const LOG_OUT = BACKEND_URL + "/auth/logout/";
export const UTILITY_ZONES = BACKEND_URL + "/api/utility_zones/";
export const LOAD_ZONES = BACKEND_URL + "/api/load_zones/";
export const SIGN_UP_SELLER = BACKEND_URL + "/api/signup_seller/";
export const SIGN_UP_BUYER = BACKEND_URL + "/api/signup_buyer/";
