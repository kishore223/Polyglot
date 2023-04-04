import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavBar.css";
import {
  Nav,
  Navbar,
  Container,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { getLanguage } from "../Functions/APIFunctions.js";
import { email, cookieslog } from "../Functions/CommonScripts.js";

function NavBar() {
  const [langDash, setLangDash] = useState();
  const [langDashCode, setLangDashCode] = useState();
  const [langCount, setLangCount] = useState(0);

  const checkDash = () => {
    if (email !== undefined) {
      getLanguage(email, setLangCount, setLangDash, setLangDashCode, langCount);
    }
  };

  const logout = () => {
    cookieslog.remove("user");
    window.location.href = "/Login";
  };

  useEffect(() => {
    checkDash();
  }, [langCount]);

  return (
    <Navbar bg="light" expand="lg" className="navbar-main">
      <Container className="cont">
        <Navbar.Brand href="/Home" className="brand-name">
          PolyGlot
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Button className="btn-nav link">
              <NavLink to="/Home" className="active">
                HOME
              </NavLink>
            </Button>
            {langCount !== 0 && (
              <Button className="btn-nav link">
                <NavLink
                  to={
                    email === undefined
                      ? "/Login"
                      : "/Dashboard?lang=" +
                        langDash +
                        "&languageId=" +
                        langDashCode
                  }
                  className="active"
                >
                  DASHBOARD
                </NavLink>
              </Button>
            )}
            {email !== undefined && (
              <Button className="btn-nav link">
                <NavLink to="/Language" className="active">
                  LANGUAGES
                </NavLink>
              </Button>
            )}
            {email === undefined && (
              <Button className="btn-nav link-sign">
                <NavLink to="/Login" className="active">
                  LOGIN/SIGNUP
                </NavLink>
              </Button>
            )}
            {email !== undefined && (
              <DropdownButton
                id="dropdown-basic-button"
                className="btn-nav link-sign-two"
                title={email.split("@")[0].toUpperCase()}
              >
                <NavLink to="/Dashboard" className="active"></NavLink>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              </DropdownButton>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
