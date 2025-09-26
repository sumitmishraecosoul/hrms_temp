import React, { useState } from 'react';

const AddEmployeeForm = ({ isOpen, onClose, onAddEmployee }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    department: '',
    dateOfJoining: '',
    biometricId: ''
  });
  const [errors, setErrors] = useState({});

  const departments = [
    'HR',
    'Engineering',
    'Marketing',
    'Finance',
    'Operations',
    'Sales',
    'Support'
  ];

  const genders = [
    'Male',
    'Female',
    'Other'
  ];

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

    if (!formData.id.trim()) {
      newErrors.id = 'Employee ID is required';
    } else if (!/^E\d{3}$/.test(formData.id.trim())) {
      newErrors.id = 'Employee ID must be in format E001, E002, etc.';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData.dateOfJoining.trim()) {
      newErrors.dateOfJoining = 'Date of Joining is required';
    }

    if (!formData.biometricId.trim()) {
      newErrors.biometricId = 'Biometric ID is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddEmployee(formData);
      setFormData({
        id: '',
        name: '',
        email: '',
        department: '',
        dateOfJoining: '',
        biometricId: ''
      });
      setErrors({});
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      id: '',
      name: '',
      email: '',
      department: '',
      dateOfJoining: '',
      biometricId: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#fffcf2]/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-md max-h-[90vh] overflow-y-auto">
        
        <div className="flex items-center justify-between p-6 border-b border-[#ccc5b9]">
          <h2 className="text-2xl font-bold text-[#403d39] flex items-center">
            <div className="w-1 h-7 bg-[#eb5e28] rounded-full mr-3"></div>
            Add New Employee
          </h2>
          <button
            onClick={handleClose}
            className="text-[#8a8a8a] hover:text-[#403d39] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:ring-opacity-50 rounded-lg p-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>


        <form onSubmit={handleSubmit} className="p-6 space-y-6">
         
          <div>
            <label htmlFor="id" className="block text-sm font-semibold text-[#403d39] mb-2">
              Employee ID *
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              placeholder="e.g., E001"
              className={`w-full px-4 py-3 text-[#403d39] bg-[#fffcf2] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 placeholder-[#8a8a8a] ${
                errors.id ? 'border-red-500' : 'border-[#ccc5b9]'
              }`}
            />
            {errors.id && (
              <p className="text-red-500 text-sm mt-1">{errors.id}</p>
            )}
          </div>

         
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-[#403d39] mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter full name"
              className={`w-full px-4 py-3 text-[#403d39] bg-[#fffcf2] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 placeholder-[#8a8a8a] ${
                errors.name ? 'border-red-500' : 'border-[#ccc5b9]'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

         
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#403d39] mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email address"
              className={`w-full px-4 py-3 text-[#403d39] bg-[#fffcf2] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 placeholder-[#8a8a8a] ${
                errors.email ? 'border-red-500' : 'border-[#ccc5b9]'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

         
          <div>
            <label htmlFor="department" className="block text-sm font-semibold text-[#403d39] mb-2">
              Department *
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 text-[#403d39] bg-[#fffcf2] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 ${
                errors.department ? 'border-red-500' : 'border-[#ccc5b9]'
              }`}
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept} value={dept} className="text-[#403d39]">
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="text-red-500 text-sm mt-1">{errors.department}</p>
            )}
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-semibold text-[#403d39] mb-2">
              Gender *
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 text-[#403d39] bg-[#fffcf2] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 ${
                errors.gender ? 'border-red-500' : 'border-[#ccc5b9]'
              }`}
            >
              <option value="">Select Gender</option>
              {genders.map(dept => (
                <option key={genders} value={genders} className="text-[#403d39]">
                  {dept}
                </option>
              ))}
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>

          <div>
            <label htmlFor="dateOfJoining" className="block text-sm font-semibold text-[#403d39] mb-2">
              Date of Joining *
            </label>
            <input
              type="text"
              id="dateOfJoining"
              name="dateOfJoining"
              value={formData.dateOfJoining}
              onChange={handleInputChange}
              placeholder="e.g., 2025-01-01"
              className={`w-full px-4 py-3 text-[#403d39] bg-[#fffcf2] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 placeholder-[#8a8a8a] ${
                errors.dateOfJoining ? 'border-red-500' : 'border-[#ccc5b9]'
              }`}
            />
            {errors.dateOfJoining && (
              <p className="text-red-500 text-sm mt-1">{errors.dateOfJoining}</p>
            )}
          </div>

          <div>
            <label htmlFor="biometricId" className="block text-sm font-semibold text-[#403d39] mb-2">
              Biometric ID *
            </label>
            <input
              type="text"
              id="biometricId"
              name="biometricId"
              value={formData.biometricId}
              onChange={handleInputChange}
              placeholder="e.g., 1234567890"
              className={`w-full px-4 py-3 text-[#403d39] bg-[#fffcf2] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 placeholder-[#8a8a8a] ${
                errors.biometricId ? 'border-red-500' : 'border-[#ccc5b9]'
              }`}
            />
            {errors.biometricId && (
              <p className="text-red-500 text-sm mt-1">{errors.biometricId}</p>
            )}
          </div>

         
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 text-[#403d39] bg-[#fffcf2] border border-[#ccc5b9] rounded-lg font-medium hover:bg-[#f5f3ed] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:ring-opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#eb5e28] hover:bg-[#d54e1a] text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:ring-opacity-50"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
