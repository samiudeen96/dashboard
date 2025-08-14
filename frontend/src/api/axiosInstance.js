import axios from "axios";

// Create Axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // ✅ fixed env variable
  withCredentials: true
});

// Add request interceptor
API.interceptors.request.use((config) => {

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
