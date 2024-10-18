import React, { useState, useEffect } from "react"; // Import React and hooks
import Navbar from "../../components/Navbar.jsx/Navbar"; // Import Navbar component
import PasswordInput from "../../components/Input/PasswordInput"; // Import custom PasswordInput component
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate for routing
import { validateEmail } from "../../utils/helper"; // Import email validation helper function
import axiosInstance from "../../utils/axiosInstance"; // Import axios instance for API calls
import loginImage from "../../assets/images/login.svg"; // Import signup image

const SignUp = () => {
  // State for name, email, password, and error messages
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigation

  // Effect to check if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard"); // Redirect to dashboard if token exists
    }
  }, [navigate]);

  // Function to handle signup
  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate name, email, and password
    if (!name) {
      setError("Please enter your name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }

    setError(""); // Reset error state

    try {
      // Make signup API call
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      // Handle response
      if (response.data && response.data.error) {
        setError(response.data.message); // Set error message from server
        return;
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken); // Store token in localStorage
        navigate("/dashboard"); // Redirect to dashboard
      }
    } catch (error) {
      // Handle error responses
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message); // Set error message from server
      } else {
        setError("An unexpected error occurred. Please try again later"); // Generic error message
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <Navbar /> {/* Render Navbar component */}
      <div className="flex items-center justify-center mt-20">
        <div className="flex w-[90%] max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="hidden md:block w-1/2"> {/* Image section for larger screens */}
            <img
              src={loginImage}
              alt="Sign Up"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="w-full md:w-1/2 p-8"> {/* Form section */}
            <form onSubmit={handleSignUp} className="space-y-6">
              <h2 className="text-3xl font-bold text-center text-teal-600 mb-8">
                Sign Up for همّة - Himma {/* Page title */}
              </h2>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                            focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)} // Update name state
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter your email"
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                            focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                  className="mt-1 block w-full"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message if present */}

              <button
                type="submit" // Submit button for the form
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Create Account
              </button>

              <p className="text-sm text-center text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login" // Link to login page
                  className="font-medium text-teal-600 hover:text-teal-500"
                >
                  Log In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the SignUp component
export default SignUp;
