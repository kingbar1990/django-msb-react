import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form } from "formik";
import { ForgotPasswordSchema } from "./validation";
import * as path from "../../constants/routes";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

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
  card: {
    width: "392px",
    zIndex: 10,
    padding: "65px",
    borderRadius: "32px",
    border: "none",
  },
  title: {
    fontWeight: 400,
    fontSize: "30px",
    lineHeight: "47px",
    marginBottom: "20px",
  },
  caption: {
    fontWeight: 400,
    fontSize: "17px",
    lineHeight: "20px",
    marginBottom: "30px",
    color: "#BDBDBD",
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
    marginTop: "10px",
    backgroundColor: "#4776E6",
    minWidth: "165px",
    marginBottom: "10px",
  },
  subTitle: {
    color: "#BDBDBD",
    fontSize: "14px",
    fontWeight: "normal",
  },
});

const ForgotPassword = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <div className={classes.background}></div>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={() => {
          console.log("forgot Password");
        }}
      >
        {({ values: { email }, touched, errors, setFieldValue }) => (
          <Card variant="outlined" className={classes.card}>
            <Typography variant="h3" className={classes.title}>
              Forgot password?
            </Typography>
            <Typography variant="h5" className={classes.caption}>
              Enter your email address in the form below
            </Typography>
            <Form>
              <Box className={classes.field}>
                <InputLabel htmlFor="username" className={classes.label}>
                  Email
                </InputLabel>
                <TextField
                  id="email"
                  name="email"
                  helperText={touched.email ? errors.email : ""}
                  error={touched.email && Boolean(errors.email)}
                  value={email}
                  onChange={(e) => {
                    setFieldValue("email", e.target.value);
                  }}
                  fullWidth
                  variant="outlined"
                  size="small"
                  className={classes.textField}
                  placeholder="Example@email.co"
                />
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
                  Send
                </Button>
                <Typography variant="h6" className={classes.subTitle}>
                  Don't have an account?
                </Typography>
                <Link to={path.SIGN_UP} className={classes.link}>
                  Sign up
                </Link>
              </Box>
            </Form>
          </Card>
        )}
      </Formik>
    </Box>
  );
};

export default ForgotPassword;
