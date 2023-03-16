import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsXCircleFill } from "react-icons/bs";
import { useCookies } from "react-cookie";
import { InputGroup, Form, Button } from "react-bootstrap";
import { checkEmail, checkPass } from "./LoginSignupFunctions.js";
import {
  loginForm,
  validEmail,
  validPassword,
  invalidCredentials,
} from "../Functions/APIFunctions.js";

function LoginForm(props) {
  const [password, setPassword] = useState("");
  const [messPassLogin, setMessPassLogin] = useState("");

  const [userName, setEmail] = React.useState("");
  const [messLogin, setMessLogin] = React.useState("");

  const [messEmail, setMessageEmail] = React.useState("");
  const [messPassword, setMessagePassword] = React.useState("");

  const [cookies, setCookie] = useCookies(["user"]);
  const setMessageInvalid = props.setMessageInvalid;

  const empty = () => {
    setMessagePassword("");
    setMessageEmail("");
    setPassword("");
    setMessPassLogin("");
    setEmail("");
    setMessLogin("");
  };

  const login = (e) => {
    const player = {
      userName,
      password,
    };
    if (messEmail === validEmail && messPassword === validPassword) {
      loginForm(player, setMessageInvalid, setCookie, userName, empty);
      console.log(cookies);
    } else {
      setMessageInvalid(invalidCredentials);
      empty();
    }
  };

  return (
    <div className="row form-row">
      <div className="col-md">
        <Form className="row g-3" id="form-id">
          <div className="col-md-12">
            <InputGroup>
              <Form.Control
                type="text"
                className="form-control input-acc"
                placeholder="Email"
                value={userName}
                onChange={(e) => setEmail(e.target.value)}
                onKeyUp={(e) =>
                  checkEmail(setMessLogin, setMessageEmail, userName)
                }
              />
              <Button
                className="input-btn-acc"
                onClick={(e) => {
                  setEmail("");
                  setMessLogin("");
                  setMessageInvalid("");
                  setMessageEmail("");
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
                type="password"
                className="form-control input-acc"
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
                  setMessageInvalid("");
                  setMessagePassword("");
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
          <span> Don 't have an account?</span>
          <a className="a-acc" href="/Signup">
            {" "}
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
