import React, { useState, useEffect } from 'react';

const EditEmployeeForm = ({ isOpen, onClose, employee, onUpdateEmployee, onDeleteEmployee }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    department: ''
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

  
  useEffect(() => {
    if (employee) {
      setFormData({
        id: employee.id || '',
        name: employee.name || '',
        email: employee.email || '',
        department: employee.department || ''
      });
    }
  }, [employee]);

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onUpdateEmployee(employee.id, formData);
      setErrors({});
      onClose();
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${employee.name}? This action cannot be undone.`)) {
      onDeleteEmployee(employee.id);
      onClose();
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 bg-[#fffcf2]/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-md max-h-[90vh] overflow-y-auto">
                
        <div className="flex items-center justify-between p-6 border-b border-[#ccc5b9]">
          <h2 className="text-2xl font-bold text-[#403d39] flex items-center">
            <div className="w-1 h-7 bg-[#eb5e28] rounded-full mr-3"></div>
            Edit Employee
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

          
          <div className="space-y-4 pt-4">
            
            <div className="flex space-x-4">
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
                Update Employee
              </button>
            </div>
            
            
            <button
              type="button"
              onClick={handleDelete}
              className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Delete Employee</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeForm;
