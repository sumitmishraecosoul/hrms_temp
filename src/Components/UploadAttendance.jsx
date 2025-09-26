import React, { useState } from 'react';

const UploadAttendance = ({ isOpen, onClose, onSave, mode = 'upload', existingFile = null }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    file: null
  });
  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        file: file
      }));
      
     
      if (errors.file) {
        setErrors(prev => ({
          ...prev,
          file: ''
        }));
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setFormData(prev => ({
          ...prev,
          file: file
        }));
        
       
        if (errors.file) {
          setErrors(prev => ({
            ...prev,
            file: ''
          }));
        }
      } else {
        setErrors(prev => ({
          ...prev,
          file: 'Please upload a CSV file only'
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.date.trim()) {
      newErrors.date = 'Date is required';
    } else if (!/^\d{2}-\d{2}-\d{4}$/.test(formData.date.trim())) {
      newErrors.date = 'Date must be in DD-MM-YYYY format';
    }

    if (!formData.time.trim()) {
      newErrors.time = 'Time is required';
    } else if (!/^\d{2}:\d{2}$/.test(formData.time.trim())) {
      newErrors.time = 'Time must be in HH:MM format';
    }

    if (!formData.file && mode === 'upload') {
      newErrors.file = 'Please select a CSV file';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
      setFormData({
        date: '',
        time: '',
        file: null
      });
      setErrors({});
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      date: '',
      time: '',
      file: null
    });
    setErrors({});
    onClose();
  };

  const formatDateInput = (value) => {
    
    const digits = value.replace(/\D/g, '');
    
    
    if (digits.length <= 2) {
      return digits;
    } else if (digits.length <= 4) {
      return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    } else {
      return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4, 8)}`;
    }
  };

  const formatTimeInput = (value) => {
    
    const digits = value.replace(/\D/g, '');
    
    
    if (digits.length <= 2) {
      return digits;
    } else {
      return `${digits.slice(0, 2)}:${digits.slice(2, 4)}`;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#fffcf2]/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-[#ccc5b9]">
          <h2 className="text-2xl font-bold text-[#403d39] flex items-center">
            <div className="w-1 h-7 bg-[#eb5e28] rounded-full mr-3"></div>
            {mode === 'upload' ? 'Upload Attendance' : 'View/Update Attendance'}
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
            <label htmlFor="date" className="block text-sm font-semibold text-[#403d39] mb-2">
              Date *
            </label>
            <input
              type="text"
              id="date"
              name="date"
              value={formData.date}
              onChange={(e) => {
                const formatted = formatDateInput(e.target.value);
                setFormData(prev => ({ ...prev, date: formatted }));
                if (errors.date) {
                  setErrors(prev => ({ ...prev, date: '' }));
                }
              }}
              placeholder="DD-MM-YYYY"
              maxLength="10"
              className={`w-full px-4 py-3 text-[#403d39] bg-[#fffcf2] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 placeholder-[#8a8a8a] ${
                errors.date ? 'border-red-500' : 'border-[#ccc5b9]'
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
          </div>

          
          <div>
            <label htmlFor="time" className="block text-sm font-semibold text-[#403d39] mb-2">
              Time *
            </label>
            <input
              type="text"
              id="time"
              name="time"
              value={formData.time}
              onChange={(e) => {
                const formatted = formatTimeInput(e.target.value);
                setFormData(prev => ({ ...prev, time: formatted }));
                if (errors.time) {
                  setErrors(prev => ({ ...prev, time: '' }));
                }
              }}
              placeholder="HH:MM"
              maxLength="5"
              className={`w-full px-4 py-3 text-[#403d39] bg-[#fffcf2] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 placeholder-[#8a8a8a] ${
                errors.time ? 'border-red-500' : 'border-[#ccc5b9]'
              }`}
            />
            {errors.time && (
              <p className="text-red-500 text-sm mt-1">{errors.time}</p>
            )}
          </div>

          
          <div>
            <label className="block text-sm font-semibold text-[#403d39] mb-2">
              {mode === 'upload' ? 'Upload CSV File *' : 'Replace CSV File'}
            </label>
            
            
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
                dragActive 
                  ? 'border-[#eb5e28] bg-[#fffcf2]' 
                  : 'border-[#ccc5b9] hover:border-[#eb5e28] hover:bg-[#fffcf2]'
              } ${errors.file ? 'border-red-500' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-[#eb5e28] bg-opacity-10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#eb5e28]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                
                <div>
                  <p className="text-[#403d39] font-medium">
                    {formData.file ? formData.file.name : 'Drop your CSV file here or click to browse'}
                  </p>
                  <p className="text-[#8a8a8a] text-sm mt-1">
                    Only CSV files are allowed
                  </p>
                </div>
              </div>
            </div>

            {errors.file && (
              <p className="text-red-500 text-sm mt-1">{errors.file}</p>
            )}

            
            {mode === 'view' && existingFile && (
              <div className="mt-4 p-4 bg-[#fffcf2] border border-[#ccc5b9] rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#eb5e28] bg-opacity-10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#eb5e28]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-[#403d39] font-medium">{existingFile.name}</p>
                    <p className="text-[#8a8a8a] text-sm">Current file</p>
                  </div>
                </div>
              </div>
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
              {mode === 'upload' ? 'Upload & Save' : 'Update & Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadAttendance;
