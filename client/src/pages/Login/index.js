import React from "react";
import { useDispatch } from "react-redux";
import { LoginForm } from "../../components/Forms/LoginForm/index";
import { login } from "../../store/actions/profile";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
  },
  background: {
    height: "120%",
    width: "432px",
    backgroundColor: "#EEF1F7",
    transform: "rotate(15deg)",
    position: "absolute",
    marginLeft: "135px",
  },
});

const Login = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleLogin = async (values) => {
    const moveTo = () => {
      props.history.push("/dashboard");
    };
    dispatch(login(values, moveTo));
  };
  return (
    <Box className={classes.root}>
      <div className={classes.background}></div>
      <LoginForm login={handleLogin}></LoginForm>
    </Box>
  );
};

export default Login;
