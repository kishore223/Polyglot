import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LogSign from "./SignupLogin/LogSign.js";
import Dashboard from "./Dashboard/Dashboard.js";
import Learning1 from "./Learning1/Learning1.js";
import Learning2 from "./Learning2/Learning2.js";
import Learning3 from "./Learning3/Learning3.js";
import Game1 from "./Game1/Game1.js";
import Game2 from "./Game2/Game2.js";
import { Home } from "./Home/Home.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Login" element={<LogSign active="first" />} />
          <Route path="/Signup" element={<LogSign active="second" />} />
          <Route path="/Learning1" element={<Learning1 />} />
          <Route path="/Learning2" element={<Learning2 />} />
          <Route path="/Learning3" element={<Learning3 />} />
          <Route path="/Activity1" element={<Game1 />} />
          <Route path="/Activity2" element={<Game2 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
