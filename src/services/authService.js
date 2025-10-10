import api from './api';

export const authService = {
  register: (payload) => api.post('/auth/register', payload).then(r => r.data),

  login: (payload) => api.post('/auth/login', payload).then(r => r.data),

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      // ignore
    }
  },

  // Protected probe — derive session from server
  getMe: async () => {
    // Prefer a dedicated endpoint; if unavailable, attempt a lightweight protected probe
    try {
      const res = await api.get('/auth/me');
      return { ok: true, user: res.data?.user || { id: 'session' } };
    } catch {
      const res = await api.get('/employee/getAllEmployees');
      return { ok: true, user: { id: 'session', email: 'session@hrms' }, raw: res.data };
    }
  },
};

export default authService;

