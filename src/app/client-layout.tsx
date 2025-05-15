"use client";

import React, { useEffect } from "react";
import BottomSheetModal from "@/component/Modal";
import { ModalProvider } from "@/context/ModalContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeToggle from "@/component/ThemeToggle";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 80,
      delay: 100,
      anchorPlacement: "top-center",
      startEvent: "DOMContentLoaded",
      throttleDelay: 9,
      debounceDelay: 50
    });

    // Refresh AOS on resize
    const handleResize = () => {
      AOS.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ThemeProvider>
    <ModalProvider>
      <div className="flex min-h-screen flex-col">
          <ThemeToggle />
        <main className="flex-1">{children}</main>
      </div>
      <BottomSheetModal />
    </ModalProvider>
    </ThemeProvider>
  );
} 