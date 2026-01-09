'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Map, BarChart3, Info, Download } from 'lucide-react';

export default function AnalisisPage() {
  // State untuk tab aktif (Peta atau Grafik)
  const [activeTab, setActiveTab] = useState<'map' | 'chart'>('map');

  return (
    <div className="min-h-screen bg-[#172554] text-white pb-20 font-sans">
      
      {/* NAVBAR */}
      <nav className="px-6 py-6 flex justify-between items-center max-w-[1400px] mx-auto">
        <Link 
            href="/" 
            className="flex items-center gap-2 bg-[#1e3a8a] hover:bg-[#2563eb] text-white px-5 py-3 rounded-lg border border-blue-800 transition-all text-sm font-medium shadow-md"
        >
            <ArrowLeft size={18} />
            Kembali
        </Link>

        <div className="text-right">
             <h1 className="text-xl font-bold text-white tracking-tight">
                EDA Visualization
             </h1>
             <p className="text-xs text-blue-200">Exploratory Data Analysis Result</p>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto p-6 lg:p-8">
        
        {/* HEADER */}
        <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Analisis Klasterisasi Wilayah</h2>
            <p className="text-blue-200 max-w-2xl">
                Hasil pengolahan data menggunakan algoritma <b>Mean Shift Clustering</b> untuk mengelompokkan wilayah berdasarkan tingkat kerawanan DBD dan kepadatan penduduk.
            </p>
        </div>

        {/* TAB CONTROLLER */}
        <div className="flex gap-4 mb-6 border-b border-blue-800 pb-1">
            <button 
                onClick={() => setActiveTab('map')}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-bold transition-all ${
                    activeTab === 'map' 
                    ? 'bg-blue-600 text-white border-b-2 border-white' 
                    : 'text-blue-300 hover:text-white hover:bg-white/5'
                }`}
            >
                <Map size={18} /> Peta Interaktif
            </button>
            <button 
                onClick={() => setActiveTab('chart')}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-bold transition-all ${
                    activeTab === 'chart' 
                    ? 'bg-blue-600 text-white border-b-2 border-white' 
                    : 'text-blue-300 hover:text-white hover:bg-white/5'
                }`}
            >
                <BarChart3 size={18} /> Scatter Plot
            </button>
        </div>

        {/* CONTENT AREA */}
        <div className="bg-[#1e3a8a] rounded-2xl border border-blue-800 p-1 shadow-2xl overflow-hidden min-h-[600px] relative">
            
            {/* OPSI 1: TAMPILAN PETA (IFRAME) */}
            {activeTab === 'map' && (
                <div className="w-full h-[600px] relative bg-white rounded-xl overflow-hidden">
                    {/* Menggunakan iframe untuk memuat file HTML hasil folium */}
                    <iframe 
                        src="/visual/peta_analisis.html" 
                        className="w-full h-full border-none"
                        title="Peta Analisis Folium"
                    />
                    
                    {/* Overlay Info (Optional) */}
                    <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-lg shadow-lg text-slate-800 text-xs max-w-xs backdrop-blur-sm">
                        <div className="flex items-center gap-2 font-bold mb-1 text-blue-700">
                            <Info size={14}/> Info Peta
                        </div>
                        Peta ini digenerate menggunakan Python Folium. Lingkaran menunjukkan radius kerawanan berdasarkan Incidence Rate.
                    </div>
                </div>
            )}

            {/* OPSI 2: TAMPILAN GAMBAR (SCATTER PLOT) */}
            {activeTab === 'chart' && (
                <div className="w-full h-[600px] flex flex-col items-center justify-center p-8 bg-white/5 rounded-xl">
                    <div className="relative w-full max-w-4xl h-full">
                        {/* Gambar Scatter Plot */}
                        <Image 
                            src="/visual/scatter_plot.png" 
                            alt="Scatter Plot Clustering" 
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="mt-4 text-center">
                        <h3 className="text-white font-bold text-lg">Distribusi Cluster</h3>
                        <p className="text-blue-200 text-sm">Hubungan antara Jumlah Penduduk dan Kasus Positif</p>
                    </div>
                </div>
            )}

        </div>

        {/* DOWNLOAD SECTION */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-900/40 p-6 rounded-xl border border-blue-700/50 flex justify-between items-center">
                <div>
                    <h4 className="font-bold text-white">Laporan Analisis Lengkap</h4>
                    <p className="text-xs text-blue-300">Format Excel (.xlsx)</p>
                </div>
                <button className="bg-white text-blue-900 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-50 transition">
                    <Download size={16}/> Unduh Data
                </button>
            </div>
            
            <div className="bg-blue-900/40 p-6 rounded-xl border border-blue-700/50 flex justify-between items-center">
                <div>
                    <h4 className="font-bold text-white">Notebook Python</h4>
                    <p className="text-xs text-blue-300">Kode Sumber (.ipynb)</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-500 transition">
                    <Download size={16}/> Unduh Script
                </button>
            </div>
        </div>

      </main>
    </div>
  );
}