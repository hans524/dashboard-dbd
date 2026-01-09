// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Activity, 
  LayoutDashboard, 
  Home, 
  ChevronDown, 
  Search,
  BarChart3 // <--- 1. IMPORT ICON BARU DISINI
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname(); // Untuk mendeteksi halaman aktif

  return (
    // nav: fixed di atas, z-index tinggi, bg-transparent (opacity 0)
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent px-6 py-4">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        
        {/* BAGIAN KIRI: LOGO & JUDUL */}
        <div className="flex items-center gap-3">
          {/* Logo Box */}
          <div className="bg-blue-600 p-2.5 rounded-lg shadow-lg shadow-blue-500/30">
            <Activity className="text-white h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-white leading-none tracking-tight">
              SMART-VEC
            </h1>
            <p className="text-[10px] text-blue-200 font-medium mt-0.5">
              Dengue Monitoring Informations System
            </p>
          </div>
        </div>

        {/* BAGIAN TENGAH: MENU NAVIGASI */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-sm px-2 py-1.5 rounded-full border border-white/10">
          
          {/* Menu: Beranda */}
          <Link 
            href="/" 
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
               pathname === '/' 
               ? 'bg-blue-600 text-white shadow-md' 
               : 'text-blue-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Home size={16} />
            Beranda
          </Link>

          {/* Menu: Prediksi */}
          <Link 
            href="/prediksi" 
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
               pathname === '/prediksi' 
               ? 'bg-blue-600 text-white shadow-md' 
               : 'text-blue-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            <LayoutDashboard size={16} />
            Prediksi
          </Link>

          {/* Menu: Analisis (BARU DITAMBAHKAN) */}
          <Link 
            href="/analisis" 
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
               pathname === '/analisis' 
               ? 'bg-blue-600 text-white shadow-md' 
               : 'text-blue-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            <BarChart3 size={16} />
            Analisis
          </Link>
          
        </div>

        {/* BAGIAN KANAN: SEARCH BAR */}
        <div className="hidden md:block">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-blue-300 group-focus-within:text-white transition-colors" />
            </div>
            {/* Input Self-Closing Tag yang Benar */}
            <input
              type="text"
              placeholder="Cari data kecamatan..."
              className="bg-white/10 border border-white/10 text-white text-sm rounded-full block w-64 pl-10 p-2.5 placeholder-blue-300/70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/20 transition-all"
            />
          </div>
        </div>

      </div>
    </nav>
  );
}