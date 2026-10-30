"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamically import react-leaflet components to disable SSR
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

export default function ClientMap({ properties }: { properties: any[] }) {
  useEffect(() => {
    // Fix default marker icon issues in Next.js
    import("leaflet").then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      });
    });
  }, []);

  if (typeof window === "undefined") return <div className="h-96 w-full bg-slate-100 rounded-xl animate-pulse" />;

  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden border border-slate-200 relative z-0">
      <MapContainer center={[-1.9441, 30.0619]} zoom={12} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />
        {properties.map((prop) => {
          if (!prop.lat || !prop.lng) return null;
          return (
            <Marker key={prop.id} position={[prop.lat, prop.lng]}>
              <Popup>
                <div className="font-sans">
                  <h3 className="font-bold text-slate-900">{prop.name}</h3>
                  <p className="text-xs text-slate-500 mb-1">{prop.status}</p>
                  <p className="text-sm font-medium">Flow: {prop.flow_rate || "0"} L/min</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}