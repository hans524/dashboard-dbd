// src/app/api/dbd/route.ts
import { NextResponse } from 'next/server';
import path from 'path';
import * as XLSX from 'xlsx'; // Pastikan sudah install: npm install xlsx
import fs from 'fs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get('year') || '2024';

  // 1. BACA FILE EXCEL DARI FOLDER PUBLIC/DATA
  // File ini adalah hasil output dari Google Colab Anda
  const filePath = path.join(process.cwd(), 'public', 'data', `dbd_${year}.xlsx`);
  
let locations: any[] = [];
  let summaryStats = {
      total: 0,
      meninggal: 0,
      active: 0,
      cfr: "0%",
      affected: 0,
      // METRIK AI BARU
      avg_rmse: 0,
      avg_mape: 0,
      model_accuracy: 0
  };

  try {
      if (fs.existsSync(filePath)) {
          const workbook = XLSX.readFile(filePath);
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const data: any[] = XLSX.utils.sheet_to_json(sheet);

          let totalRmse = 0;
          let totalMape = 0;
          let count = 0;

          locations = data.map((row: any) => {
              // Akumulasi Metrik Evaluasi
              if (row.RMSE) totalRmse += parseFloat(row.RMSE);
              if (row.MAPE) totalMape += parseFloat(row.MAPE);
              count++;

              return {
                  kecamatan: row.Kecamatan || row.wilayah,
                  lat: row.Latitude || row.Lat,
                  lng: row.Longitude || row.Lng,
                  kasus: row.Jumlah_Kasus || 0,
                  meninggal: row.Meninggal || 0,
                  // Ambil data prediksi & status dari Python
                  prediksi: row.Prediksi_Bulan_Depan || row.Prediksi_SARIMA || 0,
                  cluster: row.Cluster_ID || row.Cluster || 0,
                  status: row['Status Risiko'] || 'Belum Ada Data'
              };
          });

          // HITUNG TOTAL STATISTIK
          const totalKasus = locations.reduce((acc, curr) => acc + curr.kasus, 0);
          const totalMeninggal = locations.reduce((acc, curr) => acc + curr.meninggal, 0);
          
          // Rata-rata Skor AI
          const avgRmse = count > 0 ? (totalRmse / count).toFixed(2) : 0;
          const avgMape = count > 0 ? (totalMape / count).toFixed(2) : 0;
          const accuracy = count > 0 ? (100 - parseFloat(avgMape as string)).toFixed(1) : 0;

          summaryStats = {
              total: totalKasus,
              meninggal: totalMeninggal,
              active: Math.floor(totalKasus * 0.15), // Estimasi aktif
              cfr: totalKasus > 0 ? ((totalMeninggal / totalKasus) * 100).toFixed(2) + '%' : '0%',
              affected: locations.filter(l => l.kasus > 0).length,
              avg_rmse: Number(avgRmse),
              avg_mape: Number(avgMape),
              model_accuracy: Number(accuracy) // Contoh: 90.5% Akurat
          };
      } else {
          console.error("File Excel tidak ditemukan:", filePath);
      }
  } catch (error) {
      console.error("Error reading excel:", error);
  }

  // DATA DUMMY BULANAN (Karena Excel Anda per tahun, kita simulasi grafik bulanan)
  // Di project real, harusnya Excel punya kolom Jan-Des.
  const monthlyPattern = [10, 20, 45, 80, 60, 40, 30, 20, 15, 20, 35, 50]; 
  const monthlyTrend = monthlyPattern.map((p, i) => ({
      name: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'][i],
      kasus: Math.floor((summaryStats.total / 365) * p) // Distribusi kasar
  }));

  return NextResponse.json({
    year,
    summary: summaryStats, // <--- Data RMSE/MAPE dikirim disini
    monthlyTrend: monthlyTrend,
    locations: locations
  });
}