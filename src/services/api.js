import axios from "axios";
import DEV_URL from "../config/config";
import { authService } from "./authService";

const api = axios.create({
  baseURL: DEV_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add access token to requests
api.interceptors.request.use(
  (config) => {
    const accessToken = authService.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResult = await authService.refreshAccessToken();
        
        if (refreshResult.success) {
          // Retry the original request with new token
          const newAccessToken = authService.getAccessToken();
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } else {
          // Refresh failed, redirect to login
          authService.logout();
          window.location.href = '/login';
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        authService.logout();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;


