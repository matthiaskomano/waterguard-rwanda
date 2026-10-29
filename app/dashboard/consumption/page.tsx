"use client";

import { Droplets, TrendingUp, Calendar, ArrowDownRight, ArrowUpRight, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

// Simulated consumption data
const monthlyData = [
  { name: "Week 1", liters: 4200 },
  { name: "Week 2", liters: 3800 },
  { name: "Week 3", liters: 5100 },
  { name: "Week 4", liters: 4600 },
];

const historicalData = [
  { month: "May", liters: 18500 },
  { month: "Jun", liters: 19200 },
  { month: "Jul", liters: 17800 },
  { month: "Aug", liters: 21000 },
  { month: "Sep", liters: 18900 },
  { month: "Oct", liters: 17700 },
];

const propertyBreakdown = [
  { id: 1, name: "Main House", type: "Residential", usage: "8,450 L", cost: "4,225 RWF", trend: "down", change: "-5%" },
  { id: 2, name: "Apartment B", type: "Residential", usage: "5,120 L", cost: "2,560 RWF", trend: "up", change: "+12%" },
  { id: 3, name: "School", type: "Commercial", usage: "4,130 L", cost: "2,065 RWF", trend: "down", change: "-2%" },
];

export default function ConsumptionPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-secondary" /> Water Consumption
          </h1>
          <p className="text-muted-foreground">Analyze your water usage trends and estimated billing across all properties.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" /> Last 30 Days
          </Button>
          <Button className="bg-secondary text-white hover:bg-secondary/90">
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volume (30d)</CardTitle>
            <Droplets className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">17,700 L</div>
            <p className="text-xs text-emerald-600 font-medium flex items-center mt-1">
              <ArrowDownRight className="h-3 w-3 mr-1" /> 6.3% vs last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Daily Usage</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">590 L</div>
            <p className="text-xs text-muted-foreground mt-1">Across all properties</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Est. Monthly Cost</CardTitle>
            <span className="h-4 w-4 text-muted-foreground font-bold text-xs flex items-center justify-center">RWF</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">8,850</div>
            <p className="text-xs text-emerald-600 font-medium flex items-center mt-1">
              <ArrowDownRight className="h-3 w-3 mr-1" /> Estimated 560 RWF saved
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency Score</CardTitle>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">Excellent</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">92/100</div>
            <p className="text-xs text-muted-foreground mt-1">Based on leak prevention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Weekly Breakdown Chart */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Current Month Usage</CardTitle>
            <CardDescription>Volume consumed per week in Liters.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="liters" fill="hsl(199 89% 48%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 6-Month Historical Trend */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>6-Month Historical Trend</CardTitle>
            <CardDescription>Long-term consumption patterns.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalData}>
                <defs>
                  <linearGradient id="colorHistorical" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="liters" stroke="#10b981" fillOpacity={1} fill="url(#colorHistorical)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Breakdown Table */}
      <Card>
        <CardHeader>
          <CardTitle>Property Breakdown</CardTitle>
          <CardDescription>Detailed consumption metrics per location for the current billing cycle.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Total Usage</TableHead>
                <TableHead>Est. Cost (RWF)</TableHead>
                <TableHead className="text-right">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {propertyBreakdown.map((prop) => (
                <TableRow key={prop.id}>
                  <TableCell className="font-medium">{prop.name}</TableCell>
                  <TableCell className="text-muted-foreground">{prop.type}</TableCell>
                  <TableCell>{prop.usage}</TableCell>
                  <TableCell>{prop.cost}</TableCell>
                  <TableCell className="text-right">
                    <span className={`inline-flex items-center text-xs font-medium ${prop.trend === 'down' ? 'text-emerald-600' : 'text-destructive'}`}>
                      {prop.trend === 'down' ? <ArrowDownRight className="mr-1 h-3 w-3" /> : <ArrowUpRight className="mr-1 h-3 w-3" />}
                      {prop.change}
                    </span>
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