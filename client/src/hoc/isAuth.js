import React from "react";
import * as path from "../constants/routes";
import { withRouter } from "react-router";
import connect from "react-redux/es/connect/connect";

export const isAuth = (Component) => {
  const mapStateToProps = (state) => {
    return {
      profile: state.profile,
    };
  };
  const PrivateRoute = (props) => {
    let token = localStorage.getItem("token");
    if (token) {
      return <Component {...props} />;
    } else {
      props.history.push(path.SIGN_IN);
      return null;
    }
  };
  return withRouter(connect(mapStateToProps, null)(PrivateRoute));
};
