import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LogSign from "./LogSign.js";
import Dashboard from "./Dashboard.js";
import Learning1 from "./Learning1.js";
import { Home } from "./Home.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Signup" element={<LogSign active="second" />} />
          <Route path="/Login" element={<LogSign active="first" />} />
          <Route path="/Learning1" element={<Learning1 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
