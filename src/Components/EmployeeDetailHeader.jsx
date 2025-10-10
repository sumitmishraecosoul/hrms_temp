import React, { useRef, useState } from 'react';
import { FaEdit, FaChevronDown, FaEnvelope, FaPhone, FaClock, FaBuilding, FaUser } from 'react-icons/fa';

const EmployeeDetailHeader = ({ employee, onEdit, isEditing, onBack, onUpdateProfilePic, onRequestSave, onToggleActive }) => {
  const [isActive, setIsActive] = useState(Boolean(employee?.isActive));
  const fileInputRef = useRef(null);
  
  if (!employee) return null;

  const handleToggleActive = async () => {
    setIsActive(prev => !prev);
    if (onToggleActive) {
      await onToggleActive(employee.id);
    }
  };

  return (
    <div className="mb-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center text-gray-500 hover:text-[#eb5e28] transition-colors duration-300 mb-6 group"
      >
        <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#eb5e28]/10 flex items-center justify-center mr-3 transition-colors duration-300">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <span className="font-medium">Back to Employees</span>
      </button>

      {/* Employee Summary Cards - Horizontal Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 border border-gray-200 shadow-xl">
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20 rounded-full mb-4 shadow-lg overflow-hidden group">
              {employee.profilePic?.path ? (
                <img 
                  src={`http://localhost:5010/${employee.profilePic.path}`}
                  alt={`${employee.name}'s profile`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to default icon if image fails to load
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className={`w-full h-full bg-gradient-to-br from-[#eb5e28] to-[#d54e1a] flex items-center justify-center ${
                  employee.profilePic?.path ? 'hidden' : 'flex'
                }`}
              >
                <FaUser className="w-10 h-10 text-white" />
              </div>
              {/* Edit overlay button */}
              <button
                type="button"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 bg-white border border-gray-200 shadow-md rounded-full w-8 h-8 flex items-center justify-center text-[#eb5e28] hover:text-white hover:bg-[#eb5e28] transition-colors duration-200"
                title="Update profile picture"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M4 13.5V19h5.5l9.464-9.464a1.5 1.5 0 000-2.121l-2.879-2.879a1.5 1.5 0 00-2.121 0L4 13.5z" />
                </svg>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files && e.target.files[0];
                  if (file && onUpdateProfilePic) {
                    await onUpdateProfilePic(employee.id, file);
                    // clear selection to allow uploading the same file again if needed
                    e.target.value = '';
                  }
                }}
              />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">{employee.name}</h2>
            <p className="text-gray-500 text-sm font-medium text-center">{employee.designation || 'Employee'}</p>
          </div>
        </div>

        {/* Contact Information Card */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 border border-gray-200 shadow-xl">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-[#eb5e28]/10 rounded-full flex items-center justify-center mr-3">
              <FaEnvelope className="w-5 h-5 text-[#eb5e28]" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Contact</h3>
          </div>
          <div className="space-y-3">
            <div className="text-sm">
              <p className="text-gray-500 font-medium">Email</p>
              <p className="text-gray-800 font-semibold">{employee.email}</p>
            </div>
            <div className="text-sm">
              <p className="text-gray-500 font-medium">Phone Number</p>
              <p className="text-gray-800 font-semibold">{employee.phoneNumber || '-'}</p>
            </div>
          </div>
        </div>

        {/* Department Information Card */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 border border-gray-200 shadow-xl">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <FaBuilding className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Department</h3>
          </div>
          <div className="space-y-3">
            <div className="text-sm">
              <p className="text-gray-500 font-medium">Department</p>
              <p className="text-gray-800 font-semibold">{employee.department}</p>
            </div>
            <div className="text-sm">
              <p className="text-gray-500 font-medium">Office</p>
              <p className="text-gray-800 font-semibold">{employee.company}</p>
            </div>
          </div>
        </div>

        {/* Biometric Information Card */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 border border-gray-200 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#eb5e28]/10 rounded-full flex items-center justify-center mr-3">
                <FaUser className="w-5 h-5 text-[#eb5e28]" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Biometric</h3>
            </div>
            {/* Active Status Toggle */}
            <button 
              onClick={handleToggleActive}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isActive 
                  ? 'bg-green-500 focus:ring-green-500 hover:bg-green-600' 
                  : 'bg-gray-300 focus:ring-gray-300 hover:bg-gray-400'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isActive ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
          <div className="space-y-3">
            <div className="text-sm">
              <p className="text-gray-500 font-medium">Biometric ID</p>
              <p className="text-gray-800 font-semibold">{employee.biometricId || 'Not assigned'}</p>
            </div>
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className={`text-sm font-medium ${isActive ? 'text-green-600' : 'text-gray-500'}`}>
                {isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Header with Edit Button */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Employee Details</h1>
          <p className="text-gray-500">Manage and view employee information</p>
        </div>
        <button
          onClick={isEditing ? (onRequestSave || onEdit) : onEdit}
          className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
            isEditing
              ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
              : 'bg-gradient-to-r from-[#eb5e28] to-[#d54e1a] hover:from-[#d54e1a] hover:to-[#c4451a] text-white'
          }`}
        >
          <FaEdit className="w-5 h-5 mr-3" />
          {isEditing ? 'Save Changes' : 'Edit Employee'}
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetailHeader;
