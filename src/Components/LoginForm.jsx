import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import thriveLogo from "../assets/thriveLogo.svg";
import ecosoulLogo from "../assets/ecosoulLogo.svg";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

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


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      // Navigate to path selection
      navigate("/path-select");
    } else {
      setErrors({ 
        submit: result.error || 'Login failed. Please check your credentials.' 
      });
    }
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
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{errors.submit}</p>
          </div>
        )}
        
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
          disabled={isLoading}
          className={`mt-4 w-full bg-gradient-to-r from-[#ccc5b9] to-[#403d39] hover:from-[#ccc5b9] hover:to-[#eb5e28] text-white py-3 rounded-md font-bold transition-all duration-300 transform hover:scale-105 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </div>
          ) : (
            'Sign in'
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;