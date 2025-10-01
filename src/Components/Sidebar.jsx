import React from 'react'
import thrive_logo from "../assets/thriveLogo.svg";
import ecosoul_logo from "../assets/ecosoulLogo.svg";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaSheetPlastic } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

const Sidebar = ({ activePage, onPageChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  
  const isEcoSoul = location.pathname.startsWith('/ecosoul');
  const isThriveBrands = location.pathname.startsWith('/thrive-brands');
  
  const currentLogo = isEcoSoul ? ecosoul_logo : thrive_logo;
  const brandName = isEcoSoul ? 'EcoSoul' : 'Thrive Brands';
  const baseRoute = isEcoSoul ? '/ecosoul' : '/thrive-brands';
  
  const handleItemClick = (itemId) => {
    onPageChange(itemId);
    const item = menuItems.find(menuItem => menuItem.id === itemId);
    if (item && item.onClick) {
      item.onClick();
    }
  };

  const menuItems = [
    {
        id: 'Home',
        label: 'Home',
        icon: (
          <FaHome />
        ),
        onClick: () => {
          navigate(baseRoute);
        }
      },
    {
      id: 'Employees',
      label: 'Employees',
      icon: (
        <FaUser />
      ),
      onClick: () => {
        navigate(`${baseRoute}/employee`);
      }
    },
    {
      id: 'Attendance',
      label: 'Attendance',
      icon: (
        <FaSheetPlastic />
      ),
      onClick: () => {
        navigate(`${baseRoute}/attendance`);
      }
    },
    
  ]

  return (
    <div className="bg-[#fffcf2] shadow-2xl border-r-2 border-gray-200 w-64 min-h-screen flex flex-col">
      <div className="p-4">  
            <div className='flex justify-center'>
                <img src={currentLogo} alt={brandName} className='w-[75rem] h-[5rem]' />
            </div>
      </div>

      <nav className="flex-1 p-4 space-y-4 bg-[#fffcf2]">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
              activePage === item.id
                ? 'bg-[#ccc5b9] text-black border-r-2 border-[#eb5e28]'
                : 'bg-[#ccc5b9] text-black hover:bg-[#403d39]'
            }`}
          >
            <div className="flex-shrink-0">
              {item.icon}
            </div>
            
            <span className="text-sm font-medium truncate">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 bg-red-100 text-red-700 hover:bg-red-200"
        >
          <div className="flex-shrink-0">
            <FaSignOutAlt />
          </div>
          <span className="text-sm font-medium">Logout</span>
        </button>
        <div className="text-xs text-gray-500 text-center mt-2">
          {brandName}
        </div>
      </div>
    </div>
  )
}

export default Sidebar