import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Form, Button, Spinner, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrorAction,
  userRegisterAction,
} from "../state/actions/userActions";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [confpass, setConfpass] = useState("");
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

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(userRegisterAction(name, email, password, confpass));
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
      <div className="page-title my-2">REGISTER</div>
      <div className="page-title-brdbtm mb-3"></div>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
        </Form.Group>
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
        <Form.Group className="mb-3" controlId="formBasicConfPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-enter Password"
            value={confpass}
            onChange={(e) => setConfpass(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          Register{" "}
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
      <Link to="/login">
        <button
          type="button"
          className="btn btn-warning my-3"
          disabled={loading}
        >
          Already Have an Account
        </button>
      </Link>
    </Container>
  );
};

export default Register;
