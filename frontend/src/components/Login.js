import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button, Spinner, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  userLoginAction,
  clearErrorAction,
} from "../state/actions/userActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const history = useHistory();

  const userLogin_RegisterReducer = useSelector(
    (state) => state.userLogin_RegisterReducer
  );
  const { loading, err, errmsg, userInfo } = userLogin_RegisterReducer;
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(userInfo);
    if (userInfo) history.replace("/notes");
  }, [history, userInfo]);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(userLoginAction(email, password));
  };
  return (
    <Container className="p-3">
      {err && (
        <Alert
          variant={"danger"}
          onClose={() => dispatch(clearErrorAction())}
          dismissible
        >
          {errmsg}
        </Alert>
      )}
      <div className="page-title my-2">LOGIN</div>
      <div className="page-title-brdbtm mb-3"></div>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPass(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          Submit{" "}
          {loading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </Button>
      </Form>
      <Link to="/register">
        <button
          type="button"
          className="btn btn-warning my-3"
          disabled={loading}
        >
          New User
        </button>
      </Link>
    </Container>
  );
};

export default Login;
