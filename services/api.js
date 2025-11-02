import AsyncStorage from '@react-native-async-storage/async-storage';
import { STUDENT_API_URL } from '../config/apiConfig';

const API_URL = STUDENT_API_URL;

// Helper function to get token
const getToken = async () => {
  return await AsyncStorage.getItem('userToken');
};

// Helper function to make API calls
const apiCall = async (endpoint, method = 'GET', body = null, requiresAuth = true) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (requiresAuth) {
    const token = await getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const url = `${API_URL}${endpoint}`;
    console.log('API Request:', method, url);
    
    const response = await fetch(url, config);
    
    // Get response text first
    const responseText = await response.text();
    console.log('API Response Status:', response.status);
    console.log('API Response Text:', responseText.substring(0, 200));

    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      throw new Error('Le serveur n\'a pas retourné de données valides. Vérifiez que l\'adresse API est correcte.');
    }

    if (!response.ok) {
      throw new Error(data.message || 'Une erreur s\'est produite lors de la connexion au serveur');
    }

    return data.data || data;
  } catch (error) {
    console.error('API Error:', error);
    if (error.message.includes('Network request failed')) {
      throw new Error('Impossible de se connecter au serveur. Vérifiez votre connexion Internet et l\'adresse du serveur.');
    }
    throw error;
  }
};

// Login
export const login = async (nni, password) => {
  try {
    const response = await apiCall('/login', 'POST', { nni, password }, false);
    console.log('Login response:', response);
    
    // Handle response structure - could be data directly or nested in data property
    const data = response.data || response;
    
    // Save token
    if (data.token) {
      await AsyncStorage.setItem('userToken', data.token);
      console.log('Token saved');
    }
    
    // Save student data
    if (data.student) {
      await AsyncStorage.setItem('studentData', JSON.stringify(data.student));
      console.log('Student data saved');
    }
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Logout
export const logout = async () => {
  try {
    await apiCall('/logout', 'POST');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Clear local storage
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('studentData');
  }
};

// Get Profile
export const getProfile = async () => {
  return await apiCall('/profile', 'GET');
};

// Get Schedule
export const getSchedule = async () => {
  return await apiCall('/schedule', 'GET');
};

// Get stored student data
export const getStoredStudentData = async () => {
  const data = await AsyncStorage.getItem('studentData');
  return data ? JSON.parse(data) : null;
};

// Check if user is logged in
export const isLoggedIn = async () => {
  const token = await getToken();
  return !!token;
};
