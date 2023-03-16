import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";
import { Button, Alert, CloseButton } from "react-bootstrap";
import { GoSignIn } from "react-icons/go";
import SignupForm from "./SignupForm.js";

function Signup() {
  const [messInvalid, setMessageInvalid] = useState("");

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
        <SignupForm setMessageInvalid={setMessageInvalid} />
      </div>
    </div>
  );
}

export default Signup;
