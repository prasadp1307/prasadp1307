import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ChatBot from "@/components/ChatBot";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JobBoard - Find Your Dream Job",
  description:
    "Browse thousands of job opportunities. Post jobs, apply easily, and take the next step in your career.",
  keywords: ["jobs", "careers", "employment", "hiring", "job board"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-slate-50">
        <Navbar />
        <main>{children}</main>
        <ChatBot />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#fff",
              border: "1px solid #e2e8f0",
              color: "#1e293b",
            },
          }}
          richColors
        />
      </body>
    </html>
  );
}
