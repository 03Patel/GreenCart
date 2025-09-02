import React, { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";


function NavBar() {
  const navigate = useNavigate();
  const { authToken,log, logout } = useContext(AuthContext);

  const handleLogoutClick = () => {
    logout();
    navigate("/");
  };
    const handleLoginClick = () => {
     log();
  
  };

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="max-w-380">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-6">
            <Link className="text-3xl italic font-bold" to="/">
              GreenCart
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link className="text-lg hover:text-gray-200" to="/">
                Home
              </Link>
            </div>
          </div>

          {(!localStorage.getItem("authToken")) ? (
            <div className="flex space-x-3">
              <Link className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-100" to="/login" >
                LogIn
              </Link>
              <Link className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-100" to="/signup">
                SignUp
              </Link>
            </div>
          ) : (
            <div className="flex space-x-3">
              <Link className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-100" to="/simulation" >
                Simulation
              </Link>
              <button
                onClick={handleLogoutClick}
                className="bg-white text-red-600 px-4 py-2 rounded hover:bg-gray-100"
              >
                LogOut
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
