"use client";

import { Wrench, BatteryWarning, WifiOff, CalendarClock, PenTool, CheckCircle2, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Simulated maintenance data
const offlineDevices = [
  { id: "WG-012", location: "Kigali Heights - Floor 2", issue: "Network Offline", downtime: "2 hrs 15 mins", severity: "High" },
  { id: "WG-045", location: "Downtown Complex - Main Valve", issue: "Low Battery (12%)", downtime: "Warning", severity: "Medium" },
];

const maintenanceSchedule = [
  { 
    id: "MNT-101", 
    task: "Sensor Calibration", 
    property: "Main House", 
    date: "Oct 30, 2026", 
    technician: "Jean-Paul N.", 
    status: "Scheduled" 
  },
  { 
    id: "MNT-102", 
    task: "Battery Replacement", 
    property: "Apartment B", 
    date: "Nov 02, 2026", 
    technician: "Unassigned", 
    status: "Pending" 
  },
  { 
    id: "MNT-103", 
    task: "Firmware Update & Diagnostics", 
    property: "School - Block A", 
    date: "Oct 25, 2026", 
    technician: "Matthias K.", 
    status: "Completed" 
  },
];

export default function MaintenancePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
            <Wrench className="h-8 w-8 text-secondary" /> Maintenance
          </h1>
          <p className="text-muted-foreground">Monitor device health, battery levels, and schedule technician visits.</p>
        </div>
        <Button className="bg-secondary text-white hover:bg-secondary/90 gap-2">
          <CalendarClock className="h-4 w-4" /> Schedule Visit
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-destructive">Offline Devices</CardTitle>
            <WifiOff className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">1</div>
            <p className="text-xs text-muted-foreground mt-1">Requires immediate network check</p>
          </CardContent>
        </Card>
        <Card className="border-amber-500/50 bg-amber-500/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-500">Low Battery</CardTitle>
            <BatteryWarning className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700 dark:text-amber-500">1</div>
            <p className="text-xs text-muted-foreground mt-1">Under 15% remaining charge</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Visits</CardTitle>
            <PenTool className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">Scheduled for this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Action Required Section */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-destructive" /> Needs Attention
            </CardTitle>
            <CardDescription>Hardware requiring immediate intervention.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {offlineDevices.map((device) => (
              <div key={device.id} className="flex flex-col gap-2 p-3 rounded-lg border bg-slate-50 dark:bg-slate-900/50">
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-sm">{device.id}</span>
                  <Badge variant={device.severity === 'High' ? 'destructive' : 'outline'} className={device.severity === 'Medium' ? 'border-amber-500 text-amber-600' : ''}>
                    {device.issue}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">{device.location}</div>
                <div className="text-xs font-medium mt-1">Status: {device.downtime}</div>
                <Button size="sm" variant="outline" className="w-full mt-2 text-xs">Create Ticket</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Maintenance Schedule Table */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Maintenance Schedule</CardTitle>
            <CardDescription>Log of upcoming and recently completed servicing.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task / ID</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Scheduled Date</TableHead>
                  <TableHead>Technician</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maintenanceSchedule.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>
                      <div className="font-medium">{job.task}</div>
                      <div className="text-xs text-muted-foreground">{job.id}</div>
                    </TableCell>
                    <TableCell>{job.property}</TableCell>
                    <TableCell>{job.date}</TableCell>
                    <TableCell>{job.technician}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className={
                        job.status === 'Completed' ? 'border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-950' : 
                        job.status === 'Scheduled' ? 'border-secondary text-secondary bg-cyan-50 dark:bg-cyan-950' : 
                        'border-amber-500 text-amber-600 bg-amber-50 dark:bg-amber-950'
                      }>
                        {job.status === 'Completed' && <CheckCircle2 className="mr-1 h-3 w-3" />}
                        {job.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}