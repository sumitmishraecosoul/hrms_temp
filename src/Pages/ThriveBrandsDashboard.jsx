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
import AddEmployeeForm from '../Components/AddEmployeeForm';

const ThriveBrandsDashboard = () => {
  const [activePage, setActivePage] = useState('home');
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [employeesList, setEmployeesList] = useState([
    { id: 'E001', name: 'Alice Johnson', email: 'alice.johnson@example.com', department: 'HR' },
    { id: 'E002', name: 'Bob Smith', email: 'bob.smith@example.com', department: 'Engineering' },
    { id: 'E003', name: 'Charlie Brown', email: 'charlie.brown@example.com', department: 'Marketing' },
    { id: 'E004', name: 'Diana Prince', email: 'diana.prince@example.com', department: 'Finance' },
    { id: 'E005', name: 'Ethan Hunt', email: 'ethan.hunt@example.com', department: 'Operations' },
    { id: 'E006', name: 'Fiona Gallagher', email: 'fiona.gallagher@example.com', department: 'Sales' },
    { id: 'E007', name: 'George Miller', email: 'george.miller@example.com', department: 'Support' },
    { id: 'E008', name: 'Hannah Lee', email: 'hannah.lee@example.com', department: 'Engineering' },
    { id: 'E009', name: 'Ian Curtis', email: 'ian.curtis@example.com', department: 'HR' },
    { id: 'E010', name: 'Julia Roberts', email: 'julia.roberts@example.com', department: 'Marketing' },
  ]);

  const handleAddEmployee = (newEmployee) => {
    setEmployeesList(prev => [...prev, newEmployee]);
  };

  const handleUpdateEmployee = (employeeId, updatedData) => {
    setEmployeesList(prev => 
      prev.map(emp => emp.id === employeeId ? { ...emp, ...updatedData } : emp)
    );
  };

  const handleDeleteEmployee = (employeeId) => {
    setEmployeesList(prev => prev.filter(emp => emp.id !== employeeId));
  };

  return (
    <div className="flex min-h-screen w-full bg-[#fffcf2]">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex-1 p-8 bg-gradient-to-br from-[#fffcf2] to-[#f5f1e8]">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#403d39] mb-2">Dashboard Overview</h1>
            <p className="text-gray-600">Welcome to Thrive Brands HR Management System</p>
          </div>

          <div className="mb-12">
            <h2 className="text-xl font-semibold text-[#403d39] mb-6">Employee Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                number={100}
                title="Total Employees"
                icon={<FaUser size={20} color="#403d39"/>}
              />
              <StatCard 
                number={100}
                title="Total Attendance"
                icon={<FaSheetPlastic size={20} color="#403d39"/>}
              />
              <StatCard 
                number={50}
                title="Female Employees"
                icon={<FaFemale size={25} color="#403d39"/>}
              />
              <StatCard 
                number={50}
                title="Male Employees"
                icon={<FaMale size={25} color="#403d39"/>}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThriveBrandsDashboard;
