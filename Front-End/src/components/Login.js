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
  const [password, setPassword] = useState("");
  const [messPassLogin, setMessPassLogin] = useState("");

  const [email, setEmail] = React.useState("");
  const [messLogin, setMessLogin] = React.useState("");

  const [messEmail, setMessageEmail] = React.useState("");
  const [messPassword, setMessagePassword] = React.useState("");

  const [cookies, setCookie] = useCookies(["user"]);

  const login = (e) => {
    e.preventDefault();
    const player = { email, password };
    if (messEmail === "Valid Email" && messPassword === "Valid Password") {
      setCookie("user", email, { path: "/" });
      console.log(cookies);
      console.log(player);
      fetch("http://localhost/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(player),
      }).then(() => {
        console.log("Added");
      });
    }
  };

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
