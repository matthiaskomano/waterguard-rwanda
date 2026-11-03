"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, RefreshCw, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Helper to format dynamic timestamps
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

export default function AlertsClient({ initialAlerts }: { initialAlerts: any[] }) {
  const router = useRouter();
  const [isRefreshing, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            System Alerts & Incidents
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor real-time leak warnings, pressure spikes, and sensor anomalies.
          </p>
        </div>
        <Button 
          onClick={handleRefresh} 
          disabled={isRefreshing}
          className="bg-cyan-500 hover:bg-cyan-600 text-white"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          {isRefreshing ? "Refreshing..." : "Refresh Alerts"}
        </Button>
      </div>

      {/* Incident Log Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShieldAlert className="h-5 w-5 text-destructive" />
            Active Incident Log
          </CardTitle>
          <CardDescription>
            Unresolved system warnings requiring attention or automated valve response.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {initialAlerts.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <ShieldAlert className="h-10 w-10 mx-auto text-slate-300 mb-3" />
              <p>No active alerts detected. Your system is healthy.</p>
            </div>
          ) : (
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
                {initialAlerts.map((alert) => {
                  const severityLower = (alert.severity || "info").toLowerCase();
                  
                  return (
                    <TableRow key={alert.id}>
                      {/* Severity */}
                      <TableCell>
                        <Badge 
                          variant={severityLower === "critical" ? "destructive" : severityLower === "high" ? "default" : "secondary"}
                          className={`
                            ${severityLower === "critical" ? "bg-red-100 text-red-700 hover:bg-red-100 border-red-200" : ""}
                          `}
                        >
                          {alert.severity || "Info"}
                        </Badge>
                      </TableCell>

                      {/* Incident Type */}
                      <TableCell className="font-semibold">
                        {alert.type || alert.message || "Unknown Incident"}
                      </TableCell>

                      {/* Property / Device */}
                      <TableCell className="text-muted-foreground">
                        {alert.properties?.name || "Unknown Property"} — {alert.device_id || "Unknown Device"}
                      </TableCell>

                      {/* Time Reported */}
                      <TableCell className="text-muted-foreground">
                        {timeAgo(alert.created_at)}
                      </TableCell>

                      {/* Status */}
                      <TableCell className="text-right">
                        <span className={`text-sm font-medium ${
                          (alert.status || "").toLowerCase() === "active" ? "text-amber-600" :
                          (alert.status || "").toLowerCase() === "resolved" ? "text-emerald-600" : "text-amber-600"
                        }`}>
                          {alert.status || "Active"}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}