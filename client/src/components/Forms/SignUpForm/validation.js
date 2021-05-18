import * as Yup from "yup";
import { MIN_PASSWORD_LENGTH } from "../../../constants";

export const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name has to be longer than 2 characters!")
    .max(64, "Name has to be shorter than 64 characters!")
    .required("Name is required!"),
  phone: Yup.string()
    .required("E-mail is required!")
    .matches(/^[+]{1}[0-9]+$/, "Phone is not valid"),
  email: Yup.string()
    .email("E-mail is not valid!")
    .required("E-mail is required!"),
  utility_zone: Yup.string().required("Utility zone is required!"),
  password: Yup.string()
    .min(
      MIN_PASSWORD_LENGTH,
      `Password has to be longer than ${MIN_PASSWORD_LENGTH} characters!`
    )
    .required("Password is required!"),
  confirm_password: Yup.string()
    .required("Password confirmation is required!")
    .min(
      MIN_PASSWORD_LENGTH,
      `Password has to be longer than ${MIN_PASSWORD_LENGTH} characters!`
    )
    .oneOf([Yup.ref("password")], "Confirm password does not match password"),
  seller_code: Yup.string().required("Seller code is required!"),
  customer_type: Yup.string().required("Customer type is required!"),
});
