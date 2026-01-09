// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'leaflet/dist/leaflet.css';

// Import Komponen
import Footer from "@/components/Footer"; 
import Navbar from "@/components/Navbar"; // <--- IMPORT NAVBAR

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DEN-Smart | Dashboard DBD",
  description: "Sistem Monitoring dan Peringatan Dini DBD berbasis AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-[#0f172a]`}> {/* Background Gelap Global */}
        
        {/* 1. Pasang Navbar di paling atas */}
        <Navbar />

        {/* 2. Konten Halaman */}
        {/* Tambahkan padding-top (pt-24) agar konten tidak tertutup Navbar yang fixed */}
        <main className="pt-24 min-h-screen">
          {children}
        </main>

        {/* 3. Footer */}
        <Footer />
        
      </body>
    </html>
  );
}