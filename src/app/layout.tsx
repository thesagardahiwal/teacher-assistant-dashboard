import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
// @ts-ignore
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Teacher Assistant Dashboard",
  description:
    "A comprehensive dashboard for managing classroom activities, student data, and teacher resources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning> 
      {/* suppressHydrationWarning avoids hydration mismatches on font variables */}
      <body className={`antialiased`}>
        {/* ✅ Global Redux Store Provider */}
          {/* ✅ Toasts */}
          <Toaster position="top-right" reverseOrder={false} />
          {/* ✅ Main app content */}
          {children}
      </body>
    </html>
  );
}
