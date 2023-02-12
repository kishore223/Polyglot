import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BsXCircleFill } from "react-icons/bs";
import { useCookies } from "react-cookie";
import { InputGroup } from "react-bootstrap";
import { checkEmail, checkPass } from "./LoginSignupFunctions.js";
import { BiLogInCircle } from "react-icons/bi";
import Alert from "react-bootstrap/Alert";
import CloseButton from "react-bootstrap/CloseButton";
import Cookies from "universal-cookie";

function Login() {
  const [password, setPassword] = useState("");
  const [messPassLogin, setMessPassLogin] = useState("");

  const [userName, setEmail] = React.useState("");
  const [messLogin, setMessLogin] = React.useState("");

  const [messEmail, setMessageEmail] = React.useState("");
  const [messPassword, setMessagePassword] = React.useState("");

  const [cookies, setCookie] = useCookies(["user"]);
  const cookieslog = new Cookies();
  const cook_log = cookieslog.get("login");
  const [messInvalid, setMessageInvalid] = useState(cook_log);

  const empty = () => {
    setMessagePassword("");
    setMessageEmail("");
    setPassword("");
    setMessPassLogin("");
    setEmail("");
    setMessLogin("");
  };

  const login = (e) => {
    const player = { userName, password };
    if (messEmail === "Valid Email" && messPassword === "Valid Password") {
      fetch("http://localhost:8080/polyglot/player/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(player),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.errorCode === "10200") {
            setMessageInvalid("Successful Credentials");
            setCookie("user", userName, { path: "/" });
            cookieslog.remove("login");
            console.log(cookies);
            empty();
            window.location.href = "/Dashboard";
          } else if (responseJson.errorCode === "10404") {
            setMessageInvalid("Please check the Username/Password");
            empty();
          }
        });
    } else {
      setMessageInvalid("Invalid Credentials");
      empty();
    }
  };

  const removestyle = () => {
    setMessageInvalid("");
  };

  return (
    <div className="sign-div">
      <div id="con" className="contact">
        <div className="icon-div">
          <Button className="title-beauty">LOGIN</Button>
          <BiLogInCircle className="big-icon" />
        </div>
        <p className="about-p">Signin to Continue</p>
        {messInvalid === "Success" && (
          <Alert key="success" variant="success" className="col-md-8 alert">
            <p className="alert-p">Account Created. Please Signin</p>
            <CloseButton className="alert-close" onClick={removestyle} />
          </Alert>
        )}
        {messInvalid === undefined && (
          <Alert key="warning" variant="warning" className="col-md-5 alert">
            <p className="alert-p">Please Signin</p>
            <CloseButton className="alert-close" onClick={removestyle} />
          </Alert>
        )}
        {messInvalid === "Invalid Credentials" && (
          <Alert key="danger" variant="danger" className="col-md-5 alert">
            <p className="alert-p">{messInvalid}</p>
            <CloseButton className="alert-close" onClick={removestyle} />
          </Alert>
        )}
        {messInvalid === "Please check the Username/Password" && (
          <Alert key="danger" variant="danger" className="col-md-10 alert">
            <p className="alert-p">{messInvalid}</p>
            <CloseButton className="alert-close" onClick={removestyle} />
          </Alert>
        )}
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
              <span>Don't have an account? </span>
              <a className="a-acc" href="/Signup">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
