import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = ({
  label,
  error,
  type,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] =
    useState(false);

  const isPassword = type === "password";
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        {label}
      </label>
       
       <div className="relative">
      <input
        {...props}
        type={
          isPassword
            ? showPassword
              ? "text"
              : "password"
            : type
        }
        className={`w-full border rounded-lg p-3 outline-none
          ${error
            ? "border-red-500"
            : "border-gray-300"
          }`}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() =>
            setShowPassword(!showPassword)
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
        >
          {showPassword ? (
            <FaEyeSlash size={18} />
          ) : (
            <FaEye size={18} />
          )}
        </button>
      )}
      </div>
      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;