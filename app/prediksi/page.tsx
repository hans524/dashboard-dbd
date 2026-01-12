// src/app/prediksi/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea 
} from 'recharts';
import { 
  ArrowLeft, BrainCircuit, Calendar, Download, RefreshCw, 
  ChevronDown, Home, LayoutDashboard, AlertTriangle 
} from 'lucide-react';

// --- DATA DUMMY UNTUK CHART & TABEL (Bisa diganti API nanti) ---
const chartData = [
  { month: 'Jan 23', actual: 120, predicted: null },
  { month: 'Apr 23', actual: 350, predicted: null },
  { month: 'Jul 23', actual: 180, predicted: null },
  { month: 'Okt 23', actual: 210, predicted: null },
  { month: 'Jan 24', actual: 90, predicted: null },
  { month: 'Apr 24', actual: 85, predicted: null },
  { month: 'Jul 24', actual: 130, predicted: null },
  { month: 'Okt 24', actual: 240, predicted: null },
  { month: 'Jan 25', actual: 160, predicted: null },
  { month: 'Apr 25', actual: 100, predicted: null },
  { month: 'Jul 25', actual: 50, predicted: null },
  { month: 'Okt 25', actual: 80, predicted: null },
  { month: 'Des 25', actual: 110, predicted: 110 }, // Titik temu
  { month: 'Jan 26', actual: null, predicted: 97 },
  { month: 'Feb 26', actual: null, predicted: 95 },
  { month: 'Mar 26', actual: null, predicted: 101 },
  { month: 'Apr 26', actual: null, predicted: 100 },
  { month: 'Mei 26', actual: null, predicted: 113 },
  { month: 'Jun 26', actual: null, predicted: 108 },
];

const tableData = [
  { month: 'Jan 26', val: 97, min: 87, max: 112, status: 'Waspada' },
  { month: 'Feb 26', val: 95, min: 85, max: 110, status: 'Waspada' },
  { month: 'Mar 26', val: 101, min: 91, max: 116, status: 'Waspada' },
  { month: 'Apr 26', val: 100, min: 90, max: 115, status: 'Waspada' },
  { month: 'Mei 26', val: 113, min: 103, max: 128, status: 'Waspada' },
  { month: 'Jun 26', val: 108, min: 98, max: 123, status: 'Waspada' },
];

export default function PredictionPage() {
  const [timeRange, setTimeRange] = useState('6 Bulan');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white p-6 pb-20 font-sans">
      
      {/* --- HEADER (SERAGAM DENGAN DASHBOARD) --- */}
      <header className="relative flex flex-col xl:flex-row justify-between items-center mb-10 gap-6 py-2">
        
        {/* 1. BAGIAN KIRI */}
        <div className="w-full xl:w-auto flex flex-col justify-center xl:block z-10">
          <div className="bg-purple-600/30 text-purple-200 text-[10px] font-bold px-3 py-1 rounded-full w-fit mb-2 flex items-center gap-2 border border-purple-400/20 backdrop-blur-sm">
             <BrainCircuit size={12} /> AI Prediction Center
          </div>
          <h1 className="text-4xl font-extrabold mb-1 tracking-tight text-white drop-shadow-lg">
            DEMIS
          </h1>
          <p className="text-blue-200 opacity-80 text-sm">Forecasting & Early Warning System</p>
        </div>

        {/* 2. BAGIAN TENGAH (NAVIGASI) */}
        <nav className="hidden xl:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full p-1.5 shadow-2xl items-center gap-1 z-10">
            <Link href="/" className="flex items-center gap-2 px-5 py-2.5 text-blue-100 hover:text-white hover:bg-white/10 rounded-full text-sm font-medium transition-all">
                <Home size={16} /> Beranda
            </Link>
            <Link href="/datatabel" className="flex items-center gap-2 px-5 py-2.5 text-blue-100 hover:text-white hover:bg-white/10 rounded-full text-sm font-medium transition-all">
                <LayoutDashboard size={16} /> Detail Data
            </Link>
            {/* Menu Prediksi Aktif */}
            <Link href="/prediksi" className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-bold shadow-lg shadow-blue-600/40 transition-all hover:scale-105">
                <BrainCircuit size={16} /> Prediksi
            </Link>
        </nav>

        {/* 3. BAGIAN KANAN */}
        <div className="flex justify-end gap-3 w-full xl:w-auto z-10">
             <Link href="/" className="flex items-center gap-2 text-sm text-blue-300 hover:text-white transition px-4 py-2">
                <ArrowLeft size={16}/> <span className="hidden sm:block">Kembali</span>
             </Link>
             <button className="bg-white text-blue-900 px-5 py-2.5 rounded-xl font-bold hover:bg-blue-50 transition flex items-center gap-2 shadow-lg shadow-blue-900/20">
                <RefreshCw size={16} /> <span>Refresh Data</span>
             </button>
        </div>
      </header>

      {/* --- KONTEN PREDIKSI --- */}
      
      {/* 1. BAGIAN GRAFIK (GLASS CARD) */}
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    Proyeksi Demam Berdarah
                </h2>
                <p className="text-blue-200 text-sm mt-1 opacity-80">
                    Analisis tren berdasarkan Data Riil (2023-2025) & Prediksi AI (2026).
                </p>
            </div>
            
            {/* Toggle Buttons */}
            <div className="flex bg-blue-950/50 p-1 rounded-xl border border-white/10">
                {['3 Bulan', '6 Bulan', '12 Bulan'].map((item) => (
                    <button 
                        key={item}
                        onClick={() => setTimeRange(item)}
                        className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                            timeRange === item 
                            ? 'bg-blue-500 text-white shadow-lg' 
                            : 'text-blue-300 hover:bg-white/5'
                        }`}
                    >
                        {item}
                    </button>
                ))}
            </div>
        </div>

        {/* Chart Area */}
        <div className="h-[400px] w-full bg-blue-900/20 rounded-2xl p-4 border border-white/5">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="gridGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', color: '#fff' }}
                        itemStyle={{ fontSize: '12px' }}
                    />
                    {/* Garis Data Riil (Solid) */}
                    <Line 
                        type="monotone" 
                        dataKey="actual" 
                        name="Data Aktual"
                        stroke="#fff" 
                        strokeWidth={2} 
                        dot={{ r: 4, fill: '#fff', strokeWidth: 0 }} 
                        activeDot={{ r: 6 }}
                    />
                    {/* Garis Prediksi (Putus-putus / Hijau Tosca) */}
                    <Line 
                        type="monotone" 
                        dataKey="predicted" 
                        name="Prediksi AI"
                        stroke="#2dd4bf" 
                        strokeWidth={3} 
                        strokeDasharray="5 5"
                        dot={{ r: 4, fill: '#2dd4bf', strokeWidth: 0 }} 
                    />
                </LineChart>
            </ResponsiveContainer>
            
            {/* Legend Custom */}
            <div className="flex justify-center gap-6 mt-4 text-xs font-semibold">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-white"></span> Data Aktual (2023-2025)
                </div>
                <div className="flex items-center gap-2 text-teal-300">
                    <span className="w-3 h-3 rounded-full bg-teal-400"></span> Prediksi AI (2026)
                </div>
            </div>
        </div>
      </div>

      {/* 2. BAGIAN TABEL (GLASS CARD) */}
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
                <Calendar size={20} className="text-blue-400"/> Data Tabel Prediksi (2026)
            </h3>
            <button className="flex items-center gap-2 text-xs font-bold bg-blue-600/20 text-blue-300 px-4 py-2 rounded-lg border border-blue-500/30 hover:bg-blue-600/40 transition">
                <Download size={14} /> Unduh CSV
            </button>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/10 text-blue-200 text-xs uppercase tracking-wider">
                        <th className="p-4 font-semibold">Bulan</th>
                        <th className="p-4 font-semibold">Prediksi Kasus</th>
                        <th className="p-4 font-semibold">Min (Batas Bawah)</th>
                        <th className="p-4 font-semibold">Max (Batas Atas)</th>
                        <th className="p-4 font-semibold">Status</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {tableData.map((row, idx) => (
                        <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition group">
                            <td className="p-4 font-medium text-white">{row.month}</td>
                            <td className="p-4 text-teal-300 font-bold text-lg">{row.val}</td>
                            <td className="p-4 text-blue-200 opacity-70">{row.min}</td>
                            <td className="p-4 text-blue-200 opacity-70">{row.max}</td>
                            <td className="p-4">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-300 border border-orange-500/30 group-hover:bg-orange-500 group-hover:text-white transition">
                                    <AlertTriangle size={12} /> {row.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

    </div>
  );
}