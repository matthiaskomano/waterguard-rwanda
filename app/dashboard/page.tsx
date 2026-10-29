"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client"; // Ensure you have this client utility
import { 
  Building2, Cpu, AlertTriangle, Droplets, TrendingUp, ShieldCheck, 
  ArrowUpRight, CheckCircle2, AlertCircle, Clock, Activity 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from "recharts";

const hourlyData = [
  { time: "12 AM", liters: 40 },
  { time: "3 AM", liters: 20 },
  { time: "6 AM", liters: 75 },
  { time: "9 AM", liters: 132 },
  { time: "12 PM", liters: 95 },
  { time: "3 PM", liters: 80 },
  { time: "6 PM", liters: 110 },
  { time: "9 PM", liters: 60 },
];

const dailyData = [
  { date: "Oct 22", liters: 1200 },
  { date: "Oct 23", liters: 1350 },
  { date: "Oct 24", liters: 1500 },
  { date: "Oct 25", liters: 1250 },
  { date: "Oct 26", liters: 1180 },
  { date: "Oct 27", liters: 1420 },
  { date: "Oct 28", liters: 1210 },
];

const monthlyData = [
  { date: "Sep 29", liters: 8.5 },
  { date: "Oct 2", liters: 9.2 },
  { date: "Oct 6", liters: 7.8 },
  { date: "Oct 10", liters: 11.4 },
  { date: "Oct 13", liters: 8.9 },
  { date: "Oct 17", liters: 10.2 },
  { date: "Oct 20", liters: 9.5 },
  { date: "Oct 24", liters: 12.1 },
  { date: "Oct 27", liters: 10.8 },
];

const recentAlerts = [
  { id: 1, type: "Possible leak detected", property: "Main House", device: "Device WG-001", time: "2 hours ago", severity: "Critical" },
  { id: 2, type: "High water flow", property: "Apartment B", device: "Device WG-003", time: "4 hours ago", severity: "High" },
  { id: 3, type: "Abnormal pressure", property: "School", device: "Device WG-005", time: "6 hours ago", severity: "Medium" },
  { id: 4, type: "Device offline", property: "Hotel", device: "Device WG-007", time: "8 hours ago", severity: "Info" },
  { id: 5, type: "Sensor recovered", property: "Office", device: "Device WG-002", time: "10 hours ago", severity: "Low" },
];

const recentActivity = [
  { device: "WG-001", property: "Main House", lastSeen: "2 min ago", status: "Online" },
  { device: "WG-002", property: "Office", lastSeen: "5 min ago", status: "Online" },
  { device: "WG-003", property: "Apartment B", lastSeen: "8 min ago", status: "Online" },
  { device: "WG-004", property: "School", lastSeen: "12 min ago", status: "Online" },
  { device: "WG-005", property: "Hotel", lastSeen: "15 min ago", status: "Online" },
  { device: "WG-007", property: "Commercial", lastSeen: "32 min ago", status: "Offline" },
];

const propertiesHealth = [
  { name: "Main House", type: "House", devices: 2, status: "Healthy", lastAlert: "—", health: 100 },
  { name: "Apartment B", type: "Apartment", devices: 2, status: "Warning", lastAlert: "2 hours ago", health: 75 },
  { name: "School", type: "School", devices: 1, status: "Healthy", lastAlert: "—", health: 100 },
  { name: "Hotel", type: "Hotel", devices: 2, status: "Critical", lastAlert: "4 hours ago", health: 50 },
  { name: "Office", type: "Office", devices: 1, status: "Healthy", lastAlert: "—", health: 100 },
];

export default function DashboardOverview() {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Check for full_name in metadata first
        const fullName = user.user_metadata?.full_name || user.user_metadata?.name;
        if (fullName) {
          // Extract just the first name
          setUserName(fullName.split(' ')[0]);
        } else if (user.email) {
          // Fallback to the first part of the email, capitalized
          const emailPrefix = user.email.split('@')[0];
          setUserName(emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1));
        }
      }
    }
    
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Greeting Banner */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
          Good morning, {userName}
        </h1>
        <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your water monitoring system today.</p>
      </div>

      {/* Top 6 Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Total Properties</CardTitle>
            <Building2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-[11px] text-emerald-600 font-medium flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> 1 new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Registered Devices</CardTitle>
            <Cpu className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-[11px] text-emerald-600 font-medium flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> 1 new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Devices Online</CardTitle>
            <Activity className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-[11px] text-muted-foreground mt-1">87.5% online</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Active Leak Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">2</div>
            <p className="text-[11px] text-destructive font-medium flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> 1 new
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Today&apos;s Consumption</CardTitle>
            <Droplets className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248 L</div>
            <p className="text-[11px] text-emerald-600 font-medium flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> 12% vs. yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Estimated Water Saved</CardTitle>
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Not enough data</div>
            <p className="text-[10px] text-muted-foreground mt-1">Requires baseline</p>
          </CardContent>
        </Card>
      </div>

      {/* 3 Main Analytics Charts */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Chart 1: 24h Hourly */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-semibold">Water Consumption</CardTitle>
              <CardDescription className="text-xs">Last 24 Hours (Litres)</CardDescription>
            </div>
            <Badge variant="outline" className="text-xs font-normal">All Properties</Badge>
          </CardHeader>
          <CardContent className="h-[220px] pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="time" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="liters" stroke="hsl(199 89% 48%)" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Chart 2: 7 Days Daily */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-semibold">Daily Consumption</CardTitle>
              <CardDescription className="text-xs">Last 7 Days (Litres)</CardDescription>
            </div>
            <Badge variant="outline" className="text-xs font-normal">All Properties</Badge>
          </CardHeader>
          <CardContent className="h-[220px] pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="liters" fill="hsl(199 89% 48%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Chart 3: 30 Days Monthly */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-semibold">Monthly Consumption</CardTitle>
              <CardDescription className="text-xs">Last 30 Days (m³)</CardDescription>
            </div>
            <Badge variant="outline" className="text-xs font-normal">All Properties</Badge>
          </CardHeader>
          <CardContent className="h-[220px] pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="liters" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Middle Row: Device Status, Recent Alerts, Recent Activity */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Device Status Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Device Status</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-2">
            <div className="relative flex items-center justify-center h-36 w-36 rounded-full border-8 border-emerald-500 mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold">8</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Total Devices</div>
              </div>
            </div>
            <div className="w-full space-y-2 text-xs">
              <div className="flex justify-between"><span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>Online</span><span className="font-semibold">7 (87.5%)</span></div>
              <div className="flex justify-between"><span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>Warning</span><span className="font-semibold">0 (0%)</span></div>
              <div className="flex justify-between"><span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-destructive"></span>Offline</span><span className="font-semibold">1 (12.5%)</span></div>
              <div className="flex justify-between"><span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-slate-400"></span>Maintenance</span><span className="font-semibold">0 (0%)</span></div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts List */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Recent Alerts</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs text-secondary h-auto p-0">View all</Button>
          </CardHeader>
          <CardContent className="space-y-3 pt-1">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start justify-between border-b pb-2.5 last:border-0">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={alert.severity === 'Critical' ? 'destructive' : alert.severity === 'High' ? 'default' : 'secondary'} className="text-[10px] px-1.5 py-0">
                      {alert.severity}
                    </Badge>
                    <span className="text-xs font-semibold">{alert.type}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{alert.property} — {alert.device}</p>
                </div>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">{alert.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Device Activity */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Recent Device Activity</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs text-secondary h-auto p-0">View all</Button>
          </CardHeader>
          <CardContent className="pt-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Device</TableHead>
                  <TableHead className="text-xs">Property</TableHead>
                  <TableHead className="text-xs">Last Seen</TableHead>
                  <TableHead className="text-xs text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.map((act, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-xs font-medium">{act.device}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{act.property}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{act.lastSeen}</TableCell>
                    <TableCell className="text-xs text-right">
                      <Badge variant="outline" className={`text-[10px] ${act.status === 'Online' ? 'border-emerald-500 text-emerald-600' : 'border-destructive text-destructive'}`}>
                        {act.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section: Property Health Overview & Smart Water Promo */}
      <div className="grid gap-6 md:grid-cols-12">
        {/* Property Health Overview */}
        <Card className="md:col-span-7">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Property Health Overview</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs text-secondary h-auto p-0">View all</Button>
          </CardHeader>
          <CardContent className="pt-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Property</TableHead>
                  <TableHead className="text-xs">Type</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Last Alert</TableHead>
                  <TableHead className="text-xs">Health</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {propertiesHealth.map((prop, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-xs font-medium">{prop.name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{prop.type}</TableCell>
                    <TableCell className="text-xs">
                      <Badge variant="outline" className={`text-[10px] ${
                        prop.status === 'Healthy' ? 'border-emerald-500 text-emerald-600' :
                        prop.status === 'Warning' ? 'border-amber-500 text-amber-600' : 'border-destructive text-destructive'
                      }`}>
                        {prop.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{prop.lastAlert}</TableCell>
                    <TableCell className="text-xs w-28">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium">{prop.health}%</span>
                        <div className="w-full bg-secondary/20 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${prop.health === 100 ? 'bg-emerald-500' : prop.health >= 70 ? 'bg-amber-500' : 'bg-destructive'}`} 
                            style={{ width: `${prop.health}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Promo & Mission Card */}
        <Card className="md:col-span-5 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">Smart Water Monitoring</CardTitle>
            <CardDescription className="text-blue-100 text-xs">
              Real-time data. Faster response. Less water waste.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-blue-50">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Monitor water flow and usage</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Detect leaks early</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Get instant alerts</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Protect your property</div>
          </CardContent>
          <div className="p-6 pt-0">
            <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-medium">
              View Live Monitoring <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}