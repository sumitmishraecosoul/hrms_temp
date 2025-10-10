import axios from "axios";

const baseURL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL)
  ? import.meta.env.VITE_API_URL
  : "https://api.thrivebrands-hrms.com/";

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

// concurrency-safe 401 handling
let refreshInFlight = null;
const waiters = [];
const enqueue = () => new Promise((resolve, reject) => waiters.push({ resolve, reject }));
const flush = (err) => {
  const list = waiters.splice(0);
  list.forEach(({ resolve, reject }) => (err ? reject(err) : resolve()));
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config || {};
    const status = error.response?.status;
    const isAuthRoute = typeof original.url === 'string' && original.url.startsWith('/auth/');

    // Only handle 401s, skip auth routes, and ensure single retry
    if (status !== 401 || original._retried || isAuthRoute) {
      return Promise.reject(error);
    }

    if (refreshInFlight) {
      try {
        await enqueue();
        original._retried = true;
        return api(original);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    try {
      original._retried = true;
      // Backend middleware refreshes using refresh cookie on any request.
      // Simply retry the original request once.
      refreshInFlight = Promise.resolve();
      await refreshInFlight;
      flush(null);
      return api(original);
    } catch (e) {
      flush(e);
      return Promise.reject(e);
    } finally {
      refreshInFlight = null;
    }
  }
);

export default api;
