import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import ThemeToggle from "@/component/ThemeToggle";
import { ModalProvider } from "@/context/ModalContext";
import BottomSheetModal from "@/component/Modal";

export const metadata: Metadata = {
  title: "Nu ITO",
  description: "Nu ITO - A New Standard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <ModalProvider>
            <ThemeToggle />
            {children}
            <BottomSheetModal />
          </ModalProvider>
        </Providers>
      </body>
    </html>
  );
}
