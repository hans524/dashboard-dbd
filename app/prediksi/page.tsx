// src/app/prediksi/page.tsx
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
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { ArrowLeft, Calendar } from 'lucide-react';

export default function PrediksiPage() {
  const [period, setPeriod] = useState(3); // Default 3 bulan sesuai gambar

  // --- 1. GENERATE DATA DUMMY (MIRIP REFERENSI) ---
  const generateData = (months: number) => {
    // Data Historis (Garis Biru Solid)
    const historyData = [
      { name: '2023-01', aktual: 85, prediksi: null, range: [null, null] },
      { name: '2023-02', aktual: 60, prediksi: null, range: [null, null] },
      { name: '2023-03', aktual: 52, prediksi: null, range: [null, null] },
      { name: '2023-04', aktual: 78, prediksi: null, range: [null, null] },
      { name: '2023-05', aktual: 45, prediksi: null, range: [null, null] },
      { name: '2023-06', aktual: 38, prediksi: null, range: [null, null] },
      { name: '2023-07', aktual: 12, prediksi: null, range: [null, null] },
      { name: '2023-08', aktual: 9, prediksi: null, range: [null, null] },
      { name: '2023-09', aktual: 8, prediksi: null, range: [null, null] },
      { name: '2023-10', aktual: 3, prediksi: null, range: [null, null] },
      { name: '2023-11', aktual: 5, prediksi: null, range: [null, null] },
      { name: '2023-12', aktual: 10, prediksi: null, range: [null, null] },
      { name: '2024-01', aktual: 20, prediksi: null, range: [null, null] },
      { name: '2024-02', aktual: 42, prediksi: null, range: [null, null] },
      { name: '2024-03', aktual: 43, prediksi: null, range: [null, null] },
      { name: '2024-04', aktual: 36, prediksi: null, range: [null, null] },
      { name: '2024-05', aktual: 52, prediksi: null, range: [null, null] },
      { name: '2024-06', aktual: 42, prediksi: null, range: [null, null] },
      { name: '2024-07', aktual: 22, prediksi: null, range: [null, null] },
      { name: '2024-08', aktual: 16, prediksi: null, range: [null, null] },
      { name: '2024-09', aktual: 10, prediksi: null, range: [null, null] },
      { name: '2024-10', aktual: 15, prediksi: null, range: [null, null] },
      { name: '2024-11', aktual: 12, prediksi: null, range: [null, null] },
      { name: '2024-12', aktual: 13, prediksi: null, range: [null, null] },
      { name: '2025-01', aktual: 23, prediksi: null, range: [null, null] },
      { name: '2025-02', aktual: 26, prediksi: null, range: [null, null] },
      { name: '2025-03', aktual: 21, prediksi: null, range: [null, null] },
      { name: '2025-04', aktual: 22, prediksi: null, range: [null, null] },
      { name: '2025-05', aktual: 17, prediksi: null, range: [null, null] },
      { name: '2025-06', aktual: 6, prediksi: null, range: [null, null] },
      { name: '2025-07', aktual: 5, prediksi: null, range: [null, null] },
      { name: '2025-08', aktual: 6, prediksi: null, range: [null, null] },
      { name: '2025-09', aktual: 3, prediksi: null, range: [null, null] },
      { name: '2025-10', aktual: 1, prediksi: null, range: [null, null] },
      { name: '2025-11', aktual: 0, prediksi: null, range: [null, null] },
      { name: '2025-12', aktual: 0, prediksi: null, range: [null, null] }, // Titik Akhir Data Aktual
    ];

    // Titik Sambung (Penting agar garis nyambung)
    // Nilai prediksi awal HARUS SAMA dengan aktual terakhir
    const bridgePoint = { 
        name: '2025-12', 
        aktual: null, 
        prediksi: 0, 
        range: [0, 0] 
    };

    // Data Prediksi (Garis Ungu Putus-putus)
    const futureData = [];
    let lastVal = 0;
    
    // Generate data bulan ke depan
    for (let i = 1; i <= months; i++) {
        // Simulasi pola naik (awal tahun biasanya naik DBD)
        const val = i === 1 ? 9 : i === 2 ? 20 : i === 3 ? 19 : Math.floor(Math.random() * 20) + 10;
        
        futureData.push({ 
            name: `2026-0${i}`, 
            aktual: null, 
            prediksi: val,
            // Range (Area Ungu Tipis)
            range: [0, val + 25] 
        });
    }

    return [...historyData, bridgePoint, ...futureData];
  };

  const data = generateData(period);

  return (
    <div className="min-h-screen bg-white text-slate-800 pb-20 font-sans">
      
      {/* NAVBAR (D-MOSAI STYLE) */}
      <nav className="bg-white px-8 py-4 flex justify-between items-center border-b border-gray-100">
        <div className="flex items-center gap-2">
            <div className="bg-blue-600 rounded-lg p-1.5">
               {/* Icon Logo Sederhana */}
               <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
               </svg>
            </div>
            <span className="text-xl font-bold text-blue-600 tracking-tight">D-MOSAI</span>
        </div>
        
        <div className="flex gap-8 text-sm font-medium text-gray-500">
            <Link href="/" className="hover:text-blue-600">Beranda</Link>
            <Link href="/" className="hover:text-blue-600">Dashboard</Link>
            <Link href="#" className="hover:text-blue-600">Data Kasus</Link>
            <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full font-semibold">Prediksi</span>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto p-6">
        
        {/* PILIH PERIODE */}
        <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-3">
                <Calendar size={16}/> Pilih Periode Prediksi
            </h2>
            <div className="flex gap-3">
                {[3, 6, 12].map((p) => (
                    <button 
                        key={p}
                        onClick={() => setPeriod(p)}
                        className={`px-6 py-2 rounded-lg text-sm font-bold border transition-all ${
                            period === p 
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                            : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        {p} Bulan ke depan
                    </button>
                ))}
            </div>
        </div>

        {/* CONTAINER GRAFIK (CARD PUTIH BORDER TIPIS) */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
            
            {/* Header Grafik */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Grafik Hasil Prediksi</h3>
                    <p className="text-gray-500 text-sm mt-1">Data Historis vs Prediksi ({period} Bulan)</p>
                </div>
                <div className="bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-xs font-bold">
                    Model: SARIMA (Seasonal ARIMA)
                </div>
            </div>

            {/* Custom Legend di Atas Grafik */}
            <div className="flex justify-center gap-6 text-sm mb-4">
                <div className="flex items-center gap-2 text-blue-500 font-medium">
                    <div className="w-2 h-2 rounded-full bg-white border-2 border-blue-500"></div>
                    Data Aktual
                </div>
                <div className="flex items-center gap-2 text-purple-500 font-medium">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    Prediksi AI
                </div>
                <div className="flex items-center gap-2 text-purple-300 font-medium">
                    <div className="w-3 h-3 bg-purple-100 rounded-sm"></div>
                    Rentang Keyakinan
                </div>
            </div>

            {/* AREA CHART UTAMA */}
            <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            {/* Gradient untuk area rentang keyakinan */}
                            <linearGradient id="colorRange" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#d8b4fe" stopOpacity={0.3}/> 
                                <stop offset="95%" stopColor="#d8b4fe" stopOpacity={0.1}/>
                            </linearGradient>
                        </defs>
                        
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#64748b', fontSize: 11}} 
                            dy={10} 
                            interval="preserveStartEnd"
                        />
                        
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#64748b', fontSize: 11}} 
                        />
                        
                        <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        />

                        {/* 1. AREA: Rentang Keyakinan (Ungu Muda) */}
                        <Area 
                            type="monotone" 
                            dataKey="range" 
                            fill="url(#colorRange)" 
                            stroke="none" 
                        />

                        {/* 2. LINE: Data Aktual (Biru Solid) */}
                        <Line 
                            type="monotone" 
                            dataKey="aktual" 
                            stroke="#3b82f6" 
                            strokeWidth={2}
                            dot={{ r: 3, fill: 'white', stroke: '#3b82f6', strokeWidth: 2 }}
                            activeDot={{ r: 6 }}
                            connectNulls
                        />
                        
                        {/* 3. LINE: Prediksi AI (Ungu Putus-putus) */}
                        <Line 
                            type="monotone" 
                            dataKey="prediksi" 
                            stroke="#a855f7" 
                            strokeWidth={2} 
                            strokeDasharray="5 5" // Garis putus-putus
                            dot={{ r: 3, fill: '#a855f7', strokeWidth: 0 }}
                            activeDot={{ r: 6 }}
                            connectNulls
                        />

                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* TABEL RINCIAN ANGKA */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-gray-100">
                <h3 className="font-bold text-gray-800">Rincian Angka Prediksi</h3>
            </div>
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
                    <tr>
                        <th className="px-6 py-4">Bulan</th>
                        <th className="px-6 py-4 text-gray-700">Prediksi Kasus</th>
                        <th className="px-6 py-4">Batas Bawah</th>
                        <th className="px-6 py-4">Batas Atas</th>
                        <th className="px-6 py-4">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {data.filter(d => d.name.startsWith('2026')).map((row, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 text-gray-600 font-medium">{row.name}</td>
                            {/* Angka Prediksi Warna Ungu Tebal */}
                            <td className="px-6 py-4 font-bold text-purple-600 text-base">
                                {row.prediksi}
                            </td>
                            <td className="px-6 py-4 text-gray-400">{row.range?.[0]}</td>
                            <td className="px-6 py-4 text-gray-400">{row.range?.[1]}</td>
                            <td className="px-6 py-4">
                                <span className="text-green-500 font-bold text-xs bg-green-50 px-3 py-1 rounded-full border border-green-100">
                                    Aman
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

      </main>
    </div>
  );
}