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

export const getProfile = () => {
  return (dispatch) => {
    dispatch({
      type: LOADING_TRUE,
      payload: true,
    });
    let token = localStorage.getItem("token");
    if (token) {
      axios({
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
      });
    } else {
      window.location.href = "/login";
    }
    dispatch({
      type: LOADING_FALSE,
      payload: false,
    });
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

export const REGISTER_USER = "register_user";

export const registerUser = (values, moveTo) => {
  return (dispatch) => {
    dispatch({
      type: LOADING_TRUE,
      payload: true,
    });
    let url =
      values.customer_type === "seller"
        ? API_URL.SIGN_UP_SELLER
        : API_URL.SIGN_UP_BUYER;
    axios
      .post(url, {
        username: values.name,
        email: values.email,
        phone_number: values.phone,
        load_zone: "NEMA_BOS",
        utility_zone: values.utility_zone,
        seller_code: values.seller_code,
        password: values.password,
        password_confirm: values.confirm_password,
        address: values.address,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.auth_token);
        dispatch({
          type: LOGIN,
          payload: response.data,
        });
        moveTo();
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
