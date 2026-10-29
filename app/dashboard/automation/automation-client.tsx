"use client";

import { useState } from "react";
import { Power, ShieldAlert, Cpu, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AutomationClient() {
  const [valves, setValves] = useState([
    { id: "WG-001", property: "Main House", status: "Open", autoShutoff: true, signal: "Strong (-65 dBm)" },
    { id: "WG-002", property: "Office", status: "Open", autoShutoff: true, signal: "Good (-70 dBm)" },
    { id: "WG-003", property: "Apartment B", status: "Closed", autoShutoff: true, signal: "Warning (-85 dBm)" },
    { id: "WG-005", property: "School", status: "Open", autoShutoff: false, signal: "Strong (-62 dBm)" },
    { id: "WG-007", property: "Hotel", status: "Open", autoShutoff: true, signal: "Offline" },
  ]);

  const toggleValve = (id: string) => {
    setValves(valves.map(v => {
      if (v.id === id) {
        const newStatus = v.status === "Open" ? "Closed" : "Open";
        return { ...v, status: newStatus };
      }
      return v;
    }));
  };

  const toggleAuto = (id: string) => {
    setValves(valves.map(v => {
      if (v.id === id) {
        return { ...v, autoShutoff: !v.autoShutoff };
      }
      return v;
    }));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
            <Power className="h-8 w-8 text-cyan-500" /> Valve Automation & Control
          </h1>
          <p className="text-muted-foreground">Manage remote ESP32 motorized water valves and automated safety triggers.</p>
        </div>
        <Button className="bg-secondary hover:bg-secondary/90 text-white gap-2">
          <RefreshCw className="h-4 w-4" /> Sync ESP32 Devices
        </Button>
      </div>

      {/* Global Safety Rules Card */}
      <Card className="border-cyan-500/20 bg-gradient-to-r from-cyan-950/10 to-transparent">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-cyan-600" /> Automated Leak Response Rules
          </CardTitle>
          <CardDescription>
            System-wide fail-safes executed instantaneously by the ESP32 microcontroller upon sensor detection.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center justify-between p-3 rounded-lg border bg-white dark:bg-slate-900">
            <div className="space-y-0.5">
              <Label className="text-sm font-semibold">Instant Leak Shut-off</Label>
              <p className="text-[11px] text-muted-foreground">Close valve immediately on leak trigger.</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-secondary focus:ring-secondary cursor-pointer" />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border bg-white dark:bg-slate-900">
            <div className="space-y-0.5">
              <Label className="text-sm font-semibold">Telegram Alert Dispatch</Label>
              <p className="text-[11px] text-muted-foreground">Send webhook alert to admin mobile.</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-secondary focus:ring-secondary cursor-pointer" />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border bg-white dark:bg-slate-900">
            <div className="space-y-0.5">
              <Label className="text-sm font-semibold">High Pressure Venting</Label>
              <p className="text-[11px] text-muted-foreground">Trigger relief if pipe pressure exceeds 6 bar.</p>
            </div>
            <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-secondary focus:ring-secondary cursor-pointer" />
          </div>
        </CardContent>
      </Card>

      {/* Device Valves Control Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Cpu className="h-5 w-5 text-primary" /> Connected Hardware Actuators (ESP32)
          </CardTitle>
          <CardDescription>Manual override and automation toggles for deployed water valves.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device ID</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Signal Status</TableHead>
                <TableHead>Auto-Shutoff Protection</TableHead>
                <TableHead className="text-right">Valve State Control</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {valves.map((valve) => (
                <TableRow key={valve.id}>
                  <TableCell className="font-semibold">{valve.id}</TableCell>
                  <TableCell className="text-muted-foreground">{valve.property}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={valve.signal.includes("Offline") ? "border-destructive text-destructive" : "border-emerald-500 text-emerald-600"}>
                      {valve.signal}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={valve.autoShutoff} 
                        onChange={() => toggleAuto(valve.id)}
                        className="h-4 w-4 rounded border-slate-300 text-secondary focus:ring-secondary cursor-pointer" 
                      />
                      <span className="text-xs text-muted-foreground">{valve.autoShutoff ? "Active" : "Disabled"}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      variant={valve.status === "Open" ? "destructive" : "default"}
                      className={valve.status === "Open" ? "" : "bg-emerald-600 hover:bg-emerald-700 text-white"}
                      onClick={() => toggleValve(valve.id)}
                    >
                      {valve.status === "Open" ? "Shut Valve" : "Open Valve"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}