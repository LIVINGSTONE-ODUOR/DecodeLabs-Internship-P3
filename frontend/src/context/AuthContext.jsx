import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import authService from '../services/authService';
export const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const persist = useCallback((data) => {
    if (data.token) localStorage.setItem('stone_token', data.token);
    if (data.refreshToken) localStorage.setItem('stone_refresh_token', data.refreshToken);
    setUser(data.token ? data.user : null);
  }, []);

  const login = useCallback(async (payload) => {
    const data = await authService.login(payload);
    persist(data);
    toast.success('Welcome back');
    return data;
  }, [persist]);

  const register = useCallback(async (payload) => {
    const data = await authService.register(payload);
    persist(data);
    toast.success(data.requiresEmailConfirmation ? 'Check your email to confirm your account' : 'Account created');
    return data;
  }, [persist]);

  const forgotPassword = useCallback(async (payload) => {
    const data = await authService.forgotPassword(payload);
    toast.success('Reset link requested. Check your email.');
    return data;
  }, []);

  const resendVerification = useCallback(async (payload) => {
    const data = await authService.resendVerification(payload);
    toast.success('Verification link sent.');
    return data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      localStorage.removeItem('stone_token');
      localStorage.removeItem('stone_refresh_token');
      setUser(null);
      toast.success('Signed out');
    }
  }, []);

  const getCurrentUser = useCallback(async () => {
    if (!localStorage.getItem('stone_token')) {
      setIsLoading(false);
      return;
    }
    try {
      const data = await authService.me();
      setUser(data.user);
    } catch {
      localStorage.removeItem('stone_token');
      localStorage.removeItem('stone_refresh_token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  const value = useMemo(
    () => ({ user, login, register, forgotPassword, resendVerification, logout, getCurrentUser, isLoading, isAuthenticated: Boolean(user) }),
    [user, login, register, forgotPassword, resendVerification, logout, getCurrentUser, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
