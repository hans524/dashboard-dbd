// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link'; // <--- PENTING: Untuk navigasi
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Users, AlertTriangle, MapPin, BrainCircuit, TrendingUp, ArrowRight } from 'lucide-react';

// Import Map (pastikan path ini sesuai dengan folder Anda)
const MapCluster = dynamic(() => import('@/components/MapCluster'), { ssr: false });

export default function Dashboard() {
  const [year, setYear] = useState('2024');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    setLoading(true);
    fetch(`/api/dbd?year=${year}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      });
  }, [year]);

  if (loading || !data) return <div className="flex h-screen items-center justify-center text-blue-600 font-bold animate-pulse">Memuat Sistem Cerdas...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white p-6 pb-20">
      
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="bg-blue-600/30 text-blue-200 text-xs px-3 py-1 rounded-full w-fit mb-2 flex items-center gap-2">
             <Activity size={14} /> Sistem Monitoring Terdepan
          </div>
          <h1 className="text-4xl font-bold mb-1">DEMIS</h1>
          <p className="text-blue-200 opacity-80">Dengue Monitor Information System</p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            {/* --- TOMBOL MENU PREDIKSI (BARU) --- */}
            <Link 
              href="/prediksi" 
              className="bg-white text-blue-900 px-5 py-2 rounded-lg font-bold hover:bg-indigo-50 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
            >
              <BrainCircuit size={18} className="text-purple-600"/> 
              Menu Prediksi AI
              <ArrowRight size={16} className="text-gray-400"/>
            </Link>
            {/* ----------------------------------- */}

            <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg flex items-center">
              <span className="text-xs text-blue-200 mr-2 px-2">Data Tahun:</span>
              <select 
                id="year-select"
                aria-label="Pilih Tahun Data"
                value={year} 
                onChange={(e) => setYear(e.target.value)}
                className="bg-blue-950 text-white border border-blue-500 rounded px-3 py-1 outline-none text-sm h-full"
              >
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </div>
        </div>
      </header>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Kasus" value={data.summary.total} sub="+12% Real" icon={<Activity />} />
        <StatCard title="Kasus Aktif" value={data.summary.active} sub="-5%" icon={<AlertTriangle />} />
        <StatCard title="Rata-rata CFR" value={data.summary.cfr} sub="~0.3%" icon={<Users />} />
        <StatCard title="Wilayah Terdampak" value={data.summary.affected} sub="Kecamatan" icon={<MapPin />} />
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* CHART MONITORING */}
        <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Activity className="text-blue-400" /> Laporan Kasus DBD
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.monthlyTrend}>
                <defs>
                  <linearGradient id="colorKasus" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="name" stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" />
                <Tooltip contentStyle={{ backgroundColor: '#e3e6f0ff', border: 'none', color: '#fff' }} />
                <Area type="monotone" dataKey="kasus" stroke="#60a5fa" fillOpacity={1} fill="url(#colorKasus)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* MAP SECTION */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl flex flex-col">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
             <MapPin className="text-red-400"/> Peta Sebaran
          </h3>
          <div className="flex-1 min-h-[300px] rounded-xl overflow-hidden relative z-0">
             <MapCluster data={data.locations} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, sub, icon }: any) {
  return (
    <div className="bg-blue-600/40 backdrop-blur-sm p-5 rounded-xl border border-blue-400/30">
      <div className="flex justify-between items-start mb-2">
        <div className="p-2 bg-blue-500/20 rounded-lg">{icon}</div>
        <span className="text-xs font-medium text-green-300 bg-green-900/30 px-2 py-1 rounded">{sub}</span>
      </div>
      <div className="text-3xl font-bold mt-2">{value}</div>
      <div className="text-blue-200 text-sm">{title}</div>
    </div>
  );
}