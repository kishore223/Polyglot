import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";
import { Button, Form, InputGroup } from "react-bootstrap";
import { BsXCircleFill } from "react-icons/bs";
import {
  signUpForm,
  validEmail,
  validUsername,
  validPassword,
  invalidCredentials,
} from "../Functions/APIFunctions.js";
import { checkEmail, checkPass, checkUser } from "./LoginSignupFunctions.js";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function SignupForm(props) {
  const [name, setUsername] = useState("");
  const [messUserSignUp, setMessUserSignUp] = useState("");

  const [password, setPassword] = useState("");
  const [messPassSignUp, setMessPassSignUp] = useState("");

  const [email, setEmail] = useState("");
  const [messSignUp, setMessSignUp] = useState("");

  const [messEmail, setMessageEmail] = useState("");
  const [messPassword, setMessagePassword] = useState("");
  const [messUsername, setMessageUsername] = useState("");
  const setMessageInvalid = props.setMessageInvalid;

  const [cookies, setCookie] = useCookies(["login"]);
  const navigate = useNavigate();

  const empty = () => {
    setMessagePassword("");
    setMessageEmail("");
    setMessageUsername("");
    setUsername("");
    setMessUserSignUp("");
    setPassword("");
    setMessPassSignUp("");
    setEmail("");
    setMessSignUp("");
  };

  const signUp = (e) => {
    e.preventDefault();
    const player = {
      email,
      password,
      name,
    };
    if (
      messEmail === validEmail &&
      messUsername === validUsername &&
      messPassword === validPassword
    ) {
      signUpForm(player, setMessageInvalid, setCookie, empty, navigate);
      console.log(cookies);
    } else {
      setMessageInvalid(invalidCredentials);
      empty();
    }
  };

  return (
    <div className="row form-row">
      <div className="col-md-12">
        <Form className="row g-3">
          <div className="col-md-12">
            <InputGroup className="inp-mid">
              <Form.Control
                type="text"
                className="form-control input-acc"
                placeholder=" Enter a Username"
                autoComplete="current-username"
                value={name}
                onKeyUp={(e) =>
                  checkUser(setMessUserSignUp, setMessageUsername, name)
                }
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button
                className="input-btn-acc"
                onClick={(e) => {
                  setUsername("");
                  setMessUserSignUp("");
                  setMessageInvalid("");
                  setMessageUsername("");
                }}
              >
                <BsXCircleFill className="btn-color" />
              </Button>
            </InputGroup>
          </div>
          {messUserSignUp}
          <div className="col-md-12">
            <InputGroup>
              <Form.Control
                type="text"
                className="form-control input-acc"
                placeholder="Enter an Email"
                autoComplete="current-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyUp={(e) =>
                  checkEmail(setMessSignUp, setMessageEmail, email)
                }
              />
              <Button
                className="input-btn-acc"
                onClick={(e) => {
                  setEmail("");
                  setMessSignUp("");
                  setMessageInvalid("");
                  setMessageEmail("");
                }}
              >
                <BsXCircleFill className="btn-color" />
              </Button>
            </InputGroup>
          </div>
          {messSignUp}
          <div className="col-md-12">
            <InputGroup>
              <Form.Control
                type="password"
                className="form-control input-acc"
                placeholder="Enter a Password"
                autoComplete="current-password"
                value={password}
                onKeyUp={(e) =>
                  checkPass(setMessPassSignUp, setMessagePassword, password)
                }
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                className="input-btn-acc"
                onClick={(e) => {
                  setPassword("");
                  setMessPassSignUp("");
                  setMessageInvalid("");
                  setMessagePassword("");
                }}
              >
                <BsXCircleFill className="btn-color" />
              </Button>
            </InputGroup>
          </div>
          {messPassSignUp}
          <div className="btn-div">
            <Button
              type="submit"
              className="btn btn-secondary btn-md btn-acc"
              onClick={(e) => signUp(e)}
            >
              SIGNUP
            </Button>
          </div>
        </Form>
        <div className="acc-div-a">
          <span>Already have an account?</span>
          <a className="a-acc" href="/Login">
            {" "}
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
