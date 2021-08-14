import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogoutAction } from "../state/actions/userActions";

const Header = () => {
  const userLogin_RegisterReducer = useSelector(
    (state) => state.userLogin_RegisterReducer
  );
  const userInfo = userLogin_RegisterReducer.userInfo;

  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <Navbar bg="info" variant="light" expand="md" sticky="top" className="py-1">
      <Container>
        <Link className="navbar-brand" to="/">
          Notez
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {userInfo && (
              <Link to="/notes" className="nav-link">
                My Notes
              </Link>
            )}
            {userInfo ? (
              <div
                className="nav-link"
                onClick={() => {
                  dispatch(userLogoutAction());
                  history.replace("/");
                }}
                style={{ color: "#343a40", cursor: "pointer" }}
              >
                Sign Out
              </div>
            ) : (
              <Link className="nav-link" to="/login">
                Sign In
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
