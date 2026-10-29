"use client";

import { Settings as SettingsIcon, User, Building, Bell, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
            <SettingsIcon className="h-8 w-8 text-secondary" /> Settings
          </h1>
          <p className="text-muted-foreground">Manage your account preferences, organization details, and notifications.</p>
        </div>
        <Button className="bg-primary text-white gap-2">
          <Save className="h-4 w-4" /> Save All Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-secondary" /> Personal Information
            </CardTitle>
            <CardDescription>Update your personal profile details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Matthias Komano" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="matthias@example.com" disabled />
              <p className="text-xs text-muted-foreground">Email addresses are tied to your authentication provider.</p>
            </div>
          </CardContent>
        </Card>

        {/* Organization Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-emerald-500" /> Organization
            </CardTitle>
            <CardDescription>Manage your workspace preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="orgName">Organization Name</Label>
              <Input id="orgName" defaultValue="WaterGuard Rwanda" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Default Timezone</Label>
              <select 
                id="timezone" 
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="CAT">Central Africa Time (CAT)</option>
                <option value="UTC">Coordinated Universal Time (UTC)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-amber-500" /> Notification Routing
            </CardTitle>
            <CardDescription>Control how and when you receive system alerts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4 bg-slate-50/50 dark:bg-slate-900/20">
              <div>
                <div className="font-medium text-sm">Critical Leak Alerts</div>
                <div className="text-xs text-muted-foreground mt-1">Immediate notifications for severe flow anomalies.</div>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="h-4 w-4 accent-secondary rounded" />
                  <span className="text-sm font-medium">Email</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="h-4 w-4 accent-secondary rounded" />
                  <span className="text-sm font-medium">SMS</span>
                </label>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
              <div>
                <div className="font-medium text-sm">Weekly Consumption Reports</div>
                <div className="text-xs text-muted-foreground mt-1">Summary of water usage and estimated billing.</div>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="h-4 w-4 accent-secondary rounded" />
                  <span className="text-sm font-medium">Email</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
              <div>
                <div className="font-medium text-sm">Maintenance Reminders</div>
                <div className="text-xs text-muted-foreground mt-1">Updates on scheduled technician visits and device health.</div>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="h-4 w-4 accent-secondary rounded" />
                  <span className="text-sm font-medium">Email</span>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}