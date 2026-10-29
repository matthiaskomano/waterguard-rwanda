import { Cpu, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getDevices, getPropertiesForDropdown } from "./actions";
import { AddDeviceDialog } from "./add-device-dialog";

export default async function DevicesPage() {
  const devices = await getDevices();
  const properties = await getPropertiesForDropdown();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">IoT Devices</h1>
          <p className="text-muted-foreground">Hardware health and connectivity status.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCcw className="mr-2 h-4 w-4" /> Refresh Status
          </Button>
          <AddDeviceDialog properties={properties} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Device Fleet</CardTitle>
          <CardDescription>Real-time status of your ESP32 monitoring units.</CardDescription>
        </CardHeader>
        <CardContent>
          {devices.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No devices found. Click "Register Device" to provision a new unit.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device Name</TableHead>
                  <TableHead>Assigned Property</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Battery</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {devices.map((device) => (
                  <TableRow key={device.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-muted-foreground" />
                      <div>
                        {device.name}
                        <div className="text-xs text-muted-foreground font-normal">{device.device_identifier}</div>
                      </div>
                    </TableCell>
                    <TableCell>{device.properties?.name || "Unassigned"}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        device.status === "Online" 
                          ? "border-success text-success" 
                          : "border-destructive text-destructive bg-destructive/10"
                      }>
                        {device.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{device.battery}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Details</Button>
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