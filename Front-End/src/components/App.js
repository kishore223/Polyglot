import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./NavBar.js";
import LogSign from "./LogSign.js";
import { Dashboard } from "./Dashboard.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="top-div"></div>
        <Navbar />
        <div></div>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Signup" element={<LogSign active="second" />} />
          <Route path="/Login" element={<LogSign active="first" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
