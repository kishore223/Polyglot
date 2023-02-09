import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BsXCircleFill } from "react-icons/bs";
import { useCookies } from "react-cookie";
import { InputGroup } from "react-bootstrap";
import { checkEmail, checkPass } from "./LoginSignupFunctions.js";

function Login() {
  return (
    <div id="con" className="contact">
      <p className="about-p">Signin to Continue</p>
      <div className="row form-row">
        <div className="col-md">
          <Form className="row g-3" id="form-id">
            <div className="col-md-12">
              <InputGroup>
                <Form.Control
                  type="text"
                  className="form-control input-acc"
                  id="inputEmail4"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyUp={(e) =>
                    checkEmail(setMessLogin, setMessageEmail, email)
                  }
                />
                <Button
                  className="input-btn-acc"
                  onClick={(e) => {
                    setEmail("");
                    setMessLogin("");
                  }}
                >
                  <BsXCircleFill className="btn-color" />
                </Button>
              </InputGroup>
            </div>
            {messLogin}
            <div className="col-md-12">
              <InputGroup>
                <Form.Control
                  type="text"
                  className="form-control input-acc"
                  id="inputPassword"
                  placeholder="Password"
                  value={password}
                  onKeyUp={(e) =>
                    checkPass(setMessPassLogin, setMessagePassword, password)
                  }
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  className="input-btn-acc"
                  onClick={(e) => {
                    setPassword("");
                    setMessPassLogin("");
                  }}
                >
                  <BsXCircleFill className="btn-color" />
                </Button>
              </InputGroup>
            </div>
            {messPassLogin}
            <div className="btn-div">
              <Button
                type="button"
                className="btn btn-secondary btn-md btn-acc"
                onClick={(e) => login(e)}
              >
                LOGIN
              </Button>
            </div>
          </Form>
          <div className="acc-div-a">
            <span>Don't have an account? </span>
            <a className="a-acc" href="#first">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
