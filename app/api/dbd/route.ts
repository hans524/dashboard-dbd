// src/app/api/dbd/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get('year') || '2024';

  // --- DATA DUMMY LENGKAP SEMARANG (16 KECAMATAN) ---
  // Ini simulasi data jika Excel belum siap. 
  // Cluster: 0=Aman(Hijau), 1=Waspada(Oranye), 2=Bahaya(Merah)
  
  const semarangData = [
    { kecamatan: "Semarang Tengah", lat: -6.9814, lng: 110.4173, cluster: 1, kasus: 45, prediksi: 48 },
    { kecamatan: "Semarang Utara", lat: -6.9566, lng: 110.4123, cluster: 2, kasus: 89, prediksi: 95 },
    { kecamatan: "Semarang Selatan", lat: -6.9961, lng: 110.4143, cluster: 1, kasus: 50, prediksi: 42 },
    { kecamatan: "Semarang Barat", lat: -6.9868, lng: 110.3879, cluster: 2, kasus: 76, prediksi: 80 },
    { kecamatan: "Semarang Timur", lat: -6.9742, lng: 110.4357, cluster: 1, kasus: 40, prediksi: 45 },
    { kecamatan: "Gayamsari", lat: -6.9840, lng: 110.4502, cluster: 1, kasus: 35, prediksi: 30 },
    { kecamatan: "Genuk", lat: -6.9634, lng: 110.4704, cluster: 2, kasus: 92, prediksi: 100 },
    { kecamatan: "Pedurungan", lat: -7.0051, lng: 110.4746, cluster: 2, kasus: 110, prediksi: 115 },
    { kecamatan: "Tembalang", lat: -7.0601, lng: 110.4678, cluster: 2, kasus: 120, prediksi: 105 },
    { kecamatan: "Banyumanik", lat: -7.0722, lng: 110.4140, cluster: 1, kasus: 65, prediksi: 60 },
    { kecamatan: "Gajahmungkur", lat: -7.0205, lng: 110.4116, cluster: 0, kasus: 20, prediksi: 18 },
    { kecamatan: "Candisari", lat: -7.0125, lng: 110.4294, cluster: 1, kasus: 42, prediksi: 44 },
    { kecamatan: "Gunungpati", lat: -7.0744, lng: 110.3644, cluster: 0, kasus: 25, prediksi: 28 },
    { kecamatan: "Mijen", lat: -7.0636, lng: 110.3236, cluster: 0, kasus: 15, prediksi: 12 },
    { kecamatan: "Ngaliyan", lat: -7.0175, lng: 110.3396, cluster: 1, kasus: 55, prediksi: 58 },
    { kecamatan: "Tugu", lat: -6.9749, lng: 110.3175, cluster: 0, kasus: 10, prediksi: 8 },
  ];

  // Hitung total real-time
  const totalKasus = semarangData.reduce((acc, curr) => acc + curr.kasus, 0);
  const totalPrediksi = semarangData.reduce((acc, curr) => acc + curr.prediksi, 0);
  const selisihPrediksi = totalPrediksi - totalKasus;

  return NextResponse.json({
    year,
    summary: { 
        total: totalKasus, 
        active: Math.floor(totalKasus * 0.1), // Asumsi 10% aktif
        prediksiTotal: totalPrediksi, // <--- Data Baru
        trendPrediksi: selisihPrediksi > 0 ? `+${selisihPrediksi}` : `${selisihPrediksi}`,
        affected: 16 
    },
    monthlyTrend: [
       { name: 'Jan', kasus: 40 }, { name: 'Feb', kasus: 65 }, 
       { name: 'Mar', kasus: 90 }, { name: 'Apr', kasus: 120 }, // Puncak musim hujan
       { name: 'Mei', kasus: 80 }, { name: 'Jun', kasus: 60 },
       { name: 'Jul', kasus: 40 }, { name: 'Agu', kasus: 20 },
       { name: 'Sep', kasus: 25 }, { name: 'Okt', kasus: 35 },
       { name: 'Nov', kasus: 55 }, { name: 'Des', kasus: 70 }
    ],
    locations: semarangData
  });
}