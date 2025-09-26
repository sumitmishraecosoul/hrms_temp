import React from "react";

const StatCard = (
  {
    number,
    title,
    icon,
    color
  }
) => {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-4 w-[18rem] hover:scale-105 transition-all duration-300 shadow-xl">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{number}</p>
      </div>
      <div className="flex w-[3rem] h-[3rem] items-center justify-center bg-blue-100 rounded-lg p-2">
        {icon}
      </div>    
    </div>
  );
};

export default StatCard;
