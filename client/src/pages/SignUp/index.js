import React from "react";
import * as path from "../../constants/routes";
import { makeStyles } from "@material-ui/core/styles";
import { SignUpForm } from "../../components/Forms/SignUpForm/index";
import Box from "@material-ui/core/Box";
import { registerUser } from "../../store/actions/profile";
import { useDispatch } from "react-redux";

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

const SignUp = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  
  const handleSignUp = async (values, { setErrors }) => {
    const moveTo = () => {
      props.history.push(path.DASHBOARD);
    };
    dispatch(registerUser(values, moveTo));
  };

  return (
    <Box className={classes.root}>
      <div className={classes.background}></div>
      <SignUpForm register={handleSignUp} />
    </Box>
  );
};

export default SignUp;
