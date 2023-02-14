import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";
import icon from "./icon.png";
import Signup from "../components/Signup.js";
import Login from "../components/Login.js";

function LogSign(props) {
  return (
    <div className="row">
      <div className="first-div col-lg-6">
        <h2 className="h2-acc">Learn</h2>
        <p className="p-acc">
          PolyGlot is a platform for language learning. This application
          enabling english speakers to learn a different language.
        </p>
        <img className="img-acc" src={icon} alt="icon"></img>
      </div>
      <div className="second-div col-lg-6">
        {props.active === "first" && <Login />}
        {props.active === "second" && <Signup />}
      </div>
    </div>
  );
}

export default LogSign;
