"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Home, Activity, AlertTriangle, Building, Settings, Bell, Search, Droplet, User } from "lucide-react";

export default function ClientDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const navItems = [
    { name: "Dashboard", href: "/client-dashboard", icon: Home },
    { name: "Live Monitoring", href: "/client-dashboard/monitoring", icon: Activity },
    { name: "Alerts", href: "/client-dashboard/alerts", icon: AlertTriangle, badge: "2" },
    { name: "My Properties", href: "/client-dashboard/properties", icon: Building },
    { name: "Settings", href: "/client-dashboard/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f172a] text-slate-300 flex flex-col">
        <div className="p-6 flex items-center gap-3 text-white font-bold text-xl tracking-tight">
          <Droplet className="h-8 w-8 text-blue-400" />
          <div>
            WaterGuard<br/>
            <span className="text-xs font-normal text-slate-400">Smart Water Monitoring</span>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800"}`}>
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                {item.badge && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{item.badge}</span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 mt-auto border-t border-slate-800">
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-800 rounded-xl cursor-pointer hover:bg-slate-700 transition-colors" onClick={handleSignOut}>
            <div className="bg-blue-500 p-2 rounded-full text-white"><User className="h-4 w-4"/></div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">Client</span>
              <span className="text-xs text-slate-400">Sign Out</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="text" placeholder="Search..." className="w-full bg-slate-100 border-transparent rounded-full pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-slate-400 hover:text-slate-600">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-white text-[8px] font-bold text-white flex items-center justify-center">2</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-slate-200 rounded-full overflow-hidden">
                <User className="h-full w-full p-2 text-slate-500" />
              </div>
              <div className="flex flex-col text-sm">
                <span className="font-bold text-slate-900">WaterGuard Client</span>
                <span className="text-xs text-slate-500">Client</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Scrollable Dashboard Space */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}