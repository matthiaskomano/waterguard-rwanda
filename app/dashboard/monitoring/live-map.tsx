"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

// Custom HTML Icons for different statuses based on your design
const createStatusIcon = (color: string) => L.divIcon({
  className: "custom-map-marker",
  html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const icons = {
  Online: createStatusIcon("#10b981"),   // Emerald
  "Low Flow": createStatusIcon("#f59e0b"), // Amber
  Offline: createStatusIcon("#ef4444"),  // Red
  Active: createStatusIcon("#3b82f6"),   // Blue
  Default: createStatusIcon("#64748b")   // Slate
};

const DEFAULT_CENTER: [number, number] = [-1.9441, 30.0619];

function MapController({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  return null;
}

export default function LiveMap({ properties, focusedProperty }: { properties: any[], focusedProperty: any | null }) {
  const [center, setCenter] = useState<[number, number]>(DEFAULT_CENTER);
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    if (focusedProperty && focusedProperty.latitude && focusedProperty.longitude) {
      setCenter([focusedProperty.latitude, focusedProperty.longitude]);
      setZoom(17); // Zoom in closer for satellite view
    }
  }, [focusedProperty]);

  const handleLocateMe = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter([position.coords.latitude, position.coords.longitude]);
        setZoom(16);
      });
    }
  };

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden border shadow-sm">
      {/* Moved slightly down (top-16) so it doesn't overlap with the Leaflet Layer Control */}
      <div className="absolute top-16 right-4 z-[400] flex gap-2">
        <Button size="sm" variant="secondary" className="bg-white text-primary shadow-md hover:bg-slate-50" onClick={handleLocateMe}>
          <Navigation className="h-4 w-4 mr-2" />
          My Location
        </Button>
      </div>

      <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%", zIndex: 1 }} zoomControl={true}>
        
        {/* Layer Control for switching between Street and Satellite maps */}
        <LayersControl position="topright">
          
          <LayersControl.BaseLayer checked name="Street Map">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={19}
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Satellite View">
            <TileLayer
              attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              maxZoom={19}
            />
          </LayersControl.BaseLayer>
          
        </LayersControl>

        <MapController center={center} zoom={zoom} />
        
        {properties.map((prop) => {
          if (!prop.latitude || !prop.longitude) return null;
          
          const status = prop.status || "Default";
          const icon = icons[status as keyof typeof icons] || icons.Default;
          
          return (
            <Marker key={prop.id} position={[prop.latitude, prop.longitude]} icon={icon}>
              <Popup className="rounded-lg min-w-[150px]">
                <div className="p-1">
                  <h4 className="font-bold text-slate-800 text-sm">{prop.name}</h4>
                  <div className="flex items-center gap-1.5 mt-1 mb-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: icon.options.html?.toString().match(/background-color:\s*([^;]+)/)?.[1] }}></span>
                    <span className="text-xs font-medium text-slate-600">{prop.status === 'Healthy' ? 'Online' : prop.status}</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-1">Flow: {prop.current_flow || "0.0"} L/min</p>
                  <p className="text-[10px] text-slate-400">Last seen: {new Date(prop.updated_at || prop.created_at).toLocaleTimeString()}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-[400] bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md flex items-center gap-4 text-xs font-medium text-slate-600">
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm border border-white"></span> Online</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm border border-white"></span> Low Flow</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm border border-white"></span> Offline</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm border border-white"></span> Active</div>
      </div>
    </div>
  );
}