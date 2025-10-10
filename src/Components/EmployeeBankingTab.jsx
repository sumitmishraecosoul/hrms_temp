import React, { useState } from 'react';
import { FaEdit, FaSave, FaTimes, FaCreditCard, FaUniversity, FaFileAlt } from 'react-icons/fa';

const EmployeeBankingTab = ({ employee, isEditing, onUpdate, registerSaveHandler }) => {
  const [formData, setFormData] = useState({
    accountNumber: employee?.employeeBanking?.accountNumber || '',
    bankName: employee?.employeeBanking?.bankName || '',
    branchName: employee?.employeeBanking?.branchName || '',
    ifscCode: employee?.employeeBanking?.ifscCode || '',
    branchAddress: employee?.employeeBanking?.branchAddress || '',
    aadharNumber: employee?.employeeBanking?.aadharNumber || '',
    panNumber: employee?.employeeBanking?.panNumber || '',
    uanNumber: employee?.employeeBanking?.uanNumber || ''
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

    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required';
    }

    if (!formData.bankName.trim()) {
      newErrors.bankName = 'Bank name is required';
    }

    if (!formData.ifscCode.trim()) {
      newErrors.ifscCode = 'IFSC code is required';
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode.toUpperCase())) {
      newErrors.ifscCode = 'Please enter a valid IFSC code';
    }

    if (!formData.panNumber.trim()) {
      newErrors.panNumber = 'PAN number is required';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber.toUpperCase())) {
      newErrors.panNumber = 'Please enter a valid PAN number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const updatedData = {
        banking: {
          accountNumber: formData.accountNumber,
          bankName: formData.bankName,
          branchName: formData.branchName,
          ifscCode: formData.ifscCode.toUpperCase(),
          branchAddress: formData.branchAddress,
          aadharNumber: formData.aadharNumber,
          panNumber: formData.panNumber.toUpperCase(),
          uanNumber: formData.uanNumber
        }
      };
      onUpdate(employee.id, updatedData);
    }
  };

  // expose save to parent
  React.useEffect(() => {
    if (typeof registerSaveHandler === 'function') {
      registerSaveHandler(handleSave);
    }
    return () => {
      if (typeof registerSaveHandler === 'function') {
        registerSaveHandler(null);
      }
    };
  }, [registerSaveHandler, handleSave, formData, isEditing]);

  const handleCancel = () => {
    setFormData({
      accountNumber: employee?.banking?.accountNumber || '',
      bankName: employee?.banking?.bankName || '',
      branchName: employee?.banking?.branchName || '',
      ifscCode: employee?.banking?.ifscCode || '',
      branchAddress: employee?.banking?.branchAddress || '',
      aadharNumber: employee?.banking?.aadharNumber || '',
      panNumber: employee?.banking?.panNumber || '',
      uanNumber: employee?.banking?.uanNumber || ''
    });
    setErrors({});
  };

  const renderField = (label, name, type = 'text', required = false, placeholder = '') => {
    const value = formData[name] || '';
    const error = errors[name];

    return (
      <div className="mb-4">
        <label className="block text-sm font-semibold text-[#403d39] mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {isEditing ? (
          <>
            {type === 'textarea' ? (
              <textarea
                name={name}
                value={value}
                onChange={handleInputChange}
                rows={3}
                className={`w-full px-4 py-3 text-[#403d39] bg-[#fffcf2] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 placeholder-[#8a8a8a] resize-none ${
                  error ? 'border-red-500' : 'border-[#ccc5b9]'
                }`}
                placeholder={placeholder || `Enter ${label.toLowerCase()}`}
              />
            ) : (
              <input
                type={type}
                name={name}
                value={value}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 text-[#403d39] bg-[#fffcf2] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 placeholder-[#8a8a8a] ${
                  error ? 'border-red-500' : 'border-[#ccc5b9]'
                }`}
                placeholder={placeholder || `Enter ${label.toLowerCase()}`}
              />
            )}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </>
        ) : (
          <p className="text-[#403d39] py-3 px-4 bg-[#fffcf2] rounded-lg border border-[#ccc5b9] min-h-[48px] flex items-center">
            {value || '-'}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Banking Information Section */}
      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4">
              <FaCreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Banking Information</h3>
              <p className="text-gray-500 text-sm">Account and financial details</p>
            </div>
          </div>
          {!isEditing && (
            <button className="w-10 h-10 bg-gray-100 hover:bg-indigo-100 rounded-full flex items-center justify-center transition-colors duration-200">
              <FaEdit className="w-4 h-4 text-gray-600 hover:text-indigo-600" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderField('Account Number', 'accountNumber', 'text', true, 'Enter bank account number')}
          {renderField('Bank Name', 'bankName', 'text', true, 'Enter bank name')}
          {renderField('Branch Name', 'branchName', 'text', false, 'Enter branch name')}
          {renderField('IFSC Code', 'ifscCode', 'text', true, 'e.g., SBIN0001234')}
        </div>

        <div className="mt-4">
          {renderField('Branch Address', 'branchAddress', 'textarea', false, 'Enter complete branch address')}
        </div>
      </div>

      {/* Document Information Section */}
      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mr-4">
              <FaFileAlt className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Document Information</h3>
              <p className="text-gray-500 text-sm">Identity and tax documents</p>
            </div>
          </div>
          {!isEditing && (
            <button className="w-10 h-10 bg-gray-100 hover:bg-yellow-100 rounded-full flex items-center justify-center transition-colors duration-200">
              <FaEdit className="w-4 h-4 text-gray-600 hover:text-yellow-600" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderField('Aadhar Number', 'aadharNumber', 'text', false, 'Enter 12-digit Aadhar number')}
          {renderField('PAN Number', 'panNumber', 'text', true, 'e.g., ABCDE1234F')}
          {renderField('UAN Number', 'uanNumber', 'text', false, 'Enter Universal Account Number')}
        </div>
      </div>

      {/* Payroll Information Section */}
      <div className="bg-white rounded-xl border border-[#ccc5b9] p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-[#403d39] flex items-center">
            <FaUniversity className="w-5 h-5 mr-3 text-[#eb5e28]" />
            Payroll Information
          </h3>
          {!isEditing && (
            <button className="text-[#8a8a8a] hover:text-[#eb5e28] transition-colors duration-200">
              <FaEdit className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="bg-[#fffcf2] rounded-lg p-4 border border-[#ccc5b9]">
          <p className="text-[#8a8a8a] text-sm">
            Payroll information will be managed by the HR department. 
            Contact your HR representative for any payroll-related queries.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      {isEditing && (
        <div className="flex justify-end space-x-4 pt-6 border-t border-[#ccc5b9]">
          <button
            onClick={handleCancel}
            className="px-6 py-3 text-[#403d39] bg-[#fffcf2] border border-[#ccc5b9] rounded-lg font-medium hover:bg-[#f5f3ed] transition-colors duration-200 flex items-center"
          >
            <FaTimes className="w-4 h-4 mr-2" />
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-[#eb5e28] hover:bg-[#d54e1a] text-white rounded-lg font-medium transition-colors duration-200 flex items-center"
          >
            <FaSave className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeBankingTab;
