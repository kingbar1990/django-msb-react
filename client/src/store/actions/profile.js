import axios from "axios";
import { LOADING_TRUE, LOADING_FALSE } from "./toggleLoader";
import * as API_URL from "../apiUrls/apiUrls";

export const LOGIN = "login";

export const login = (values, moveTo) => {
  return (dispatch) => {
    dispatch({
      type: LOADING_TRUE,
      payload: true,
    });
    let token;
    let asyncLogin = async () => {
      await axios.post(API_URL.LOGIN, { ...values }).then((response) => {
        token = response.data.key;
        localStorage.setItem("token", token);
      });
      await axios({
        method: "get",
        url: API_URL.TOKEN_URL,
        headers: {
          Authorization: `Token ${token}`,
        },
      }).then((response) => {
        dispatch({
          type: LOGIN,
          payload: response.data,
        });
        moveTo();
      });
    };
    asyncLogin();
    dispatch({
      type: LOADING_FALSE,
      payload: false,
    });
  };
};

export const LOGOUT = "logout";

export const logout = (moveTo) => {
  return (dispatch) => {
    axios({
      method: "post",
      url: API_URL.LOG_OUT,
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    }).then((response) => {
      localStorage.removeItem("token");
      dispatch({
        type: LOGOUT,
        payload: null,
      });
      moveTo();
    });
    dispatch({
      type: LOADING_FALSE,
      payload: false,
    });
  };
};
