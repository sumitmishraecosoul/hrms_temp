import React from 'react';
import { IoIosNotifications } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { MdAdminPanelSettings, MdLogout } from "react-icons/md";
import DropDown from "./DropDown";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    
    const dropdownOptions = [
        {
            icon: <MdAdminPanelSettings size={18} />,
            title: "Contact Admin",
        },
        {
            icon: <MdLogout size={18} />,
            title: "Logout",
            onClick: () => {
                navigate("/login");
            },
            iconColor: "text-red-600",
            textColor: "text-red-600"
        }
    ];

    return (
        <div className="flex justify-end bg-[#fffcf2] shadow-lg border-b border-gray-200 h-[5rem] flex items-center justify-between px-6">
            <div className="flex items-center space-x-4">
                <DropDown 
                    options={dropdownOptions}
                    buttonContent={
                        <div className="flex items-center">
                            <CiUser size={20} />
                        </div>
                    }
                    iconColor="text-gray-600"
                    textColor="text-gray-600"
                    buttonBgColor="bg-[#eb5e28]"
                />
            </div>
        </div>
    );
};

export default Navbar;
