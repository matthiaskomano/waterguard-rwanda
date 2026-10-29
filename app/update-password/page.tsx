"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    // Supabase knows which user to update because the invite link established a secure session
    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      setError(error.message);
      setIsPending(false);
    } else {
      // Password set successfully, send them straight to their restricted dashboard!
      router.push("/dashboard");
    }
  };

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
              disabled={isPending}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters..."
            />
          </div>
          
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isPending}>
            {isPending ? "Saving..." : "Set Password & Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
}