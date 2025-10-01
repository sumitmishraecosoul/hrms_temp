import React, { useState, useMemo } from 'react';
import { attendanceService } from '../services/attendanceService';
import EditEmployeeForm from './EditEmployeeForm';
import AddEmployeeForm from './AddEmployeeForm';
import { FaPlus } from 'react-icons/fa';
import background from '../assets/background.png'

const status = [
  'Present',
  'Absent',
];

const DailyAttendanceTable = ({ employeesList = [], onAddEmployee, onUpdateEmployee, onDeleteEmployee, filterCompany }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [localEmployees, setLocalEmployees] = useState(employeesList);
  const recordsPerPage = 25;

  const filteredEmployees = useMemo(() => {
    const isDateQuery = /\b\d{4}-\d{2}-\d{2}\b/.test(searchTerm || '');
    if (!searchTerm || isDateQuery) return localEmployees;
    
    return localEmployees.filter(emp => 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.biometricId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, localEmployees]);

  const totalPages = Math.ceil(filteredEmployees.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Fetch daily attendance on mount
  React.useEffect(() => {
    const loadDailyAttendance = async () => {
      try {
        const today = new Date().toISOString().slice(0, 10);
        const dateMatch = (searchTerm || '').match(/\b\d{4}-\d{2}-\d{2}\b/);
        const selectedDate = dateMatch ? dateMatch[0] : today;
        const data = await attendanceService.getDailyAttendance(selectedDate, filterCompany);
        const listCandidate = Array.isArray(data)
          ? data
          : Array.isArray(data?.records)
            ? data.records
            : Array.isArray(data?.attendance)
              ? data.attendance
              : Array.isArray(data?.data)
                ? data.data
                : [];
        const list = Array.isArray(listCandidate) ? listCandidate : [];
        const filtered = list.filter((rec) => {
          if (!filterCompany) return true;
          const companyRaw = rec.company ?? rec.companyName ?? rec.org ?? rec.employee?.company ?? '';
          const normalize = (s) => String(s).toLowerCase().replace(/[^a-z]/g, '');
          return normalize(companyRaw) === normalize(filterCompany);
        });
        const normalized = filtered.map((rec, index) => ({
          id: String(
            rec.id ?? rec.employeeId ?? rec.empId ?? rec.employee?.id ?? `E${String(index + 1).padStart(3, '0')}`
          ),
          name: rec.name ?? rec.fullName ?? rec.employeeName ?? rec.employee?.name ?? 'Unknown',
          status:
            rec.status ??
            rec.attendanceStatus ??
            (typeof rec.present === 'boolean' ? (rec.present ? 'Present' : 'Absent') : undefined) ??
            'Absent',
        }));
        setLocalEmployees(normalized);
      } catch (error) {
        // If API fails, keep existing props-based data
        // Optionally log for debugging
        console.error('Failed to load daily attendance', error);
      }
    };
    loadDailyAttendance();
  }, [filterCompany, searchTerm]);

  const getSelectedDate = React.useCallback(() => {
    const today = new Date().toISOString().slice(0, 10);
    const dateMatch = (searchTerm || '').match(/\b\d{4}-\d{2}-\d{2}\b/);
    return dateMatch ? dateMatch[0] : today;
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

  const handleStatusChange = async (employeeId, newStatus) => {
    const previous = localEmployees.find(e => e.id === employeeId)?.status;
    // optimistic UI update
    setLocalEmployees(prevEmployees => 
      prevEmployees.map(emp => 
        emp.id === employeeId ? { ...emp, status: newStatus } : emp
      )
    );
    try {
      const date = getSelectedDate();
      await attendanceService.updateAttendance(employeeId, date, newStatus);
    } catch (error) {
      // rollback on failure
      setLocalEmployees(prevEmployees => 
        prevEmployees.map(emp => 
          emp.id === employeeId ? { ...emp, status: previous ?? emp.status } : emp
        )
      );
      const serverMsg = error?.response?.data?.message;
      console.error('Failed to update attendance status', error);
      alert(serverMsg || 'Failed to update attendance. Please try again.');
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
    <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mt-6 relative overflow-hidden">
      <img src={background} alt="background" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div className="relative z-10 flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-[#403d39] flex items-center">
          <div className="w-1 h-7 bg-[#eb5e28] rounded-full mr-3"></div>
          Daily Attendance Table
        </h2>
      </div>
      
      <div className="relative z-10 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by Date"
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
            Showing {filteredEmployees.length} of {localEmployees.length} employees daily attendance table
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
              <th className="px-6 py-3 text-center text-xs font-semibold text-[#403d39] uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#403d39] uppercase tracking-wider"></th>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#403d39] text-center">
                    <select
                      value={emp.status}
                      onChange={(e) => handleStatusChange(emp.id, e.target.value)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:ring-opacity-50 ${
                        emp.status === 'Present' 
                          ? 'text-green-800 bg-green-100 border-green-200 hover:bg-green-200' 
                          : 'text-red-800 bg-red-100 border-red-200 hover:bg-red-200'
                      }`}
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
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
                <td colSpan="4" className="px-6 py-8 text-center text-[#8a8a8a]">
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

export default DailyAttendanceTable;
