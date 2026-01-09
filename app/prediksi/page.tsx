// src/app/prediksi/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ComposedChart, 
  Line, 
  Area, 
  XAxis, a
  YAxis, z
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';a
import { Calendar, ArrowLeft, Download, RefreshCw, Loader2 } from 'lucide-react';

export default function PrediksiPage() {
  const [period, setPeriod] = useState(6); // Default 6 bulan ke depan
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- FUNGSI FETCH DATA DARI API ---
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // 1. Kita ambil data 3 tahun terakhir dari API kita sendiri
        // Menggunakan Promise.all agar fetch berjalan paralel (lebih cepat)
        const [res23, res24, res25] = await Promise.all([
          fetch('/api/dbd?year=2023').then(r => r.json()),
          fetch('/api/dbd?year=2024').then(r => r.json()),
          fetch('/api/dbd?year=2025').then(r => r.json())
        ]);

        // 2. Format Data Historis (Aktual)
        // Kita gabungkan monthlyTrend dari masing-masing tahun
        const history23 = formatMonthlyData(res23.monthlyTrend, '23');
        const history24 = formatMonthlyData(res24.monthlyTrend, '24');
        const history25 = formatMonthlyData(res25.monthlyTrend, '25');

        const fullHistory = [...history23, ...history24, ...history25];

        // 3. Generate Data Prediksi (Masa Depan)
        // Karena data 2026 belum ada, kita proyeksikan berdasarkan data terakhir (2025)
        // Dalam aplikasi real, ini bisa diambil dari endpoint API khusus prediksi (/api/predict)
        const lastValue = fullHistory[fullHistory.length - 1].aktual || 0;
        const future = generatePredictionData(lastValue, period);

        // 4. Gabungkan: History + Bridge (Titik Sambung) + Future
        // Bridge point penting agar garis nyambung dari Aktual ke Prediksi
        const bridgePoint = {
             name: fullHistory[fullHistory.length - 1].name,
             aktual: null,
             prediksi: lastValue, // Titik temu
             range: [lastValue, lastValue]
        };

        setChartData([...fullHistory, bridgePoint, ...future]);

      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [period]); // Re-run jika periode berubah

  // --- HELPER 1: Format Data API ke Format Chart ---
  const formatMonthlyData = (monthlyTrend: any[], yearSuffix: string) => {
    if(!monthlyTrend) return [];
    return monthlyTrend.map((item: any) => ({
      name: `${item.name} ${yearSuffix}`, // Contoh: "Jan 23"
      aktual: item.kasus,
      prediksi: null,
      range: [null, null]
    }));
  };

  // --- HELPER 2: Generate Prediksi (Simulasi AI) ---
  const generatePredictionData = (startValue: number, months: number) => {
    const futureData = [];
    const monthsName = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];
    let currentValue = startValue;

    for (let i = 1; i <= months; i++) {
        // Logika Proyeksi Sederhana (Naik turun acak untuk simulasi tren)
        // Di sistem asli, angka ini datang dari Python
        const change = Math.floor(Math.random() * 20) - 5; // Fluktuasi -5 sampai +15
        currentValue = Math.max(0, currentValue + change); // Tidak boleh minus
        
        const mIndex = (i - 1) % 12; 
        
        futureData.push({ 
            name: `${monthsName[mIndex]} 26`, 
            aktual: null, 
            prediksi: currentValue,
            // Range Confidence Interval (Area Hijau)
            range: [Math.max(0, currentValue - 10), currentValue + 15] 
        });
    }
    return futureData;
  };

  return (
    <div className="min-h-screen bg-[#172554] text-white pb-20 font-sans">
      
      {/* Navbar */}
      <nav className="px-6 py-6 flex justify-between items-center max-w-[1400px] mx-auto">
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
                <p className="text-blue-200">Analisis tren berdasarkan Data Riil (2023-2025) & Prediksi AI (2026).</p>
            </div>
            
            <button 
                onClick={() => window.location.reload()} 
                className="flex items-center gap-2 bg-white hover:bg-gray-100 text-[#172554] px-6 py-3 rounded-lg shadow-lg shadow-blue-900/50 transition-all font-bold"
            >
                <RefreshCw size={18} className="text-[#172554]"/>
                Refresh Data
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
                        ? 'bg-white text-[#172554] shadow-sm' 
                        : 'text-blue-300 hover:text-white hover:bg-blue-800'
                    }`}
                >
                    {p} Bulan
                </button>
            ))}
        </div>

        {/* Loading State */}
        {loading ? (
            <div className="h-[400px] w-full flex flex-col items-center justify-center bg-[#1e3a8a] rounded-2xl border border-blue-800 animate-pulse">
                <Loader2 size={48} className="text-blue-400 animate-spin mb-4"/>
                <p className="text-blue-200">Mengambil Data Riil dari Server...</p>
            </div>
        ) : (
            <>
                {/* CARD CHART UTAMA */}
                <div className="bg-[#1e3a8a] rounded-2xl border border-blue-800 p-6 lg:p-8 shadow-2xl mb-8">
                    {/* Legend */}
                    <div className="flex justify-center gap-6 text-sm mb-8 flex-wrap">
                        <div className="flex items-center gap-2 text-blue-100">
                            <div className="w-3 h-3 rounded-full bg-white border border-blue-500"></div>
                            Data Aktual (2023-2025)
                        </div>
                        <div className="flex items-center gap-2 text-blue-100">
                            <div className="w-3 h-3 rounded-full bg-[#34d399] shadow-[0_0_10px_#34d399]"></div>
                            <span className="text-[#34d399] font-semibold">Prediksi AI</span>
                        </div>
                    </div>

                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRange" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#34d399" stopOpacity={0.3}/> 
                                        <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2563eb" opacity={0.3} />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fill: '#93c5fd', fontSize: 11}} 
                                    dy={10} 
                                    minTickGap={30}
                                />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#93c5fd', fontSize: 11}} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#172554', border: '1px solid #2563eb', borderRadius: '8px', color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="range" fill="url(#colorRange)" stroke="none" />
                                <Line type="monotone" dataKey="aktual" stroke="#ffffff" strokeWidth={2} dot={{ r: 3, fill: '#1e3a8a', stroke: '#fff', strokeWidth: 2 }} connectNulls />
                                <Line type="monotone" dataKey="prediksi" stroke="#34d399" strokeWidth={3} strokeDasharray="6 6" dot={{ r: 4, fill: '#34d399', strokeWidth: 0 }} connectNulls />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* TABEL RINCIAN */}
                <div className="bg-[#1e3a8a] rounded-2xl border border-blue-800 overflow-hidden shadow-lg">
                    <div className="p-6 border-b border-blue-800 flex justify-between items-center bg-blue-900/50">
                        <h3 className="font-bold text-white text-lg flex items-center gap-2">
                            <Calendar size={18} className="text-blue-300"/> Data Tabel Prediksi (2026)
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
                                {chartData.filter(d => d.name.includes('26')).map((row, idx) => (
                                    <tr key={idx} className="hover:bg-blue-800 transition-colors">
                                        <td className="px-6 py-4 text-blue-100 font-medium">{row.name}</td>
                                        <td className="px-6 py-4 font-bold text-[#34d399] text-base">{row.prediksi}</td>
                                        <td className="px-6 py-4 text-blue-300">{row.range?.[0]}</td>
                                        <td className="px-6 py-4 text-blue-300">{row.range?.[1]}</td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                                                (row.prediksi || 0) > 40 
                                                ? 'text-orange-300 bg-orange-900/40 border-orange-500/50'
                                                : 'text-green-300 bg-green-900/40 border-green-500/50'
                                            }`}>
                                                {(row.prediksi || 0) > 40 ? 'Waspada' : 'Aman'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )}
      </main>
    </div>
  );
}