import React from "react";
import { FiChevronDown } from "react-icons/fi";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, required, className = "", children, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="block text-gray-700 font-medium mb-2">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          className={`w-full rounded-md border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:ring-offset-2 appearance-none pr-10 ${className}`}
          {...props}
        >
          {children}
        </select>
        <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  )
);
Select.displayName = "Select";

export default Select; 