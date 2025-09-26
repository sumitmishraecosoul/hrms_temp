import React, { useState, useRef, useEffect } from "react";

const DropDown = ({ options = [], buttonContent, iconColor, textColor, buttonBgColor = "bg-white" }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        type="button"
        className={`flex items-center px-4 py-2 ${buttonBgColor} border border-gray-300 rounded-md shadow-sm hover:opacity-80 focus:outline-none transition-opacity`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {buttonContent}
        <svg
          className={`ml-2 h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <ul className="py-1">
            {options.map((option, idx) => (
              <li
                key={idx}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setOpen(false);
                  if (option.onClick) {
                    option.onClick();
                  }
                }}
              >
                <span className={`mr-3 ${option.iconColor || iconColor || "text-gray-600"}`}>{option.icon}</span>
                <span className={option.textColor || textColor || "text-gray-900"}>{option.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDown;
