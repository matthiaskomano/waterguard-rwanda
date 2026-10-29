
import Link from "next/link";
import {
  LayoutDashboard,
  Building2,
  Cpu,
  Activity,
  AlertTriangle,
  Droplet,
  Power,
  Bell,
  Wrench,
  FileBarChart,
  Users,
  Settings,
  Search,
  Menu,
  LogOut,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

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
import { logOut } from "./actions";

// Allow this shared dashboard layout to use request-time data.
export const instant = false;

const sidebarLinks = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Properties", href: "/dashboard/properties", icon: Building2 },
  { name: "Devices", href: "/dashboard/devices", icon: Cpu },
  { name: "Live Monitoring", href: "/dashboard/monitoring", icon: Activity },
  {
    name: "Alerts",
    href: "/dashboard/alerts",
    icon: AlertTriangle,
    badge: "3",
  },
  { name: "Consumption", href: "/dashboard/consumption", icon: Droplet },
  { name: "Automation", href: "/dashboard/automation", icon: Power },
  {
    name: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
    badge: "3",
  },
  { name: "Maintenance", href: "/dashboard/maintenance", icon: Wrench },
  { name: "Reports", href: "/dashboard/reports", icon: FileBarChart },
  { name: "Team", href: "/dashboard/team", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch the authenticated user using the server-side Supabase client.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let displayName = "Matthias Komano";
  let displayEmail = "";
  let initials = "MK";

  if (user) {
    displayEmail = user.email || "";

    const metaName =
      user.user_metadata?.full_name || user.user_metadata?.name;

    if (metaName) {
      displayName = metaName;
    } else if (displayEmail) {
      const prefix = displayEmail.split("@")[0];

      displayName = prefix
        .split(".")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
    }

    const parts = displayName.split(" ").filter(Boolean);

    if (parts.length >= 2) {
      initials = `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    } else if (parts.length === 1) {
      initials = parts[0].substring(0, 2).toUpperCase();
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-800 bg-[#0a192f] text-slate-300 md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-slate-800 px-6">
          <Droplet className="h-6 w-6 text-cyan-400" />

          <span className="text-lg font-bold tracking-tight text-white">
            WaterGuard{" "}
            <span className="font-light text-slate-400">Rwanda</span>
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="grid gap-1 px-3">
            {sidebarLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-all hover:bg-slate-800 hover:text-white"
                >
                  <div className="flex items-center gap-3">
                    <link.icon className="h-4 w-4 text-slate-400 transition-colors group-hover:text-cyan-400" />
                    <span>{link.name}</span>
                  </div>

                  {link.badge && (
                    <span className="rounded-full bg-destructive px-1.5 py-0.5 text-[10px] font-bold text-destructive-foreground">
                      {link.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-slate-800 p-4">
          <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/80 p-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
              <Droplet className="h-4 w-4" />
            </div>

            <div className="overflow-hidden">
              <div className="truncate text-xs font-semibold text-white">
                WaterGuard Rwanda
              </div>
              <div className="truncate text-[10px] text-slate-400">
                Detect. Protect. Preserve.
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 shadow-xs dark:bg-slate-900 md:px-6">
          <div className="flex items-center gap-4 md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>

            <Droplet className="h-6 w-6 text-cyan-500" />
          </div>

          <div className="hidden flex-1 items-center gap-2 md:flex">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

              <Input
                type="search"
                placeholder="Search properties, devices, alerts..."
                className="w-full rounded-full border-none bg-slate-100 pl-9 dark:bg-slate-800 md:w-[350px]"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* System Status */}
            <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-400 sm:flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              System Online
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
            </Button>

            {/* User Profile Dropdown */}
            <div className="flex items-center gap-2 border-l pl-2">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-80 focus:outline-none">
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage src="/avatars/01.png" alt="User" />
                    <AvatarFallback className="bg-primary text-xs font-bold text-primary-foreground">
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="hidden text-left lg:block">
                    <div className="text-xs font-semibold text-primary">
                      {displayName}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      Organization Admin
                    </div>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="cursor-pointer p-0">
                      <Link
                        href="/dashboard/settings"
                        className="flex w-full items-center px-2 py-1.5"
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile Settings</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem className="cursor-pointer p-0 text-destructive focus:bg-destructive/10 focus:text-destructive">
                    <form action={logOut} className="w-full">
                      <button
                        type="submit"
                        className="flex w-full cursor-pointer items-center px-2 py-1.5 text-left"
                      >
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
        <main className="mx-auto w-full max-w-[1600px] flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
