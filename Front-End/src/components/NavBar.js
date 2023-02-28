import React, { useState } from "react";
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
import {API_BASE_URL} from "../constants";

function NavBar() {
  const cookieslog = new Cookies();
  const email = cookieslog.get("user");

  const [langDash, setLangDash] = useState();
  const [langDashCode, setLangDashCode] = useState();
  const em = { email };
  const [langCount, setLangCount] = useState(0);

  const getLanguage = () => {
    fetch(API_BASE_URL+"polyglot/player/getRegisteredLanguages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(em),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLangCount(Object.keys(responseJson.RegisteredLanguages).length);
        for (var i = 0; i < langCount; i++) {
          setLangDash(responseJson.RegisteredLanguages[i]["languageName"]);
          setLangDashCode(responseJson.RegisteredLanguages[i]["languageCode"]);
        }
      });
  };

  const checkDash = () => {
    getLanguage();
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
