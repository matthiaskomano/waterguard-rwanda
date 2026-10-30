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
  const supabase = createClient();

  useEffect(() => {
    const setupSession = async () => {
      // 1. Manually extract the security tokens from the URL hash
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");

      if (accessToken && refreshToken) {
        // 2. Force Supabase to establish the session immediately
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (sessionError) {
          setError("This invitation link has expired or is invalid. Please request a new one.");
        }
        
        // Clean up the URL to hide the long tokens from the user
        window.history.replaceState(null, "", "/update-password");
        setIsSessionReady(true);
      } else {
        // 3. Fallback check just in case they are already fully logged in
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setIsSessionReady(true);
        } else {
          setError("This invitation link has expired or was already used. Please request a new invite.");
          setIsSessionReady(true);
        }
      }
    };

    setupSession();
  }, [supabase.auth]);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const { error: updateError } = await supabase.auth.updateUser({
      password: password
    });

    if (updateError) {
      setError(updateError.message);
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

  const isExpired = error !== null;

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