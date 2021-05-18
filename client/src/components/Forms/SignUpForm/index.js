import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { SignupSchema } from "./validation";
import * as path from "../../../constants/routes";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import { useSelector, useDispatch } from "react-redux";
import { get_utility_zones } from "../../../store/actions/utilityZones";

const useStyles = makeStyles({
  root: {
    width: "876px",
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
    cursor: "default",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  field: {
    margin: "0 10px 10px",
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
    "&:focus": {
      outline: "none",
    },
  },
  subTitle: {
    color: "#32403B",
    fontSize: "13px",
    fontWeight: 400,
    textAlign: "center",
    marginBottom: "30px",
    cursor: "default",
  },
  formControl: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
    },
    "& .Mui-focused": {
      borderRadius: "12px",
    },
  },
  text: {
    color: "#212429",
    fontSize: "12px",
    fontWeight: "normal",
    textAlign: "center",
    cursor: "default",
  },
  radioGroup: {
    "& label": {
      marginBottom: 0,
    },
  },
  customerType: {
    marginBottom: "20px",
  },
});

export const SignUpForm = (props) => {
  const utility_zones = useSelector(
    (state) => state.utility_zones.utility_zones
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!utility_zones) {
      dispatch(get_utility_zones());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let arrUtilityZones = utility_zones ? Object.keys(utility_zones) : [];
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        username: "",
        phone_number: "",
        email: "",
        address: "",
        password: "",
        utility_zone: "",
        password_confirm: "",
        customer_type: "",
        seller_code: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={props.register}
    >
      {({
        values: {
          username,
          phone_number,
          email,
          address,
          password,
          utility_zone,
          password_confirm,
          customer_type,
          seller_code,
        },
        touched,
        errors,
        setFieldValue,
      }) => (
        <Card variant="outlined" className={classes.root}>
          <Typography variant="h3" className={classes.title}>
            Create An Account
          </Typography>
          <Typography variant="h5" className={classes.subTitle}>
            Create an account to enjoy all the services!
          </Typography>
          <Form className={classes.form}>
            <Box>
              <FormControl
                component="fieldset"
                error={touched.customer_type && Boolean(errors.customer_type)}
                className={classes.customerType}
              >
                <RadioGroup
                  row
                  aria-label="position"
                  name="position"
                  value={customer_type}
                  onChange={(e) => {
                    setFieldValue("customer_type", e.target.value);
                  }}
                  className={classes.radioGroup}
                >
                  <FormControlLabel
                    value="seller"
                    control={<Radio color="primary" />}
                    label="Seller"
                  />
                  <FormControlLabel
                    value="buyer"
                    control={<Radio color="primary" />}
                    label="Buyer"
                  />
                </RadioGroup>
                <FormHelperText>
                  {touched.customer_type ? errors.customer_type : ""}
                </FormHelperText>
              </FormControl>
            </Box>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="flex-start"
            >
              <Grid item xs={6}>
                <Box className={classes.field}>
                  <InputLabel htmlFor="username" className={classes.label}>
                    Name
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
              </Grid>
              <Grid item xs={6}>
                <Box className={classes.field}>
                  <InputLabel htmlFor="phone_number" className={classes.label}>
                    Phone
                  </InputLabel>
                  <TextField
                    id="phone_number"
                    name="phone_number"
                    helperText={touched.phone_number ? errors.phone_number : ""}
                    error={touched.phone_number && Boolean(errors.phone_number)}
                    value={phone_number}
                    onChange={(e) => {
                      setFieldValue("phone_number", e.target.value);
                    }}
                    fullWidth
                    variant="outlined"
                    size="small"
                    className={classes.textField}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className={classes.field}>
                  <InputLabel htmlFor="email" className={classes.label}>
                    Email
                  </InputLabel>
                  <TextField
                    id="email"
                    name="email"
                    type={"email"}
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
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className={classes.field}>
                  <InputLabel htmlFor="address" className={classes.label}>
                    Adress
                  </InputLabel>
                  <TextField
                    id="address"
                    name="address"
                    helperText={touched.address ? errors.address : ""}
                    error={touched.address && Boolean(errors.address)}
                    value={address}
                    onChange={(e) => {
                      setFieldValue("address", e.target.value);
                    }}
                    fullWidth
                    variant="outlined"
                    size="small"
                    className={classes.textField}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className={classes.field}>
                  <InputLabel htmlFor="password" className={classes.label}>
                    Password
                  </InputLabel>
                  <TextField
                    id="password"
                    name="password"
                    helperText={touched.password ? errors.password : ""}
                    error={touched.password && Boolean(errors.password)}
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
              </Grid>
              <Grid item xs={6}>
                <Box className={classes.field}>
                  <InputLabel htmlFor="utility_zone" className={classes.label}>
                    Utility zone
                  </InputLabel>
                  <FormControl
                    variant="outlined"
                    size={"small"}
                    className={classes.formControl}
                    error={touched.utility_zone && Boolean(errors.utility_zone)}
                  >
                    <Select
                      id={"utility_zone"}
                      native
                      value={utility_zone}
                      onChange={(e) => {
                        setFieldValue("utility_zone", e.target.value);
                      }}
                      inputProps={{
                        name: "utility_zone",
                        id: "outlined-age-native-simple",
                      }}
                    >
                      <option aria-label="None" value="" />
                      {arrUtilityZones.map((item, index) => {
                        return (
                          <option value={item} key={item + index}>
                            {utility_zones[item]}
                          </option>
                        );
                      })}
                    </Select>
                    {touched.utility_zone && errors.utility_zone ? (
                      <FormHelperText>
                        {touched.utility_zone ? errors.utility_zone : ""}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className={classes.field}>
                  <InputLabel
                    htmlFor="password_confirm"
                    className={classes.label}
                  >
                    Confirm password
                  </InputLabel>
                  <TextField
                    id="password_confirm"
                    name="password_confirm"
                    helperText={
                      touched.password_confirm ? errors.password_confirm : ""
                    }
                    error={
                      touched.password_confirm &&
                      Boolean(errors.password_confirm)
                    }
                    value={password_confirm}
                    onChange={(e) => {
                      setFieldValue("password_confirm", e.target.value);
                    }}
                    fullWidth
                    variant="outlined"
                    size="small"
                    className={classes.textField}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className={classes.field}>
                  <InputLabel htmlFor="seller_code" className={classes.label}>
                    Seller code
                  </InputLabel>
                  <TextField
                    id="seller_code"
                    name="seller_code"
                    helperText={touched.seller_code ? errors.seller_code : ""}
                    error={touched.seller_code && Boolean(errors.seller_code)}
                    value={seller_code}
                    onChange={(e) => {
                      setFieldValue("seller_code", e.target.value);
                    }}
                    fullWidth
                    variant="outlined"
                    size="small"
                    className={classes.textField}
                  />
                </Box>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              type="submit"
              className={classes.button}
            >
              Sign up
            </Button>
            <Typography variant="h6" className={classes.text}>
              Already Have An Account?{" "}
              <Link to={path.SIGN_IN} className={classes.link}>
                Sign In
              </Link>
            </Typography>
          </Form>
        </Card>
      )}
    </Formik>
  );
};
