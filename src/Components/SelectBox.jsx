import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import thriveLogo from "../assets/thriveLogo.svg";
import ecosoulLogo from "../assets/ecosoulLogo.svg";

const SelectBox = () => {
  const navigate = useNavigate();
  
  const handleOrganizationSelect = (organization) => {
    navigate(`/${organization}`);
  };

  return (
    <div className="bg-[#fffcf2] border border-[#eb5e28] backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md text-black flex flex-col items-center justify-center">
        <div className="flex justify-center items-center gap-10">
            <button 
              className="w-1/2 p-2 rounded-lg hover:bg-gradient-to-br hover:from-orange-100 hover:to-orange-200 hover:shadow-lg hover:shadow-orange-300/50 hover:scale-105 hover:rotate-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400/50 active:scale-95"
              onClick={() => handleOrganizationSelect('thrive-brands')}
              type="button"
            >
                <img src={thriveLogo} alt="Thrive Logo" className="w-full h-full object-contain" />
            </button>
            
            {/* Separator */}
            <div className="w-[0.1rem] h-[4rem] bg-[#eb5e28]"></div>
            
            <button 
              className="w-1/2 p-2 rounded-lg hover:bg-gradient-to-br hover:from-green-100 hover:to-emerald-200 hover:border-2 hover:border-green-400 hover:shadow-xl hover:shadow-green-300/40 hover:scale-110 hover:-rotate-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400/50 active:scale-95"
              onClick={() => handleOrganizationSelect('ecosoul')}
              type="button"
            >
                <img src={ecosoulLogo} alt="EcoSoul Logo" className="w-full h-full object-contain" />
            </button>
            
        </div>

    </div>
  );
};

export default SelectBox;