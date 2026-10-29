"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { createProperty } from "./actions";

export function AddPropertyDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // We wrap the server action in a client handler so we can close the dialog on success
  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await createProperty(formData);
      
      if (result?.error) {
        setError(result.error);
      } else {
        setOpen(false); // Close the modal securely on success
      }
    });
  }

  return (
    <>
      {/* Standard button using onClick instead of DialogTrigger */}
      <Button 
        onClick={() => setOpen(true)} 
        className="bg-secondary text-white hover:bg-secondary/90 cursor-pointer"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Property
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Property</DialogTitle>
            <DialogDescription>Register a new location to begin monitoring water flow.</DialogDescription>
          </DialogHeader>
          <form action={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm font-medium text-destructive bg-destructive/10 rounded-md border border-destructive/20">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="name">Property Name</Label>
              <Input id="name" name="name" placeholder="e.g. Kigali Heights" required disabled={isPending} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Property Type</Label>
              <Input id="type" name="type" placeholder="e.g. Commercial, Residential" required disabled={isPending} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location / Address</Label>
              <Input id="location" name="location" placeholder="e.g. Gasabo, Kigali" required disabled={isPending} />
            </div>
            <Button type="submit" className="w-full bg-primary text-white" disabled={isPending}>
              {isPending ? "Saving..." : "Save Property"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}