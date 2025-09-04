import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon, UserIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../components/AuthContext";
const apiUrl = import.meta.env.VITE_API_URL;
function Login() {
  let navigate = useNavigate();
 const { log } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", json.authToken);
         log()
        navigate("/");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong!");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-100 via-blue-50 to-green-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-200"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-green-700 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-700 mb-6">
          Please login to continue
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            placeholder="Enter your email"
            className="w-full border border-gray-300 text-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <label className="block text-gray-700 font-semibold mb-2">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={credentials.password}
            onChange={onChange}
            placeholder="Enter your password"
            className="w-full border border-gray-300 text-gray-700 rounded-lg px-4 py-2 pr-12 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
            required
          />
          
           <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-9 right-3 text-gray-500 hover:text-green-500 transition"
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105"
          >
            Login
          </button>
          <Link
            to="/createuser"
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-transform transform hover:scale-105 text-center"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;

