import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
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
  title: "QuicklyResumeThis - AI Powered Resume Builder",
  description: "Build a professional, ATS-friendly resume in seconds with our AI-powered resume builder. Download PDF for free.",
  openGraph: {
    title: "QuicklyResumeThis - Build Your Resume in Seconds",
    description: "Transform your resume with AI. ATS-friendly PDFs, multiple templates, and instant downloads.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuicklyResumeThis - AI Powered Resume Builder",
    description: "Build a professional resume in seconds.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-900`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
