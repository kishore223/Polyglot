import React, { useState } from "react";
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
    getLanguage(email, setLangCount, setLangDash, setLangDashCode, langCount);
    return langCount;
  };

  const logout = () => {
    cookieslog.remove("user");
    window.location.href = "/Login";
  };

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
              <NavLink exact to="/Home" activeClassName="active">
                HOME
              </NavLink>
            </Button>
            {checkDash() !== 0 && (
              <Button className="btn-nav link">
                <NavLink
                  exact
                  to={
                    email === undefined
                      ? "/Login"
                      : "/Dashboard?lang=" +
                        langDash +
                        "&languageId=" +
                        langDashCode
                  }
                  activeClassName="active"
                >
                  DASHBOARD
                </NavLink>
              </Button>
            )}
            <Button className="btn-nav link">LANGUAGES</Button>
            <Button className="btn-nav link">CONTACT</Button>
            {email === undefined && (
              <Button className="btn-nav link-sign">
                <NavLink exact to="/Login" activeClassName="active">
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
                <NavLink
                  exact
                  to="/Dashboard"
                  activeClassName="active"
                ></NavLink>
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
