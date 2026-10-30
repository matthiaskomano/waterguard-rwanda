"use client";

import { Activity } from "lucide-react";

export default function LiveMonitoringPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Live Monitoring</h1>
        <p className="text-sm text-slate-500">Real-time water flow and sensor data for your properties.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-16 text-center flex flex-col items-center justify-center">
        <div className="p-4 bg-blue-50 rounded-full mb-4">
          <Activity className="h-10 w-10 text-blue-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Live Charts Coming Soon</h2>
        <p className="text-slate-500 max-w-md mx-auto text-sm leading-relaxed">
          This module is being set up. Soon, you will be able to see real-time water flow charts, temperature readings, and continuous sensor data streaming directly from your active WaterGuard devices.
        </p>
      </div>
    </div>
  );
}