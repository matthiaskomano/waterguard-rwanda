"use client";

import { Activity, Droplets, Gauge, RefreshCw, SignalHigh } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Simulated live data feed
const liveFlowData = [
  { time: "10:00 AM", flow: 2.1 },
  { time: "10:05 AM", flow: 2.3 },
  { time: "10:10 AM", flow: 2.0 },
  { time: "10:15 AM", flow: 5.8 }, // Simulated usage spike
  { time: "10:20 AM", flow: 2.2 },
  { time: "10:25 AM", flow: 2.1 },
  { time: "10:30 AM", flow: 2.4 },
  { time: "10:35 AM", flow: 2.2 },
];

const activeSensors = [
  { id: "WG-001", location: "Main House - Supply Line", flowRate: "2.2 L/min", status: "Stable" },
  { id: "WG-002", location: "Office - Restrooms", flowRate: "0.0 L/min", status: "Idle" },
  { id: "WG-003", location: "Apartment B - Kitchen", flowRate: "5.8 L/min", status: "Active" },
];

export default function LiveMonitoringPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
            <Activity className="h-8 w-8 text-secondary" /> Live Monitoring
          </h1>
          <p className="text-muted-foreground">Real-time telemetry and flow rate analysis from active sensors.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" /> Refresh Data
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <SignalHigh className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">Online</div>
            <p className="text-xs text-muted-foreground mt-1">All gateways responding</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Total Flow</CardTitle>
            <Droplets className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.0 L/min</div>
            <p className="text-xs text-muted-foreground mt-1">Across 3 active nodes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Latency</CardTitle>
            <Gauge className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42 ms</div>
            <p className="text-xs text-muted-foreground mt-1">MQTT broker connection</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Real-Time Flow Network (L/min)</CardTitle>
            <CardDescription>Aggregated water flow across all online properties.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={liveFlowData}>
                <defs>
                  <linearGradient id="colorFlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(199 89% 48%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(199 89% 48%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="time" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="flow" stroke="hsl(199 89% 48%)" fillOpacity={1} fill="url(#colorFlow)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Active Sensor Nodes</CardTitle>
            <CardDescription>Live readings from individual devices.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeSensors.map((sensor) => (
              <div key={sensor.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{sensor.id}</p>
                  <p className="text-xs text-muted-foreground">{sensor.location}</p>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-sm font-bold">{sensor.flowRate}</div>
                  <Badge variant="outline" className={`text-[10px] ${sensor.status === 'Active' ? 'border-secondary text-secondary' : 'border-emerald-500 text-emerald-600'}`}>
                    {sensor.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}