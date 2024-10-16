import React, { useState } from 'react';
import { BiSolidShow, BiSolidHide } from "react-icons/bi";

const PasswordInput = ({ value, onChange, placeholder, className }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-150 ease-in-out"
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Enter password"}
        type={isShowPassword ? "text" : "password"}
      />
      <button
        type="button"
        onClick={toggleShowPassword}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-teal-500 focus:outline-none"
        aria-label={isShowPassword ? "Hide password" : "Show password"}
      >
        {isShowPassword ? (
          <BiSolidHide className="w-5 h-5" />
        ) : (
          <BiSolidShow className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;