import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import thriveLogo from "../assets/thriveLogo.svg";
import ecosoulLogo from "../assets/ecosoulLogo.svg";

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/path-select");
    
  };

  return (
    <div className="bg-[#fffcf2] backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md text-black border border-[#eb5e28]">
      <div className="flex justify-center px-4">
        {/* <img
          src={thriveLogo}
          alt="Thrive Logo"
          className="w-[10rem] h-[10rem]"
        />
        <img 
        src={ecosoulLogo} 
        alt="EcoSoul Logo"
        className="w-[10rem] h-[10rem]" /> */}
        <h1 className="text-[#252422] text-2xl font-bold mb-4">
            HR Management Portal
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-[#252422] block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/80 text-black border-2 border-gray-300 focus:border-[#eb5e28] focus:outline-none"
            required
          />
          {errors.email && (
            <p className="text-red-300 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="text-[#252422] block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/80 text-black border-2 border-gray-300 focus:border-[#eb5e28] focus:outline-none"
            required
          />
          {errors.password && (
            <p className="text-red-300 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <div className="flex justify-end p-2">
          <Link to="/forgot-password" className="text-[#252422] text-sm text-left hover:text-[#eb5e28] transition-all duration-300">Reset Password</Link>
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-gradient-to-r from-[#ccc5b9] to-[#403d39] hover:from-[#ccc5b9] hover:to-[#eb5e28] text-white py-3 rounded-md font-bold transition-all duration-300 transform hover:scale-105"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;