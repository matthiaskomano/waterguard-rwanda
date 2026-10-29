"use client";

import { FileBarChart, Download, FileText, FileSpreadsheet, Calendar, Filter, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Simulated reports data
const recentReports = [
  { 
    id: "REP-901", 
    name: "Q3 2026 Consumption Summary", 
    type: "PDF", 
    date: "Oct 01, 2026", 
    size: "2.4 MB", 
    status: "Ready" 
  },
  { 
    id: "REP-902", 
    name: "September Incident & Alert Log", 
    type: "CSV", 
    date: "Oct 01, 2026", 
    size: "145 KB", 
    status: "Ready" 
  },
  { 
    id: "REP-903", 
    name: "Device Health & Battery Audit", 
    type: "PDF", 
    date: "Oct 25, 2026", 
    size: "1.1 MB", 
    status: "Ready" 
  },
  { 
    id: "REP-904", 
    name: "October Billing Estimate", 
    type: "CSV", 
    date: "Oct 28, 2026", 
    size: "89 KB", 
    status: "Processing" 
  },
];

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
            <FileBarChart className="h-8 w-8 text-secondary" /> Reports & Analytics
          </h1>
          <p className="text-muted-foreground">Generate, schedule, and download system data for compliance and auditing.</p>
        </div>
        <Button className="bg-secondary text-white hover:bg-secondary/90 gap-2">
          <Plus className="h-4 w-4" /> Create Custom Report
        </Button>
      </div>

      {/* Quick Export Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:border-secondary/50 transition-colors cursor-pointer group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consumption Export</CardTitle>
            <FileSpreadsheet className="h-4 w-4 text-muted-foreground group-hover:text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground mb-4">Download total flow data across all properties.</div>
            <Button variant="outline" size="sm" className="w-full gap-2">
              <Download className="h-3 w-3" /> Generate CSV
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hover:border-destructive/50 transition-colors cursor-pointer group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incident Audit Log</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground group-hover:text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground mb-4">A complete PDF history of all triggered leak alerts.</div>
            <Button variant="outline" size="sm" className="w-full gap-2">
              <Download className="h-3 w-3" /> Generate PDF
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:border-emerald-500/50 transition-colors cursor-pointer group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Reports</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground group-hover:text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground mb-4">Configure automated weekly or monthly reports.</div>
            <Button variant="outline" size="sm" className="w-full gap-2">
              <Calendar className="h-3 w-3" /> Manage Schedule
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Reports Archive Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Report Archive</CardTitle>
            <CardDescription>Access previously generated files and exports.</CardDescription>
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Generated Date</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {report.type === 'PDF' ? (
                        <FileText className="h-4 w-4 text-destructive" />
                      ) : (
                        <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
                      )}
                      {report.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-[10px]">
                      {report.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{report.date}</TableCell>
                  <TableCell className="text-muted-foreground">{report.size}</TableCell>
                  <TableCell>
                    {report.status === "Ready" ? (
                      <Badge variant="outline" className="border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50">
                        Ready
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-50 dark:bg-amber-950/50 animate-pulse">
                        Processing
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" disabled={report.status !== "Ready"} className="gap-2">
                      <Download className="h-4 w-4" /> Download
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