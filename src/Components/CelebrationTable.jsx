import React, { useState, useEffect } from 'react';
import background from '../assets/background.png';
import { employeeService } from '../services/employeeService';

const CelebrationTable = ({ filterCompany }) => {
  const [localData, setLocalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [celebrationData, setCelebrationData] = useState(null);

  // Fetch celebrations data from API
  useEffect(() => {
    const fetchCelebrations = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await employeeService.getCelebrations();
        setCelebrationData(data);
      } catch (error) {
        console.error('Failed to fetch celebrations:', error);
        setError('Failed to load celebrations data');
      } finally {
        setLoading(false);
      }
    };

    fetchCelebrations();
  }, []);

  // Transform the API data into a flat array for table display
  useEffect(() => {
    if (celebrationData) {
      const transformedData = [];
      
      // Add birthdays
      if (celebrationData.birthdays && celebrationData.birthdays.employees) {
        celebrationData.birthdays.employees.forEach(employee => {
          transformedData.push({
            name: employee,
            type: 'Birthday',
            date: celebrationData.date
          });
        });
      }
      
      // Add work anniversaries
      if (celebrationData.anniversaries && celebrationData.anniversaries.employees) {
        celebrationData.anniversaries.employees.forEach(employee => {
          transformedData.push({
            name: employee,
            type: 'Work Anniversary',
            date: celebrationData.date
          });
        });
      }
      
      setLocalData(transformedData);
    }
  }, [celebrationData]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTypeBadgeClass = (type) => {
    return type === 'Birthday' 
      ? 'text-blue-800 bg-blue-100 border-blue-200' 
      : 'text-purple-800 bg-purple-100 border-purple-200';
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mt-6 relative overflow-hidden">
      <img src={background} alt="background" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      
      <div className="relative z-10 flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-[#403d39] flex items-center">
          <div className="w-1 h-7 bg-[#eb5e28] rounded-full mr-3"></div>
          Celebrations
        </h2>
        {celebrationData && (
          <div className="text-sm text-[#8a8a8a]">
            {formatDate(celebrationData.date)}
          </div>
        )}
      </div>

      {loading ? (
        <div className="relative z-10 flex items-center justify-center py-8">
          <div className="text-[#8a8a8a]">Loading celebrations...</div>
        </div>
      ) : error ? (
        <div className="relative z-10 flex items-center justify-center py-8">
          <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {error}
          </div>
        </div>
      ) : (
        <div className="relative z-10 overflow-x-auto rounded-lg border border-[#ccc5b9]">
          <table className="min-w-full divide-y divide-[#ccc5b9]">
            <thead className="bg-[#fffcf2]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#403d39] uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-[#403d39] uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#403d39] uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#f5f3ed]">
              {localData.length > 0 ? (
                localData.map((celebration, idx) => (
                  <tr
                    key={`${celebration.name}-${celebration.type}-${idx}`}
                    className={idx % 2 === 0 ? 'bg-[#fffcf2]' : 'bg-white'}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#403d39] font-medium">
                      {celebration.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <span className={`inline-flex px-3 py-1 rounded-lg text-xs font-medium border transition-colors duration-200 ${getTypeBadgeClass(celebration.type)}`}>
                        {celebration.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#403d39]">
                      {formatDate(celebration.date)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-8 text-center text-[#8a8a8a]">
                    No celebrations found for today.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {localData.length > 0 && (
        <div className="relative z-10 mt-4 text-sm text-[#8a8a8a]">
          Total celebrations: {localData.length}
          {celebrationData && (
            <>
              {' '}({celebrationData.birthdays?.count || 0} birthdays, {celebrationData.anniversaries?.count || 0} anniversaries)
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CelebrationTable;
