"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "../actions";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fcfbf9] dark:bg-slate-950 p-4 md:p-8">
      {/* Main Split Container */}
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-slate-100 dark:border-slate-800">
        
        {/* Left Side: Form Section */}
        <div className="w-full md:w-[50%] p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-12 w-max">
            <Droplet className="h-6 w-6 text-secondary" />
            <span className="text-xl font-bold tracking-tight text-primary">
              WaterGuard <span className="font-light">Rwanda</span>
            </span>
          </Link>

          <h1 className="text-3xl font-extrabold text-primary mb-2">Welcome Back!</h1>
          <p className="text-muted-foreground mb-8 text-sm">Please Log in to your account.</p>

          <form action={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 text-sm font-medium text-destructive bg-destructive/10 rounded-md border border-destructive/20">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs text-muted-foreground font-semibold">Email Address</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="m.komano@example.com" 
                className="h-12 rounded-xl border-slate-200 focus-visible:ring-secondary" 
                required 
                disabled={isPending} 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs text-muted-foreground font-semibold">Password</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                placeholder="••••••••" 
                className="h-12 rounded-xl border-slate-200 focus-visible:ring-secondary tracking-widest" 
                required 
                disabled={isPending} 
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="rounded border-slate-300 text-secondary focus:ring-secondary h-4 w-4" 
                />
                <label htmlFor="remember" className="text-xs text-muted-foreground cursor-pointer">Remember me</label>
              </div>
              <Link href="/forgot-password" className="text-xs text-destructive hover:underline font-medium">
                Forgot password?
              </Link>
            </div>

            <div className="pt-4 flex items-center gap-4">
              {/* Primary Login Button styled to match the reference */}
              <Button 
                type="submit" 
                className="h-12 px-10 rounded-xl bg-[#148374] hover:bg-[#106b5f] text-white shadow-md font-semibold text-sm w-full sm:w-auto transition-colors" 
                disabled={isPending}
              >
                {isPending ? "Logging in..." : "Login"}
              </Button>
            </div>

            <p className="text-[10px] text-muted-foreground mt-8 leading-relaxed max-w-xs">
              By logging in you agree to our terms and that you have read our data policy.
            </p>
          </form>
        </div>

        {/* Right Side: Image Section */}
        <div className="hidden md:block w-full md:w-[50%] relative bg-slate-100">
          <Image 
            src="/rwanda-landscape.jpg" 
            alt="Rwanda Landscape Background" 
            fill 
            className="object-cover"
            priority
          />
          {/* Subtle gradient overlay to make it look premium */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparentmix-blend-overlay"></div>
        </div>

      </div>
    </div>
  );
}