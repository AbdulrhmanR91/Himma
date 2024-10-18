// Importing necessary libraries and icons
import React, { useEffect } from "react";
import { LuCheck } from "react-icons/lu"; // Icon for success (checkmark)
import { MdDeleteOutline } from "react-icons/md"; // Icon for delete
import PropTypes from "prop-types"; // PropTypes for type checking

// Toast component displays a notification based on isShown, message, and type
const Toast = ({ isShown, message, type, onclose }) => {
  
  // useEffect to automatically close the Toast after 3 seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onclose(); // Call the onclose function after the timeout
    }, 3000); // 3 seconds duration

    return () => {
      clearTimeout(timeoutId); // Cleanup timeout to avoid memory leaks
    };
  }, [onclose]); // Dependency array: only run when onclose changes

  // If isShown is false, do not render the Toast
  if (!isShown) return null;

  return (
    // Toast container: fixed position, animates in and out based on isShown
    <div 
      className={`fixed top-20 right-6 transition-all duration-300 ease-in-out transform ${
        isShown ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      {/* Main Toast body, background color and border depend on the type ('add' or 'delete') */}
      <div 
        className={`flex items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow ${
          type === "delete" ? "border-l-4 border-red-500" : "border-l-4 border-green-500"
        }`}
        role="alert" // Accessibility: define this as an alert role
      >
        {/* Icon changes depending on the type of toast (add or delete) */}
        <div className={`inline-flex flex-shrink-0 justify-center items-center w-8 h-8 rounded-lg ${
          type === "delete" ? "bg-red-100 text-red-500" : "bg-green-100 text-green-500"
        }`}>
          {type === "delete" ? (
            <MdDeleteOutline className="w-5 h-5" /> // Delete icon for 'delete' type
          ) : (
            <LuCheck className="w-5 h-5" /> // Checkmark icon for 'add' type
          )}
        </div>

        {/* Message displayed in the Toast */}
        <div className="ml-3 text-sm font-normal">{message}</div>

        {/* Close button to manually dismiss the Toast */}
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
          onClick={onclose} // Call the onclose function when clicked
          aria-label="Close" // Accessibility label
        >
          {/* Accessible label for the close button */}
          <span className="sr-only">Close</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

// Defining PropTypes for the component to enforce correct prop usage
Toast.propTypes = {
  isShown: PropTypes.bool.isRequired, // isShown determines if the Toast is visible
  message: PropTypes.string.isRequired, // The message to be displayed in the Toast
  type: PropTypes.oneOf(['add', 'delete']).isRequired, // Type can only be 'add' or 'delete'
  onclose: PropTypes.func.isRequired, // Function to close the Toast
};

export default Toast;