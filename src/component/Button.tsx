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
      ${position} inline-block font-avenir text-[16px] leading-normal
      text-black font-medium py-2 px-4 rounded-[8px] mt-2
      border border-[#868686] bg-[#e7cd4b]
      hover:bg-[#d6bc3f] hover:border-[#d6bc3f] hover:text-white
      hover:shadow-md hover:scale-[1.02]
      cursor-pointer transition-all duration-300 ease-in-out
      ${disabled ? 'opacity-70 cursor-not-allowed' : ''}
      ${className}
    `}    
    style={{ position }}
  >
    {children}
  </button>
);

export default Button;