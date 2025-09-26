import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import StatCard from '../Components/StatCard';
import { FaUser } from 'react-icons/fa';
import { FaSheetPlastic } from 'react-icons/fa6';
import { FaFemale } from "react-icons/fa";
import { FaMale } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import AttendanceTable from '../Components/AttendanceTable';
import UploadAttendance from '../Components/UploadAttendance';

const EcoSoulAttendance = () => {
  const [activePage, setActivePage] = useState('home');
  const [isUploadFormOpen, setIsUploadFormOpen] = useState(false);
  const [uploadMode, setUploadMode] = useState('upload'); // 'upload' or 'view'
  const [selectedAttendance, setSelectedAttendance] = useState(null);

  const handleUploadAttendance = () => {
    setUploadMode('upload');
    setSelectedAttendance(null);
    setIsUploadFormOpen(true);
  };

  const handleViewAttendance = (attendance) => {
    setUploadMode('view');
    setSelectedAttendance(attendance);
    setIsUploadFormOpen(true);
  };

  const handleSaveAttendance = (formData) => {
    console.log('Saving attendance:', formData);
    // Here you would typically save the attendance data
    // For now, just log it
  };

  return (
    <div className="flex min-h-screen w-full bg-[#fffcf2]">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex-1 p-8 bg-[#fffcf2]">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#403d39] mb-2">Attendance Management</h1>
            <p className="text-gray-600">Manage employee attendance here</p>
          </div>
          <AttendanceTable onViewAttendance={handleViewAttendance} onUpload={handleUploadAttendance} />
          
          {/* Upload Attendance Form Modal */}
          <UploadAttendance
            isOpen={isUploadFormOpen}
            onClose={() => setIsUploadFormOpen(false)}
            onSave={handleSaveAttendance}
            mode={uploadMode}
            existingFile={selectedAttendance ? { name: `attendance_${selectedAttendance.date}.csv` } : null}
          />
        </div>
      </div>
    </div>
  );
};

export default EcoSoulAttendance;
