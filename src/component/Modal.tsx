// components/BottomSheetModal.tsx
"use client";
import React, { useEffect, useRef } from "react";
import { useModal } from "@/context/ModalContext";
import Form from "./Form";

interface BottomSheetModalProps {
  children?: React.ReactNode;
}

const BottomSheetModal: React.FC<BottomSheetModalProps> = ({ children }) => {
  const { isOpen, close } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        close();
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, close]);

  return (
    <div
      className={`
        fixed inset-0 z-[100] bg-black/40 flex items-end md:items-center justify-center
        transition-all duration-500
        ${isOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"}
      `}
      style={{ transitionProperty: "opacity, visibility" }}
    >
      <div
        ref={modalRef}
        className={`
          w-full md:w-[600px] bg-background dark:bg-background-dark rounded-t-2xl md:rounded-2xl shadow-xl
          transition-transform duration-500
          ${isOpen ? "translate-y-0 md:translate-y-0" : "translate-y-full md:translate-y-32"}
        `}
        style={{ maxWidth: 600, margin: "0 auto" }}
      >
        {children || <Form />}
      </div>
    </div>
  );
};

export default BottomSheetModal;
