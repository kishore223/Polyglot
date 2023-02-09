import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import "./NavBar.css";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <Navbar bg="light" expand="lg" className="navbar-main">
      <Container className="cont">
        <Navbar.Brand href="#home" className="brand-name">
          PolyGlot
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-grow-1 pe-3 nav-main">
            <Button className="btn-nav link">HOME</Button>
            <Button className="btn-nav link">
              <NavLink exact to="/Dashboard" activeClassName="active">
                DASHBOARD
              </NavLink>
            </Button>
            <Button className="btn-nav link">LANGUAGES</Button>
            <Button className="btn-nav link">
              <NavLink exact to="/Login" activeClassName="active">
                CONTACT
              </NavLink>
            </Button>
            <Button className="btn-nav link-sign">
              <NavLink exact to="/Signup" activeClassName="active">
                LOGIN/SIGNUP
              </NavLink>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
