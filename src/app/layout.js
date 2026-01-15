import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "../Providers/SessionProvider";
import { Toaster } from "react-hot-toast";
import AuthFeedback from "@/Components/Shared/AuthFeedback";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mk-Global Express Logistics",
  description: "Reliable logistics and delivery services in Kano State, Nigeria.",
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="light" lang="en">
      <SessionProvider >
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="min-h-screen">{children}</div>

          <Toaster position="top-right" reverseOrder={false} />
          <Suspense fallback={null}>
            <AuthFeedback />
          </Suspense>
        </body>
      </SessionProvider>
    </html>
  );
}
