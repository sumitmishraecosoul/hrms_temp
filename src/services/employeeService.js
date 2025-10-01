import api from './api';

export const employeeService = {
  createEmployee: async (employeeData) => {
    try {
      const response = await api.post('/employee/createEmployee', employeeData);
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
      // API path as requested
      const response = await api.get('/employee/getThriveBrandsEmployee');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getEcoSoulEmployees: async () => {
    try {
      const response = await api.get(`/employee/getEcoSoulEmployees`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getThriveBrandsEmployees: async () => {
    try {
      const response = await api.get(`/employee/getThriveBrandsEmployees`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getEmployeeById: async (employeeId) => {
    try {
      const response = await api.get(`/employee/getEmployeeById?employeeId=${employeeId}`);
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
