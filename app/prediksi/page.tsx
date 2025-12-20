'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ComposedChart, 
  Line, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Calendar, ArrowLeft, Download, RefreshCw } from 'lucide-react';

export default function PrediksiPage() {
  const [period, setPeriod] = useState(3);

  // --- GENERATE DATA DUMMY ---
  const generateData = (months: number) => {
    const historyData = [
      { name: 'Jan 23', aktual: 85, prediksi: null, range: [null, null] },
      { name: 'Feb 23', aktual: 60, prediksi: null, range: [null, null] },
      { name: 'Mar 23', aktual: 52, prediksi: null, range: [null, null] },
      { name: 'Apr 23', aktual: 78, prediksi: null, range: [null, null] },
      { name: 'Mei 23', aktual: 45, prediksi: null, range: [null, null] },
      { name: 'Jun 23', aktual: 38, prediksi: null, range: [null, null] },
      { name: 'Jul 23', aktual: 12, prediksi: null, range: [null, null] },
      { name: 'Agt 23', aktual: 9, prediksi: null, range: [null, null] },
      { name: 'Sep 23', aktual: 8, prediksi: null, range: [null, null] },
      { name: 'Okt 23', aktual: 3, prediksi: null, range: [null, null] },
      { name: 'Nov 23', aktual: 5, prediksi: null, range: [null, null] },
      { name: 'Des 23', aktual: 10, prediksi: null, range: [null, null] },
      { name: 'Jan 24', aktual: 20, prediksi: null, range: [null, null] },
      { name: 'Feb 24', aktual: 42, prediksi: null, range: [null, null] },
      { name: 'Mar 24', aktual: 43, prediksi: null, range: [null, null] },
      { name: 'Apr 24', aktual: 36, prediksi: null, range: [null, null] },
      { name: 'Mei 24', aktual: 52, prediksi: null, range: [null, null] },
      { name: 'Jun 24', aktual: 42, prediksi: null, range: [null, null] },
      { name: 'Jul 24', aktual: 22, prediksi: null, range: [null, null] },
      { name: 'Agt 24', aktual: 16, prediksi: null, range: [null, null] },
      { name: 'Sep 24', aktual: 10, prediksi: null, range: [null, null] },
      { name: 'Okt 24', aktual: 15, prediksi: null, range: [null, null] },
      { name: 'Nov 24', aktual: 12, prediksi: null, range: [null, null] },
      { name: 'Des 24', aktual: 13, prediksi: null, range: [null, null] },
      { name: 'Jan 25', aktual: 23, prediksi: null, range: [null, null] },
      { name: 'Feb 25', aktual: 26, prediksi: null, range: [null, null] },
      { name: 'Mar 25', aktual: 21, prediksi: null, range: [null, null] },
      { name: 'Apr 25', aktual: 22, prediksi: null, range: [null, null] },
      { name: 'Mei 25', aktual: 17, prediksi: null, range: [null, null] },
      { name: 'Jun 25', aktual: 6, prediksi: null, range: [null, null] },
      { name: 'Jul 25', aktual: 5, prediksi: null, range: [null, null] },
      { name: 'Agt 25', aktual: 6, prediksi: null, range: [null, null] },
      { name: 'Sep 25', aktual: 3, prediksi: null, range: [null, null] },
      { name: 'Okt 25', aktual: 1, prediksi: null, range: [null, null] },
      { name: 'Nov 25', aktual: 0, prediksi: null, range: [null, null] },
      { name: 'Des 25', aktual: 0, prediksi: null, range: [null, null] },
    ];

    const bridgePoint = { 
        name: 'Des 25', aktual: null, prediksi: 0, range: [0, 0] 
    };

    const futureData = [];
    const monthsName = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];
    
    for (let i = 1; i <= months; i++) {
        const val = i === 1 ? 9 : i === 2 ? 20 : i === 3 ? 19 : Math.floor(Math.random() * 20) + 10;
        const mIndex = (i - 1) % 12; 
        futureData.push({ 
            name: `${monthsName[mIndex]} 26`, 
            aktual: null, 
            prediksi: val,
            range: [Math.max(0, val - 5), val + 15] 
        });
    }

    return [...historyData, bridgePoint, ...futureData];
  };

  const data = generateData(period);

  return (
    // [BACKGROUND] Menggunakan "Blue 950" (#172554) untuk kesan Deep Blue (bukan hitam/slate)
    // Ini lebih mendekati warna background dashboard Anda 
    <div className="min-h-screen bg-[#172554] text-white pb-20 font-sans">
      
      {/* Navbar */}
      <nav className="px-6 py-6 flex justify-between items-center max-w-[1400px] mx-auto">
        {/* [TOMBOL KEMBALI] Biru Card (#1e3a8a) agar menyatu dengan tema biru */}
        <Link 
            href="/" 
            className="flex items-center gap-2 bg-[#1e3a8a] hover:bg-[#2563eb] text-white px-5 py-3 rounded-lg border border-blue-800 transition-all text-sm font-medium shadow-md"
        >
            <ArrowLeft size={18} />
            Kembali ke Beranda
        </Link>

        <div className="text-right">
             <h1 className="text-xl font-bold text-white tracking-tight">
                AI Prediction Center
             </h1>
             <p className="text-xs text-blue-200">Powered by SARIMA Model</p>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto p-6 lg:p-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Proyeksi Demam Berdarah</h2>
                <p className="text-blue-200">Analisis tren masa depan berdasarkan data historis 5 tahun terakhir.</p>
            </div>
            
            {/* [TOMBOL UTAMA] Putih Solid seperti tombol "Menu Prediksi AI" di Dashboard  */}
            <button className="flex items-center gap-2 bg-white hover:bg-gray-100 text-[#172554] px-6 py-3 rounded-lg shadow-lg shadow-blue-900/50 transition-all font-bold">
                <RefreshCw size={18} className="text-[#172554]"/>
                Generate Prediksi Baru
            </button>
        </div>

        {/* CONTROLLER PERIODE */}
        <div className="mb-6 flex items-center gap-2 bg-[#1e3a8a] w-fit p-1.5 rounded-lg border border-blue-800">
             {[3, 6, 12].map((p) => (
                <button 
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`px-6 py-2 rounded-md text-sm font-semibold transition-all ${
                        period === p 
                        // Active: Putih (Sesuai tema button dashboard)
                        ? 'bg-white text-[#172554] shadow-sm' 
                        // Inactive: Biru gelap transparan
                        : 'text-blue-300 hover:text-white hover:bg-blue-800'
                    }`}
                >
                    {p} Bulan
                </button>
            ))}
        </div>

        {/* [CARD UTAMA] "Blue 900" (#1e3a8a) - Ini warna biru vibrant yang mirip card "Total Kasus" di Dashboard  */}
        <div className="bg-[#1e3a8a] rounded-2xl border border-blue-800 p-6 lg:p-8 shadow-2xl mb-8">
            
            {/* Legend */}
            <div className="flex justify-center gap-6 text-sm mb-8 flex-wrap">
                <div className="flex items-center gap-2 text-blue-100">
                    <div className="w-3 h-3 rounded-full bg-white border border-blue-500"></div>
                    Data Aktual
                </div>
                <div className="flex items-center gap-2 text-blue-100">
                    <div className="w-3 h-3 rounded-full bg-[#34d399] shadow-[0_0_10px_#34d399]"></div>
                    <span className="text-[#34d399] font-semibold">Prediksi AI</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100">
                    <div className="w-4 h-4 bg-[#34d399]/20 rounded-sm border border-[#34d399]/50"></div>
                    Confidence Interval
                </div>
            </div>

            {/* AREA CHART */}
            <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorRange" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#34d399" stopOpacity={0.3}/> 
                                <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorAktual" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3}/> 
                                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        
                        {/* Grid disesuaikan dengan warna biru background */}
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2563eb" opacity={0.3} />
                        
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#93c5fd', fontSize: 11}} 
                            dy={10} 
                            minTickGap={30}
                        />
                        
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#93c5fd', fontSize: 11}} 
                        />
                        
                        {/* Tooltip Background Biru Tua */}
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: '#172554', 
                                border: '1px solid #2563eb', 
                                borderRadius: '8px',
                                color: '#fff'
                            }}
                            cursor={{ stroke: '#60a5fa', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />

                        {/* Area Range (Hijau Neon / Teal agar kontras di biru tua) */}
                        <Area 
                            type="monotone" 
                            dataKey="range" 
                            fill="url(#colorRange)" 
                            stroke="none" 
                        />

                        {/* Line Aktual (Putih/Biru Muda agar jelas di background biru) */}
                        <Line 
                            type="monotone" 
                            dataKey="aktual" 
                            stroke="#ffffff" 
                            strokeWidth={2}
                            dot={{ r: 3, fill: '#1e3a8a', stroke: '#fff', strokeWidth: 2 }}
                            activeDot={{ r: 6, fill: '#fff', stroke: '#1e3a8a', strokeWidth: 2 }}
                            connectNulls
                        />
                        
                        {/* Line Prediksi (Hijau Neon/Teal) */}
                        <Line 
                            type="monotone" 
                            dataKey="prediksi" 
                            stroke="#34d399" 
                            strokeWidth={3} 
                            strokeDasharray="6 6" 
                            dot={{ r: 4, fill: '#34d399', strokeWidth: 0 }}
                            activeDot={{ r: 8, fill: '#34d399', stroke: '#fff', strokeWidth: 2 }}
                            connectNulls
                        />

                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* TABEL RINCIAN - Menggunakan Biru Card (#1e3a8a) */}
        <div className="bg-[#1e3a8a] rounded-2xl border border-blue-800 overflow-hidden shadow-lg">
            <div className="p-6 border-b border-blue-800 flex justify-between items-center bg-blue-900/50">
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                    <Calendar size={18} className="text-blue-300"/>
                    Data Tabel Prediksi
                </h3>
                <button className="flex items-center gap-2 text-xs text-blue-200 font-semibold hover:text-white border border-blue-400/30 bg-blue-400/10 px-3 py-1.5 rounded-md transition-colors">
                    <Download size={14}/> Unduh CSV
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-[#172554] text-blue-300 uppercase text-xs font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Bulan</th>
                            <th className="px-6 py-4 text-[#34d399]">Prediksi Kasus</th>
                            <th className="px-6 py-4">Min</th>
                            <th className="px-6 py-4">Max</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-800">
                        {data.filter(d => d.name.includes('26')).map((row, idx) => (
                            <tr key={idx} className="hover:bg-blue-800 transition-colors">
                                <td className="px-6 py-4 text-blue-100 font-medium">{row.name}</td>
                                <td className="px-6 py-4 font-bold text-[#34d399] text-base">
                                    {row.prediksi}
                                </td>
                                <td className="px-6 py-4 text-blue-300">{row.range?.[0]}</td>
                                <td className="px-6 py-4 text-blue-300">{row.range?.[1]}</td>
                                <td className="px-6 py-4">
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                                        (row.prediksi || 0) > 15 
                                        ? 'text-orange-300 bg-orange-900/40 border-orange-500/50'
                                        : 'text-green-300 bg-green-900/40 border-green-500/50'
                                    }`}>
                                        {(row.prediksi || 0) > 15 ? 'Waspada' : 'Aman'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

      </main>
    </div>
  );
}