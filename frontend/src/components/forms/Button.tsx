import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  children: React.ReactNode;
}

export default function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  const base =
    "rounded-md px-[20px] py-[12px] cursor-pointer text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2";
  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary/90 border-0",
    outline:
      "bg-white text-primary border border-gray-200 hover:bg-primary/10",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
} 