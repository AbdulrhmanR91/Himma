import axios from 'axios'; // Import axios for making HTTP requests
import { BASE_URL } from './constants'; // Import BASE_URL from constants file

// Create an axios instance with default configuration
const axiosInstance = axios.create({
    baseURL: BASE_URL, // Set base URL from environment variable or fallback to BASE_URL
    timeout: 5000, // Set timeout for requests
    headers: {
        'Content-Type': 'application/json', // Set default content type
    },
});

// Add a request interceptor to attach the Authorization header
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token'); // Retrieve access token from local storage
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`; // Add Authorization header if token exists
        }
        return config; // Return the modified config
    },
    (error) => {
        return Promise.reject(error); // Reject the promise in case of an error
    }
);

// Add a response interceptor to handle responses and errors
axiosInstance.interceptors.response.use(
    (response) => response, // Return the response directly if no error
    (error) => {
        if (error.response) {
            // Handle 401 Unauthorized errors
            if (error.response.status === 401) {
                localStorage.clear(); // Clear local storage
                window.location.href = '/login'; // Redirect to login page
            }
            
            // Handle other errors by rejecting the promise with the error message
            if (error.response.data && error.response.data.message) {
                return Promise.reject(error.response.data); // Reject with error message
            }
        }
        return Promise.reject(error); // Reject the promise for any other error
    }
);

export default axiosInstance; // Export the configured axios instance
