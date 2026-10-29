"use client";

import { AlertTriangle, ShieldAlert, CheckCircle2, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const activeAlerts = [
  { id: 1, type: "Possible leak detected", property: "Main House", device: "Device WG-001", time: "2 hours ago", severity: "Critical", status: "Active" },
  { id: 2, type: "High water flow", property: "Apartment B", device: "Device WG-003", time: "4 hours ago", severity: "High", status: "Active" },
  { id: 3, type: "Abnormal pressure", property: "School", device: "Device WG-005", time: "6 hours ago", severity: "Medium", status: "Investigating" },
];

export default function AlertsClient() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
            <AlertTriangle className="h-8 w-8 text-destructive" /> System Alerts & Incidents
          </h1>
          <p className="text-muted-foreground">Monitor real-time leak warnings, pressure spikes, and sensor anomalies.</p>
        </div>
        <Button className="bg-secondary hover:bg-secondary/90 text-white gap-2">
          <RefreshCw className="h-4 w-4" /> Refresh Alerts
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-destructive" /> Active Incident Log
          </CardTitle>
          <CardDescription>Unresolved system warnings requiring attention or automated valve response.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Severity</TableHead>
                <TableHead>Incident Type</TableHead>
                <TableHead>Property / Device</TableHead>
                <TableHead>Time Reported</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>
                    <Badge variant={alert.severity === 'Critical' ? 'destructive' : 'default'} className="text-[10px]">
                      {alert.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold">{alert.type}</TableCell>
                  <TableCell className="text-muted-foreground">{alert.property} — {alert.device}</TableCell>
                  <TableCell className="text-muted-foreground">{alert.time}</TableCell>
                  <TableCell className="text-right font-medium text-amber-600">{alert.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}