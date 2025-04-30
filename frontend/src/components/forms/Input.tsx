import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-gray-700 font-medium mb-2">{label}</label>}
      <input
        className={`w-full rounded-md border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors focus:ring-offset-2 ${className}`}
        {...props}
      />
    </div>
  );
} 