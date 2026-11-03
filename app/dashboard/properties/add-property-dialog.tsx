"use client";

import { useState, useTransition } from "react";
import { Plus, Cpu, AlertCircle, MapPin } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button"; // Imported buttonVariants
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";

// NOTE: Ensure you have a createDevice function in your devices/actions.ts file
// import { createDevice } from "./actions"; 

export function AddDeviceDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    
    startTransition(async () => {
      // Uncomment this when your device action is ready:
      // const result = await createDevice(formData);
      // if (result?.error) {
      //   setError(result.error);
      // } else {
      //   setOpen(false); 
      // }
      
      // Temporary close for UI testing
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* 
        FIX: Removed nested <Button> to prevent hydration errors.
        Used buttonVariants directly on the DialogTrigger.
      */}
      <DialogTrigger 
        className={buttonVariants({ variant: "default", className: "bg-secondary text-white hover:bg-secondary/90 cursor-pointer" })}
      >
        <Plus className="mr-2 h-4 w-4" /> Add Device
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[600px] p-0 bg-slate-50 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-white border-b flex items-start gap-4 shrink-0">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <Cpu className="h-6 w-6" />
          </div>
          <div>
            <DialogTitle className="text-xl font-bold">Register Device</DialogTitle>
            <DialogDescription className="text-sm mt-1">
              Add a new ESP32 or Nano 33 BLE monitoring device to the system.
            </DialogDescription>
          </div>
        </div>

        <form action={handleSubmit} className="flex flex-col overflow-hidden">
          <div className="p-6 space-y-5 overflow-y-auto">
            {error && (
              <div className="p-3 text-sm font-medium text-destructive bg-destructive/10 rounded-md border border-destructive/20">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="device_id" className="text-sm font-semibold">Device ID / Serial Number <span className="text-destructive">*</span></Label>
              <Input id="device_id" name="device_id" placeholder="e.g. WG-ESP-001" required disabled={isPending} className="bg-white" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="model" className="text-sm font-semibold">Hardware Model <span className="text-destructive">*</span></Label>
              <Input id="model" name="model" placeholder="e.g. ESP32, Arduino Nano 33 BLE" required disabled={isPending} className="bg-white" />
            </div>

            <div className="space-y-2 pt-2 border-t">
              <Label htmlFor="property_id" className="text-sm font-semibold text-slate-700">Assign to Property (Optional)</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="property_id" 
                  name="property_id" 
                  placeholder="Enter Property ID to link this device..." 
                  disabled={isPending} 
                  className="pl-9 bg-slate-50 border-slate-200" 
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">
                Link this hardware to an existing property so its Edge Impulse alerts route to the correct dashboard.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-white border-t space-y-4 shrink-0">
            <div className="flex items-center gap-2 bg-slate-100 text-slate-600 p-3 rounded-md text-xs">
              <AlertCircle className="h-4 w-4 shrink-0 text-slate-400" />
              Ensure the device is powered on and connected to Wi-Fi before registering.
            </div>
            
            <DialogFooter className="flex items-center justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-white hover:bg-primary/90 min-w-[120px]" disabled={isPending}>
                {isPending ? "Saving..." : "Save Device"}
              </Button>
            </DialogFooter>
          </div>
        </form>

      </DialogContent>
    </Dialog>
  );
}