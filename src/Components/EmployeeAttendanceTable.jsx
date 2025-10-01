import React, { useState, useMemo } from 'react';
import EditEmployeeForm from './EditEmployeeForm';
import AddEmployeeForm from './AddEmployeeForm';
import { FaPlus } from 'react-icons/fa';
import background from '../assets/background.png'

const EmployeeAttendanceTable = ({ employeesList = [], onAddEmployee, onUpdateEmployee, onDeleteEmployee }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const recordsPerPage = 5;

  const filteredEmployees = useMemo(() => {
    if (!searchTerm) return employeesList;
    
    return employeesList.filter(emp => 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (emp.total || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (emp.present || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (emp.absent || '').toLowerCase().includes(searchTerm.toLowerCase())
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
    setSelectedEmployee(employee);
    setIsEditFormOpen(true);
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
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mt-6 relative overflow-hidden mb-8">
      <img src={background} alt="background" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div className="relative z-10 flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-[#403d39] flex items-center">
          <div className="w-1 h-7 bg-[#eb5e28] rounded-full mr-3"></div>
          Employee Attendance Table
        </h2>

      </div>

      
      <div className="relative z-10 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search employees by name, email, department, or ID or attendance table date"
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
            Showing {filteredEmployees.length} of {employeesList.length} employees attendance table
          </p>
        )}
      </div>

      <div className="relative z-10 overflow-x-auto rounded-lg border border-[#ccc5b9]">
        <table className="min-w-full divide-y divide-[#ccc5b9]">
          <thead className="bg-[#fffcf2]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#403d39] uppercase tracking-wider">
                E. ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#403d39] uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-[#403d39] uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-[#403d39] uppercase tracking-wider">
                Present
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-[#403d39] uppercase tracking-wider">
                Absent
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
                    {emp.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#403d39]">
                    {emp.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#403d39] text-center">
                    {emp.total ?? '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#403d39] text-center">
                    {emp.present ?? '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#eb5e28] font-semibold text-center">
                    {emp.absent ?? (emp.total != null && emp.present != null ? Math.max(0, emp.total - emp.present) : '-')}
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

      <div className="relative z-20">
        <EditEmployeeForm
          isOpen={isEditFormOpen}
          onClose={() => {
            setIsEditFormOpen(false);
            setSelectedEmployee(null);
          }}
          employee={selectedEmployee}
          onUpdateEmployee={handleUpdateEmployee}
          onDeleteEmployee={handleDeleteEmployee}
        />
      </div>
    </div>
  );
};

export default EmployeeAttendanceTable;
