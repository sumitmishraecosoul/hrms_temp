import React, { useState } from 'react';
import { FaEdit, FaSave, FaTimes, FaUser, FaBuilding } from 'react-icons/fa';
import { DEPARTMENTS, DESIGNATIONS, GENDERS } from '../config/constants';

const EmployeeDetailsTab = ({ employee, isEditing, onUpdate, registerSaveHandler }) => {
  const [formData, setFormData] = useState({
    name: employee?.name || '',
    email: employee?.email || '',
    department: employee?.department || '',
    designation: employee?.designation || '',
    biometricId: employee?.biometricId || '',
    gender: employee?.gender || '',
    company: employee?.company || '',
    dateOfBirth: employee?.dateOfBirth || '',
    workAnniversary: employee?.workAnniversary || ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData.designation) {
      newErrors.designation = 'Designation is required';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onUpdate(employee.id, formData);
    }
  };

  // expose save to parent so top Save button can trigger this
  React.useEffect(() => {
    if (typeof registerSaveHandler === 'function') {
      registerSaveHandler(handleSave);
    }
    // cleanup on unmount
    return () => {
      if (typeof registerSaveHandler === 'function') {
        registerSaveHandler(null);
      }
    };
  }, [registerSaveHandler, handleSave, formData, isEditing]);

  const handleCancel = () => {
    setFormData({
      name: employee?.name || '',
      email: employee?.email || '',
      department: employee?.department || '',
      designation: employee?.designation || '',
      biometricId: employee?.biometricId || '',
      gender: employee?.gender || '',
      company: employee?.company || '',
      dateOfBirth: employee?.dateOfBirth || '',
      workAnniversary: employee?.workAnniversary || ''
    });
    setErrors({});
  };

  const renderField = (label, name, type = 'text', options = null, required = false) => {
    const value = formData[name] || '';
    const error = errors[name];

    return (
      <div className="mb-4">
        <label className="block text-sm font-semibold text-[#403d39] mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {isEditing ? (
          <>
            {type === 'select' ? (
              <select
                name={name}
                value={value}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 text-[#403d39] bg-[#fffcf2] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 ${
                  error ? 'border-red-500' : 'border-[#ccc5b9]'
                }`}
              >
                <option value="">Select {label}</option>
                {options?.map(option => (
                  <option key={option} value={option} className="text-[#403d39]">
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                name={name}
                value={value}
                onChange={handleInputChange}
                className={`w-full px-4 py-4 text-gray-800 bg-gray-50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-300 placeholder-gray-400 shadow-sm hover:shadow-md focus:bg-white ${
                  error ? 'border-red-500 bg-red-50' : 'border-gray-200'
                }`}
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            )}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </>
        ) : (
          <p className="text-gray-800 py-4 px-4 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm font-medium">
            {value || '-'}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Personal Info Section */}
      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-[#eb5e28] to-[#d54e1a] rounded-2xl flex items-center justify-center mr-4">
              <FaUser className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
              <p className="text-gray-500 text-sm">Basic employee details</p>
            </div>
          </div>
          {!isEditing && (
            <button className="w-10 h-10 bg-gray-100 hover:bg-[#eb5e28]/10 rounded-full flex items-center justify-center transition-colors duration-200">
              <FaEdit className="w-4 h-4 text-gray-600 hover:text-[#eb5e28]" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderField('Full Name', 'name', 'text', null, true)}
          {renderField('Gender', 'gender', 'select', GENDERS, true)}
          {renderField('Date of Birth', 'dateOfBirth', 'date')}
          {renderField('Email Address', 'email', 'email', null, true)}
          {renderField('Company', 'company', 'text')}
          {renderField('Work Anniversary', 'workAnniversary', 'date')}
        </div>
      </div>

      {/* Job Info Section */}
      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4">
              <FaBuilding className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Job Information</h3>
              <p className="text-gray-500 text-sm">Work-related details</p>
            </div>
          </div>
          {!isEditing && (
            <button className="w-10 h-10 bg-gray-100 hover:bg-blue-100 rounded-full flex items-center justify-center transition-colors duration-200">
              <FaEdit className="w-4 h-4 text-gray-600 hover:text-blue-600" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderField('Department', 'department', 'select', DEPARTMENTS, true)}
          {renderField('Designation', 'designation', 'select', DESIGNATIONS, true)}
          {renderField('Biometric ID', 'biometricId', 'text', null, true)}
        </div>
      </div>

      {/* Action Buttons */}
      {isEditing && (
        <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200">
          <button
            onClick={handleCancel}
            className="px-8 py-4 text-gray-600 bg-gray-100 border border-gray-200 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center shadow-sm hover:shadow-md"
          >
            <FaTimes className="w-4 h-4 mr-3" />
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-8 py-4 bg-gradient-to-r from-[#eb5e28] to-[#d54e1a] hover:from-[#d54e1a] hover:to-[#c4451a] text-white rounded-2xl font-semibold transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <FaSave className="w-4 h-4 mr-3" />
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetailsTab;
