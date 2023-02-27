import React from "react";
import HeroSection from "./Home/HeroSection";
import Cards from "./Home/Cards";
import Navbar from "./NavBar.js";

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
