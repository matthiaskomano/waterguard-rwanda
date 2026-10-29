"use client";

import { Bell, Check, Info, AlertTriangle, Settings, CheckCircle2, MailOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Simulated notifications data
const notificationsList = [
  { 
    id: 1, 
    title: "System Update Complete", 
    description: "WaterGuard Rwanda firmware v2.4 has been successfully deployed to all active devices. Calibration accuracy improved by 4%.", 
    type: "info", 
    time: "2 hours ago", 
    unread: true 
  },
  { 
    id: 2, 
    title: "Billing Reminder", 
    description: "Your monthly infrastructure invoice for October will be generated in 3 days. Ensure your payment methods are up to date.", 
    type: "warning", 
    time: "5 hours ago", 
    unread: true 
  },
  { 
    id: 3, 
    title: "New Device Registered", 
    description: "Sensor node WG-004 was successfully provisioned and linked to Property: Main House.", 
    type: "success", 
    time: "1 day ago", 
    unread: true 
  },
  { 
    id: 4, 
    title: "Maintenance Scheduled", 
    description: "Routine server maintenance and database optimization is scheduled for Sunday at 02:00 AM CAT. Expect 5 minutes of downtime.", 
    type: "info", 
    time: "2 days ago", 
    unread: false 
  },
  { 
    id: 5, 
    title: "Weekly Consumption Report", 
    description: "Your water usage analytics report for the previous week is ready to view and export.", 
    type: "info", 
    time: "3 days ago", 
    unread: false 
  },
];

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
            <Bell className="h-8 w-8 text-secondary" /> Notifications
          </h1>
          <p className="text-muted-foreground">Stay updated on system activity, billing, and account events.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Settings className="h-4 w-4" /> Preferences
          </Button>
          <Button className="bg-secondary text-white hover:bg-secondary/90 gap-2">
            <Check className="h-4 w-4" /> Mark all as read
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notificationsList.map((notification) => (
              <div 
                key={notification.id} 
                className={`flex gap-4 p-4 rounded-lg border transition-colors ${
                  notification.unread ? "bg-slate-50 dark:bg-slate-900/50 border-cyan-100 dark:border-cyan-900/30" : "bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800"
                }`}
              >
                <div className="mt-1 shrink-0">
                  {notification.type === 'success' && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                  {notification.type === 'warning' && <AlertTriangle className="h-5 w-5 text-amber-500" />}
                  {notification.type === 'info' && <Info className="h-5 w-5 text-cyan-500" />}
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-semibold ${notification.unread ? "text-primary" : "text-muted-foreground"}`}>
                      {notification.title}
                    </p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                </div>

                {notification.unread && (
                  <div className="shrink-0 flex items-center">
                    <span className="h-2 w-2 rounded-full bg-secondary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}