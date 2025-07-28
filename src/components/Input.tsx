import React from "react";
import type { InputProps } from "../interfaces/data.interfaces";
import { Eye, EyeOff } from "lucide-react";

const Input = React.forwardRef<HTMLInputElement, InputProps & React.InputHTMLAttributes<HTMLInputElement>>(
  ({ label, error, className = "", type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";

    const togglePassword = () => setShowPassword((prev) => !prev);
    return (
      <div className={`relative ${label === 'url' ? '':'mb-4'}`}>
        {label !== 'url' && <label className="block text-sm font-medium text-gray-700 mb-2">{label === 'url' ?'' : label}</label>}

        <div className="relative">
          <input
            ref={ref}
            type={isPassword && showPassword ? "text" : type}
            className={`w-full px-4 py-2 border text-black rounded-lg focus:ring-2 focus:ring-sky-100 focus:border-sky-200 outline-none transition-colors ${
              error ? "border-red-500" : "border-gray-300"
            } ${isPassword ? "pr-10" : ""} ${className}`}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

export default Input;
