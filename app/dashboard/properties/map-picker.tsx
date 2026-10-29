"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap, LayersControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Search, MapPin, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Fix for default Leaflet icons in Next.js
const customIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Default center: Kigali, Rwanda
const DEFAULT_CENTER: [number, number] = [-1.9441, 30.0619];

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    // Increased default zoom to 16 so buildings are more visible immediately after search
    map.flyTo(center, 16);
  }, [center, map]);
  return null;
}

function MapClickHandler({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

interface MapPickerProps {
  onLocationUpdate: (lat: number, lng: number, address: string) => void;
}

export default function MapPicker({ onLocationUpdate }: MapPickerProps) {
  const [position, setPosition] = useState<[number, number]>(DEFAULT_CENTER);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("");

  const handleMapClick = async (lat: number, lng: number) => {
    setPosition([lat, lng]);
    await fetchAddress(lat, lng);
  };

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await res.json();
      const address = data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      setCurrentAddress(address);
      onLocationUpdate(lat, lng, address);
    } catch (error) {
      console.error("Reverse geocoding failed", error);
    }
  };

  const executeSearch = async () => {
    if (!searchQuery) return;
    setIsSearching(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}, Kigali&limit=1`);
      const data = await res.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        setPosition([lat, lng]);
        setCurrentAddress(data[0].display_name);
        onLocationUpdate(lat, lng, data[0].display_name);
      }
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          type="text"
          placeholder="Search Kigali area, street, or landmark..."
          className="pl-9 pr-20"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              executeSearch();
            }
          }}
        />
        <Button 
          type="button"
          size="sm" 
          variant="ghost" 
          className="absolute right-1 top-1 h-7"
          disabled={isSearching}
          onClick={(e) => {
            e.preventDefault();
            executeSearch();
          }}
        >
          {isSearching ? "..." : "Search"}
        </Button>
      </div>

      <div className="relative h-[300px] w-full rounded-md border overflow-hidden">
        <MapContainer center={position} zoom={15} style={{ height: "100%", width: "100%" }} zoomControl={true}>
          
          {/* Map Layer Toggle Control */}
          <LayersControl position="topright">
            
            {/* Standard Street Map */}
            <LayersControl.BaseLayer checked name="Street Map">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxZoom={19}
              />
            </LayersControl.BaseLayer>

            {/* Photographic Satellite Map */}
            <LayersControl.BaseLayer name="Satellite View">
              <TileLayer
                attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                maxZoom={19}
              />
            </LayersControl.BaseLayer>

          </LayersControl>

          <MapController center={position} />
          <MapClickHandler onLocationSelect={handleMapClick} />
          <Marker position={position} icon={customIcon} />
        </MapContainer>
      </div>

      {currentAddress && (
        <div className="rounded-lg border bg-slate-50 p-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-4 w-4 text-primary" />
            <h4 className="font-semibold text-sm">Selected Location</h4>
          </div>
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{currentAddress}</p>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <span className="text-[10px] text-muted-foreground uppercase">Latitude</span>
              <p className="text-xs font-medium">{position[0].toFixed(5)}</p>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground uppercase">Longitude</span>
              <p className="text-xs font-medium">{position[1].toFixed(5)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-2 py-1.5 rounded text-xs font-medium border border-emerald-100">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Location selected
          </div>
        </div>
      )}
    </div>
  );
}