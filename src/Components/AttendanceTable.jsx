import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import background from '../assets/background.png';

const AttendanceTable = ({ attendanceList = [], onViewAttendance, onUpload }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    const filteredAttendance = attendanceList.filter(attendance => 
        attendance.date.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredAttendance.length / recordsPerPage);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const currentAttendance = filteredAttendance.slice(startIndex, endIndex);

    React.useEffect(() => {
        setCurrentPage(1);
      }, [searchTerm]);
    
      const handlePageChange = (page) => {
        setCurrentPage(page);
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
                    Attendance List
                </h2>
                {onUpload && (
                    <button 
                        onClick={onUpload}
                        className="flex items-center gap-2 bg-[#eb5e28] hover:bg-[#d54e1f] text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg font-medium"
                    >
                        <FaPlus size={16}/>
                        Upload Attendance
                    </button>
                )}
            </div>
            <div className="relative z-10 mb-6">
                <input
                    type="text"
                    placeholder="Search attendance by date"
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
            <div className="relative z-10 overflow-x-auto rounded-lg border border-[#ccc5b9]">
                <table className="min-w-full divide-y divide-[#ccc5b9]">
                    <thead className="bg-[#fffcf2]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-[#403d39] uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-[#403d39] uppercase tracking-wider">
                                Time Uploaded
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-[#403d39] uppercase tracking-wider">
                                Uploaded By
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-[#403d39] uppercase tracking-wider">
                                Percentage
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-[#403d39] uppercase tracking-wider">
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-[#f5f3ed]">
                        {currentAttendance.map((emp, idx) => (
                            <tr
                                key={emp.id}
                                className={idx % 2 === 0 ? 'bg-[#fffcf2]' : 'bg-white'}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#403d39] font-medium">
                                    {emp.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#403d39]">
                                    {emp.timeUploaded}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#403d39]">
                                    {emp.uploadedBy}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#eb5e28] font-semibold">
                                    {emp.percentage}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <button 
                                        onClick={() => onViewAttendance && onViewAttendance(emp)}
                                        className="bg-[#eb5e28] hover:bg-[#d54e1a] text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#eb5e28] focus:ring-opacity-50"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {filteredAttendance.length > recordsPerPage && (
        <div className="relative z-10 mt-6 flex items-center justify-between">
          <div className="text-sm text-[#8a8a8a]">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredAttendance.length)} of {filteredAttendance.length} results
          </div>
          <div className="flex items-center space-x-1">
            {renderPaginationButtons()}
          </div>
        </div>
      )}
        </div>
    );
};

export default AttendanceTable;
