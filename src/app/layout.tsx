import type { Metadata } from "next";
import { Maven_Pro } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";

const mavenPro = Maven_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-maven",
});

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
    <html lang="en" className={mavenPro.variable}>
      <body className={mavenPro.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
