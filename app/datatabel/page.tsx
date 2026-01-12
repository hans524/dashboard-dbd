// src/app/data/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Activity, ArrowLeft, Home, LayoutDashboard, 
  MapPin, FileText, AlertCircle, Calendar 
} from 'lucide-react';
import DataTable from '@/components/DataTable'; // Pastikan komponen ini sudah dibuat

export default function DataPage() {
  const [year, setYear] = useState('2024');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch Data (Sama seperti di Home, tapi khusus halaman ini)
  useEffect(() => {
    setLoading(true);
    fetch(`/api/dbd?year=${year}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      });
  }, [year]);

  return (
    // BACKGROUND SAMA PERSIS DENGAN HOME (Gradient Biru)
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white p-6 pb-20 font-sans">
      
      {/* --- HEADER (Mirip Home tapi disesuaikan untuk navigasi balik) --- */}
      <header className="relative flex flex-col xl:flex-row justify-between items-center mb-10 gap-6 py-2">
        
        {/* 1. Logo Kiri */}
        <div className="w-full xl:w-auto flex flex-col justify-center xl:block z-10">
          <div className="bg-blue-600/30 text-blue-200 text-[10px] font-bold px-3 py-1 rounded-full w-fit mb-2 flex items-center gap-2 border border-blue-400/20 backdrop-blur-sm">
             <Activity size={12} /> Sistem Monitoring Terdepan
          </div>
          <h1 className="text-4xl font-extrabold mb-1 tracking-tight text-white drop-shadow-lg">
            DEMIS
          </h1>
          <p className="text-blue-200 opacity-80 text-sm">Data & Analisis Terperinci</p>
        </div>

        {/* 2. Navigasi Tengah (Hanya Tombol Kembali ke Beranda) */}
       <nav className="hidden xl:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full p-1.5 shadow-2xl items-center gap-1 z-10">
            <Link href="/" className="flex items-center gap-2 px-5 py-2.5 text-blue-100 hover:text-white hover:bg-white/10 rounded-full text-sm font-medium transition-all">
                <Home size={16} /> Beranda
            </Link>
            <Link href="/datatabel" className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-bold shadow-lg shadow-blue-600/40 transition-all hover:scale-105">
                <Home size={16} /> Detail Data
            </Link>
            <Link href="/prediksi" className="flex items-center gap-2 px-5 py-2.5 text-blue-100 hover:text-white hover:bg-white/10 rounded-full text-sm font-medium transition-all">
                <LayoutDashboard size={16} /> Prediksi
            </Link>
        </nav>

        {/* 3. Filter Tahun (Kanan) */}
        <div className="flex flex-wrap justify-center xl:justify-end gap-3 w-full xl:w-auto z-10">
            <Link 
              href="/"
              className="xl:hidden bg-white/10 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"
            >
              <ArrowLeft size={16}/> Kembali
            </Link>

            <div className="bg-blue-950/50 backdrop-blur-md p-1.5 rounded-xl border border-blue-500/30 flex items-center">
              <span className="text-[10px] text-blue-300 px-2 uppercase tracking-wider font-bold flex items-center gap-1">
                <Calendar size={10}/> Data Tahun:
              </span>
              <select
                value={year} 
                onChange={(e) => setYear(e.target.value)}
                className="bg-blue-600 text-white border-none rounded-lg px-3 py-1.5 outline-none text-sm font-bold cursor-pointer hover:bg-blue-500 transition shadow-inner"
              >
                <option value="2022" className="bg-slate-900">2022</option>
                <option value="2023" className="bg-slate-900">2023</option>
                <option value="2024" className="bg-slate-900">2024</option>
                <option value="2025" className="bg-slate-900">2025</option>
              </select>
            </div>
        </div>
      </header>

      {/* --- KONTEN UTAMA --- */}
      <div className="max-w-7xl mx-auto">
        
        {/* Loading State */}
        {loading || !data ? (
          <div className="flex h-[400px] w-full items-center justify-center bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 animate-pulse flex-col gap-3">
             <Activity className="animate-spin text-blue-400" size={40} /> 
             <span className="text-blue-200 font-bold">Mengambil Data Server...</span>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Judul Halaman */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <LayoutDashboard className="text-yellow-400"/> Tabel Detail Kecamatan ({year})
                </h2>
                <p className="text-blue-200/70 text-sm mt-1">
                    Berikut adalah data lengkap kasus DBD, kematian, dan status risiko per kecamatan.
                </p>
            </div>

            {/* Komponen Tabel */}
            <DataTable data={data.locations} />
          </div>
        )}
      </div>

    </div>
  );
}