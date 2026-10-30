"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Loader2 } from "lucide-react";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSessionReady, setIsSessionReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    
    // 1. Check if the session is already active
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setIsSessionReady(true);
    });

    // 2. Listen for the exact moment Supabase finishes processing the hash token
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) setIsSessionReady(true);
    });
    
    // 3. Failsafe: If session doesn't load after 2.5 seconds, the link is expired
    const timeout = setTimeout(() => {
      setIsSessionReady(true);
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!session) {
          setError("This invitation link has expired or was already used. Please request a new invite.");
        }
      });
    }, 2500);

    return () => {
      authListener.subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      setError(error.message);
      setIsPending(false);
    } else {
      router.push("/dashboard");
    }
  };

  if (!isSessionReady) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm font-medium text-slate-600">Verifying secure invite link...</p>
        </div>
      </div>
    );
  }

  const isExpired = error?.includes("expired");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border p-8">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <Lock className="h-8 w-8" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-slate-900 mb-2">Welcome to WaterGuard!</h1>
        <p className="text-sm text-center text-slate-500 mb-8">
          Please set a secure password to activate your property monitoring dashboard.
        </p>

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          {error && (
            <div className="p-3 text-sm font-medium text-destructive bg-destructive/10 rounded-md border border-destructive/20">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input 
              id="password" 
              type="password" 
              required 
              disabled={isPending || isExpired}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters..."
            />
          </div>
          
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isPending || isExpired}>
            {isPending ? "Saving..." : "Set Password & Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
}