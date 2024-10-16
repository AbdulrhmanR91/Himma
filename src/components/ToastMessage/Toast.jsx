import React, { useEffect } from "react";
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import PropTypes from "prop-types";

const Toast = ({ isShown, message, type, onclose }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onclose();
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onclose]);

  if (!isShown) return null;

  return (
    <div 
      className={`fixed top-20 right-6 transition-all duration-300 ease-in-out transform ${
        isShown ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div 
        className={`flex items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow ${
          type === "delete" ? "border-l-4 border-red-500" : "border-l-4 border-green-500"
        }`}
        role="alert"
      >
        <div className={`inline-flex flex-shrink-0 justify-center items-center w-8 h-8 rounded-lg ${
          type === "delete" ? "bg-red-100 text-red-500" : "bg-green-100 text-green-500"
        }`}>
          {type === "delete" ? (
            <MdDeleteOutline className="w-5 h-5" />
          ) : (
            <LuCheck className="w-5 h-5" />
          )}
        </div>
        <div className="ml-3 text-sm font-normal">{message}</div>
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
          onClick={onclose}
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

Toast.propTypes = {
  isShown: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['add', 'delete']).isRequired,
  onclose: PropTypes.func.isRequired,
};

export default Toast;