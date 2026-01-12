'use client';

import React from 'react';
import {
  PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, ResponsiveContainer
} from 'recharts';

interface DetailedChartsProps {
  locations: any[];
  monthlyTrend: any[];
}

const DetailedCharts: React.FC<DetailedChartsProps> = ({ locations, monthlyTrend }) => {

  // 1. DATA DONUT (Proporsi Zona)
  const zoneCounts = [0, 0, 0]; 
  locations.forEach(loc => {
    let idx = 0;
    if (loc.status === 'Waspada') idx = 1;
    if (loc.status === 'Bahaya') idx = 2;
    zoneCounts[idx]++;
  });

  const pieData = [
    { name: 'Aman', value: zoneCounts[0], color: '#10b981' },   
    { name: 'Waspada', value: zoneCounts[1], color: '#f59e0b' }, 
    { name: 'Bahaya', value: zoneCounts[2], color: '#ef4444' },  
  ].filter(d => d.value > 0);

  // 2. DATA LINE (Tren Bulanan Simulasi)
  const lineData = monthlyTrend.map(d => ({
    name: d.name,
    Kasus: d.kasus,
    Meninggal: Math.ceil(d.kasus * 0.02) 
  }));

  // 3. DATA BAR CHART (TOP 3 TERPISAH)
  const top3Locations = [...locations]
    .sort((a, b) => b.kasus - a.kasus)
    .slice(0, 3)
    .map(loc => ({
      kecamatan: loc.kecamatan,
      kasus: loc.kasus,       // Batang 1: Total Kasus
      meninggal: loc.meninggal // Batang 2: Total Meninggal
    }));

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-blue-950/95 border border-blue-500/30 p-3 rounded-xl shadow-2xl text-white backdrop-blur-md min-w-[150px]">
          <p className="font-bold mb-2 text-sm border-b border-white/10 pb-1">{label}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex justify-between items-center text-xs">
                <span style={{ color: entry.color }}>{entry.name}:</span>
                <span className="font-bold text-white">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 mb-10">
      
      {/* Grid Atas: Pie & Line */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* PIE CHART */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-lg">
            <span className="text-emerald-400">📊</span> Proporsi Zona
          </h3>
          <div className="h-[250px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ color: '#bfdbfe', fontSize: '12px' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* LINE CHART */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-lg">
            <span className="text-blue-400">📈</span> Tren Kematian vs Kasus
          </h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dy={10}/>
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px', color: '#bfdbfe' }}/>
                <Line type="monotone" dataKey="Kasus" stroke="#60a5fa" strokeWidth={3} dot={false} name="Kasus"/>
                <Line type="monotone" dataKey="Meninggal" stroke="#ef4444" strokeWidth={3} dot={false} name="Meninggal"/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Grid Bawah: BAR CHART TERPISAH (SIDE-BY-SIDE) */}
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-lg">
          <span className="text-yellow-400">🏆</span> Top 3 Wilayah: Perbandingan Kasus & Kematian
        </h3>
        {/* Tinggi disesuaikan (250px) agar batang side-by-side muat nyaman */}
        <div className="h-[250px] w-full"> 
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={top3Locations}
              margin={{ top: 0, right: 30, left: 20, bottom: 0 }}
              // gap antar kategori diperbesar agar kelompok kecamatan terlihat jelas
              barCategoryGap="20%" 
              barGap={4} // Jarak antar batang kuning dan merah
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#ffffff10"/>
              <XAxis type="number" hide />
              <YAxis 
                dataKey="kecamatan" 
                type="category" 
                width={150} 
                tick={{fill: '#bfdbfe', fontSize: 13, fontWeight: 600}}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{fill: '#ffffff10'}}/>
              <Legend verticalAlign="top" height={30} wrapperStyle={{ fontSize: '12px', color: '#bfdbfe' }}/>
              
              {/* Batang 1: Total Kasus (Kuning) - stackId DIHAPUS agar bersebelahan */}
              <Bar 
                dataKey="kasus" 
                fill="#ffd861" 
                radius={[0, 4, 4, 0]} 
                barSize={20}
                name="Total Kasus"
              />
              
              {/* Batang 2: Meninggal (Merah) - stackId DIHAPUS agar bersebelahan */}
              <Bar 
                dataKey="meninggal" 
                fill="#fd7d7d" 
                radius={[0, 4, 4, 0]} 
                barSize={20}
                name="Meninggal"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default DetailedCharts;