import React, { useState } from "react";
import "./App.css";
import Home from "./screen/Home";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./screen/Login";
import SignUp from "./screen/SignUp.jsx";
import NavBar from "./components/Navbar.jsx";
import {AuthProvider} from "./components/AuthContext"
import Simulations from './screen/Simulations.jsx'
//import ContextProvider from "./component/Contextreducer.jsx";

function App() {
  // const [latestKpis,setLastestKips] = useState(null);
  return (

    <Router>
      <NavBar  />
      <div className="min-h-screen bg-gray-900 text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
{/*            <Route path="/simulation" element={<Simulations  />} /> */}
        </Routes>
      </div>
    </Router>
  

  );
}

export default App;
