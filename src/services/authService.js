import api from './api';

// Cookie utility functions
const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;samesite=strict`;
};

const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export const authService = {
  // Login with email and password
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });
      
      const { accessToken, refreshToken, user } = response.data;
      
      // Store tokens in cookies (user data will be extracted from JWT token)
      if (accessToken) {
        setCookie('accessToken', accessToken, 1); // 1 day
      }
      if (refreshToken) {
        setCookie('refreshToken', refreshToken, 7); // 7 days
      }
      
      return {
        success: true,
        accessToken,
        refreshToken
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      };
    }
  },

  // Get stored access token
  getAccessToken: () => {
    return getCookie('accessToken');
  },

  // Get stored refresh token
  getRefreshToken: () => {
    return getCookie('refreshToken');
  },

  // Refresh access token using refresh token
  refreshAccessToken: async () => {
    try {
      const refreshToken = getCookie('refreshToken');
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.post('/auth/refresh', {
        refreshToken
      });
      
      const { accessToken } = response.data;
      
      if (accessToken) {
        setCookie('accessToken', accessToken, 1); // 1 day
        return {
          success: true,
          accessToken
        };
      }
      
      throw new Error('No access token received');
    } catch (error) {
      console.error('Token refresh error:', error);
      // If refresh fails, clear all tokens
      authService.logout();
      return {
        success: false,
        error: error.response?.data?.message || 'Token refresh failed'
      };
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');
    
    // If we have a valid access token, user is authenticated
    if (accessToken && authService.isTokenValid()) {
      return true;
    }
    
    // If we have a refresh token, user might still be authenticated
    return !!refreshToken;
  },

  // Logout - clear all tokens and user data
  logout: () => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    deleteCookie('user'); // Clear any existing user cookie for security
    // Optionally call logout endpoint
    // api.post('/auth/logout').catch(console.error);
  },

  // Get current user info from JWT token (decode from access token)
  getCurrentUser: () => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      try {
        // Decode JWT token to get user info
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        
        // Check if token is expired
        if (payload.exp && payload.exp < Date.now() / 1000) {
          console.warn('Access token is expired');
          return null;
        }
        
        return payload.user || payload; // Return user object from token
      } catch (error) {
        console.error('Error decoding user data from token:', error);
        return null;
      }
    }
    return null;
  },

  // Validate if access token is still valid
  isTokenValid: () => {
    const accessToken = getCookie('accessToken');
    if (!accessToken) return false;
    
    try {
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      return payload.exp && payload.exp > Date.now() / 1000;
    } catch (error) {
      return false;
    }
  }
};

export default authService;

