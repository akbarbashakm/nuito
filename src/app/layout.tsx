import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import ThemeToggle from "@/component/ThemeToggle";
import { ModalProvider } from "@/context/ModalContext";
import BottomSheetModal from "@/component/Modal";
import Script from "next/script";

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
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Script 
          src="https://apis.google.com/js/api.js" 
          strategy="beforeInteractive"
        />
        {process.env.NODE_ENV === 'development' && (
          <Script id="google-sheets-test">
            {`
              setTimeout(() => {
                import('/src/lib/testGoogleSheets.js').catch(console.error);
              }, 2000);
            `}
          </Script>
        )}
      </head>
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
