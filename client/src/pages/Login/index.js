import React from "react";
import { useDispatch } from "react-redux";
import { Container } from "reactstrap";
import { LoginForm } from "../../components/Forms/LoginForm/index";
import { login } from "../../store/actions/profile";

const Login = (props) => {
  const dispatch = useDispatch();
  const handleLogin = async (values) => {
    const moveTo = () => {
      props.history.push("/dashboard");
    };
    dispatch(login(values, moveTo));
  };
  return (
    <Container>
      <LoginForm login={handleLogin}></LoginForm>
    </Container>
  );
};

export default Login;
