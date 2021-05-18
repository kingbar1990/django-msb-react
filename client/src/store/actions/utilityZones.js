import axios from "axios";
import { LOADING_TRUE, LOADING_FALSE } from "./toggleLoader";
import * as API_URL from "../apiUrls/apiUrls";

export const GET_UTILITY_ZONES = "get_utility_zones";

export const get_utility_zones = () => {
  return (dispatch) => {
    dispatch({
      type: LOADING_TRUE,
      payload: true,
    });
    axios
      .get(API_URL.UTILITY_ZONES)
      .then((response) => {
        dispatch({
          type: GET_UTILITY_ZONES,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
    dispatch({
      type: LOADING_FALSE,
      payload: false,
    });
  };
};
