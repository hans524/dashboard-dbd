'use client';

import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';


// --- BAGIAN INI YANG PENTING AGAR ERROR HILANG ---
interface MapClusterProps {
  data: any[];
}
// -------------------------------------------------

const getClusterColor = (clusterId: number) => {
  switch (clusterId) {
    case 1: return 'red';    
    case 2: return 'orange'; 
    default: return 'green'; 
  }
};

// Tambahkan ': MapClusterProps' di sini
export default function MapCluster({ data }: MapClusterProps) {
  
  // Penjagaan kalau data belum siap
  if (!data) return null;

  return (
    <MapContainer 
      center={[-7.005145, 110.438125]} 
      zoom={12} 
      className="h-full w-full rounded-xl" 
      style={{ minHeight: "300px" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((loc, idx) => (
        <CircleMarker 
          key={idx} 
          center={[loc.lat, loc.lng]}
          pathOptions={{ color: getClusterColor(loc.cluster), fillColor: getClusterColor(loc.cluster), fillOpacity: 0.7 }}
          radius={10}
        >
          <Popup>
            <div className="text-sm font-bold">{loc.kecamatan}</div>
            <div>Kasus: {loc.kasus}</div>
            <div>Prediksi: {loc.prediksi}</div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}