import React, { useState, useEffect } from 'react';
import employeeService from '../services/employeeService';
import { useToast } from './ToastProvider.jsx';
import { useLocation } from 'react-router-dom';
import { DEPARTMENTS, DESIGNATIONS, GENDERS } from '../config/constants';

const AddEmployeeForm = ({ isOpen, onClose, onAddEmployee, departments = [], designations = [], genders = [], companies = [] }) => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    department: '',
    designation: '',
    // dateOfJoining: '', // commented per request
    biometricId: '',
    gender: '',
    company: '',
    dateOfBirth: '',
    workAnniversary: '',
    active: true,
    fatherName: '',
    personalEmail: '',
    maritalStatus: '',
    bloodGroup: '',
    nationality: '',
    presentAddress: '',
    permanentAddress: '',
    emergencyContact: '',
    accountNumber: '',
    branchName: '',
    ifscCode: '',
    branchAddress: '',
    aadharNumber: '',
    panNumber: '',
    bankName: '',
    uanNumber: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: basic details, 2: personal details, 3: banking details
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState('');
  const { push } = useToast();

  
  const isEcoSoul = location.pathname.startsWith('/ecosoul');
  const isThriveBrands = location.pathname.startsWith('/thrive-brands');
  const selectedCompany = isEcoSoul ? 'EcoSoul' : isThriveBrands ? 'ThriveBrands' : '';
  
  
  const availableCompanies = companies.length > 0 ? companies : (isEcoSoul ? ['EcoSoul'] : isThriveBrands ? ['ThriveBrands'] : ['ThriveBrands', 'EcoSoul']);

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

  const handleProfilePicChange = (e) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setProfilePicFile(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProfilePicPreview(previewUrl);
    } else {
      setProfilePicPreview('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
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

    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = 'Date of Birth is required';
    }

    if (!formData.workAnniversary.trim()) {
      newErrors.workAnniversary = 'Work Anniversary is required';
    }

    // Step 2 required fields
    if (!formData.fatherName.trim()) {
      newErrors.fatherName = "Father's Name is required";
    }
    if (!formData.personalEmail.trim()) {
      newErrors.personalEmail = 'Personal Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.personalEmail)) {
      newErrors.personalEmail = 'Please enter a valid personal email address';
    }
    if (!formData.maritalStatus.trim()) {
      newErrors.maritalStatus = 'Marital Status is required';
    }
    if (!formData.nationality.trim()) {
      newErrors.nationality = 'Nationality is required';
    }
    if (!formData.bloodGroup.trim()) {
      newErrors.bloodGroup = 'Blood Group is required';
    }
    if (!formData.presentAddress.trim()) {
      newErrors.presentAddress = 'Present Address is required';
    }
    if (!formData.permanentAddress.trim()) {
      newErrors.permanentAddress = 'Permanent Address is required';
    }
    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact = 'Emergency Contact is required';
    }

    // Step 3 required fields
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Account Number is required';
    }
    if (!formData.branchName.trim()) {
      newErrors.branchName = 'Branch Name is required';
    }
    if (!formData.bankName.trim()) {
      newErrors.bankName = 'Bank Name is required';
    }
    if (!formData.ifscCode.trim()) {
      newErrors.ifscCode = 'IFSC Code is required';
    }
    if (!formData.branchAddress.trim()) {
      newErrors.branchAddress = 'Branch Address is required';
    }
    if (!formData.aadharNumber.trim()) {
      newErrors.aadharNumber = 'Aadhar Number is required';
    }
    if (!formData.panNumber.trim()) {
      newErrors.panNumber = 'PAN Number is required';
    }
    if (!formData.uanNumber.trim()) {
      newErrors.uanNumber = 'UAN Number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepOne = () => {
    const requiredStepOne = ['name', 'phoneNumber', 'email', 'department', 'designation', 'gender', 'company', 'biometricId', 'dateOfBirth', 'workAnniversary'];
    const newErrors = {};
    requiredStepOne.forEach((field) => {
      const value = String(formData[field] ?? '').trim();
      if (!value) {
        newErrors[field] = `${field === 'biometricId' ? 'Biometric ID' : field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepTwo = () => {
    const requiredStepTwo = ['fatherName', 'personalEmail', 'maritalStatus', 'bloodGroup', 'nationality', 'presentAddress', 'permanentAddress', 'emergencyContact'];
    const newErrors = {};
    requiredStepTwo.forEach((field) => {
      const value = String(formData[field] ?? '').trim();
      if (!value) {
        newErrors[field] = `${field === 'fatherName' ? "Father's Name" : field === 'personalEmail' ? 'Personal Email' : field === 'maritalStatus' ? 'Marital Status' : field === 'bloodGroup' ? 'Blood Group' : field === 'nationality' ? 'Nationality' : field === 'presentAddress' ? 'Present Address' : field === 'permanentAddress' ? 'Permanent Address' : field === 'emergencyContact' ? 'Emergency Contact' : field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    if (formData.personalEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.personalEmail)) {
      newErrors.personalEmail = 'Please enter a valid personal email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Structure data according to API format
        const structuredData = {
          employeeData: {
            name: formData.name,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            department: formData.department,
            designation: formData.designation,
            biometricId: formData.biometricId,
            gender: formData.gender,
            company: formData.company,
            dateOfBirth: formData.dateOfBirth,
            workAnniversary: formData.workAnniversary,
            active: formData.active
          },
          employeeAdditionalDetail: {
            fatherName: formData.fatherName,
            personalEmail: formData.personalEmail,
            maritalStatus: formData.maritalStatus,
            bloodGroup: formData.bloodGroup,
            nationality: formData.nationality,
            emergencyContact: formData.emergencyContact
          },
          employeeBanking: {
            accountNumber: formData.accountNumber,
            branchName: formData.branchName,
            ifscCode: formData.ifscCode,
            branchAddress: formData.branchAddress,
            aadharNumber: formData.aadharNumber,
            panNumber: formData.panNumber,
            bankName: formData.bankName,
            uanNumber: formData.uanNumber
          }
        };
        
        // Build payload: if profile picture is selected, send multipart/form-data
        let payload = structuredData;
        if (profilePicFile) {
          const formData = new FormData();
          formData.append('employeeData', JSON.stringify(structuredData.employeeData));
          formData.append('employeeAdditionalDetail', JSON.stringify(structuredData.employeeAdditionalDetail));
          formData.append('employeeBanking', JSON.stringify(structuredData.employeeBanking));
          formData.append('profilePic', profilePicFile);
          payload = formData;
        }

        const response = await employeeService.createEmployee(payload);
        console.log('Employee created successfully:', response);
        push({ type: 'success', message: 'Employee created successfully.' });
        
        if (onAddEmployee) {
          onAddEmployee(structuredData);
        }
        console.log('Employee added successfully:', structuredData);
        
        setFormData({
          name: '',
          phoneNumber: '',
          email: '',
          department: '',
          designation: '',
          // dateOfJoining: '',
          biometricId: '',
          gender: '',
          company: '',
          dateOfBirth: '',
          workAnniversary: '',
          active: true,
          fatherName: '',
          personalEmail: '',
          maritalStatus: '',
          bloodGroup: '',
          nationality: '',
          presentAddress: '',
          permanentAddress: '',
          emergencyContact: '',
          accountNumber: '',
          branchName: '',
          ifscCode: '',
          branchAddress: '',
          aadharNumber: '',
          panNumber: '',
          bankName: '',
          uanNumber: ''
        });
        setProfilePicFile(null);
        setProfilePicPreview('');
        setErrors({});
        onClose();
      } catch (error) {
        console.error('Error creating employee:', error);
        setErrors({ submit: 'Failed to create employee. Please try again.' });
        push({ type: 'error', message: 'Failed to create employee.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      phoneNumber: '',
      email: '',
      department: '',
      designation: '',
      // dateOfJoining: '',
      biometricId: '',
      gender: '',
      company: '',
      dateOfBirth: '',
      workAnniversary: '',
      active: true,
      fatherName: '',
      personalEmail: '',
      maritalStatus: '',
      bloodGroup: '',
      nationality: '',
      presentAddress: '',
      permanentAddress: '',
      emergencyContact: '',
      accountNumber: '',
      branchName: '',
      ifscCode: '',
      branchAddress: '',
      aadharNumber: '',
      panNumber: '',
      bankName: '',
      uanNumber: ''
    });
    setProfilePicFile(null);
    setProfilePicPreview('');
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#fffcf2] flex flex-col z-50">
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8e6df] bg-white/80 backdrop-blur">
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

      <div className="px-6 pt-4">
        <div className="w-full max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex-1 h-2 rounded-full bg-[#e9e5da]">
              <div className={`h-2 rounded-full bg-[#eb5e28] transition-all duration-300 ${step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'}`}></div>
            </div>
            <div className="ml-4 text-sm font-medium text-[#403d39]">Step {step} of 3</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 overflow-auto">
        {errors.submit && (
          <div className="w-full max-w-5xl mx-auto mt-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{errors.submit}</p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="w-full max-w-5xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[#403d39] mb-2">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  className={`w-full px-4 py-3 text-[#403d39] bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 placeholder-[#8a8a8a] ${errors.name ? 'border-red-500' : 'border-[#e6e2d6]'}`}
                />
                {errors.name && (<p className="text-red-500 text-sm mt-1">{errors.name}</p>)}
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-semibold text-[#403d39] mb-2">Phone Number *</label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  className={`w-full px-4 py-3 text-[#403d39] bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 placeholder-[#8a8a8a] ${errors.phoneNumber ? 'border-red-500' : 'border-[#e6e2d6]'}`}
                />
                {errors.phoneNumber && (<p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>)}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#403d39] mb-2">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  className={`w-full px-4 py-3 text-[#403d39] bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 placeholder-[#8a8a8a] ${errors.email ? 'border-red-500' : 'border-[#e6e2d6]'}`}
                />
                {errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email}</p>)}
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-semibold text-[#403d39] mb-2">Department *</label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-[#403d39] bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 ${errors.department ? 'border-red-500' : 'border-[#e6e2d6]'}`}
                >
                  <option value="">Select Department</option>
                  {departmentOptions.map(dept => (
                    <option key={dept} value={dept} className="text-[#403d39]">{dept}</option>
                  ))}
                </select>
                {errors.department && (<p className="text-red-500 text-sm mt-1">{errors.department}</p>)}
              </div>

              <div>
                <label htmlFor="designation" className="block text-sm font-semibold text-[#403d39] mb-2">Designation *</label>
                <select
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-[#403d39] bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 ${errors.designation ? 'border-red-500' : 'border-[#e6e2d6]'}`}
                >
                  <option value="">Select Designation</option>
                  {designationOptions.map(designation => (
                    <option key={designation} value={designation} className="text-[#403d39]">{designation}</option>
                  ))}
                </select>
                {errors.designation && (<p className="text-red-500 text-sm mt-1">{errors.designation}</p>)}
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-semibold text-[#403d39] mb-2">Gender *</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-[#403d39] bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 ${errors.gender ? 'border-red-500' : 'border-[#e6e2d6]'}`}
                >
                  <option value="">Select Gender</option>
                  {genderOptions.map(gender => (
                    <option key={gender} value={gender} className="text-[#403d39]">{gender}</option>
                  ))}
                </select>
                {errors.gender && (<p className="text-red-500 text-sm mt-1">{errors.gender}</p>)}
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-[#403d39] mb-2">Company *</label>
                <select
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  disabled
                  className={`w-full px-4 py-3 text-[#403d39] bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 ${errors.company ? 'border-red-500' : 'border-[#e6e2d6]'}`}
                >
                  <option value="">Select Company</option>
                  {selectedCompany && (<option value={selectedCompany} className="text-[#403d39]">{selectedCompany}</option>)}
                </select>
                {errors.company && (<p className="text-red-500 text-sm mt-1">{errors.company}</p>)}
              </div>

              <div>
                <label htmlFor="biometricId" className="block text-sm font-semibold text-[#403d39] mb-2">Biometric ID *</label>
                <input
                  type="text"
                  id="biometricId"
                  name="biometricId"
                  value={formData.biometricId}
                  onChange={handleInputChange}
                  placeholder="e.g., 1234567890"
                  className={`w-full px-4 py-3 text-[#403d39] bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 placeholder-[#8a8a8a] ${errors.biometricId ? 'border-red-500' : 'border-[#e6e2d6]'}`}
                />
                {errors.biometricId && (<p className="text-red-500 text-sm mt-1">{errors.biometricId}</p>)}
              </div>

              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-[#403d39] mb-2">Date of Birth *</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-[#403d39] bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 ${errors.dateOfBirth ? 'border-red-500' : 'border-[#e6e2d6]'}`}
                />
                {errors.dateOfBirth && (<p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>)}
              </div>

              <div>
                <label htmlFor="workAnniversary" className="block text-sm font-semibold text-[#403d39] mb-2">Work Anniversary *</label>
                <input
                  type="date"
                  id="workAnniversary"
                  name="workAnniversary"
                  value={formData.workAnniversary}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-[#403d39] bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 ${errors.workAnniversary ? 'border-red-500' : 'border-[#e6e2d6]'}`}
                />
                {errors.workAnniversary && (<p className="text-red-500 text-sm mt-1">{errors.workAnniversary}</p>)}
              </div>

            {/* Profile Picture Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-[#403d39] mb-2">Profile Picture</label>
              <div className="flex items-center justify-between bg-white border border-[#e6e2d6] rounded-xl p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-[#f5f2ea] flex items-center justify-center border border-[#e6e2d6]">
                    {profilePicPreview ? (
                      <img src={profilePicPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-8 h-8 text-[#c2b8a3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 20h14a2 2 0 002-2V8l-6-6H7a2 2 0 00-2 2v16z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-[#403d39] font-medium">Upload profile picture</p>
                    <p className="text-xs text-[#8a8a8a]">PNG, JPG or SVG up to 2MB</p>
                  </div>
                </div>
                <label className="cursor-pointer px-4 py-2 text-white rounded-xl font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:ring-opacity-50 bg-[#eb5e28] hover:bg-[#d54e1a]">
                  <input type="file" accept="image/*" className="hidden" onChange={handleProfilePicChange} />
                  Choose File
                </label>
              </div>
            </div>

            {/* Active Toggle */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-[#403d39] mb-2">Active Status</label>
              <div className="flex items-center justify-between bg-white border border-[#e6e2d6] rounded-xl p-4">
                <div className="flex items-center">
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${formData.active ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                  <span className={`text-sm font-medium ${formData.active ? 'text-green-600' : 'text-[#8a8a8a]'}`}>
                    {formData.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, active: !prev.active }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    formData.active
                      ? 'bg-green-500 focus:ring-green-500 hover:bg-green-600'
                      : 'bg-gray-300 focus:ring-gray-300 hover:bg-gray-400'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.active ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-3 text-[#403d39] bg-white border border-[#e6e2d6] rounded-xl font-medium hover:bg-[#faf8f2] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:ring-opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => { if (validateStepOne()) setStep(2); }}
                className="px-6 py-3 text-white rounded-xl font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:ring-opacity-50 bg-[#eb5e28] hover:bg-[#d54e1a]"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="w-full max-w-5xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fatherName" className="block text-sm font-semibold text-[#403d39] mb-2">Father's Name *</label>
                <input
                  type="text"
                  id="fatherName"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  placeholder="Enter father's name"
                  className={`w-full px-4 py-3 text-[#403d39] bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 placeholder-[#8a8a8a] ${errors.fatherName ? 'border-red-500' : 'border-[#e6e2d6]'}`}
                />
                {errors.fatherName && (<p className="text-red-500 text-sm mt-1">{errors.fatherName}</p>)}
              </div>

              <div>
                <label htmlFor="personalEmail" className="block text-sm font-semibold text-[#403d39] mb-2">Personal Email *</label>
                <input
                  type="email"
                  id="personalEmail"
                  name="personalEmail"
                  value={formData.personalEmail}
                  onChange={handleInputChange}
                  placeholder="Enter personal email"
                  className={`w-full px-4 py-3 text-[#403d39] bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 placeholder-[#8a8a8a] ${errors.personalEmail ? 'border-red-500' : 'border-[#e6e2d6]'}`}
                />
                {errors.personalEmail && (<p className="text-red-500 text-sm mt-1">{errors.personalEmail}</p>)}
              </div>

              <div>
                <label htmlFor="maritalStatus" className="block text-sm font-semibold text-[#403d39] mb-2">Marital Status *</label>
                <select
                  id="maritalStatus"
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-[#403d39] bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 ${errors.maritalStatus ? 'border-red-500' : 'border-[#e6e2d6]'}`}
                >
                  <option value="">Select Marital Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
                {errors.maritalStatus && (<p className="text-red-500 text-sm mt-1">{errors.maritalStatus}</p>)}
              </div>

              <div>
                <label htmlFor="bloodGroup" className="block text-sm font-semibold text-[#403d39] mb-2">Blood Group *</label>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-[#403d39] bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 ${errors.bloodGroup ? 'border-red-500' : 'border-[#e6e2d6]'}`}
                >
                  <option value="">Select Blood Group</option>
                  {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
                {errors.bloodGroup && (<p className="text-red-500 text-sm mt-1">{errors.bloodGroup}</p>)}
              </div>

              <div>
                <label htmlFor="nationality" className="block text-sm font-semibold text-[#403d39] mb-2">Nationality *</label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  placeholder="Enter nationality"
                  className={`w-full px-4 py-3 text-[#403d39] bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 placeholder-[#8a8a8a] ${errors.nationality ? 'border-red-500' : 'border-[#e6e2d6]'}`}
                />
                {errors.nationality && (<p className="text-red-500 text-sm mt-1">{errors.nationality}</p>)}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="presentAddress" className="block text-sm font-semibold text-[#403d39] mb-2">Present Address *</label>
                <textarea
                  id="presentAddress"
                  name="presentAddress"
                  value={formData.presentAddress}
                  onChange={handleInputChange}
                  placeholder="House, Street, City, State, PIN"
                  rows={3}
                  className={`w-full px-4 py-3 text-[#403d39] bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 placeholder-[#8a8a8a] ${errors.presentAddress ? 'border-red-500' : 'border-[#e6e2d6]'}`}
                />
                {errors.presentAddress && (<p className="text-red-500 text-sm mt-1">{errors.presentAddress}</p>)}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="permanentAddress" className="block text-sm font-semibold text-[#403d39] mb-2">Permanent Address *</label>
                <textarea
                  id="permanentAddress"
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleInputChange}
                  placeholder="House, Street, City, State, PIN"
                  rows={3}
                  className={`w-full px-4 py-3 text-[#403d39] bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 placeholder-[#8a8a8a] ${errors.permanentAddress ? 'border-red-500' : 'border-[#e6e2d6]'}`}
                />
                {errors.permanentAddress && (<p className="text-red-500 text-sm mt-1">{errors.permanentAddress}</p>)}
              </div>

              <div>
                <label htmlFor="emergencyContact" className="block text-sm font-semibold text-[#403d39] mb-2">Emergency Contact *</label>
                <input
                  type="text"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  placeholder="Name and phone number"
                  className={`w-full px-4 py-3 text-[#403d39] bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 placeholder-[#8a8a8a] ${errors.emergencyContact ? 'border-red-500' : 'border-[#e6e2d6]'}`}
                />
                {errors.emergencyContact && (<p className="text-red-500 text-sm mt-1">{errors.emergencyContact}</p>)}
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-3 text-[#403d39] bg-white border border-[#e6e2d6] rounded-xl font-medium hover:bg-[#faf8f2] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:ring-opacity-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => { if (validateStepTwo()) setStep(3); }}
                className="px-6 py-3 text-white rounded-xl font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:ring-opacity-50 bg-[#eb5e28] hover:bg-[#d54e1a]"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="w-full max-w-5xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="accountNumber" className="block text-sm font-semibold text-[#403d39] mb-2">Account Number *</label>
                <input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  placeholder="Enter account number"
                  className={`w-full px-4 py-3 text-[#403d39] bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 placeholder-[#8a8a8a] ${errors.accountNumber ? 'border-red-500' : 'border-[#e6e2d6]'}`}
                />
                {errors.accountNumber && (<p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>)}
              </div>

              <div>
                <label htmlFor="branchName" className="block text-sm font-semibold text-[#403d39] mb-2">Branch Name *</label>
                <input
                  type="text"
                  id="branchName"
                  name="branchName"
                  value={formData.branchName}
                  onChange={handleInputChange}
                  placeholder="Enter branch name"
                  className={`w-full px-4 py-3 text-[#403d39] bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 placeholder-[#8a8a8a] ${errors.branchName ? 'border-red-500' : 'border-[#e6e2d6]'}`}
                />
                {errors.branchName && (<p className="text-red-500 text-sm mt-1">{errors.branchName}</p>)}
              </div>

              <div>
                <label htmlFor="ifscCode" className="block text-sm font-semibold text-[#403d39] mb-2">IFSC Code *</label>
                <input
                  type="text"
                  id="ifscCode"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleInputChange}
                  placeholder="e.g., SBIN0001234"
                  className={`w-full px-4 py-3 text-[#403d39] bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 placeholder-[#8a8a8a] ${errors.ifscCode ? 'border-red-500' : 'border-[#e6e2d6]'}`}
                />
                {errors.ifscCode && (<p className="text-red-500 text-sm mt-1">{errors.ifscCode}</p>)}
              </div>

              <div>
                <label htmlFor="aadharNumber" className="block text-sm font-semibold text-[#403d39] mb-2">Aadhar Number *</label>
                <input
                  type="text"
                  id="aadharNumber"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleInputChange}
                  placeholder="12-digit Aadhar number"
                  className={`w-full px-4 py-3 text-[#403d39] bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 placeholder-[#8a8a8a] ${errors.aadharNumber ? 'border-red-500' : 'border-[#e6e2d6]'}`}
                />
                {errors.aadharNumber && (<p className="text-red-500 text-sm mt-1">{errors.aadharNumber}</p>)}
              </div>

              <div>
                <label htmlFor="panNumber" className="block text-sm font-semibold text-[#403d39] mb-2">PAN Number *</label>
                <input
                  type="text"
                  id="panNumber"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleInputChange}
                  placeholder="e.g., ABCDE1234F"
                  className={`w-full px-4 py-3 text-[#403d39] bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 placeholder-[#8a8a8a] ${errors.panNumber ? 'border-red-500' : 'border-[#e6e2d6]'}`}
                />
                {errors.panNumber && (<p className="text-red-500 text-sm mt-1">{errors.panNumber}</p>)}
              </div>

              <div>
                <label htmlFor="bankName" className="block text-sm font-semibold text-[#403d39] mb-2">Bank Name *</label>
                <input
                  type="text"
                  id="bankName"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  placeholder="Enter bank name"
                  className={`w-full px-4 py-3 text-[#403d39] bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 placeholder-[#8a8a8a] ${errors.bankName ? 'border-red-500' : 'border-[#e6e2d6]'}`}
                />
                {errors.bankName && (<p className="text-red-500 text-sm mt-1">{errors.bankName}</p>)}
              </div>

              <div>
                <label htmlFor="uanNumber" className="block text-sm font-semibold text-[#403d39] mb-2">UAN Number *</label>
                <input
                  type="text"
                  id="uanNumber"
                  name="uanNumber"
                  value={formData.uanNumber}
                  onChange={handleInputChange}
                  placeholder="12-digit UAN number"
                  className={`w-full px-4 py-3 text-[#403d39] bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 placeholder-[#8a8a8a] ${errors.uanNumber ? 'border-red-500' : 'border-[#e6e2d6]'}`}
                />
                {errors.uanNumber && (<p className="text-red-500 text-sm mt-1">{errors.uanNumber}</p>)}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="branchAddress" className="block text-sm font-semibold text-[#403d39] mb-2">Branch Address *</label>
                <textarea
                  id="branchAddress"
                  name="branchAddress"
                  value={formData.branchAddress}
                  onChange={handleInputChange}
                  placeholder="Complete branch address"
                  rows={3}
                  className={`w-full px-4 py-3 text-[#403d39] bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 placeholder-[#8a8a8a] ${errors.branchAddress ? 'border-red-500' : 'border-[#e6e2d6]'}`}
                />
                {errors.branchAddress && (<p className="text-red-500 text-sm mt-1">{errors.branchAddress}</p>)}
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 text-[#403d39] bg-white border border-[#e6e2d6] rounded-xl font-medium hover:bg-[#faf8f2] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:ring-opacity-50"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-3 text-white rounded-xl font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:ring-opacity-50 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#eb5e28] hover:bg-[#d54e1a]'}`}
              >
                {isLoading ? 'Creating...' : 'Create Employee'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddEmployeeForm;
