import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = "https://lms-app-backend-production.up.railway.app/";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  // headers: { "Content-Type": "application/json" },
  //withCredentials: true, // If using authentication with cookies
});

// Get data from the API
export const fetchData = async (endpoint: any, data = null) => {
  console.log(endpoint);
  try {
    if (!data) {
      const response = await apiClient.get(endpoint);
      return response.data;
    } else {
      const response = await apiClient.get(endpoint, data);
      return response.data;
    }
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Post data to the API
export const postData = async (endpoint: any, data: any = null) => {
  try {
    if (data) {
      const response = await apiClient.post(endpoint, data);
      return response.data;
    } else {
      const response = await apiClient.post(endpoint);
      return response.data;
    }
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
