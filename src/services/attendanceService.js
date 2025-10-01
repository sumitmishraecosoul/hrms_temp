import api from './api';

export const attendanceService = {
  // GET: /attendance/getAllAttendances
  getAllAttendances: async () => {
    try {
      const response = await api.get('/attendance/getAllAttendances');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // GET: /attendance/getAttendanceById?employeeId=...&date=YYYY-MM-DD
  getAttendanceById: async (employeeId, date) => {
    try {
      const response = await api.get(`/attendance/getAttendanceById?employeeId=${encodeURIComponent(employeeId)}&date=${encodeURIComponent(date)}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PUT: /attendance/updateAttendance?employeeId=...
  // Body: { status, date }
  updateAttendance: async (employeeId, date, status) => {
    try {
      const query = new URLSearchParams({ employeeId: String(employeeId) }).toString();
      const payload = { status, date };
      const response = await api.put(`/attendance/updateAttendance?${query}`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // POST: /attendance/markAttendance
  markAttendance: async (attendancePayload) => {
    try {
      const response = await api.post('/attendance/markAttendance', attendancePayload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // GET: /attendance/getEmployeeAttendance?employeeId=...
  getEmployeeAttendance: async (employeeId, params = {}) => {
    try {
      const query = new URLSearchParams({ employeeId: String(employeeId), ...params }).toString();
      const response = await api.get(`/attendance/getEmployeeAttendance?${query}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // GET: /attendance/getDailyAttendance?date=YYYY-MM-DD[&company=...]
  getDailyAttendance: async (date, company) => {
    try {
      const params = new URLSearchParams({ date: encodeURIComponent(date) });
      if (company) {
        params.append('company', company);
      }
      const response = await api.get(`/attendance/getDailyAttendance?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // POST: /attendance/uploadAttendanceSheet (multipart/form-data)
  uploadAttendanceSheet: async (formData) => {
    try {
      const response = await api.post('/attendance/uploadAttendanceSheet', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // POST: /attendance/previewAttendanceSheet (multipart/form-data)
  previewAttendanceSheet: async (formData) => {
    try {
      const response = await api.post('/attendance/previewAttendanceSheet', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // GET: /attendance/canModifyAttendance?date=YYYY-MM-DD
  canModifyAttendance: async (date) => {
    try {
      const response = await api.get(`/attendance/canModifyAttendance?date=${encodeURIComponent(date)}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Existing helper retained for backwards compatibility
  getAttendanceByEmployeeId: async (employeeId) => {
    try {
      const response = await api.get(`/attendance/getAttendanceByEmployeeId?employeeId=${employeeId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};