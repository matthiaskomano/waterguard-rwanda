"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { registerDevice } from "./actions";

export function AddDeviceDialog({ properties }: { properties: any[] }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await registerDevice(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setOpen(false);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* @ts-ignore */}
      <DialogTrigger asChild>
        <Button className="bg-secondary text-white hover:bg-secondary/90">
          <Plus className="mr-2 h-4 w-4" /> Register Device
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register IoT Device</DialogTitle>
          <DialogDescription>Add a new ESP32 unit to your monitoring network.</DialogDescription>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-sm font-medium text-destructive bg-destructive/10 rounded-md border border-destructive/20">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="name">Device Name</Label>
            <Input id="name" name="name" placeholder="e.g. Main Inlet Sensor" required disabled={isPending} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="identifier">Hardware MAC / Identifier</Label>
            <Input id="identifier" name="identifier" placeholder="e.g. A1:B2:C3:D4:E5:F6" required disabled={isPending} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="property_id">Assign to Property</Label>
            <Select name="property_id" disabled={isPending}>
              <SelectTrigger>
                <SelectValue placeholder="Select a property (optional)" />
              </SelectTrigger>
              <SelectContent>
                {properties.map((prop) => (
                  <SelectItem key={prop.id} value={prop.id}>{prop.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-primary text-white" disabled={isPending}>
            {isPending ? "Registering..." : "Register Device"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}