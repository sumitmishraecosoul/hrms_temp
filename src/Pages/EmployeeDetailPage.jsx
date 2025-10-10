import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import EmployeeDetailView from '../Components/EmployeeDetailView';
import { employeeService } from '../services/employeeService';
import background from '../assets/background.png';

const EmployeeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState('Employees');


  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        const apiEmployee = await employeeService.getEmployeeById(id);
        if (apiEmployee) {
          setEmployee(apiEmployee);
        } else {
          setEmployee(null);
        }
      } catch (error) {
        console.error('Error fetching employee from API:', error);
        setEmployee(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleUpdateEmployee = async (employeeId, updatedData) => {
    try {
      await employeeService.updateEmployee(employeeId, updatedData);
      
      // Update local state
      setEmployee(prev => ({
        ...prev,
        ...updatedData
      }));
      
      return true;
    } catch (error) {
      console.error('Error updating employee:', error);
      return false;
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await employeeService.deleteEmployee(employeeId);
      
      // Navigate back to employee list
      const company = window.location.pathname.startsWith('/ecosoul') ? 'ecosoul' : 'thrive-brands';
      navigate(`/${company}/employee`);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleUpdateProfilePic = async (employeeId, file) => {
    try {
      const updated = await employeeService.updateProfilePic(employeeId, file);
      // Try to update local state based on typical responses
      setEmployee(prev => {
        if (!prev) return prev;
        const newProfilePic = updated?.profilePic || updated?.data?.profilePic || { path: updated?.path };
        return {
          ...prev,
          profilePic: newProfilePic ? newProfilePic : prev.profilePic
        };
      });
      return true;
    } catch (error) {
      console.error('Error updating profile picture:', error);
      return false;
    }
  };

  const handleToggleActive = async (employeeId) => {
    try {
      const updated = await employeeService.isActiveToggle(employeeId);
      setEmployee(prev => ({
        ...prev,
        isActive: updated?.isActive ?? !prev?.isActive
      }));
      return true;
    } catch (error) {
      console.error('Error toggling active status:', error);
      return false;
    }
  };

  const handleBack = () => {
    const company = window.location.pathname.startsWith('/ecosoul') ? 'ecosoul' : 'thrive-brands';
    navigate(`/${company}/employee`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen w-full bg-[#fffcf2]">
        <Sidebar activePage={activePage} onPageChange={setActivePage} />
        <div className="flex flex-col flex-1">
          <Navbar />
          <div className="flex-1 p-8 bg-gradient-to-br from-[#fffcf2] to-[#f5f1e8] flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#eb5e28] mx-auto"></div>
              <p className="text-[#403d39] text-lg">Loading employee details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-[#fffcf2]">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex-1 p-8 bg-gradient-to-br from-[#fffcf2] to-[#f5f1e8] relative overflow-hidden">
          <img src={background} alt="background" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div className="relative z-10">
                  <EmployeeDetailView
              employee={employee}
              onUpdate={handleUpdateEmployee}
              onDelete={handleDeleteEmployee}
                    onUpdateProfilePic={handleUpdateProfilePic}
                    onToggleActive={handleToggleActive}
              onBack={handleBack}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailPage;
