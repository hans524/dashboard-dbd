// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Activity, Users, AlertTriangle, MapPin, BrainCircuit, 
  ArrowRight, Home, LayoutDashboard, ChevronDown, Info, Layers
} from 'lucide-react';

// Import Map (Lazy Load)
const MapCluster = dynamic(() => import('@/components/MapCluster'), { ssr: false });

export default function Dashboard() {
  const [year, setYear] = useState('2024');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/dbd?year=${year}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      });
  }, [year]);

  if (loading || !data) {
    return (
        <div className="flex h-screen items-center justify-center bg-blue-950 text-blue-400 font-bold animate-pulse gap-2">
            <Activity className="animate-spin" /> Memuat Sistem Cerdas...
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white p-6 pb-20 font-sans">
      
      {/* --- HEADER UTAMA --- */}
      {/* relative: agar menu tengah bisa diposisikan absolute terhadap header ini */}
      <header className="relative flex flex-col xl:flex-row justify-between items-center mb-10 gap-6 py-2">
        
        {/* 1. BAGIAN KIRI (LOGO & JUDUL) */}
        <div className="w-full xl:w-auto flex flex-col justify-center xl:block z-10">
          <div className="bg-blue-600/30 text-blue-200 text-[10px] font-bold px-3 py-1 rounded-full w-fit mb-2 flex items-center gap-2 border border-blue-400/20 backdrop-blur-sm">
             <Activity size={12} /> Sistem Monitoring Terdepan
          </div>
          <h1 className="text-4xl font-extrabold mb-1 tracking-tight text-white drop-shadow-lg">
            SMART-VEC
          </h1>
          <p className="text-blue-200 opacity-80 text-sm">Dengue Monitor Information System</p>
        </div>

        {/* 2. BAGIAN TENGAH (MENU NAVIGASI BARU) */}
        {/* Posisi Absolute di tengah layar khusus tampilan Desktop (xl) */}
        <nav className="hidden xl:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full p-1.5 shadow-2xl items-center gap-1 z-10">
            
            {/* Menu: Beranda (Aktif) */}
            <Link href="/" className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-bold shadow-lg shadow-blue-600/40 transition-all hover:scale-105">
                <Home size={16} /> Beranda
            </Link>

            {/* Menu: Dashboard (Link ke Prediksi) */}
            <Link href="/prediksi" className="flex items-center gap-2 px-5 py-2.5 text-blue-100 hover:text-white hover:bg-white/10 rounded-full text-sm font-medium transition-all">
                <LayoutDashboard size={16} /> Dashboard
            </Link>

            {/* Dropdown Dummy */}
            <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-blue-100 hover:text-white transition-colors">
               Analisis <ChevronDown size={14} className="opacity-70"/>
            </button>
            
            <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-blue-100 hover:text-white transition-colors">
               Layanan <ChevronDown size={14} className="opacity-70"/>
            </button>

            <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-blue-100 hover:text-white transition-colors">
               Info <ChevronDown size={14} className="opacity-70"/>
            </button>
        </nav>

        {/* 3. BAGIAN KANAN (TOMBOL AKSI) */}
        <div className="flex flex-wrap justify-center xl:justify-end gap-3 w-full xl:w-auto z-10">
            {/* Tombol Prediksi AI */}
            <Link 
              href="/prediksi" 
              className="bg-white text-blue-900 px-5 py-2.5 rounded-xl font-bold hover:bg-blue-50 transition flex items-center gap-2 shadow-lg shadow-blue-900/20 group"
            >
              <BrainCircuit size={18} className="text-purple-600 group-hover:rotate-12 transition-transform"/> 
              <span className="hidden sm:inline">Menu Prediksi AI</span>
              <span className="sm:hidden">Prediksi</span>
              <ArrowRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform"/>
            </Link>

            {/* Filter Tahun */}
            <div className="bg-blue-950/50 backdrop-blur-md p-1.5 rounded-xl border border-blue-500/30 flex items-center">
              <span className="text-[10px] text-blue-300 px-2 uppercase tracking-wider font-bold">Data:</span>
              <select
                value={year} 
                onChange={(e) => setYear(e.target.value)}
                className="bg-blue-600 text-white border-none rounded-lg px-3 py-1.5 outline-none text-sm font-bold cursor-pointer hover:bg-blue-500 transition shadow-inner"
              >
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </div>
        </div>
      </header>

      {/* --- KONTEN DASHBOARD (SAMA SEPERTI SEBELUMNYA) --- */}
      
      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Kasus" value={data.summary.total} sub="+12% Real" icon={<Activity />} color="blue" />
        <StatCard title="Kasus Aktif" value={data.summary.active} sub="-5%" icon={<AlertTriangle />} color="indigo" />
        <StatCard title="Rata-rata CFR" value={data.summary.cfr} sub="~0.3%" icon={<Users />} color="cyan" />
        <StatCard title="Wilayah Terdampak" value={data.summary.affected} sub="Kecamatan" icon={<MapPin />} color="sky" />
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* CHART SECTION */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
               <Activity className="text-blue-400" /> Laporan Kasus DBD
            </h3>
            <div className="text-xs text-blue-300 bg-blue-900/40 px-3 py-1 rounded-full border border-blue-500/30">
               Update Real-time
            </div>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.monthlyTrend}>
                <defs>
                  <linearGradient id="colorKasus" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', color: '#fff', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }} 
                    itemStyle={{ color: '#60a5fa' }}
                    cursor={{ stroke: '#fff', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area type="monotone" dataKey="kasus" stroke="#60a5fa" strokeWidth={4} fillOpacity={1} fill="url(#colorKasus)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* MAP SECTION */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl flex flex-col">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
             <MapPin className="text-red-400"/> Peta Sebaran
          </h3>
          <div className="flex-1 min-h-[300px] rounded-2xl overflow-hidden relative z-0 border-2 border-white/5 shadow-inner">
             <MapCluster data={data.locations} />
          </div>
          {/* Legend Map */}
          <div className="mt-4 flex justify-around text-[11px] font-semibold text-blue-200 bg-blue-950/30 p-2 rounded-xl">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>Bahaya</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]"></span>Waspada</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>Aman</span>
          </div>
        </div>

      </div>
    </div>
  );
}

// Komponen StatCard Dipercantik
function StatCard({ title, value, sub, icon, color }: any) {
  return (
    <div className={`bg-blue-600/20 backdrop-blur-md p-6 rounded-2xl border border-blue-400/20 hover:bg-blue-600/30 transition duration-300 group relative overflow-hidden`}>
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8 blur-2xl group-hover:bg-white/10 transition"></div>
      
      <div className="flex justify-between items-start mb-3 relative z-10">
        <div className="p-2.5 bg-blue-500/20 rounded-xl text-blue-200 group-hover:text-white group-hover:scale-110 transition shadow-sm border border-white/5">
            {icon}
        </div>
        <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
            {sub}
        </span>
      </div>
      <div className="text-4xl font-extrabold mt-2 text-white tracking-tight relative z-10">
        {value}
      </div>
      <div className="text-blue-200 text-sm font-medium opacity-80 relative z-10">
        {title}
      </div>
    </div>
  );
}