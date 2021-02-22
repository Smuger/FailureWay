import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { logout } from "../actions/userActions";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const redirect = "/login";

  const logoutHandler = () => {
    dispatch(logout());
    history.push(redirect);
  };

  useEffect(() => {
    if (userInfo === null || !userInfo.hasOwnProperty("_id")) {
      logoutHandler();
    }
  }, []);

  return (
    <header>
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>FailureWay</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {userInfo ? (
                <>
                  {userInfo.isAdmin && (
                    <LinkContainer to="/service">
                      <Nav.Link>
                        <i className="fas fa-plus-circle"></i> Add Service
                      </Nav.Link>
                    </LinkContainer>
                  )}
                  <LinkContainer to="/messages">
                    <Nav.Link>
                      <i className="fas fa-comments"></i> Messages
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/report">
                    <Nav.Link>
                      <i className="fas fa-exclamation-circle"></i> Report Issue
                    </Nav.Link>
                  </LinkContainer>
                  {userInfo.isAdmin && <Badge variant="success">Admin</Badge>}
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>{" "}
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
