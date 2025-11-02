import { createContext, useEffect, useState } from 'react';
import * as api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [student, setStudent] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const loggedIn = await api.isLoggedIn();
      if (loggedIn) {
        const studentData = await api.getStoredStudentData();
        if (studentData) {
          setStudent(studentData);
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.error('Check login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (nni, password) => {
    try {
      const data = await api.login(nni, password);
      setStudent(data.student);
      setIsAuthenticated(true);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('Logging out...');
      await api.logout();
      console.log('API logout completed');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      console.log('Setting authenticated to false');
      setStudent(null);
      setIsAuthenticated(false);
    }
  };

  const updateStudent = (studentData) => {
    setStudent(studentData);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        student,
        login,
        logout,
        updateStudent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
