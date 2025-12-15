// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Import CSS Leaflet disini agar dimuat secara global
import 'leaflet/dist/leaflet.css'; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- BAGIAN INI SAYA UBAH AGAR SESUAI PROYEK ---
export const metadata: Metadata = {
  title: "DEMIS | Dengue Monitor Information System",
  description: "Sistem Monitoring dan Peringatan Dini DBD berbasis AI",
};
// -----------------------------------------------

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}