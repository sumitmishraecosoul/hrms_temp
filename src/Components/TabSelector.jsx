import React from 'react';

const TabSelector = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-2 mb-6">
      <nav className="flex space-x-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 relative flex items-center ${
              activeTab === tab.id
                ? 'bg-white text-[#eb5e28] shadow-lg transform scale-105'
                : 'text-gray-600 hover:text-[#eb5e28] hover:bg-white/50'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-[#eb5e28] to-[#d54e1a] rounded-full"></div>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabSelector;
