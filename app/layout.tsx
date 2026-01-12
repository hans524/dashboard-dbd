// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'leaflet/dist/leaflet.css';

// Import Komponen
import Footer from "@/components/Footer"; 
// Hapus import Navbar jika ada

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DEMIS | DBD Information System",
  description: "Sistem Monitoring Wabah DBD berbasis AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-[#0f172a]`}>
        
        {/* 1. Navbar SUDAH DIHILANGKAN dari sini */}

        {/* 2. Konten Halaman */}
        {/* PENTING: Saya hapus 'pt-24' agar halaman Page.tsx Anda bisa full sampai atas */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* 3. Footer */}
        <Footer />
        
      </body>
    </html>
  );
}