"use client";

import { AlertTriangle } from "lucide-react";

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Alerts & Notifications</h1>
        <p className="text-sm text-slate-500">View and manage all active warnings for your properties.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-16 text-center flex flex-col items-center justify-center">
        <div className="p-4 bg-orange-50 rounded-full mb-4">
          <AlertTriangle className="h-10 w-10 text-orange-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Alert History</h2>
        <p className="text-slate-500 max-w-md mx-auto text-sm leading-relaxed">
          Your comprehensive alert history and notification settings will appear here. This module is currently being finalized.
        </p>
      </div>
    </div>
  );
}