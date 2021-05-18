import React from "react";

import * as path from "../../constants/routes";
import { makeStyles } from "@material-ui/core/styles";
import { SignUpForm } from "../../components/Forms/SignUpForm/index";
import swal from "sweetalert";
import { signUp } from "../../api/queries/index.js";
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

const SignUp = (props) => {
  const classes = useStyles();
  const handleSignUp = async (values, { setErrors }) => {
    try {
      await signUp(values)
        .then((response) => {
          if (response.status === 201) {
            props.history.push(path.DASHBOARD);
          } else {
            swal({
              icon: "error",
              title: "Ooops something wrong!",
              text: "Please try again",
            });
          }
        })
        .catch((error) => {
          const errors = {};
          const errorData = error.response.data;
          for (const key in errorData) {
            if (errorData.hasOwnProperty(key)) {
              const element = errorData[key];
              errors[key] = element.toString();
            }
          }
          setErrors(errors);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box className={classes.root}>
      <div className={classes.background}></div>
      <SignUpForm register={handleSignUp} />
    </Box>
  );
};

export default SignUp;
