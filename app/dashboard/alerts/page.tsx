import { AlertTriangle, CheckCircle2, Clock, ShieldAlert, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { connection } from "next/server";
import { getAlerts, updateAlertStatus, runDiagnostics } from "./actions";

export default async function AlertsPage() {
  // Explicitly opts into dynamic rendering for the new Next.js cache engine
  await connection();
  const activeAlerts = await getAlerts();

  // Dynamically calculate metrics based on real data
  const criticalCount = activeAlerts.filter((a: any) => a.severity === 'Critical' && a.status === 'Active').length;
  const ackCount = activeAlerts.filter((a: any) => a.status === 'Acknowledged').length;
  const resolvedCount = activeAlerts.filter((a: any) => a.status === 'Resolved').length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
            <ShieldAlert className="h-8 w-8 text-destructive" /> Leak Alerts & Incidents
          </h1>
          <p className="text-muted-foreground">Manage active leak detections and system warnings across your properties.</p>
        </div>
        
        {/* Diagnostic Button triggering Server Action (cast bypasses TS mismatch) */}
        <form action={runDiagnostics as any}>
          <Button type="submit" className="bg-secondary text-white hover:bg-secondary/90 cursor-pointer">
            <Activity className="mr-2 h-4 w-4" /> Run System Diagnostics
          </Button>
        </form>
      </div>

      {/* Summary Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{criticalCount}</div>
            <p className="text-xs text-muted-foreground">Requires immediate valve shutoff</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acknowledged</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{ackCount}</div>
            <p className="text-xs text-muted-foreground">Under technician review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Alerts</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{resolvedCount}</div>
            <p className="text-xs text-muted-foreground">Normal operation restored</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Incident Queue</CardTitle>
          <CardDescription>Real-time notifications triggered by sensor flow anomalies.</CardDescription>
        </CardHeader>
        <CardContent>
          {activeAlerts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No alerts found. System is running smoothly.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Severity</TableHead>
                  <TableHead>Incident Type</TableHead>
                  <TableHead>Property / Device</TableHead>
                  <TableHead>Flow Rate</TableHead>
                  <TableHead>Time Reported</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeAlerts.map((alert: any) => (
                  <TableRow key={alert.id}>
                    <TableCell>
                      <Badge variant={alert.severity === 'Critical' ? 'destructive' : alert.severity === 'High' ? 'default' : 'secondary'}>
                        {alert.severity}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{alert.type}</TableCell>
                    <TableCell>
                      <div>{alert.properties?.name || "Unassigned"}</div>
                      <div className="text-xs text-muted-foreground">{alert.devices?.device_identifier || "No Device"}</div>
                    </TableCell>
                    <TableCell>{alert.flow_rate || "N/A"}</TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {new Date(alert.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        alert.status === 'Active' ? 'border-destructive text-destructive bg-destructive/10' : 
                        alert.status === 'Acknowledged' ? 'border-amber-500 text-amber-600 bg-amber-500/10' :
                        'border-emerald-500 text-emerald-600 bg-emerald-500/10'
                      }>
                        {alert.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {alert.status === 'Active' && (
                          <form action={updateAlertStatus.bind(null, alert.id, 'Acknowledged') as any}>
                            <Button variant="outline" size="sm" type="submit" className="cursor-pointer">Acknowledge</Button>
                          </form>
                        )}
                        {alert.status !== 'Resolved' && (
                          <form action={updateAlertStatus.bind(null, alert.id, 'Resolved') as any}>
                            <Button size="sm" className="bg-secondary text-white hover:bg-secondary/90 cursor-pointer" type="submit">
                              Resolve
                            </Button>
                          </form>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}