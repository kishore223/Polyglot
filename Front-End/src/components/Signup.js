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

function Signup() {
  const [username, setUsername] = useState("");
  const [messUserSignUp, setMessUserSignUp] = useState("");

  const [password, setPassword] = useState("");
  const [messPassSignUp, setMessPassSignUp] = useState("");

  const [email, setEmail] = useState("");
  const [messSignUp, setMessSignUp] = useState("");

  const [messEmail, setMessageEmail] = useState("");
  const [messPassword, setMessagePassword] = useState("");
  const [messUsername, setMessageUsername] = useState("");
  const [messInvalid, setMessageInvalid] = useState("");

  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();
    const player = { username, email, password };
    if (
      messEmail === "Valid Email" &&
      messUsername === "Valid Username" &&
      messPassword === "Valid Password"
    ) {
      console.log(player);
      setMessageInvalid("Successful Credentials");
      navigate("/Login");
      fetch("http://localhost/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(player),
      }).then(() => {
        console.log("Added");
      });
    } else {
      setMessageInvalid("Invalid Credentials");
    }
  };

  const removestyle = () => {
    setMessageInvalid("");
  };

  return (
    <div id="con" className="contact">
      <p className="about-p">Create an Account</p>
      {messInvalid === "Invalid Credentials" && (
        <Alert key="danger" variant="danger" className="col-md-5 alert">
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
      <div className="row form-row">
        <div className="col-md">
          <Form className="row g-3">
            <div className="col-md-12">
              <InputGroup className="inp-mid">
                <Form.Control
                  type="text"
                  className="form-control input-acc"
                  id="inputName4"
                  placeHolder=" Enter a Username"
                  value={username}
                  onKeyUp={(e) =>
                    checkUser(setMessUserSignUp, setMessageUsername, username)
                  }
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Button
                  className="input-btn-acc"
                  onClick={(e) => {
                    setUsername("");
                    setMessUserSignUp("");
                    setMessageInvalid("Invalid Credentials");
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
                  id="inputEmail4"
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
                    setMessageInvalid("Invalid Credentials");
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
                  type="text"
                  className="form-control input-acc"
                  id="inputPassword"
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
                    setMessageInvalid("Invalid Credentials");
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
            <a className="a-acc" href="#first">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
