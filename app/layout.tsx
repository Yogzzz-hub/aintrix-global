import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import SmoothScrollProvider from "./components/SmoothScrollProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Aintrix Global Private Limited",
  description: "Shaping the future through innovation, research, and strategic global partnerships.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-primary-bg text-primary-text">
        <div className="page-bg" />
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-1 w-full">
            {children}
          </main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
