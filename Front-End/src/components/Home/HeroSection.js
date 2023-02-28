import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "./HeroSection.css";

function HeroSection() {
  return (
    <div className="hero-container">
      <img class="img-home" src="/images/cropped.jpg" alt="Home_Image" />
      <h1 className="card-head ital-rem">Polyglot</h1>
      <p className="p-home">
        Learning a new language is like discovering a new world.
      </p>
      <div>
        <Button className="btn btn-secondary btn-lg btn-acc-home">
          GET STARTED
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
