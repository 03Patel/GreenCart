import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon, UserIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";
const apiUrl ="https://greenbackend-u63l.onrender.com";


function SignUp() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://greenbackend-u63l.onrender.com/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
      });


      const data= await response.json();
      console.log(data);

      if (data.success) {
        alert("User created successfully");
        navigate("/login");
      } else {
        alert("Failed to create user");
      }
    } catch (error) {
      console.log("Signup Error:", error);
      alert("Something went wrong!");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-100 via-blue-50 to-green-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-200"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-green-700 mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Join us to start your journey
        </p>

        {/* Name */}
        <div className="mb-4 relative">
          <UserIcon className="w-5 h-5 absolute left-3 top-3 text-gray-700" />
          <input
            type="text"
            name="name"
            value={credentials.name}
            onChange={onChange}
            placeholder="Enter your name"
            className="w-full border text-gray-700 border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-green-400 outline-none transition"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4 relative">
          <EnvelopeIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            placeholder="you@example.com"
            className="w-full border  text-gray-700 border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-green-400 outline-none transition"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={credentials.password}
            onChange={onChange}
            placeholder="Enter your password"
            className="w-full border  text-gray-700 border-gray-300 rounded-lg pl-4 pr-12 py-2 focus:ring-2 focus:ring-green-400 outline-none transition"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-2.5 right-3 text-gray-500 hover:text-green-500 transition"
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Location */}
        <div className="mb-6 relative">
          <MapPinIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            name="location"
            value={credentials.location}
            onChange={onChange}
            placeholder="City, Country"
            className="w-full border  text-gray-700 border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-green-400 outline-none transition"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105"
          >
            Sign Up
          </button>
          <Link
            to="/login"
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-transform transform hover:scale-105 text-center"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
