import React, { useState, useRef } from 'react';
import TabSelector from './TabSelector';
import EmployeeDetailHeader from './EmployeeDetailHeader';
import EmployeeDetailsTab from './EmployeeDetailsTab';
import EmployeeAdditionalDetailsTab from './EmployeeAdditionalDetailsTab';
import EmployeeBankingTab from './EmployeeBankingTab';

const EmployeeDetailView = ({ employee, onUpdate, onDelete, onBack, onUpdateProfilePic, onToggleActive }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [isEditing, setIsEditing] = useState(false);
  const saveHandlerRef = useRef(null);

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'job', label: 'More Details' },
    { id: 'payroll', label: 'Bank Details' },
    { id: 'settings', label: 'Settings' }
  ];

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleHeaderSave = async () => {
    if (typeof saveHandlerRef.current === 'function') {
      await saveHandlerRef.current();
    }
  };

  const handleUpdate = async (employeeId, updatedData) => {
    try {
      await onUpdate(employeeId, updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${employee.name}? This action cannot be undone.`)) {
      onDelete(employee.id);
    }
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'general':
        return (
          <EmployeeDetailsTab 
            employee={employee} 
            isEditing={isEditing} 
            onUpdate={handleUpdate}
            registerSaveHandler={(fn) => { saveHandlerRef.current = fn; }}
          />
        );
      case 'job':
        return (
          <EmployeeAdditionalDetailsTab 
            employee={employee} 
            isEditing={isEditing} 
            onUpdate={handleUpdate}
            registerSaveHandler={(fn) => { saveHandlerRef.current = fn; }}
          />
        );
      case 'payroll':
        return (
          <EmployeeBankingTab 
            employee={employee} 
            isEditing={isEditing} 
            onUpdate={handleUpdate}
            registerSaveHandler={(fn) => { saveHandlerRef.current = fn; }}
          />
        );
      case 'settings':
        return (
          <div className="bg-white rounded-xl border border-[#ccc5b9] p-6">
            <h3 className="text-lg font-bold text-[#403d39] mb-4 flex items-center">
              <div className="w-1 h-6 bg-[#eb5e28] rounded-full mr-3"></div>
              Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#fffcf2] rounded-lg border border-[#ccc5b9]">
                <div>
                  <h4 className="font-semibold text-[#403d39]">Delete Employee</h4>
                  <p className="text-sm text-[#8a8a8a]">Permanently remove employee from system</p>
                </div>
                <button 
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-xl border border-[#ccc5b9] p-6">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[#fffcf2] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#8a8a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-[#403d39] mb-2">Coming Soon</h4>
              <p className="text-[#8a8a8a]">This section is under development.</p>
            </div>
          </div>
        );
    }
  };

  if (!employee) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-[#fffcf2] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#8a8a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-[#403d39] mb-2">Employee Not Found</h4>
          <p className="text-[#8a8a8a]">The requested employee could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-0 overflow-hidden">
      <div className="bg-gradient-to-r from-[#eb5e28] to-[#d54e1a] h-2"></div>
      
      <div className="p-8">
        <EmployeeDetailHeader 
          employee={employee} 
          onEdit={handleEdit} 
          isEditing={isEditing}
          onBack={onBack}
          onUpdateProfilePic={onUpdateProfilePic}
          onRequestSave={handleHeaderSave}
          onToggleActive={onToggleActive}
        />
        
        <TabSelector 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        
        <div className="mt-8">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailView;
