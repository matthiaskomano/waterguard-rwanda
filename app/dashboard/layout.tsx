import Link from "next/link";
import { 
  LayoutDashboard, Building2, Cpu, Activity, AlertTriangle, 
  Droplet, Power, Bell, Wrench, FileBarChart, Users, Settings, 
  Search, Menu, LogOut, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/server";

// Import the logout server action
import { logOut } from "./actions";

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

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Fetch real user session server-side
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let displayName = "Matthias Komano";
  let displayEmail = "";
  let initials = "MK";

  if (user) {
    displayEmail = user.email || "";
    const metaName = user.user_metadata?.full_name || user.user_metadata?.name;
    
    if (metaName) {
      displayName = metaName;
    } else if (displayEmail) {
      const prefix = displayEmail.split('@')[0];
      displayName = prefix.split('.').map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' ');
    }

    const parts = displayName.split(' ').filter(Boolean);
    if (parts.length >= 2) {
      initials = `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    } else if (parts.length === 1) {
      initials = parts[0].substring(0, 2).toUpperCase();
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar - Desktop (Dark Navy Blue) */}
      <aside className="hidden w-64 flex-col bg-[#0a192f] text-slate-300 md:flex border-r border-slate-800 shrink-0">
        <div className="flex h-16 items-center border-b border-slate-800 px-6 gap-2">
          <Droplet className="h-6 w-6 text-cyan-400" />
          <span className="text-lg font-bold tracking-tight text-white">
            WaterGuard <span className="font-light text-slate-400">Rwanda</span>
          </span>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="grid gap-1 px-3">
            {sidebarLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <link.icon className="h-4 w-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                    <span>{link.name}</span>
                  </div>
                  {link.badge && (
                    <span className="bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer Brand Callout */}
        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
              <Droplet className="h-4 w-4" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-semibold text-white truncate">WaterGuard Rwanda</div>
              <div className="text-[10px] text-slate-400 truncate">Detect. Protect. Preserve.</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 items-center justify-between border-b bg-white dark:bg-slate-900 px-4 md:px-6 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-4 md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
            <Droplet className="h-6 w-6 text-cyan-500" />
          </div>
          
          <div className="hidden md:flex items-center gap-2 flex-1">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search properties, devices, alerts..." className="w-full bg-slate-100 dark:bg-slate-800 pl-9 rounded-full border-none md:w-[350px]" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* SYSTEM ONLINE BADGE */}
            <div className="hidden sm:flex items-center gap-2 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 text-xs px-3 py-1.5 rounded-full font-medium border border-emerald-200 dark:border-emerald-900">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              System Online
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
            </Button>
            
            {/* User Profile Dropdown */}
            <div className="flex items-center gap-2 pl-2 border-l">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity focus:outline-none">
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage src="/avatars/01.png" alt="User" />
                    <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xs">{initials}</AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:block text-left">
                    <div className="text-xs font-semibold text-primary">{displayName}</div>
                    <div className="text-[10px] text-muted-foreground">Organization Admin</div>
                  </div>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer p-0">
                      <Link href="/dashboard/settings" className="flex items-center w-full px-2 py-1.5">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile Settings</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer p-0">
                    <form action={logOut as any} className="w-full">
                      <button type="submit" className="flex items-center w-full px-2 py-1.5 text-left cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}