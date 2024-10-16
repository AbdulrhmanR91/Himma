import axios from 'axios';
import { BASE_URL } from './constants';

const axiosInstance = axios.create({
    baseURL : process.env.REACT_APP_API_URL || BASE_URL,
    timeout : 5000,
    headers : {
        'Content-Type' : 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        // Handle 401 Unauthorized errors
        if (error.response.status === 401) {
          localStorage.clear();
          window.location.href = '/login';
        }
        
        // Handle other errors
        if (error.response.data && error.response.data.message) {
          return Promise.reject(error.response.data);
        }
      }
      return Promise.reject(error);
    }
  );

export default axiosInstance;