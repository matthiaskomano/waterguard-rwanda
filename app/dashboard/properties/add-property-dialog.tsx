"use client";

import { useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { Plus, Home, MapPin, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { createProperty } from "./actions";

// Dynamically import the map component with SSR disabled
const MapPicker = dynamic(() => import("./map-picker"), { 
  ssr: false, 
  loading: () => <div className="h-[300px] w-full bg-slate-100 animate-pulse rounded-md flex items-center justify-center text-muted-foreground text-sm">Loading Interactive Map...</div> 
});

export function AddPropertyDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Map state
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  const handleLocationUpdate = (newLat: number, newLng: number, newAddress: string) => {
    setLat(newLat);
    setLng(newLng);
    setAddress(newAddress);
  };

  function handleSubmit(formData: FormData) {
    setError(null);
    
    // Ensure coordinates are appended to the payload
    if (lat) formData.append("latitude", lat.toString());
    if (lng) formData.append("longitude", lng.toString());
    
    startTransition(async () => {
      const result = await createProperty(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        // Reset state and close
        setAddress("");
        setLat(null);
        setLng(null);
        setOpen(false); 
      }
    });
  }

  return (
    <>
      <Button 
        onClick={() => setOpen(true)} 
        className="bg-secondary text-white hover:bg-secondary/90 cursor-pointer"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Property
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        {/* FIX: Added flex column layout and max-h-[90vh] so the modal never exceeds screen height */}
        <DialogContent className="sm:max-w-[900px] p-0 bg-slate-50 flex flex-col max-h-[90vh]">
          
          {/* Header - shrink-0 keeps it from squishing */}
          <div className="p-6 bg-white border-b flex items-start gap-4 shrink-0">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Home className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">Register Property</DialogTitle>
              <DialogDescription className="text-sm mt-1">
                Add a new property to start monitoring water flow and consumption.
              </DialogDescription>
            </div>
          </div>

          <form action={handleSubmit} className="flex flex-col overflow-hidden">
            {/* FIX: Added overflow-y-auto here so only the middle content scrolls if it gets too tall */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 overflow-y-auto">
              
              {/* Left Column: Form Details */}
              <div className="space-y-5">
                {error && (
                  <div className="p-3 text-sm font-medium text-destructive bg-destructive/10 rounded-md border border-destructive/20">
                    {error}
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold">Property Name <span className="text-destructive">*</span></Label>
                  <Input id="name" name="name" placeholder="e.g. Kigali Heights" required disabled={isPending} className="bg-white" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-sm font-semibold">Property Type <span className="text-destructive">*</span></Label>
                  <Input id="type" name="type" placeholder="e.g. Commercial, Residential" required disabled={isPending} className="bg-white" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-semibold">Location / Address <span className="text-destructive">*</span></Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="location" 
                      name="location" 
                      placeholder="Select a location on the map..." 
                      required 
                      disabled={isPending} 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="pl-9 bg-white"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Search for the area, then click on the map to set the exact location of the property.
                  </p>
                </div>

                {/* NEW FIELD: Assign to Owner */}
                <div className="space-y-2 pt-2 border-t">
                  <Label htmlFor="owner_id" className="text-sm font-semibold text-slate-700">Assign to Client (Optional)</Label>
                  <Input 
                    id="owner_id" 
                    name="owner_id" 
                    placeholder="Enter Client's Supabase User ID..." 
                    disabled={isPending} 
                    className="bg-slate-50 border-slate-200" 
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Paste the client's User UID from the Supabase Authentication tab to grant them access to this property on their dashboard.
                  </p>
                </div>
              </div>

              {/* Right Column: Interactive Map */}
              <div className="bg-white p-4 rounded-xl border shadow-sm">
                <MapPicker onLocationUpdate={handleLocationUpdate} />
              </div>

            </div>

            {/* Footer - shrink-0 keeps it permanently pinned to the bottom */}
            <div className="p-4 bg-white border-t space-y-4 shrink-0">
              <div className="flex items-center gap-2 bg-slate-100 text-slate-600 p-3 rounded-md text-xs">
                <AlertCircle className="h-4 w-4 shrink-0 text-slate-400" />
                This location will be used to connect your property with the nearest water monitoring devices and for accurate data collection.
              </div>
              
              <DialogFooter className="flex items-center justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary text-white hover:bg-primary/90 min-w-[120px]" disabled={isPending}>
                  {isPending ? "Saving..." : "Save Property"}
                </Button>
              </DialogFooter>
            </div>
          </form>

        </DialogContent>
      </Dialog>
    </>
  );
}