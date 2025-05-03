"use client";

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  position?: "relative" | "absolute" | "fixed" | "sticky" | "static"; // optional positioning
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  position,
  type = "button",
}) => (
  <button
    type={type}
    onClick={onClick}
    className={`
      ${position} inline-block bg-[#e7cd4b] text-black font-semibold py-2 px-4 rounded mt-2
      border-2 border-transparent hover:bg-transparent hover:border-[#e7cd4b] hover:text-[#000]
      cursor-pointer transition-all duration-300
      ${className}
    `}
  >
    {children}
  </button>
);

export default Button;