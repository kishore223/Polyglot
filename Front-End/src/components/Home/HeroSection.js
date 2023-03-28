import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "./HeroSection.css";
import { useNavigate } from "react-router-dom";
import { email } from "../Functions/CommonScripts.js";

function HeroSection() {
  const navigate = useNavigate();
  const check = (e) => {
    email !== undefined ? navigate("/Language") : navigate("/Login");
  };
  return (
    <div className="hero-container">
      <img className="img-home" src="./images/Home.jpg" alt="Home_Image" />
      <h1 className="card-head ital-rem">Polyglot</h1>
      <p className="p-home">
        Learning a new language is like discovering a new world.
      </p>
      <div>
        <Button
          className="btn btn-secondary btn-lg btn-acc-home"
          onClick={(e) => {
            check(e);
          }}
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
