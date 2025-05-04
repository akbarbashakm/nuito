import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  position?: "relative" | "absolute" | "fixed" | "sticky" | "static"; // optional positioning
  disabled?: boolean; // Add disabled prop
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  position,
  type = "button",
  disabled = false // Default to false
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`
      ${position} inline-block font-avenir text-[16px] leading-normal bg-[#e7cd4b] text-black font-normal py-2 px-4 rounded mt-2
      border-2 border-transparent hover:bg-[#e7cd4b] hover:border-[#e7cd4b] hover:text-[#fff]
      cursor-pointer transition-all duration-300
      ${disabled ? 'opacity-70 cursor-not-allowed' : ''}
      ${className}
    `}
    style={{ position }}
  >
    {children}
  </button>
);

export default Button;