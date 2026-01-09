// src/components/Footer.tsx
'use client';

import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Twitter, 
  Github, 
  Activity, 
  Network, 
  Code2, 
  HeartPulse 
} from 'lucide-react';

export default function Footer() {
  return (
    // Menggunakan warna background sangat gelap (#020617) agar kontras dan elegan
    <footer className="bg-[#020617] text-slate-400 py-12 border-t border-slate-800 font-sans text-sm">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* KOLOM 1: IDENTITAS & DESKRIPSI */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Activity size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight leading-none">SMART-VEC</h3>
              <p className="text-[10px] text-blue-400 font-medium">Dengue Monitoring Information System</p>
            </div>
          </div>
          
          <p className="mb-4 leading-relaxed text-slate-400">
            Sistem monitoring, klasterisasi dan prediksi persebaran Demam Berdarah Dengue (DBD) berbasis Machine Learning untuk Kota Semarang.
          </p>

          <div className="mb-4">
            <h4 className="text-slate-500 text-xs uppercase font-bold mb-1">Dikembangkan oleh:</h4>
            <p className="text-white font-medium">Yohanes Adi</p>
            <p className="text-white font-medium">Hizkia Ariel</p>
            <p className="text-white font-medium">Beatrice Rahmawati</p>
            <p className="text-white font-medium">Ilfa Neilna</p>
          </div>

          <div className="mb-6">
            <h4 className="text-slate-500 text-xs uppercase font-bold mb-1">Sumber Data:</h4>
            <p className="text-white font-medium">Tunggal Dara</p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3">
            {[Facebook, Instagram, Twitter, Github].map((Icon, i) => (
              <a key={i} href="#" className="bg-slate-800 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-all">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* KOLOM 2: KONTAK & ALAMAT */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6">Kontak & Alamat</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="text-blue-500 mt-1 shrink-0" size={18} />
              <span>
                <strong className="text-white block">Universitas Dian Nuswantoro (UDINUS)</strong>
                Jl. Nakula I No. 5-11, Semarang<br/>Jawa Tengah, Indonesia
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-blue-500 shrink-0" size={18} />
              <span>(024) 3517261</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-blue-500 shrink-0" size={18} />
              <span>sekretariat@dinus.ac.id</span>
            </li>
          </ul>

          <div className="my-6 border-t border-slate-800"></div>

          {/* HOTLINE KHUSUS (WARNA MERAH) */}
          <div className="flex items-center gap-3 text-red-400">
            <HeartPulse className="shrink-0" size={20} />
            <span className="font-bold text-base">Hotline DBD 24/7: 119</span>
          </div>
        </div>

        {/* KOLOM 3: TAUTAN CEPAT */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6">Tautan Cepat</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                Beranda Utama
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                Dashboard Analisis
              </Link>
            </li>
            <li>
              <Link href="/prediksi" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                Prediksi Kasus DBD
              </Link>
            </li>
          </ul>
        </div>

        {/* KOLOM 4: POWERED BY AI/ML */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6">Teknologi Yang Digunakan</h3>
          
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-green-400 font-medium">
              <Network size={20} />
              <span>Mean Shift Clustering</span>
            </li>
            <li className="flex items-center gap-3 text-purple-400 font-medium">
              <Code2 size={20} />
              <span>Model Time Series</span>
            </li>
          </ul>
        </div>

      </div>

      {/* COPYRIGHT BAWAH */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-600">
        &copy; {new Date().getFullYear()} D-MOSAI Team UDINUS. All rights reserved.
      </div>
    </footer>
  );
}