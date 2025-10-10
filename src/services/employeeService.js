import api from './api';

export const employeeService = {
  createEmployee: async (employeeData) => {
    try {
      // If a FormData instance is passed (contains file), let axios set multipart headers
      const isFormData = typeof FormData !== 'undefined' && employeeData instanceof FormData;
      const response = await api.post('/employee/createEmployee', employeeData, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : undefined
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllEmployees: async () => {
    try {
      const response = await api.get('/employee/getAllEmployees');
      return response.data
    } catch (error) {
      throw error;
    }
  },

  // Company-specific fetchers
  getEcoSoulEmployees: async () => {
    try {
      const response = await api.get('/employee/getEcoSoulEmployees');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getThriveBrandsEmployees: async () => {
    try {
      const response = await api.get('/employee/getThriveBrandsEmployees');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getEmployeeById: async (employeeId) => {
    try {
      const response = await api.get(`/employee/getEmployeeById?id=${employeeId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateEmployee: async (employeeId, employeeData) => {
    try {
      const response = await api.put(`/employee/updateEmployee?id=${employeeId}`, employeeData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateProfilePic: async (employeeId, file) => {
    try {
      const formData = new FormData();
      formData.append('profilePic', file);
      const response = await api.put(`/employee/updateProfilePic?id=${employeeId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  isActiveToggle: async (employeeId) => {
    try {
      const response = await api.put(`/employee/isActiveToggle?id=${employeeId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteEmployee: async (employeeId) => {
    try {
      const response = await api.delete(`/employee/deleteEmployee?id=${employeeId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default employeeService;
