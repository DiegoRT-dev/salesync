import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
})

export const metadata: Metadata = {
  title: "SaleSync",
  description: "Sistema de gestion de ventas con dashboard interactivo, registro de compras y visualización de metricas en tiempo real.",
  keywords: [
    "dashboard",
    "ventas",
    "next.js",
    "prisma",
    "postgresql",
    "saas",
  ],
  authors: [{ name: "Diego RT" }]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="h-full bg-secondary overflow-x-hidden">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 px-4 md:px-6">
            {children}
          </main>
        <Footer />
        </div>
        
      </body>
    </html>
  );
}
