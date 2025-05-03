import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomSheetModal from "@/component/Modal";
import { ModalProvider } from "@/context/ModalContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nuito Tees | Quality T-Shirts Online",
  description: "Shop the latest collection of premium t-shirts at Nuito Tees. Find your perfect fit with our range of styles and designs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ModalProvider>
          <div className="flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
          </div>
          <BottomSheetModal />
        </ModalProvider>
      </body>
    </html>
  );
}
