import React, { useState, useEffect } from 'react';
import employeeService from '../services/employeeService';
import { useLocation } from 'react-router-dom';
import { DEPARTMENTS, DESIGNATIONS, GENDERS } from '../config/constants';

const AddEmployeeForm = ({ isOpen, onClose, onAddEmployee, departments = [], designations = [], genders = [], companies = [] }) => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    department: '',
    designation: '',
    // dateOfJoining: '', // commented per request
    biometricId: '',
    gender: '',
    company: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  
  const isEcoSoul = location.pathname.startsWith('/ecosoul');
  const isThriveBrands = location.pathname.startsWith('/thrive-brands');
  const selectedCompany = isEcoSoul ? 'EcoSoul' : isThriveBrands ? 'Thrive-Brands' : '';
  
  
  const availableCompanies = companies.length > 0 ? companies : (isEcoSoul ? ['EcoSoul'] : isThriveBrands ? ['Thrive-Brands'] : ['Thrive-Brands', 'EcoSoul']);

  // Built-in defaults for selects when props are not provided
  const departmentOptions = (departments && departments.length > 0)
    ? departments
    : DEPARTMENTS;

  const designationOptions = (designations && designations.length > 0)
    ? designations
    : DESIGNATIONS;

  const genderOptions = (genders && genders.length > 0)
    ? genders
    : GENDERS;

  
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        company: selectedCompany
      }));
    }
  }, [isOpen, isEcoSoul, isThriveBrands, selectedCompany]);

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
    } else if (!/^\d+$/.test(formData.id.trim())) {
      newErrors.id = 'Employee ID must be a valid number';
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

    if (!formData.designation) {
      newErrors.designation = 'Designation is required';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.company) {
      newErrors.company = 'Company is required';
    }

    // if (!formData.dateOfJoining.trim()) {
    //   newErrors.dateOfJoining = 'Date of Joining is required';
    // }

    if (!formData.biometricId.trim()) {
      newErrors.biometricId = 'Biometric ID is required';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await employeeService.createEmployee(formData);
        console.log('Employee created successfully:', response);
        
        if (onAddEmployee) {
          onAddEmployee(formData);
        }
        console.log('Employee added successfully:', formData);
        
        setFormData({
          id: '',
          name: '',
          email: '',
          department: '',
          designation: '',
          // dateOfJoining: '',
          biometricId: '',
          gender: '',
          company: ''
        });
        setErrors({});
        onClose();
      } catch (error) {
        console.error('Error creating employee:', error);
        setErrors({ submit: 'Failed to create employee. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClose = () => {
    setFormData({
      id: '',
      name: '',
      email: '',
      department: '',
      designation: '',
      // dateOfJoining: '',
      biometricId: '',
      gender: '',
      company: ''
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
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{errors.submit}</p>
            </div>
          )}
         
          <div>
            <label htmlFor="id" className="block text-sm font-semibold text-[#403d39] mb-2">
              Employee ID *
            </label>
            <input
              type="number"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              placeholder="e.g., 123456"
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
              {departmentOptions.map(dept => (
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
            <label htmlFor="designation" className="block text-sm font-semibold text-[#403d39] mb-2">
              Designation *
            </label>
            <select
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 text-[#403d39] bg-[#fffcf2] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 ${
                errors.designation ? 'border-red-500' : 'border-[#ccc5b9]'
              }`}
            >
              <option value="">Select Designation</option>
              {designationOptions.map(designation => (
                <option key={designation} value={designation} className="text-[#403d39]">
                  {designation}
                </option>
              ))}
            </select>
            {errors.designation && (
              <p className="text-red-500 text-sm mt-1">{errors.designation}</p>
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
              {genderOptions.map(gender => (
                <option key={gender} value={gender} className="text-[#403d39]">
                  {gender}
                </option>
              ))}
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-semibold text-[#403d39] mb-2">
              Company *
            </label>
            <select
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              disabled
              className={`w-full px-4 py-3 text-[#403d39] bg-[#fffcf2] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 ${
                errors.company ? 'border-red-500' : 'border-[#ccc5b9]'
              }`}
            >
              <option value="">Select Company</option>
              {selectedCompany && (
                <option value={selectedCompany} className="text-[#403d39]">
                  {selectedCompany}
                </option>
              )}
            </select>
            {errors.company && (
              <p className="text-red-500 text-sm mt-1">{errors.company}</p>
            )}
          </div>

          {/** Date of Joining field commented per request **/}
          {false && (
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
          )}

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
              disabled={isLoading}
              className={`flex-1 px-6 py-3 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:ring-opacity-50 ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-[#eb5e28] hover:bg-[#d54e1a]'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </div>
              ) : (
                'Add Employee'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
