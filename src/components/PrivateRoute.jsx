import { Navigate } from 'react-router-dom'; // Import Navigate component for redirection

// Define a PrivateRoute component that checks for authentication
const PrivateRoute = ({ children }) => {
  // Retrieve the token from local storage
  const token = localStorage.getItem('token');
  
  // If no token is found, redirect the user to the login page
  if (!token) {
    return <Navigate to="/login" replace />; // Redirect to /login and replace the current entry in history
  }
  
  // If a token is found, render the child components (protected content)
  return children;
};

// Export the PrivateRoute component for use in other parts of the application
export default PrivateRoute;