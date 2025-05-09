"use client";

import React, { useEffect } from "react";
import BottomSheetModal from "@/component/Modal";
import { ModalProvider } from "@/context/ModalContext";
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
      offset: 220,
      delay: 0,
      anchorPlacement: "top-top",
      startEvent: "DOMContentLoaded",
      throttleDelay: 999,
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
    <ModalProvider>
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">{children}</main>
      </div>
      <BottomSheetModal />
    </ModalProvider>
  );
} 