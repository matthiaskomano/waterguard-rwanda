"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, X, Droplet, LayoutDashboard, Building2, Cpu, Activity, 
  AlertTriangle, Power, Bell, Wrench, FileBarChart, Users, Settings 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Properties", href: "/dashboard/properties", icon: Building2 },
  { name: "Devices", href: "/dashboard/devices", icon: Cpu },
  { name: "Live Monitoring", href: "/dashboard/monitoring", icon: Activity },
  { name: "Alerts", href: "/dashboard/alerts", icon: AlertTriangle, badge: "3" },
  { name: "Consumption", href: "/dashboard/consumption", icon: Droplet },
  { name: "Automation", href: "/dashboard/automation", icon: Power },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell, badge: "3" },
  { name: "Maintenance", href: "/dashboard/maintenance", icon: Wrench },
  { name: "Reports", href: "/dashboard/reports", icon: FileBarChart },
  { name: "Team", href: "/dashboard/team", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="flex items-center gap-4 md:hidden">
        <Button 
          variant="ghost" 
          size="icon" 
          aria-label="Open menu"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Droplet className="h-6 w-6 text-cyan-500" />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Sidebar Panel */}
          <aside className="relative flex w-64 flex-col bg-[#0a192f] text-slate-300 shadow-xl transition-transform duration-300 ease-in-out">
            <div className="flex h-16 items-center justify-between border-b border-slate-800 px-6">
              <div className="flex items-center gap-2">
                <Droplet className="h-6 w-6 text-cyan-400" />
                <span className="text-lg font-bold tracking-tight text-white">
                  WaterGuard <span className="font-light text-slate-400">Rwanda</span>
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-slate-400 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
              <ul className="grid gap-1 px-3">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                          isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <link.icon className={`h-4 w-4 transition-colors ${isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-cyan-400"}`} />
                          <span>{link.name}</span>
                        </div>
                        {link.badge && (
                          <span className="rounded-full bg-destructive px-1.5 py-0.5 text-[10px] font-bold text-destructive-foreground">
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}