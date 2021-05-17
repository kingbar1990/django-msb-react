import React from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import * as path from "../../../constants/routes";
import Button from "@material-ui/core/Button";
import { LoginSchema } from "./validation";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles({
  root: {
    width: "392px",
    zIndex: 10,
    padding: "65px",
    borderRadius: "32px",
    border: "none",
  },
  title: {
    fontWeight: "bold",
    fontSize: "30px",
    lineHeight: "47px",
    textAlign: "center",
    marginBottom: "25px",
  },
  field: {
    marginBottom: "10px",
  },
  label: {
    color: "#212429",
    fontSize: "12px",
    fontWeight: "normal",
  },
  link: {
    textDecoration: "underline",
    fontSize: "12px",
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
    },
  },
  button: {
    marginTop: "30px",
    backgroundColor: "#4776E6",
    minWidth: "165px",
    marginBottom: "10px",
  },
  subTitle: {
    color: "#212429",
    fontSize: "12px",
    fontWeight: "normal",
    textAlign: "center",
  },
});

export const LoginForm = ({ login }) => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={login}
    >
      {({ values: { username, password }, touched, errors, setFieldValue }) => (
        <Card variant="outlined" className={classes.root}>
          <Typography variant="h3" className={classes.title}>
            Sign in
          </Typography>
          <Form>
            <Box className={classes.field}>
              <InputLabel htmlFor="username" className={classes.label}>
                Email
              </InputLabel>
              <TextField
                id="username"
                name="username"
                helperText={touched.username ? errors.username : ""}
                error={touched.username && Boolean(errors.username)}
                value={username}
                onChange={(e) => {
                  setFieldValue("username", e.target.value);
                }}
                fullWidth
                variant="outlined"
                size="small"
                className={classes.textField}
              />
            </Box>
            <Box className={classes.field}>
              <InputLabel htmlFor="password" className={classes.label}>
                Password
              </InputLabel>
              <TextField
                id="password"
                name="password"
                helperText={touched.password ? errors.password : ""}
                error={touched.password && Boolean(errors.password)}
                type={"password"}
                value={password}
                onChange={(e) => {
                  setFieldValue("password", e.target.value);
                }}
                fullWidth
                variant="outlined"
                size="small"
                className={classes.textField}
              />
            </Box>
            <Box>
              <Link to={path.FORGOT_PASSWORD} className={classes.link}>
                Forgot password?
              </Link>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignContent="center"
            >
              <Button
                variant="contained"
                color="primary"
                disableElevation
                type="submit"
                className={classes.button}
              >
                Sign in
              </Button>
              <Typography variant="h6" className={classes.subTitle}>
                Don’t Have An Account?{" "}
                <Link to={path.SIGN_UP} className={classes.link}>
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Form>
        </Card>
      )}
    </Formik>
  );
};
