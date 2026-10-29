"use client";

import { useState, useTransition } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { inviteTeamMember } from "./actions";

export function InviteMemberDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      // FIX: Explicitly type the result so TypeScript knows 'error' is a valid optional property
      const result = await inviteTeamMember(formData) as { error?: string; success?: boolean };
      
      if (result?.error) {
        setError(result.error);
      } else {
        setOpen(false);
      }
    });
  }

  return (
    <>
      <Button 
        onClick={() => setOpen(true)} 
        className="bg-secondary text-white hover:bg-secondary/90 cursor-pointer gap-2"
      >
        <UserPlus className="h-4 w-4" /> Invite Member
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite New Member</DialogTitle>
            <DialogDescription>Send an email invitation to grant access to this workspace.</DialogDescription>
          </DialogHeader>
          <form action={handleSubmit as any} className="space-y-4">
            {error && (
              <div className="p-3 text-sm font-medium text-destructive bg-destructive/10 rounded-md border border-destructive/20">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="colleague@example.com" required disabled={isPending} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Assign Role</Label>
              <select 
                id="role" 
                name="role" 
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isPending}
              >
                <option value="Viewer">Viewer</option>
                <option value="Technician">Technician</option>
                <option value="Property Manager">Property Manager</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <Button type="submit" className="w-full bg-primary text-white" disabled={isPending}>
              {isPending ? "Sending Invite..." : "Send Invitation"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}