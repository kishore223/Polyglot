import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import "./NavBar.css";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Cookies from "universal-cookie";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

function NavBar() {
  const cookieslog = new Cookies();
  const cook_log = cookieslog.get("user");

  const logout = () => {
    cookieslog.remove("user");
    window.location.href = "/Login";
  };
  return (
    <Navbar bg="light" expand="lg" className="navbar-main">
      <Container className="cont">
        <Navbar.Brand href="#home" className="brand-name">
          PolyGlot
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Button className="btn-nav link">HOME</Button>
            <Button className="btn-nav link">
              <NavLink
                exact
                to={cook_log === undefined ? "/Login" : "/Dashboard"}
                activeClassName="active"
              >
                DASHBOARD
              </NavLink>
            </Button>
            <Button className="btn-nav link">LANGUAGES</Button>
            <Button className="btn-nav link">CONTACT</Button>
            {cook_log === undefined && (
              <Button className="btn-nav link-sign">
                <NavLink exact to="/Login" activeClassName="active">
                  LOGIN/SIGNUP
                </NavLink>
              </Button>
            )}
            {cook_log !== undefined && (
              <DropdownButton
                id="dropdown-basic-button"
                className="btn-nav link-sign-two"
                title={cook_log.split("@")[0].toUpperCase()}
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
