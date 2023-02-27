import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BsXCircleFill } from "react-icons/bs";
import { InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { checkEmail, checkPass, checkUser } from "./LoginSignupFunctions.js";
import Alert from "react-bootstrap/Alert";
import CloseButton from "react-bootstrap/CloseButton";
import { GoSignIn } from "react-icons/go";
import { useCookies } from "react-cookie";
import {API_BASE_URL} from "../constants";

function Signup() {
  const [name, setUsername] = useState("");
  const [messUserSignUp, setMessUserSignUp] = useState("");

  const [password, setPassword] = useState("");
  const [messPassSignUp, setMessPassSignUp] = useState("");

  const [email, setEmail] = useState("");
  const [messSignUp, setMessSignUp] = useState("");

  const [messEmail, setMessageEmail] = useState("");
  const [messPassword, setMessagePassword] = useState("");
  const [messUsername, setMessageUsername] = useState("");
  const [messInvalid, setMessageInvalid] = useState("");

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
    const player = { email, password, name };
    console.log(messEmail, messUsername, messPassword);
    if (
      messEmail === "Valid Email" &&
      messUsername === "Valid Username" &&
      messPassword === "Valid Password"
    ) {
      fetch(API_BASE_URL+"/polyglot/player/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(player),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson.errorCode === "10201") {
            setMessageInvalid("Successful Credentials");
            setCookie("login", "Success", { path: "/" });
            console.log(cookies);
            empty();
            e.preventDefault();
            navigate("/Login");
          } else if (responseJson.errorCode === "10409") {
            setMessageInvalid("User Already Exists. Please Signup Again");
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
          <Button className="title-beauty">SIGNUP</Button>
          <GoSignIn className="big-icon" />
        </div>
        <p className="about-p">Create an Account</p>
        {messInvalid === "User Already Exists. Please Signup Again" && (
          <Alert key="danger" variant="danger" className="col-md-10 alert">
            <p className="alert-p">{messInvalid}</p>
            <CloseButton className="alert-close" onClick={removestyle} />
          </Alert>
        )}
        {messInvalid === "Successful Credentials" && (
          <Alert key="success" variant="success" className="col-md-6 alert">
            <p className="alert-p">{messInvalid}</p>
            <CloseButton className="alert-close" onClick={removestyle} />
          </Alert>
        )}
        {messInvalid === "Invalid Credentials" && (
          <Alert key="danger" variant="danger" className="col-md-5 alert">
            <p className="alert-p">{messInvalid}</p>
            <CloseButton className="alert-close" onClick={removestyle} />
          </Alert>
        )}
        <div className="row form-row">
          <div className="col-md-12">
            <Form className="row g-3">
              <div className="col-md-12">
                <InputGroup className="inp-mid">
                  <Form.Control
                    type="text"
                    className="form-control input-acc"
                    id="inputName4"
                    placeHolder=" Enter a Username"
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
              <span>Already have an account? </span>
              <a className="a-acc" href="/Login">
                Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
