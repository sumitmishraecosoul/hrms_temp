import React, { useState } from 'react';
import { FaEdit, FaSave, FaTimes, FaMapMarkerAlt, FaUser } from 'react-icons/fa';

const EmployeeAdditionalDetailsTab = ({ employee, isEditing, onUpdate, registerSaveHandler }) => {
  const [formData, setFormData] = useState({
    fatherName: employee?.employeeAdditionalDetail?.fatherName || '',
    personalEmail: employee?.employeeAdditionalDetail?.personalEmail || '',
    maritialStatus: employee?.employeeAdditionalDetail?.maritialStatus || '',
    bloodGroup: employee?.employeeAdditionalDetail?.bloodGroup || '',
    nationality: employee?.employeeAdditionalDetail?.nationality || '',
    emergencyContact: employee?.employeeAdditionalDetail?.emergencyContact || '',
    presentAddress: employee?.employeeAdditionalDetail?.presentAddress || '',
    permanentAddress: employee?.employeeAdditionalDetail?.permanentAddress || ''
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

    if (!formData.presentAddress.trim()) {
      newErrors.presentAddress = 'Present address is required';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.emergencyContactName.trim()) {
      newErrors.emergencyContactName = 'Emergency contact name is required';
    }

    if (!formData.emergencyContactPhone.trim()) {
      newErrors.emergencyContactPhone = 'Emergency contact phone is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const updatedData = {
        ...formData,
        emergencyContact: {
          fullName: formData.emergencyContactName,
          phoneNumber: formData.emergencyContactPhone,
          relationship: formData.emergencyContactRelationship
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
      presentAddress: employee?.presentAddress || '',
      permanentAddress: employee?.permanentAddress || '',
      country: employee?.country || '',
      state: employee?.state || '',
      city: employee?.city || '',
      postCode: employee?.postCode || '',
      emergencyContactName: employee?.emergencyContact?.fullName || '',
      emergencyContactPhone: employee?.emergencyContact?.phoneNumber || '',
      emergencyContactRelationship: employee?.emergencyContact?.relationship || '',
      fatherName: employee?.fatherName || '',
      personalEmail: employee?.personalEmail || '',
      bloodGroup: employee?.bloodGroup || '',
      aadharNumber: employee?.aadharNumber || '',
      panNumber: employee?.panNumber || ''
    });
    setErrors({});
  };

  const renderField = (label, name, type = 'text', required = false) => {
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
                placeholder={`Enter ${label.toLowerCase()}`}
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
                placeholder={`Enter ${label.toLowerCase()}`}
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
      {/* Address Section */}
      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-4">
              <FaMapMarkerAlt className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Address Information</h3>
              <p className="text-gray-500 text-sm">Contact and location details</p>
            </div>
          </div>
          {!isEditing && (
            <button className="w-10 h-10 bg-gray-100 hover:bg-green-100 rounded-full flex items-center justify-center transition-colors duration-200">
              <FaEdit className="w-4 h-4 text-gray-600 hover:text-green-600" />
            </button>
          )}
        </div>

        <div className="space-y-4">
          {renderField('Present Address', 'presentAddress', 'textarea')}
          {renderField('Permanent Address', 'permanentAddress', 'textarea')}
        </div>
      </div>

      {/* Emergency Contact Section */}
      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mr-4">
              <FaUser className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Emergency Contact</h3>
              <p className="text-gray-500 text-sm">Emergency contact information</p>
            </div>
          </div>
          {!isEditing && (
            <button className="w-10 h-10 bg-gray-100 hover:bg-red-100 rounded-full flex items-center justify-center transition-colors duration-200">
              <FaEdit className="w-4 h-4 text-gray-600 hover:text-red-600" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4">
          {renderField('Emergency Contact', 'emergencyContact', 'text')}
        </div>
      </div>

      {/* Additional Personal Info Section */}
      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
              <FaUser className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Additional Information</h3>
              <p className="text-gray-500 text-sm">Personal and family details</p>
            </div>
          </div>
          {!isEditing && (
            <button className="w-10 h-10 bg-gray-100 hover:bg-purple-100 rounded-full flex items-center justify-center transition-colors duration-200">
              <FaEdit className="w-4 h-4 text-gray-600 hover:text-purple-600" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {renderField('Father Name', 'fatherName', 'text')}
          {renderField('Personal Email', 'personalEmail', 'email')}
          {renderField('Marital Status', 'maritialStatus', 'text')}
          {renderField('Blood Group', 'bloodGroup', 'text')}
          {renderField('Nationality', 'nationality', 'text')}
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

export default EmployeeAdditionalDetailsTab;
