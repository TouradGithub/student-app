import { createContext, useEffect, useRef, useState } from 'react';
import * as api from '../services/api';
import { addNotificationListeners, registerForPushNotificationsAsync } from '../services/notificationService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [student, setStudent] = useState(null);
  const [expoPushToken, setExpoPushToken] = useState(null);
  const notificationListenerCleanup = useRef(null);

  // Check if user is already logged in
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // Setup notifications when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setupPushNotifications();
    }

    return () => {
      if (notificationListenerCleanup.current) {
        notificationListenerCleanup.current();
      }
    };
  }, [isAuthenticated]);

  const setupPushNotifications = async () => {
    try {
      // Register for push notifications
      const token = await registerForPushNotificationsAsync();

      if (token) {
        setExpoPushToken(token);
        // Save token to server
        try {
          await api.savePushToken(token);
          console.log('Push token registered and saved:', token);
        } catch (saveError) {
          console.warn('Could not save push token to server:', saveError);
        }
      } else {
        console.log('Push notifications not available (no token received)');
      }

      // Setup notification listeners (even without token, for local notifications)
      notificationListenerCleanup.current = addNotificationListeners(
        (notification) => {
          // Handle notification received while app is open
          console.log('Notification received in app:', notification);
        },
        (response) => {
          // Handle notification tap
          console.log('User tapped notification:', response);
          const data = response.notification.request.content.data;
          if (data?.type === 'schedule_update') {
            // Navigate to schedule screen or refresh data
            console.log('Schedule update notification tapped');
          }
        }
      );
    } catch (error) {
      // Don't crash the app if push notifications fail
      console.warn('Push notifications setup failed (app will continue without push):', error.message);
    }
  };

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
        expoPushToken,
        login,
        logout,
        updateStudent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
