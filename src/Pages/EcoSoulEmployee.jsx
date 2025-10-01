import React, { useEffect, useState } from 'react';
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
import EmployeeTable from '../Components/EmployeeTable';
import AddEmployeeForm from '../Components/AddEmployeeForm';
import { employeeService } from '../services/employeeService';
    
const EcoSoulEmployee = () => {
  const [activePage, setActivePage] = useState('home');
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [employeesList, setEmployeesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        setIsLoading(true);
        const data = await employeeService.getEcoSoulEmployees();
        const normalized = Array.isArray(data)
          ? data.map((emp, index) => ({
              id: emp.id ?? emp.employeeId ?? emp.empId ?? `E${String(index + 1).padStart(3, '0')}`,
              name: emp.name ?? emp.fullName ?? emp.employeeName ?? 'Unknown',
              email: emp.email ?? emp.workEmail ?? emp.personalEmail ?? 'unknown@example.com',
              department: emp.department ?? emp.departmentName ?? emp.dept ?? 'N/A',
            }))
          : [];
        setEmployeesList(normalized);
      } catch (error) {
        console.error('Failed to load employees', error);
        setEmployeesList([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadEmployees();
  }, []);

  const handleAddEmployee = (newEmployee) => {
    setEmployeesList(prev => [...prev, newEmployee]);
  };

  const handleUpdateEmployee = (employeeId, updatedData) => {
    setEmployeesList(prev => 
      prev.map(emp => emp.id === employeeId ? { ...emp, ...updatedData } : emp)
    );
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await employeeService.deleteEmployee(employeeId);
      setEmployeesList(prev => prev.filter(emp => emp.id !== employeeId));
    } catch (error) {
      console.error('Failed to delete employee', error);
      // Optionally, show a toast or UI error here
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#fffcf2]">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex-1 p-8 bg-[#fffcf2]">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#403d39] mb-2">Employee Management</h1>
            <p className="text-gray-600">Manage your employees here</p>
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center h-[60vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#403d39]"></div>
            </div>
          ) : (
            <>
              <EmployeeTable 
                employeesList={employeesList} 
                onAddEmployee={handleAddEmployee}
                onUpdateEmployee={handleUpdateEmployee}
                onDeleteEmployee={handleDeleteEmployee}
              />

              <AddEmployeeForm
                isOpen={isAddFormOpen}
                onClose={() => setIsAddFormOpen(false)}
                onAddEmployee={handleAddEmployee}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EcoSoulEmployee;
