// Importing React and useState for managing component state
import React, { useState } from 'react';

// Importing icons for showing/hiding password visibility
import { BiSolidShow, BiSolidHide } from "react-icons/bi";

// PasswordInput component takes value, onChange, placeholder, and className as props
const PasswordInput = ({ value, onChange, placeholder, className }) => {

  // useState to manage whether the password is shown or hidden
  const [isShowPassword, setIsShowPassword] = useState(false);

  // Function to toggle the visibility of the password
  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword); // Switches between true and false
  };

  return (
    // Container div for the input field, with relative positioning for the icon
    <div className={`relative ${className}`}>
      
      {/* Password input field */}
      <input
        className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-150 ease-in-out"
        value={value} // Controlled input, receives value as a prop
        onChange={onChange} // Updates value on change
        placeholder={placeholder || "Enter password"} // Default placeholder if none is provided
        type={isShowPassword ? "text" : "password"} // Toggles between 'text' and 'password' based on state
      />

      {/* Button to toggle password visibility */}
      <button
        type="button"
        onClick={toggleShowPassword} // Calls the toggle function on click
        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-teal-500 focus:outline-none"
        aria-label={isShowPassword ? "Hide password" : "Show password"} // Accessibility label for screen readers
      >
        {/* Icon changes based on whether the password is shown or hidden */}
        {isShowPassword ? (
          <BiSolidHide className="w-5 h-5" /> // Show "Hide" icon if the password is visible
        ) : (
          <BiSolidShow className="w-5 h-5" /> // Show "Show" icon if the password is hidden
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
