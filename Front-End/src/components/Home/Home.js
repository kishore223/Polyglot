import React from "react";
import HeroSection from "./HeroSection";
import Cards from "./Cards";
import Navbar from "../Navbar/NavBar.js";

export const Home = () => {
  return (
    <div>
      <div className="top-div"></div>
      <Navbar />
      <HeroSection />
      <Cards />
    </div>
  );
};
