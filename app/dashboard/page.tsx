"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { 
  Building2, Cpu, AlertTriangle, Droplets, TrendingUp, ShieldCheck, 
  ArrowUpRight, CheckCircle2, AlertCircle, Clock, Activity 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";

// Helper function to format timestamps dynamically
function timeAgo(dateString: string | null) {
  if (!dateString) return "—";
  const seconds = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " mins ago";
  return "Just now";
}

export default function DashboardOverview() {
  const [userName, setUserName] = useState("Admin");
  
  // Real Data States
  const [properties, setProperties] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalDevices: 0,
    onlineDevices: 0,
    activeAlerts: 0,
    todayConsumption: 0,
  });

  // Chart states (Using fallback data until you connect your specific sensor readings table)
  const [hourlyData, setHourlyData] = useState([
    { time: "12 AM", liters: 40 }, { time: "3 AM", liters: 20 }, { time: "6 AM", liters: 75 },
    { time: "9 AM", liters: 132 }, { time: "12 PM", liters: 95 }, { time: "3 PM", liters: 80 },
    { time: "6 PM", liters: 110 }, { time: "9 PM", liters: 60 }
  ]);
  const [dailyData, setDailyData] = useState([
    { date: "Oct 22", liters: 1200 }, { date: "Oct 23", liters: 1350 }, { date: "Oct 24", liters: 1500 },
    { date: "Oct 25", liters: 1250 }, { date: "Oct 26", liters: 1180 }, { date: "Oct 27", liters: 1420 },
    { date: "Oct 28", liters: 1210 }
  ]);
  const [monthlyData, setMonthlyData] = useState([
    { date: "Sep 29", liters: 8.5 }, { date: "Oct 2", liters: 9.2 }, { date: "Oct 6", liters: 7.8 },
    { date: "Oct 10", liters: 11.4 }, { date: "Oct 13", liters: 8.9 }, { date: "Oct 17", liters: 10.2 },
    { date: "Oct 20", liters: 9.5 }, { date: "Oct 24", liters: 12.1 }, { date: "Oct 27", liters: 10.8 }
  ]);

  useEffect(() => {
    async function fetchDashboardData() {
      const supabase = createClient();
      
      // 1. Fetch User Data
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const fullName = user.user_metadata?.full_name || user.user_metadata?.name;
        if (fullName) {
          setUserName(fullName.split(' ')[0]);
        } else if (user.email) {
          const emailPrefix = user.email.split('@')[0];
          setUserName(emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1));
        }
      }

      // 2. Fetch Properties
      const { data: propsData } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });
      
      const fetchedProperties = propsData || [];
      setProperties(fetchedProperties);

      // 3. Fetch Alerts
      const { data: alertsData } = await supabase
        .from('alerts')
        .select('*, properties(name)')
        .order('created_at', { ascending: false })
        .limit(5);
      
      const fetchedAlerts = alertsData || [];
      setAlerts(fetchedAlerts);

      // 4. Fetch Activity Logs
      const { data: activityData } = await supabase
        .from('activity_logs')
        .select('*, properties(name)')
        .order('created_at', { ascending: false })
        .limit(6);
      
      setActivities(activityData || []);

      // 5. Calculate System Stats dynamically
      // Assumes devices are mapped 1:1 with properties for now, or fetches from a devices table if it exists
      const onlineCount = fetchedProperties.filter(p => p.status === 'Online').length;
      const activeAlertsCount = fetchedAlerts.filter(a => a.status === 'Active').length || fetchedAlerts.length;
      const totalFlow = fetchedProperties.reduce((sum, prop) => sum + (prop.flow_rate || 0), 0);

      setStats({
        totalProperties: fetchedProperties.length,
        totalDevices: fetchedProperties.length, // Update this to fetch from a 'devices' table if separated
        onlineDevices: onlineCount,
        activeAlerts: activeAlertsCount,
        todayConsumption: totalFlow
      });

      // 6. [TODO] Fetch Sensor Readings for Charts here
      // const { data: chartData } = await supabase.from('sensor_readings').select('*');
      // setHourlyData(formatHourly(chartData));
    }
    
    fetchDashboardData();
  }, []);

  const onlinePercentage = stats.totalDevices > 0 ? Math.round((stats.onlineDevices / stats.totalDevices) * 100) : 0;

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
            <div className="text-2xl font-bold">{stats.totalProperties}</div>
            <p className="text-[11px] text-emerald-600 font-medium flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> System total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Registered Devices</CardTitle>
            <Cpu className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDevices}</div>
            <p className="text-[11px] text-emerald-600 font-medium flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> Deployed units
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Devices Online</CardTitle>
            <Activity className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.onlineDevices}</div>
            <p className="text-[11px] text-muted-foreground mt-1">{onlinePercentage}% online</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.activeAlerts}</div>
            <p className="text-[11px] text-destructive font-medium flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> Requires attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Current Flow Rate</CardTitle>
            <Droplets className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayConsumption.toFixed(1)} L/min</div>
            <p className="text-[11px] text-emerald-600 font-medium flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> Live total
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
            <p className="text-[10px] text-muted-foreground mt-1">Requires 30d baseline</p>
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
                <div className="text-3xl font-bold">{stats.totalDevices}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Total Devices</div>
              </div>
            </div>
            <div className="w-full space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>Online</span>
                <span className="font-semibold">{stats.onlineDevices} ({onlinePercentage}%)</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-destructive"></span>Offline</span>
                <span className="font-semibold">{stats.totalDevices - stats.onlineDevices} ({100 - onlinePercentage}%)</span>
              </div>
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
            {alerts.length === 0 ? (
              <p className="text-sm text-slate-500">No recent alerts.</p>
            ) : alerts.map((alert) => (
              <div key={alert.id} className="flex items-start justify-between border-b pb-2.5 last:border-0 border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'} className="text-[10px] px-1.5 py-0 capitalize">
                      {alert.severity || "info"}
                    </Badge>
                    <span className="text-xs font-semibold">{alert.message || alert.type}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{alert.properties?.name || "Unknown Property"}</p>
                </div>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">{timeAgo(alert.created_at)}</span>
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
                  <TableHead className="text-xs">Property</TableHead>
                  <TableHead className="text-xs">Event</TableHead>
                  <TableHead className="text-xs">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.length === 0 ? (
                  <TableRow><TableCell colSpan={3} className="text-center text-xs text-slate-500 py-4">No recent activity.</TableCell></TableRow>
                ) : activities.map((act) => (
                  <TableRow key={act.id}>
                    <TableCell className="text-xs font-medium">{act.properties?.name || "System"}</TableCell>
                    <TableCell className="text-xs text-muted-foreground truncate max-w-[120px]">{act.description}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{timeAgo(act.created_at)}</TableCell>
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
          <CardContent className="pt-1 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Property</TableHead>
                  <TableHead className="text-xs">Type</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Flow Rate</TableHead>
                  <TableHead className="text-xs">Health</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {properties.length === 0 ? (
                   <TableRow><TableCell colSpan={5} className="text-center text-xs text-slate-500 py-6">No properties registered yet.</TableCell></TableRow>
                ) : properties.map((prop) => {
                  const healthScore = prop.health || 100;
                  return (
                    <TableRow key={prop.id}>
                      <TableCell className="text-xs font-medium">{prop.name}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{prop.type || 'Standard'}</TableCell>
                      <TableCell className="text-xs">
                        <Badge variant="outline" className={`text-[10px] ${
                          prop.status === 'Online' ? 'border-emerald-500 text-emerald-600' : 'border-destructive text-destructive'
                        }`}>
                          {prop.status || "Unknown"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{prop.flow_rate || "0"} L/min</TableCell>
                      <TableCell className="text-xs w-28">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-medium">{healthScore}%</span>
                          <div className="w-full bg-secondary/20 h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${healthScore === 100 ? 'bg-emerald-500' : healthScore >= 70 ? 'bg-amber-500' : 'bg-destructive'}`} 
                              style={{ width: `${healthScore}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
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