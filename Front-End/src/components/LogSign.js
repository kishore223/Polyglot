import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";
import icon from "./icon.png";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Signup from "../components/Signup.js";
import Login from "../components/Login.js";
import { Alert } from "react-bootstrap";

function LogSign(props) {
  const [key, setKey] = useState(props.active);
  return (
    <div className="row">
      <div className="first-div col-lg-6">
        <h2 className="h2-acc">Learn</h2>
        <p className="p-acc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <img className="img-acc" src={icon} alt="icon"></img>
      </div>
      <div className="second-div col-lg-6">
        <div className="sign-div">
          <Alert>{props.active}</Alert>
          <Tabs activeKey={key} fill onSelect={(k) => setKey(k)}>
            <Tab tabClassName="title-beauty" eventKey="first" title="LOGIN">
              <Login />
            </Tab>
            <Tab tabClassName="title-beauty" eventKey="second" title="SIGNUP">
              <Signup />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default LogSign;
