import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md text-white font-semibold transition duration-200 ease-in-out ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
