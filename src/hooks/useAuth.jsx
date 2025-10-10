import { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  const bootstrap = async () => {
    setChecking(true);
    try {
      const { user: minimal } = await authService.getMe();
      setUser(minimal);
    } catch (e) {
      setUser(null);
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    bootstrap();
  }, []);

  const login = async (email, password) => {
    try {
      await authService.login({ email, password });
      await bootstrap();
      return { success: true };
    } catch (e) {
      return { success: false, error: e?.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (email, password) => {
    try {
      await authService.register({ email, password });
      await bootstrap();
      return { success: true };
    } catch (e) {
      return { success: false, error: e?.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    isLoading: checking,
    login,
    register,
    logout,
    refreshSession: bootstrap,
  }), [user, checking]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
