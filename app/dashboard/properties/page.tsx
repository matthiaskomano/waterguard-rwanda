import { Building2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { connection } from "next/server";
import { getProperties } from "./actions";
import { AddPropertyDialog } from "./add-property-dialog";

export default async function PropertiesPage() {
  // FIX: Explicitly opts into dynamic rendering for the new Next.js cache engine
  await connection();
  
  // Fetch real data from Supabase
  const properties = await getProperties();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Properties</h1>
          <p className="text-muted-foreground">Manage your monitored locations.</p>
        </div>
        
        {/* The interactive modal is safely isolated in a Client Component */}
        <AddPropertyDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registered Properties</CardTitle>
          <CardDescription>A list of all facilities currently monitored by your organization.</CardDescription>
        </CardHeader>
        <CardContent>
          {properties.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No properties found. Click "Add Property" to create one.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {properties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      {property.name}
                    </TableCell>
                    <TableCell>{property.property_type}</TableCell>
                    <TableCell>{property.location}</TableCell>
                    <TableCell>
                      <Badge variant={property.status === "Healthy" ? "default" : "destructive"} 
                             className={property.status === "Healthy" ? "bg-success hover:bg-success/80" : ""}>
                        {property.status}
                      </Badge>
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