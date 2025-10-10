import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AddEmployeeForm from './AddEmployeeForm';
import { FaPlus } from 'react-icons/fa';
import background from '../assets/background.png'
import { DEPARTMENTS } from '../config/constants';

const employees = [
  { id: '1', name: 'Alice Johnson', email: 'alice.johnson@example.com', department: 'Human Resources and Administration', biometricId: 'BIO001' },
  { id: '2', name: 'Bob Smith', email: 'bob.smith@example.com', department: 'Data Analytics', biometricId: 'BIO002' },
  { id: '3', name: 'Charlie Brown', email: 'charlie.brown@example.com', department: 'Digital Marketing', biometricId: 'BIO003' },
  { id: '4', name: 'Diana Prince', email: 'diana.prince@example.com', department: 'Finance & Accounts', biometricId: 'BIO004' },
  { id: '5', name: 'Ethan Hunt', email: 'ethan.hunt@example.com', department: 'Supply Chain', biometricId: 'BIO005' },
  { id: '6', name: 'Fiona Gallagher', email: 'fiona.gallagher@example.com', department: 'Zonal Sales', biometricId: 'BIO006' },
  { id: '7', name: 'George Miller', email: 'george.miller@example.com', department: 'New Product Design', biometricId: 'BIO007' },
  { id: '8', name: 'Hannah Lee', email: 'hannah.lee@example.com', department: 'Retail E-commerce', biometricId: 'BIO008' },
  { id: '9', name: 'Ian Curtis', email: 'ian.curtis@example.com', department: 'India E-commerce', biometricId: 'BIO009' },
  { id: '10', name: 'Julia Roberts', email: 'julia.roberts@example.com', department: 'Zonal Sales (India)- HORECA', biometricId: 'BIO010' },
];

const EmployeeTable = ({ employeesList = employees, onAddEmployee, onUpdateEmployee, onDeleteEmployee }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const recordsPerPage = 5;

  const filteredEmployees = useMemo(() => {
    if (!searchTerm) return employeesList;
    
    return employeesList.filter(emp => 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.biometricId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, employeesList]);

  const totalPages = Math.ceil(filteredEmployees.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewEmployee = (employee) => {
    const company = window.location.pathname.startsWith('/ecosoul') ? 'ecosoul' : 'thrive-brands';
    navigate(`/${company}/employee/${employee.id}`);
  };

  const handleUpdateEmployee = (employeeId, updatedData) => {
    if (onUpdateEmployee) {
      onUpdateEmployee(employeeId, updatedData);
    }
  };

  const handleDeleteEmployee = (employeeId) => {
    if (onDeleteEmployee) {
      onDeleteEmployee(employeeId);
    }
  };

  const handleAddEmployee = (newEmployee) => {
    if (onAddEmployee) {
      onAddEmployee(newEmployee);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm font-medium text-[#403d39] bg-white border border-[#ccc5b9] hover:bg-[#fffcf2] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        Previous
      </button>
    );

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 text-sm font-medium border-t border-b border-[#ccc5b9] transition-colors duration-200 ${
            i === currentPage
              ? 'bg-[#eb5e28] text-white border-[#eb5e28]'
              : 'text-[#403d39] bg-white hover:bg-[#fffcf2]'
          }`}
        >
          {i}
        </button>
      );
    }

    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm font-medium text-[#403d39] bg-white border border-[#ccc5b9] hover:bg-[#fffcf2] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        Next
      </button>
    );

    return buttons;
  };
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mt-6 relative overflow-hidden">
      <img src={background} alt="background" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div className="relative z-10 flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-[#403d39] flex items-center">
          <div className="w-1 h-7 bg-[#eb5e28] rounded-full mr-3"></div>
          Employee List
        </h2>
        <button
          onClick={() => setIsAddFormOpen(true)}
          className="bg-[#eb5e28] hover:bg-[#d54e1a] text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:ring-opacity-50 flex items-center gap-2"
        >
          <FaPlus size={16}/>
          Add Employee
        </button>
      </div>
    <AddEmployeeForm
      isOpen={isAddFormOpen}
      onClose={() => setIsAddFormOpen(false)}
      onAddEmployee={handleAddEmployee}
    />
      
      <div className="relative z-10 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search employees by name, email, department, or biometric ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 text-[#403d39] bg-[#fffcf2] border border-[#ccc5b9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:border-transparent transition-all duration-200 placeholder-[#8a8a8a]"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-[#8a8a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        {searchTerm && (
          <p className="text-sm text-[#8a8a8a] mt-2">
            Showing {filteredEmployees.length} of {employeesList.length} employees
          </p>
        )}
      </div>

      <div className="relative z-10 overflow-x-auto rounded-lg border border-[#ccc5b9]">
        <table className="min-w-full divide-y divide-[#ccc5b9]">
          <thead className="bg-[#fffcf2]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#403d39] uppercase tracking-wider">
                Biometric ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#403d39] uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#403d39] uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#403d39] uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#403d39] uppercase tracking-wider">
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[#f5f3ed]">
            {currentEmployees.length > 0 ? (
              currentEmployees.map((emp, idx) => (
                <tr
                  key={emp.id}
                  className={idx % 2 === 0 ? 'bg-[#fffcf2]' : 'bg-white'}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#403d39] font-medium">
                    {emp.biometricId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#403d39]">
                    {emp.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#403d39]">
                    {emp.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#eb5e28] font-semibold">
                    {emp.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button 
                      onClick={() => handleViewEmployee(emp)}
                      className="bg-[#eb5e28] hover:bg-[#d54e1a] text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:ring-opacity-50"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-[#8a8a8a]">
                  No employees found matching your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredEmployees.length > recordsPerPage && (
        <div className="relative z-10 mt-6 flex items-center justify-between">
          <div className="text-sm text-[#8a8a8a]">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredEmployees.length)} of {filteredEmployees.length} results
          </div>
          <div className="flex items-center space-x-1">
            {renderPaginationButtons()}
          </div>
        </div>
      )}

    </div>
  );
};

export default EmployeeTable;
