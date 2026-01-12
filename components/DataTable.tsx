'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, X, ChevronLeft, ChevronRight, 
  FileText, MapPin, Activity, AlertCircle 
} from 'lucide-react';

interface Location {
  kecamatan: string;
  kasus: number;
  meninggal: number;
  status: string;
  // Kita hitung CFR dan Active di dalam komponen saja
}

interface DataTableProps {
  data: Location[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('Semua'); // Semua, Aman, Waspada, Bahaya
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // --- 1. LOGIKA FILTER & PENCARIAN ---
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchSearch = item.kecamatan.toLowerCase().includes(searchTerm.toLowerCase());
      const matchFilter = filterRisk === 'Semua' || item.status === filterRisk;
      return matchSearch && matchFilter;
    });
  }, [data, searchTerm, filterRisk]);

  // --- 2. LOGIKA PAGINATION ---
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // --- 3. HITUNG STATISTIK MINI (Berdasarkan Data yang Difilter) ---
  const totalWilayah = filteredData.length;
  const totalKasus = filteredData.reduce((acc, curr) => acc + curr.kasus, 0);
  const totalMeninggal = filteredData.reduce((acc, curr) => acc + curr.meninggal, 0);
  const avgCFR = totalKasus > 0 
    ? ((totalMeninggal / totalKasus) * 100).toFixed(2) 
    : '0.00';

  // Reset halaman jika filter berubah
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterRisk]);

  return (
    <div className="space-y-6 mb-10">
      
      {/* BAGIAN 1: STATISTIK MINI (Sesuai Referensi) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MiniStat title="Total Wilayah" value={totalWilayah} icon={<MapPin size={18} />} color="blue" />
        <MiniStat title="Total Kasus" value={totalKasus} icon={<Activity size={18} />} color="red" />
        <MiniStat title="Total Meninggal" value={totalMeninggal} icon={<AlertCircle size={18} />} color="orange" />
        <MiniStat title="Rata-rata CFR" value={`${avgCFR}%`} icon={<FileText size={18} />} color="emerald" />
      </div>

      {/* BAGIAN 2: FILTER & SEARCH BAR */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex flex-col md:flex-row gap-4 justify-between items-center shadow-lg">
        
        {/* Input Pencarian */}
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
          <input 
            type="text" 
            placeholder="Cari kecamatan..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-blue-950/50 border border-blue-500/30 text-white pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-blue-300/50 text-sm"
          />
        </div>

        {/* Dropdown & Tombol */}
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" size={16} />
            <select 
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="bg-blue-950/50 border border-blue-500/30 text-white pl-9 pr-8 py-2.5 rounded-xl text-sm appearance-none focus:outline-none cursor-pointer hover:bg-blue-900/50 transition"
            >
              <option value="Semua">Semua Risiko</option>
              <option value="Aman">🟢 Aman</option>
              <option value="Waspada">🟠 Waspada</option>
              <option value="Bahaya">🔴 Bahaya</option>
            </select>
          </div>

          <button 
            onClick={() => { setSearchTerm(''); setFilterRisk('Semua'); }}
            className="flex items-center gap-2 bg-red-500/20 text-red-300 hover:bg-red-500 hover:text-white border border-red-500/30 px-4 py-2.5 rounded-xl text-sm font-medium transition"
          >
            <X size={16} /> Clear
          </button>
        </div>
      </div>

      {/* BAGIAN 3: TABEL DATA */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-900/40 text-blue-200 text-xs uppercase tracking-wider border-b border-white/10">
                <th className="p-4 font-semibold">Kecamatan</th>
                <th className="p-4 font-semibold text-center">Total Kasus</th>
                <th className="p-4 font-semibold text-center">Meninggal</th>
                <th className="p-4 font-semibold text-center">CFR (%)</th>
                <th className="p-4 font-semibold text-center">Status Risiko</th>
                <th className="p-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => {
                  // Hitung CFR per baris
                  const cfr = item.kasus > 0 ? ((item.meninggal / item.kasus) * 100).toFixed(2) : '0.00';
                  
                  return (
                    <tr key={index} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-medium text-white flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-300">
                          <MapPin size={16} />
                        </div>
                        {item.kecamatan}
                      </td>
                      <td className="p-4 text-center font-bold text-white">{item.kasus}</td>
                      <td className="p-4 text-center font-bold text-red-400">{item.meninggal}</td>
                      <td className="p-4 text-center text-blue-200">{cfr}%</td>
                      <td className="p-4 text-center">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg shadow-lg shadow-blue-600/20 transition">
                          Detail
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-blue-300 italic">
                    Data tidak ditemukan untuk filter ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION CONTROLS */}
        <div className="p-4 border-t border-white/10 flex justify-between items-center text-sm text-blue-300">
          <span>
            Menampilkan {Math.min((currentPage - 1) * itemsPerPage + 1, filteredData.length)} - {Math.min(currentPage * itemsPerPage, filteredData.length)} dari {filteredData.length} data
          </span>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

// --- SUB COMPONENTS (Untuk Kerapihan) ---

function MiniStat({ title, value, icon, color }: any) {
  // Mapping warna untuk border/background
  const colorClasses: any = {
    blue: "border-blue-500/30 bg-blue-500/10 text-blue-400",
    red: "border-red-500/30 bg-red-500/10 text-red-400",
    orange: "border-orange-500/30 bg-orange-500/10 text-orange-400",
    emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-lg flex items-center gap-4">
      <div className={`p-3 rounded-xl border ${colorClasses[color]}`}>
        {icon}
      </div>
      <div>
        <div className="text-xs text-blue-300 uppercase font-semibold tracking-wide">{title}</div>
        <div className="text-2xl font-bold text-white mt-0.5">{value}</div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'Bahaya') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> Bahaya
      </span>
    );
  }
  if (status === 'Waspada') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Waspada
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Aman
    </span>
  );
}

export default DataTable;