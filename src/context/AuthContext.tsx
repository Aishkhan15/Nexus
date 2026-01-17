import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, UserRole, AuthContextType } from '../types';
import { users } from '../data/users';
import toast from 'react-hot-toast';

// Create Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Local storage keys
const USER_STORAGE_KEY = 'business_nexus_user';
const RESET_TOKEN_KEY = 'business_nexus_reset_token';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [is2FAVerified, setIs2FAVerified] = useState(false); // 2FA state

  // Check localStorage for stored user
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) setUser(JSON.parse(storedUser));
    setIsLoading(false);
  }, []);

  // ---------- LOGIN ----------
  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    setIs2FAVerified(false); // reset 2FA on login

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const foundUser = users.find(u => u.email === email && u.role === role);
      if (!foundUser) throw new Error('Invalid credentials or user not found');

      setUser(foundUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(foundUser));
      toast.success('Successfully logged in!');
    } catch (error) {
      toast.error((error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // ---------- REGISTER ----------
  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    setIs2FAVerified(false); // reset 2FA on register

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (users.some(u => u.email === email)) throw new Error('Email already in use');

      const newUser: User = {
        id: `${role[0]}${users.length + 1}`, // e1, i2
        name,
        email,
        role,
        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
        bio: '',
        isOnline: true,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser); // ✅ works now
      setUser(newUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error((error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // ---------- FORGOT PASSWORD ----------
  const forgotPassword = async (email: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const foundUser = users.find(u => u.email === email);
      if (!foundUser) throw new Error('No account found with this email');

      const resetToken = Math.random().toString(36).substring(2, 15);
      localStorage.setItem(RESET_TOKEN_KEY, resetToken);
      toast.success('Password reset instructions sent to your email');
    } catch (error) {
      toast.error((error as Error).message);
      throw error;
    }
  };

  // ---------- RESET PASSWORD ----------
  const resetPassword = async (token: string, newPassword: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const storedToken = localStorage.getItem(RESET_TOKEN_KEY);
      if (token !== storedToken) throw new Error('Invalid or expired reset token');
      localStorage.removeItem(RESET_TOKEN_KEY);
      toast.success('Password reset successfully');
    } catch (error) {
      toast.error((error as Error).message);
      throw error;
    }
  };

  // ---------- LOGOUT ----------
  const logout = () => {
    setUser(null);
    setIs2FAVerified(false); // reset 2FA
    localStorage.removeItem(USER_STORAGE_KEY);
    toast.success('Logged out successfully');
  };

  // ---------- UPDATE PROFILE ----------
  const updateProfile = async (userId: string, updates: Partial<User>) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const userIndex = users.findIndex(u => u.id === userId);
      if (userIndex === -1) throw new Error('User not found');

      const existingUser = users[userIndex];
      const updatedUser: User = { ...existingUser, ...updates };

      users[userIndex] = updatedUser;

      if (user?.id === userId) {
        setUser(updatedUser);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      }

      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error((error as Error).message);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    isAuthenticated: !!user,
    isLoading,
    is2FAVerified,
    setIs2FAVerified,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
